'use strict';

class ModifierList extends React.Component
{
   /**props: callback, powerRowParent, sectionName, state*/
   constructor(props)
   {
      super(props);
      //state as custom objects
      this._rowArray = this.props.state.map(state =>
      {
         new ModifierObject({
            key: this._blankKey,
            powerRowParent: this.props.powerRowParent,
            modifierListParent: this,
            sectionName: this.props.sectionName,
            state: state
         })
      });
      this._derivedValues = {
         autoModifierNameSet: [],
         rankTotal: 0,
         flatTotal: 0
      };
      this._blankKey = MainObject.generateKey();
      props.callback(this);

      this.calculateValues();
   }

   //region basic getter
   /**This total will be the sum of all flat modifiers*/
   getFlatTotal = () => {return this._derivedValues.flatTotal;};  //TODO: make sure these are not called before they are defined
   /**This total will be the sum of all rank modifiers*/
   getRankTotal = () => {return this._derivedValues.rankTotal;};
   getPower = () => {return this.props.powerRowParent;};
   getState = () => {return JSON.clone(this.props.state);};  //defensive copy is important to prevent tamper
   //endregion basic getter

   //TODO: sort this section
   getIndexByKey = (key) =>
   {
      if (key === this._blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');
      for (let i = 0; i < this._rowArray.length; i++)
      {
         if (this._rowArray[i].getKey() === key) return i;
      }
      throw new AssertionError('No row with id ' + key + ' (rowArray.length=' + this._rowArray.length + ')');
   };
   /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
   getRowByIndex = (rowIndex) => {return this._rowArray[rowIndex];};
   /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
   getRowByKey = (key) => {return this._rowArray[this.getIndexByKey(key)];};
   /**Returns an array of json objects for this section's data*/
   save = () =>
   {
      const json = [];
      for (let i = 0; i < this._rowArray.length; i++)
      {
         json.push(this._rowArray[i].save());
      }
      return json;  //might still be empty
   };

   //region public functions
   /**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
   calculateGrandTotal = (powerRowRawTotal) =>
   {
      //Alternate Effect in ruleset 1.0 forced the power to be worth a total of 1 (or 2 for Dynamic). the flaw cost is all but 1
      //technically 1.0 Alternate Effect was an extra to spent 1 point on a whole other sub-power
      if (this._derivedValues.autoModifierNameSet.contains('Dynamic Alternate Effect'))
      {
         //only exists in ruleset 1.0
         powerRowRawTotal = 2;  //cost ignores current total
      }
      else if (this._derivedValues.autoModifierNameSet.contains('Alternate Effect'))
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
      if (this._derivedValues.autoModifierNameSet.contains('Easily Removable'))
      {
         powerRowRawTotal += -Math.floor(powerRowRawTotal * 2 / 5);
      }
      else if (this._derivedValues.autoModifierNameSet.contains('Removable'))
      {
         powerRowRawTotal += -Math.floor(powerRowRawTotal / 5);
      }

      return powerRowRawTotal;
   };
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   calculateValues = () =>
   {
      //this._sanitizeRows();
      //TODO: fix sort/indexing
      //this._rowArray.sort(this._sortOrder);
      //this._reindex();
      this._derivedValues.autoModifierNameSet = [];
      this._derivedValues.rankTotal = 0;
      this._derivedValues.flatTotal = 0;
      for (let i = 0; i < this._rowArray.length; i++)
      {
         if (Data.Modifier[this._rowArray[i].getName()].hasAutoTotal) this._derivedValues.autoModifierNameSet.push(
            this._rowArray[i].getName());
         if (this._rowArray[i].isRank()) this._derivedValues.rankTotal += this._rowArray[i].getRawTotal();
         else this._derivedValues.flatTotal += this._rowArray[i].getRawTotal();  //could be flat or free. if free the total will be 0
      }
   };
   /**This will search each row for the name given and return the row's array index or undefined if not found.
    Note that this should only be called with modifiers that don't have text.*/
   findRowByName = (rowName) =>
   {
      for (let i = 0; i < this._rowArray.length; i++)
      {if (this._rowArray[i].getName() === rowName) return i;}  //found it
      //else return undefined
   };
   /**Return the unique name of the section. In this case it returns a sorted array of modifier unique names*/
   getUniqueName = () =>
   {
      const nameArray = [];
      for (let i = 0; i < this._rowArray.length; i++)
      {nameArray.push(this._rowArray[i].getUniqueName(true));}
      nameArray.sort();  //must be sorted because order doesn't matter when considering uniqueness
      //note that the rows are not sorted only this name array
      //the sort order is by ascii but that doesn't matter as long as the same sort is used each time
      return nameArray;
   };
   /**@returns {boolean} true if any modifier in the list doesHaveAutoTotal*/
   hasAutoTotal = () =>
   {
      for (let i = 0; i < this._rowArray.length; i++)
      {if (this._rowArray[i].doesHaveAutoTotal()) return true;}
      return false;
   };
   /**@returns {boolean} true if there exists a modifier that changes range from being Personal*/
   isNonPersonalModifierPresent = () =>
   {
      for (let i = 0; i < this._rowArray.length; ++i)
      {
         if ('Attack' === this._rowArray[i].getName() ||
            'Affects Others Also' === this._rowArray[i].getName() ||
            'Affects Others Only' === this._rowArray[i].getName())
            return true;
      }
      return false;
   };
   //endregion public functions

   //region 'private' functions section. Although all public none of these should be called from outside of this object
   //only called by react. so it's kinda private because no one else should call it
   render = () =>
   {
      const elementArray = this._rowArray.map(modifierObject =>
      {
         return (<ModifierRowHtml key={modifierObject.getKey()} keyCopy={modifierObject.getKey()} powerRow={this.props.powerRowParent}
                                  modifierRow={modifierObject} />);
      });
      //derivedValues is undefined and unused for blank
      elementArray.push(<ModifierRowHtml key={this._blankKey} keyCopy={this._blankKey} powerRow={this.props.powerRowParent}
                                         modifierRow={undefined} />);
      return elementArray;
   };
   //endregion 'private' functions section. Although all public none of these should be called from outside of this object
}

/*TODO: next:
figure out architecture:
   * in the end main has all state
   * power row (really main) needs the state of mod in order to re-render power total
   * power row (react) uses power html: pass down everything as props, use callback prop to save a reference to mod list
   * mod list delegate to power row (really main) for state mutation
   * mod list make an immutable mod row list from props
convert power list (can't test alone?)
hook up power html
   onChange
hook up more for mod/power
   setState
   replace sanitizeRows with duplicate check
   sort mods on add
test all
there's lots of tasks
*/
