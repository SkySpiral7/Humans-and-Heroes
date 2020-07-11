'use strict';

class ModifierList extends React.Component
{
   /**props: callback, powerRowParent, sectionName, sectionRowIndex*/
   constructor(props)
   {
      super(props);
      //state isn't allowed to be an array therefore everything is under the prop it
      this.state = {it: [], sectionRowIndex: props.sectionRowIndex};
      this._rowArray = [];  //state.it as custom objects
      this._derivedValues = {
         //this could be just {} but I don't want this to be the only non-JSON place using objects as a map
         autoModifierNameToRowIndex: new MapDefault({}, undefined),
         rankTotal: 0,
         flatTotal: 0
      };
      this._blankKey = MainObject.generateKey();
      props.callback(this);
   }

   //region Single line function
   /**This total will be the sum of all flat modifiers*/
   getFlatTotal = () => {return this._derivedValues.flatTotal;};  //TODO: make sure these are not called before they are defined
   /**This total will be the sum of all rank modifiers*/
   getRankTotal = () => {return this._derivedValues.rankTotal;};
   getPower = () => {return this.props.powerRowParent;};
   //endregion Single line function

   //region public common
   /**Removes all rows then updates*/
   clear = () =>
   {
      this._rowArray = [];
      this._prerender();
      this.setState(state =>
      {
         state.it = [];
         //doesn't change state.sectionRowIndex
         return state;
      });
   };
   /**Returns the row object or nothing if the index is out of range. Used in order to call each onChange*/
   getRow = (rowIndex) => {return this._rowArray[rowIndex];};
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
   //endregion public common

   //region public functions
   /**Takes raw total of the power row, sets the auto ranks, and returns the power row grand total.*/
   calculateGrandTotal = (powerRowRawTotal) =>
   {
      if (this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect') !== undefined)
         powerRowRawTotal = this._rowArray[this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect')].setAutoRank(
            powerRowRawTotal);
      else if (this._derivedValues.autoModifierNameToRowIndex.get('Alternate Effect') !== undefined)
         powerRowRawTotal = this._rowArray[this._derivedValues.autoModifierNameToRowIndex.get('Alternate Effect')].setAutoRank(
            powerRowRawTotal);

      //removable is applied secondly after alt effect
      if (this._derivedValues.autoModifierNameToRowIndex.get('Easily Removable') !== undefined)
         powerRowRawTotal = this._rowArray[this._derivedValues.autoModifierNameToRowIndex.get('Easily Removable')].setAutoRank(
            powerRowRawTotal);
      else if (this._derivedValues.autoModifierNameToRowIndex.get('Removable') !== undefined)
         powerRowRawTotal = this._rowArray[this._derivedValues.autoModifierNameToRowIndex.get('Removable')].setAutoRank(powerRowRawTotal);

      return powerRowRawTotal;
   };
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   calculateValues = () =>
   {
      this._sanitizeRows();
      this._rowArray.sort(this._sortOrder);
      this._reindex();
      this._derivedValues.autoModifierNameToRowIndex.clear();
      this._derivedValues.rankTotal = 0;
      this._derivedValues.flatTotal = 0;
      for (let i = 0; i < this._rowArray.length - 1; i++)  //the last row is always blank
      {
         if (Data.Modifier[this._rowArray[i].getName()].hasAutoTotal) this._derivedValues.autoModifierNameToRowIndex.add(
            this._rowArray[i].getName(), i);
         if (this._rowArray[i].isRank()) this._derivedValues.rankTotal += this._rowArray[i].getRawTotal();
         else this._derivedValues.flatTotal += this._rowArray[i].getRawTotal();  //could be flat or free. if free the total will be 0
      }
   };
   /**This will set a row (by name) to the rank given. If the row doesn't exist it will be created*/
   createByNameRank = (rowName, rowRank) =>
   {
      let rowIndex = this.findRowByName(rowName);
      if (rowIndex === undefined)
      {
         rowIndex = this._rowArray.length - 1;  //becomes the last row if doesn't exist yet
         this._rowArray[rowIndex].setModifier(rowName);  //set the last row (which is blank) to become the new modifier
         this._addRow();
         //add a new blank row so that this method can be called twice in a row
      }
      this._rowArray[rowIndex].setRank(rowRank);
   };
   /**This will search each row for the name given and return the row's array index or undefined if not found.
    Note that this should only be called with modifiers that don't have text.*/
   findRowByName = (rowName) =>
   {
      for (let i = 0; i < this._rowArray.length; i++)  //no -1 because the last row isn't blank while it is being created
      {if (this._rowArray[i].getName() === rowName) return i;}  //found it
      //else return undefined
   };
   /**This returns the page's html (for the section) as a string. called by power row object only*/
   generate = () =>
   {
      let allModifierRows = '';
      for (let i = 0; i < this._rowArray.length; i++)  //last row is always blank but needs to be generated
      {allModifierRows += this._rowArray[i].generate();}
      return allModifierRows;
   };
   /**Return the unique name of the section. In this case it returns a sorted array of modifier unique names*/
   getUniqueName = () =>
   {
      const nameArray = [];
      for (let i = 0; i < this._rowArray.length - 1; i++)
      {nameArray.push(this._rowArray[i].getUniqueName(true));}
      nameArray.sort();  //must be sorted because order doesn't matter when considering uniqueness
      //note that the rows are not sorted only this name array
      //the sort order is by ascii but that doesn't matter as long as the same sort is used each time
      return nameArray;
   };
   /**@returns {boolean} true if any modifier in the list doesHaveAutoTotal*/
   hasAutoTotal = () =>
   {
      for (let i = 0; i < this._rowArray.length - 1; i++)
      {if (this._rowArray[i].doesHaveAutoTotal()) return true;}
      return false;
   };
   /**@returns {boolean} true if there exists a modifier that changes range from being Personal*/
   isNonPersonalModifierPresent = () =>
   {
      for (let i = 0; i < this._rowArray.length; ++i)  //no -1 because the last row isn't blank while it is being created
      {
         if ('Attack' === this._rowArray[i].getName() ||
            'Affects Others Also' === this._rowArray[i].getName() ||
            'Affects Others Only' === this._rowArray[i].getName())
            return true;
      }
      return false;
   };
   /**Sets data from a json object given then updates. The row array is not cleared by this function*/
   load = (jsonSection) =>
   {
      if (this.props.powerRowParent.isBlank()) return;
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      for (let i = 0; i < jsonSection.length; i++)
      {
         const newName = jsonSection[i].name;
         if (!Data.Modifier.names.contains(newName))
         {
            Main.messageUser(
               'ModifierList.load.notExist', this.props.sectionName.toTitleCase() + ' #' + (this.state.sectionRowIndex + 1) + ' Modifier #' + (i + 1) + ': ' +
               newName + ' is not a modifier name. Did you mean "Other" with text?');
            continue;
         }
         this._rowArray.last()
         .setModifier(newName);
         if (undefined !== jsonSection[i].applications) this._rowArray.last()
         .setRank(jsonSection[i].applications);
         if (undefined !== jsonSection[i].text) this._rowArray.last()
         .setText(jsonSection[i].text);
         this._addRow();
      }
      //doesn't call update. Power must do that
   };
   /**This will remove a row of the given name. Note that this should only be called with modifiers that don't have text.*/
   removeByName = (rowName) =>
   {
      const rowIndex = this.findRowByName(rowName);
      if (rowIndex !== undefined) this._removeRow(rowIndex);
   };
   /**Needs to be updated for document reasons. This will update all dependent indexing*/
   setSectionRowIndex = (sectionRowIndexGiven) =>
   {
      this.setState(state =>
      {
         state.sectionRowIndex = sectionRowIndexGiven;
         return state;
      });
      for (let i = 0; i < this._rowArray.length; i++)  //even blank row
      {this._rowArray[i].setPowerRowIndex(this.state.sectionRowIndex);}  //correct all indexing. ModifierRowIndex is still correct
   };
   /**Does each step for an onChange*/
   update = () =>
   {
      this.calculateValues();  //TODO: test
      this.props.powerRowParent.getSection()
      .update();
   };
   //endregion public functions

   //region 'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/
   _addRow = () =>
   {
      this._rowArray.push(new ModifierObject({
         powerRowParent: this.props.powerRowParent,
         modifierListParent: this,
         initialPowerRowIndex: this.state.sectionRowIndex,
         initialModifierRowIndex: this._rowArray.length,
         sectionName: this.props.sectionName
      }));
   };
   /**Call this after updating rowArray but before setState*/
   _prerender = () =>
   {
      //don't update any state in render
      this.calculateValues();
   };
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   _sanitizeRows = () =>
   {
      const namesSoFar = [];
      let canHaveAttack = true;
      if (this.props.powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack = false;  //feature has a default range of Personal
      for (let i = 0; i < this._rowArray.length; i++)  //last row might not be blank
      {
         if (this._rowArray[i].isBlank() && i < this._rowArray.length - 1)
         {
            this._removeRow(i);
            i--;
            continue;
         }  //remove blank row that isn't last
         else if (this._rowArray[i].isBlank()) continue;  //do nothing if last row is blank

         if (this.props.powerRowParent.getSection() === Main.equipmentSection &&
            (this._rowArray[i].getName() === 'Removable' || this._rowArray[i].getName() === 'Easily Removable'))
         {
            this._removeRow(i);
            i--;
            continue;
         }
         //equipment has removable built in and can't have the modifiers

         const modifierName = this._rowArray[i].getUniqueName(false);
         if (namesSoFar.contains(modifierName))
         {
            this._removeRow(i);
            i--;
            continue;
         }  //redundant modifier
         if (modifierName === 'Attack' || modifierName === 'Affects Others')  //Affects Others Also and Affects Others Only return same name
         {
            if (!canHaveAttack)
            {
               this._removeRow(i);
               i--;
               continue;
            }  //redundant or invalid modifier
            canHaveAttack = false;
         }
         namesSoFar.push(modifierName);
      }
      if (this._rowArray.isEmpty() || !this._rowArray.last()
         .isBlank())
         this._addRow();  //if last row isn't blank add one
   };
   /**Pass into Array.prototype.sort so that the automatic modifiers come first. With action, range, duration, then others.*/
   _sortOrder = (a, b) =>
   {
      const aFirst = -1;
      const bFirst = 1;

      if ('Faster Action' === a.getName() || 'Slower Action' === a.getName()) return aFirst;
      if ('Faster Action' === b.getName() || 'Slower Action' === b.getName()) return bFirst;
      //Triggered requires Selective started between 2.0 and 2.5. Triggered isn't an action in 1.0. Triggered and Aura can't both exist
      if ('Aura' === a.getName() || ('Selective' === a.getName() && 'Triggered' === this.props.powerRowParent.getAction())) return aFirst;
      if ('Aura' === b.getName() || ('Selective' === b.getName() && 'Triggered' === this.props.powerRowParent.getAction())) return bFirst;

      if ('Increased Range' === a.getName() || 'Reduced Range' === a.getName()) return aFirst;
      if ('Increased Range' === b.getName() || 'Reduced Range' === b.getName()) return bFirst;

      if ('Increased Duration' === a.getName() || 'Decreased Duration' === a.getName()) return aFirst;
      if ('Increased Duration' === b.getName() || 'Decreased Duration' === b.getName()) return bFirst;

      //else maintain the current order
      //using rowIndex to force sort to be stable (since it might not be)
      if (a.getModifierRowIndex() < b.getModifierRowIndex()) return aFirst;
      return bFirst;
   };
   /**This is only for testing. Calling it otherwise will throw. This simply re-sorts with an unstable algorithm.*/
   _testSortStability = () => {unstableSort(this._rowArray, this._sortOrder);};  //throws if unstableSort doesn't exist
   /**This will re-index all modifier rows. PowerRowIndex is not affected.*/
   _reindex = () =>
   {
      for (let i = 0; i < this._rowArray.length; i++)  //even blank row
      {this._rowArray[i].setModifierRowIndex(i);}  //correct all indexing. PowerRowIndex is still correct
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   _removeRow = (rowIndexToRemove) =>
   {
      this._rowArray.remove(rowIndexToRemove);
      this._reindex();
   };
   //endregion 'private' functions section. Although all public none of these should be called from outside of this object
}

function createModifierList(callback, powerRowParent, sectionName, sectionRowIndex)
{
   ReactDOM.render(
      <ModifierList callback={callback} powerRowParent={powerRowParent} sectionName={sectionName} sectionRowIndex={sectionRowIndex} />,
      //TODO: if sectionRowIndex updates the whole thing will die
      //also won't currently render because it needs the div from generate
      document.getElementById(sectionName + 'ModifierSection' + sectionRowIndex)
   );
}

/*next:
convert mod list
   row array +1
   html?
   replace sanitizeRows with duplicate check
   sort on add?
   test all
convert power row
convert power list
*/
