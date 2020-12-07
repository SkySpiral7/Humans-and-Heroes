'use strict';

/** @param props: powerRowParent, state
 Immutable (state/derivedValues don't change) */
function ModifierList(props)
{
   var state, derivedValues, rowArray, blankKey;

   //region basic getter
   this.getKeyList = function () {return JSON.clone(props.keyList);};
   this.getBlankKey = function () {return blankKey;};
   /**This total will be the sum of all flat modifiers*/
   this.getFlatTotal = function () {return derivedValues.flatTotal;};  //TODO: make sure these are not called before they are defined
   /**This total will be the sum of all rank modifiers*/
   this.getRankTotal = function () {return derivedValues.rankTotal;};
   this.getPower = function () {return props.powerRowParent;};
   this.getState = function () {return JSON.clone(state);};  //defensive copy is important to prevent tamper
   //endregion basic getter

   //TODO: sort this section
   this.getIndexByKey = function (key)
   {
      if (key === blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');
      for (var i = 0; i < rowArray.length; i++)
      {
         if (rowArray[i].getKey() === key) return i;
      }
      throw new AssertionError('No row with id ' + key + ' (rowArray.length=' + rowArray.length + ')');
   };
   /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
   this.getRowByIndex = function (rowIndex) {return rowArray[rowIndex];};
   /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
   this.getRowByKey = function (key) {return rowArray[this.getIndexByKey(key)];};
   /**This is only used by tests. Blank row is considered === arr.length to make it easier to hit DOM*/
   this.indexToKey = function (rowIndex)
   {
      if (rowIndex === rowArray.length) return blankKey;
      return rowArray[rowIndex].getKey();
   };
   /**Returns an array of json objects for this section's data*/
   this.save = function ()
   {
      var json = [];
      for (var i = 0; i < rowArray.length; i++)
      {
         json.push(rowArray[i].save());
      }
      return json;  //might still be empty
   };

   //region public functions
   /**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
   this.calculateGrandTotal = function (powerRowRawTotal)
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
   this.calculateValues = function ()
   {
      //this._sanitizeRows();
      //TODO: fix sort/indexing
      //rowArray.sort(this._sortOrder);
      //this._reindex();
      derivedValues.autoModifierNameSet = [];
      derivedValues.rankTotal = 0;
      derivedValues.flatTotal = 0;
      for (var i = 0; i < rowArray.length; i++)
      {
         if (Data.Modifier[rowArray[i].getName()].hasAutoTotal) derivedValues.autoModifierNameSet.push(
            rowArray[i].getName());
         else if (rowArray[i].isRank()) derivedValues.rankTotal += rowArray[i].getRawTotal();
         else derivedValues.flatTotal += rowArray[i].getRawTotal();  //could be flat or free. if free the total will be 0
      }
   };
   //endregion public functions

   //region 'private' functions section. Although all public none of these should be called from outside of this object
   /**props: callback, powerRowParent, sectionName, state*/
   this._constructor = function ()
   {
      state = props.state;
      blankKey = props.keyList.last();
      rowArray = [];
      for (var modIndex = 0; modIndex < state.length; modIndex++)
      {
         rowArray.push(new ModifierObject({
            //don't need keyCopy because mod row isn't react
            key: props.keyList[modIndex],
            powerRowParent: props.powerRowParent,
            modifierListParent: this,
            state: state[modIndex]
         }));
      }
      derivedValues = {
         autoModifierNameSet: [],
         rankTotal: 0,
         flatTotal: 0
      };

      this.calculateValues();
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
ModifierList.sanitizeState = function (inputState, powerSectionName, powerIndex)
{
   var validListState = [];
   if (undefined === inputState) return validListState;
   var duplicateCheck = [];
   for (var modIndex = 0; modIndex < inputState.length; modIndex++)
   {
      var loadLocation = (powerSectionName.toTitleCase() + ' #' + (powerIndex + 1) + ' Modifier #' + (modIndex + 1));
      var validRowState = ModifierObject.sanitizeState({
         name: inputState[modIndex].name,
         rank: inputState[modIndex].rank,
         text: inputState[modIndex].text
      }, loadLocation);
      if (undefined === validRowState) continue;  //already sent message

      var uniqueName = ModifierObject.getUniqueName(validRowState, false);
      if (duplicateCheck.contains(uniqueName))
      {
         Main.messageUser('ModifierList.load.duplicate', loadLocation + ': ' + validRowState.name +
            ' is not allowed because the modifier already exists. Increase the rank instead or use different text.');
         continue;
      }
      duplicateCheck.push(uniqueName);
      validListState.push(validRowState);
   }
   return validListState;
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

/*
architecture:
   * main (react) has all state or maybe each section does too
   * power list needs the state of mod in order to render power row total
   * power list uses power html: pass down everything as props, immutable non-react below here
   * mod list delegate to power list (really main) for state mutation
   * loading main is normal

TODO: next:
fix all possible tests
   broke: TestSuite.modifierRowHtml
   TestSuite.powerRow.validateAndGetPossibleActions is calling _validateAndGetPossibleActions directly
   TestSuite.modifierRow.setAutoRank "getAutoTotal is not a function"
   TestSuite.main.updateTranscendence is destroying power
resolve godhood circle:
   high CP needs to trigger godhood but prerender can't update state
   static method to determine godhood
   all setState set both at once
   but then there's CP from others
   all need static calc values (main eventually has all state?)
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
