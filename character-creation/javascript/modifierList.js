'use strict';

function ModifierList(props)
{
   var state, derivedValues, rowArray;

   //region basic getter
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
      //TODO: move blank check (doesn't work here)
      if (key === this._blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');
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
   /**@returns {boolean} true if any modifier in the list doesHaveAutoTotal*/
   this.hasAutoTotal = function ()
   {
      for (var i = 0; i < rowArray.length; i++)
      {if (rowArray[i].doesHaveAutoTotal()) return true;}
      return false;
   };
   //endregion public functions

   //region 'private' functions section. Although all public none of these should be called from outside of this object
   /**props: callback, powerRowParent, sectionName, state*/
   this._constructor = function ()
   {
      state = props.state;
      for (var modIndex = 0; modIndex < rowArray.length; modIndex++)
      {
         rowArray.push(new ModifierObject({
            //TODO: need to pass the actual keys down (link html to mod row)
            //don't need keyCopy because mod row isn't react
            key: MainObject.generateKey(),
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
   //the row array isn't cleared in case some have been auto set
   //Main.clear() is called at the start of Main.load()
   var validListState = [];
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

/*TODO: next:
figure out architecture:
   * in the end main has all state
   * power list (really main) needs the state of mod in order to render power row total
   * power list (react) uses power html: pass down everything as props, immutable non-react below here
   * mod list delegate to power list (really main) for state mutation
   * when loading main sends doc to section to validate/message and return valid state
timing is wrong: power row needs to mod list to exist in order to calc power total
   create them in power list render
   power row total is derived in constructor
long run: everything is either react or immutable
   main (react) has all state
   what about power list state?
add save to state conversion
pull power row state up to list
nail down power row
hook up power html
   onChange
hook up more for mod/power
   setState
   replace sanitizeRows with duplicate check
   sort mods on add
test all
there's lots of tasks
*/
