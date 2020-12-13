'use strict';

/** @param props: powerRowParent, state
 Immutable (state/derivedValues don't change) */
function ModifierList(props)
{
   var state, derivedValues, blankKey;

   //region basic getter
   //defensive copy is important to prevent tamper
   this.getKeyList = function () {return JSON.clone(props.keyList);};
   this.getBlankKey = function () {return blankKey;};
   this.getDerivedValues = function () {return JSON.clone(derivedValues);};
   this.getPower = function () {return props.powerRowParent;};
   this.getState = function () {return JSON.clone(state);};
   //endregion basic getter

   //TODO: sort this section
   this.getIndexByKey = function (key)
   {
      if (key === blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');
      for (var i = 0; i < state.length; i++)
      {
         if (props.keyList[i] === key) return i;
      }
      throw new AssertionError('No row with id ' + key + ' (state.length=' + state.length + ')');
   };
   /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
   this.getRowByIndex = function (rowIndex)
   {
      return JSON.clone({
         state: state[rowIndex],
         derivedValues: derivedValues[rowIndex],
         key: props.keyList[rowIndex]
      });
   };
   /**This is only used by tests. Blank row is considered === arr.length to make it easier to hit DOM*/
   this.indexToKey = function (rowIndex)
   {
      if (rowIndex === state.length) return blankKey;  //same as props.keyList[rowIndex] but more clear
      return props.keyList[rowIndex];
   };
   /**Returns an array of json objects for this section's data*/
   this.save = function ()
   {
      var json = [];
      for (var i = 0; i < state.length; i++)
      {
         json.push(ModifierObject.toSave(state[i], derivedValues.rows[i]));
      }
      return json;  //might still be empty
   };

   //region 'private' functions section. Although all public none of these should be called from outside of this object
   /**props: callback, powerRowParent, sectionName, state*/
   this._constructor = function ()
   {
      state = props.state;
      blankKey = props.keyList.last();
      derivedValues = props.derivedValues;
   };
   //endregion private functions
   this._constructor();
}

/**@returns {boolean} true if there exists a modifier that changes range from being Personal*/
ModifierList.isNonPersonalModifierPresent = function (inputState)
{
   if (undefined === inputState) return false;
   for (var i = 0; i < inputState.length; ++i)
   {
      if ('Attack' === inputState[i].name ||
         'Affects Others Also' === inputState[i].name ||
         'Affects Others Only' === inputState[i].name)
         return true;
   }
   return false;
};
/**Sets data from a json object given then updates. The row array is not cleared by this function*/
ModifierList.sanitizeStateAndGetDerivedValues = function (inputState, powerEffect, validActivationInfoObj, powerSectionName, powerIndex)
{
   if (undefined === inputState) inputState = [];
   var validListState = [];
   var duplicateCheck = [];
   var derivedValuesList = [];
   for (var modIndex = 0; modIndex < inputState.length; modIndex++)
   {
      var loadLocation = (powerSectionName.toTitleCase() + ' #' + (powerIndex + 1) + ' Modifier #' + (modIndex + 1));
      var rowInputState = {
         name: inputState[modIndex].name,
         rank: inputState[modIndex].rank,
         text: inputState[modIndex].text
      };
      var validRowStateAndDv = ModifierObject.sanitizeStateAndGetDerivedValues(rowInputState, powerEffect, validActivationInfoObj,
         loadLocation);
      if (undefined === validRowStateAndDv) continue;  //already sent message

      var uniqueName = ModifierObject.getUniqueName(validRowStateAndDv.state, false);
      if (duplicateCheck.contains(uniqueName))
      {
         Main.messageUser('ModifierList.load.duplicate', loadLocation + ': ' + validRowStateAndDv.state.name +
            ' is not allowed because the modifier already exists. Increase the rank instead or use different text.');
         continue;
      }
      duplicateCheck.push(uniqueName);
      validListState.push(validRowStateAndDv.state);
      derivedValuesList.push(validRowStateAndDv.derivedValues);
   }
   var derivedValues = ModifierList.calculateValues(validListState, derivedValuesList);
   return {state: validListState, derivedValues: derivedValues};
};
/**This will search each row for the name given and return the row's array index or undefined if not found.
 Note that this should only be called with modifiers that don't have text.*/
ModifierList.findRowByName = function (state, rowName)
{
   for (var i = 0; i < state.length; i++)
   {
      if (state[i].name === rowName) return i;
   }
   //else return undefined
};
/**This will set a row (by name) to the rank given. If the row doesn't exist it will be created*/
ModifierList.createByNameRank = function (state, rowName, rowRank)
{
   var rowIndex = ModifierList.findRowByName(state, rowName);
   if (undefined === rowIndex)
   {
      state.push({name: rowName, rank: rowRank});
   }
   else
   {
      state[rowIndex].rank = rowRank;
   }
};
/**This will remove a row of the given name. Note that this should only be called with modifiers that don't have text.*/
ModifierList.removeByName = function (state, rowName)
{
   var rowIndex = ModifierList.findRowByName(state, rowName);
   if (undefined !== rowIndex) state.remove(rowIndex);
};
/**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
ModifierList.calculateGrandTotal = function (derivedValues, powerRowRawTotal)
{
   //Alternate Effect in ruleset 1.0 forced the power to be worth a total of 1 (or 2 for Dynamic). the flaw cost is all but 1
   //technically 1.0 Alternate Effect was an extra to spent 1 point on a whole other sub-power
   if (derivedValues.autoModifierNameSet.contains('Dynamic Alternate Effect'))
   {
      //only exists in ruleset 1.0
      powerRowRawTotal = 2;  //cost ignores current total
   }
   else if (derivedValues.autoModifierNameSet.contains('Alternate Effect'))
   {
      if (1 === Main.getActiveRuleset().major)
      {
         powerRowRawTotal = 1;  //cost ignores current total
      }
      else
      {
         powerRowRawTotal += -Math.floor(powerRowRawTotal / 2);
      }
   }

   //removable is applied secondly after alt effect (it stacks)
   if (derivedValues.autoModifierNameSet.contains('Easily Removable'))
   {
      powerRowRawTotal += -Math.floor(powerRowRawTotal * 2 / 5);
   }
   else if (derivedValues.autoModifierNameSet.contains('Removable'))
   {
      powerRowRawTotal += -Math.floor(powerRowRawTotal / 5);
   }

   return powerRowRawTotal;
};
/**Counts totals etc. All values that are not user set or final are created by this method*/
ModifierList.calculateValues = function (validListState, derivedValuesList)
{
   //TODO: fix sort/indexing
   //state.sort(this._sortOrder);
   var derivedValues = {
      autoModifierNameSet: [],
      rankTotal: 0,
      flatTotal: 0,
      rows: derivedValuesList
   };
   for (var i = 0; i < validListState.length; i++)
   {
      if (derivedValuesList[i].hasAutoTotal) derivedValues.autoModifierNameSet.push(
         validListState[i].name);
      else if ('Rank' === derivedValuesList[i].modifierType) derivedValues.rankTotal += derivedValuesList[i].rawTotal;
      else derivedValues.flatTotal += derivedValuesList[i].rawTotal;  //could be flat or free. if free the total will be 0
   }
   return derivedValues;
};

/*
architecture:
   * main (react) has all state or maybe each section does too
   * power list needs the state of mod in order to render power row total
   * power list uses power html: pass down everything as props, immutable non-react below here
   * mod list delegate to power list (really main) for state mutation
   * loading main is normal

TODO: next:
fix all possible tests
   TestSuite.powerRow.validateAndGetPossibleActions is calling _validateAndGetPossibleActions directly
   TestSuite.modifierRow.setAutoRank "getAutoTotal is not a function"
   TestSuite.main.updateTranscendence is destroying power
resolve godhood circle:
   high CP needs to trigger godhood but prerender can't update state
   static method to determine godhood
   all setState set both at once
   but then there's CP from others
   all need static calc values (main eventually has all state?)
   this also fixes possible circle for power/mod ARD
power row constructor has activation on change
replace sanitizeRows with duplicate check
   power row has stuff (see _addRowNoPush region) from mod on change
sort mods on add
test all
sort all functions
there's lots of tasks

skill list react
react abilities
react defenses
react main
   make offense new section
   render includes totals and every non-section thing
*/
