'use strict';

/** @param props: powerRowParent, state
 Immutable (state/derivedValues don't change) */
function ModifierList(props)
{
   var state, derivedValues, blankKey;

   //region basic getter
   //defensive copy is important to prevent tamper
   this.getBlankKey = function () {return blankKey;};
   this.getDerivedValues = function () {return JSON.clone(derivedValues);};
   this.getKeyList = function () {return JSON.clone(props.keyList);};
   this.getPower = function () {return props.powerRowParent;};
   this.getState = function () {return JSON.clone(state);};
   //endregion basic getter

   //region public functions
   this.getIndexByKey = function (key)
   {
      if (key === blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');
      for (var i = 0; i < state.length; i++)
      {
         if (props.keyList[i] === key) return i;
      }
      throw new AssertionError('No row with id ' + key + ' (state.length=' + state.length + ')');
   };
   this.getRowByIndex = function (rowIndex)
   {
      if (rowIndex >= state.length) return;
      //TODO: how about a list of these instead of several lists
      return JSON.clone({
         state: state[rowIndex],
         derivedValues: derivedValues.rows[rowIndex],
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
   //endregion public functions

   //region 'private' functions. Although all public none of these should be called from outside of this object
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

//region public static functions
/**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
ModifierList.calculateGrandTotal = function (derivedValues, powerRowRawTotal)
{
   var modIndex = undefined;
   var map = new MapDefault(derivedValues.autoModifierNameToRowIndex, undefined);  //because this has nice method names

   //Alternate Effect in ruleset 1.0 forced the power to be worth a total of 1 (or 2 for Dynamic). the flaw cost is all but 1
   //technically 1.0 Alternate Effect was an extra to spent 1 point on a whole other sub-power
   if (map.containsKey('Dynamic Alternate Effect'))
   {
      //only exists in ruleset 1.0
      modIndex = map.get('Dynamic Alternate Effect');
      //autoTotal can be positive (but generally isn't)
      derivedValues.rows[modIndex].autoTotal = (2 - powerRowRawTotal);
      powerRowRawTotal = 2;  //cost ignores current total
   }
   else if (map.containsKey('Alternate Effect'))
   {
      modIndex = map.get('Alternate Effect');
      if (1 === Main.getActiveRuleset().major)
      {
         //autoTotal can be 0 (but generally isn't)
         derivedValues.rows[modIndex].autoTotal = (1 - powerRowRawTotal);
         powerRowRawTotal = 1;  //cost ignores current total
      }
      else
      {
         derivedValues.rows[modIndex].autoTotal = -Math.floor(powerRowRawTotal / 2);
         powerRowRawTotal += derivedValues.rows[modIndex].autoTotal;
      }
   }

   //removable is applied secondly after alt effect (it stacks)
   if (map.containsKey('Easily Removable'))
   {
      modIndex = map.get('Easily Removable');
      derivedValues.rows[modIndex].autoTotal = -Math.floor(powerRowRawTotal * 2 / 5);
      powerRowRawTotal += derivedValues.rows[modIndex].autoTotal;
   }
   else if (map.containsKey('Removable'))
   {
      modIndex = map.get('Removable');
      derivedValues.rows[modIndex].autoTotal = -Math.floor(powerRowRawTotal / 5);
      powerRowRawTotal += derivedValues.rows[modIndex].autoTotal;
   }

   //otherwise autoTotal is undefined

   return powerRowRawTotal;
};
/**This will set a row (by name) to the rank given. If the row doesn't exist it will be created*/
ModifierList.createByNameRank = function (validState, pendingModifiersAndDv, validActivationInfoObj, powerSectionName, powerIndex, rowName,
                                          rowRank)
{
   var rowIndex = ModifierList.findRowByName(pendingModifiersAndDv.state, rowName);
   if (undefined === rowIndex)
   {
      pendingModifiersAndDv.state.push({name: rowName, rank: rowRank});
      pendingModifiersAndDv.state = pendingModifiersAndDv.state.stableSort(ModifierList._sortOrder(validState.action));
   }
   else
   {
      pendingModifiersAndDv.state[rowIndex].rank = rowRank;
   }
   pendingModifiersAndDv = ModifierList.sanitizeStateAndGetDerivedValues(pendingModifiersAndDv.state, validState.effect,
      validActivationInfoObj, powerSectionName, powerIndex);
   return pendingModifiersAndDv;
};
/**This will search each row for the name given and return the row's array index or undefined if not found.
 Note that this should only be called with modifiers that don't have text.*/
//TODO: rename to indicate index
ModifierList.findRowByName = function (state, rowName)
{
   for (var i = 0; i < state.length; i++)
   {
      if (state[i].name === rowName) return i;
   }
   //else return undefined
};
/**@returns {boolean} true if modifier would change range from being Personal*/
//TODO: move to mod row
ModifierList.isNonPersonalModifier = function (modName)
{
   //could use unique name but this is more clear
   return ('Attack' === modName ||
      'Affects Others Also' === modName ||
      'Affects Others Only' === modName);

};
/**@returns {boolean} true if there exists a modifier that changes range from being Personal*/
ModifierList.isNonPersonalModifierPresent = function (inputState)
{
   if (undefined === inputState) return false;
   for (var i = 0; i < inputState.length; ++i)
   {
      if (ModifierList.isNonPersonalModifier(inputState[i].name))
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
      //TODO: pretty sure this copy is pointless but wait for all tests first
      var rowInputState = {
         name: inputState[modIndex].name,
         rank: inputState[modIndex].rank,
         text: inputState[modIndex].text
      };
      var validRowStateAndDv = ModifierObject.sanitizeStateAndGetDerivedValues(rowInputState, powerEffect, validActivationInfoObj,
         powerSectionName, loadLocation);
      if (undefined === validRowStateAndDv) continue;  //already sent message

      var uniqueName = ModifierObject.getUniqueName(validRowStateAndDv.state);
      if (duplicateCheck.contains(uniqueName))
      {
         Main.messageUser('ModifierList.sanitizeStateAndGetDerivedValues.duplicate', loadLocation + ': '
            + validRowStateAndDv.state.name +
            ' is not allowed because the modifier already exists. Increase the rank instead or use different text.');
         continue;
      }
      duplicateCheck.push(uniqueName);
      validListState.push(validRowStateAndDv.state);
      derivedValuesList.push(validRowStateAndDv.derivedValues);
   }
   var derivedValues = ModifierList._calculateValues(validListState, derivedValuesList);
   return {state: validListState, derivedValues: derivedValues};
};
/**This will remove a row of the given name.
 * Does nothing if not found.
 * For the sake of unique name this shouldn't be called for modifiers that have text.*/
ModifierList.removeByName = function (validState, pendingModifiersAndDv, validActivationInfoObj, powerSectionName, powerIndex, rowName)
{
   var rowIndex = ModifierList.findRowByName(pendingModifiersAndDv.state, rowName);
   if (undefined !== rowIndex)
   {
      pendingModifiersAndDv.state.remove(rowIndex);
      pendingModifiersAndDv = ModifierList.sanitizeStateAndGetDerivedValues(pendingModifiersAndDv.state, validState.effect,
         validActivationInfoObj, powerSectionName, powerIndex);
   }
   return pendingModifiersAndDv;
};
//endregion public static functions

//region private static functions
/**Counts totals etc. All values that are not user set or final are created by this method*/
ModifierList._calculateValues = function (validListState, derivedValuesList)
{
   var derivedValues = {
      autoModifierNameToRowIndex: {},  //needs to be JSON because it gets cloned in prod by updateActionModifiers etc
      rankTotal: 0,
      flatTotal: 0,
      rows: derivedValuesList
   };
   for (var i = 0; i < validListState.length; i++)
   {
      if (derivedValuesList[i].hasAutoTotal) derivedValues.autoModifierNameToRowIndex[validListState[i].name] = i;
      else if ('Rank' === derivedValuesList[i].modifierType) derivedValues.rankTotal += derivedValuesList[i].rawTotal;
      else derivedValues.flatTotal += derivedValuesList[i].rawTotal;  //could be flat or free. if free the total will be 0
   }
   return derivedValues;
};
/**The automatic modifiers come first. With action, range, duration, then others.
 * @returns {function} that can be passed into Array.prototype.sort*/
ModifierList._sortOrder = function (powerAction)
{
   var powerIsTriggered = ('Triggered' === powerAction);
   var aFirst = -1;
   var bFirst = 1;

   return function (a, b)
   {
      if ('Faster Action' === a.name || 'Slower Action' === a.name) return aFirst;
      if ('Faster Action' === b.name || 'Slower Action' === b.name) return bFirst;
      //Triggered requires Selective started between 2.0 and 2.5. Triggered isn't an action in 1.0. Triggered and Aura can't both exist
      if ('Aura' === a.name || ('Selective' === a.name && powerIsTriggered)) return aFirst;
      if ('Aura' === b.name || ('Selective' === b.name && powerIsTriggered)) return bFirst;

      if ('Increased Range' === a.name || 'Reduced Range' === a.name) return aFirst;
      if ('Increased Range' === b.name || 'Reduced Range' === b.name) return bFirst;

      if ('Increased Duration' === a.name || 'Decreased Duration' === a.name) return aFirst;
      if ('Increased Duration' === b.name || 'Decreased Duration' === b.name) return bFirst;

      //will need to force the sort to be stable since I can't rely on the key order
      return 0;
   };
};
//endregion private static functions

/*
architecture:
   * main (react) has all state or maybe each section does too
   * power list needs the state of mod in order to render power row total
   * power list uses power html: pass down everything as props, immutable non-react below here
   * mod list delegate to power list (really main) for state mutation
   * loading main is normal
ref: style={{whiteSpace: 'nowrap'}}
determine why I needed the return null in power list render
   TestSuite.main.update: had T
      Main.setRuleset(3, 15);
      clear
   TestSuite.main.updateTranscendence: god power but ad is cleared
      Main.powerSection.clear();
   TestSuite.powerRow.calculateValues: had 100 rank Damage (T5)
      Main.setRuleset(3,4);
      clear
   path: T, clear, prerender, Main.setPowerGodhood, render before setState
   therefore this is an issue with godhood circle
resolve godhood circle:
   right now power list prerender -> _notifyDependent -> Main.update()
   high CP needs to trigger godhood but prerender can't update state
   need static method to determine godhood
   all setState set both at once (thing changed and godhood)
   but then there's CP from others
   all need static calc values (main eventually has all state?)
   this also fixes possible circle for power/mod ARD
   main needs a static to calc T that takes all state

TODO: next:
test/sort all
   powerRow.js
   powerRowHtml.js
   ? sharedHtml.js
double check docs of all those
remove all tasks from generated ReactUtil (although not listed by print-todos-added-since due to .gitattributes -diff)

ad row immutable
ad list static
   will need same render return null
skill list react (immutable and static)
react abilities
react defenses
react main
   make offense new section
   render includes totals and every non-section thing
remove the return null in ad/power list render (and test all)
   notifyDependent would stop calling Main.update() because it wouldn't exist
move entire char creation into a folder (might need to be done after merging)
*/
