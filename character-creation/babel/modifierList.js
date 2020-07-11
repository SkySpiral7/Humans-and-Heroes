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

   //region basic getter
   /**This total will be the sum of all flat modifiers*/
   getFlatTotal = () => {return this._derivedValues.flatTotal;};  //TODO: make sure these are not called before they are defined
   /**This total will be the sum of all rank modifiers*/
   getRankTotal = () => {return this._derivedValues.rankTotal;};
   getPower = () => {return this.props.powerRowParent;};
   //endregion basic getter

   //TODO: sort this section
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
      if (this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect') !== undefined)
      //TODO: is AutoRank state?
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
      //this._sanitizeRows();
      //TODO: fix sort/indexing
      //this._rowArray.sort(this._sortOrder);
      //this._reindex();
      this._derivedValues.autoModifierNameToRowIndex.clear();
      this._derivedValues.rankTotal = 0;
      this._derivedValues.flatTotal = 0;
      for (let i = 0; i < this._rowArray.length; i++)
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
         rowIndex = this._rowArray.length;  //becomes the last row if doesn't exist yet
         this.addRow(rowName);
      }
      this._rowArray[rowIndex].setRank(rowRank);
      this.setState(state =>
      {
         state.it[rowIndex].rank = rowRank;
         return state;
      });
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
   /**Sets data from a json object given then updates. The row array is not cleared by this function*/
   load = (jsonSection) =>
   {
      if (this.props.powerRowParent.isBlank()) return;
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      const newState = [];
      const duplicateCheck = [];
      for (let i = 0; i < jsonSection.length; i++)
      {
         const nameToLoad = jsonSection[i].name;
         const loadLocation = (this.props.sectionName.toTitleCase() + ' #' + (this.state.sectionRowIndex + 1) + ' Modifier #' + (i + 1));
         if (!Data.Modifier.names.contains(nameToLoad))
         {
            Main.messageUser(
               'ModifierList.load.notExist', loadLocation + ': ' +
               nameToLoad + ' is not a modifier name. Did you mean "Other" with text?');
            continue;
         }
         const modifierObject = this._addRowNoPush(nameToLoad);
         if (undefined !== jsonSection[i].applications) modifierObject.setRank(jsonSection[i].applications);
         if (undefined !== jsonSection[i].text) modifierObject.setText(jsonSection[i].text);

         //duplicateCheck after setting all values for the sake of getUniqueName
         if (duplicateCheck.contains(modifierObject.getUniqueName()))
         {
            Main.messageUser('ModifierList.load.duplicate', loadLocation + ': ' + nameToLoad +
               ' is not allowed because the modifier already exists. Increase the rank instead or use different text.');
            continue;
         }
         this._rowArray.push(modifierObject);
         duplicateCheck.push(modifierObject.getUniqueName());
         newState.push(modifierObject.getState());
      }
      this._prerender();
      this.setState(state =>
      {
         state.it = newState;
         return state;
      });
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
      for (let i = 0; i < this._rowArray.length; i++)
      {this._rowArray[i].setPowerRowIndex(sectionRowIndexGiven);}
      //correct all indexing
      this.setState(state =>
      {
         state.sectionRowIndex = sectionRowIndexGiven;
         for (let i = 0; i < state.it.length; i++)
         {state.it[i].powerRowIndex = sectionRowIndexGiven;}
         return state;
      });
   };
   updateNameByRow = (newName, modifierRow) =>
   {
      if (undefined === modifierRow)
      {
         this.addRow(newName);
         return;
      }

      const updatedIndex = this.getIndexByKey(modifierRow.getKey());

      if (!Data.Modifier.names.contains(newName) || this._hasDuplicate())
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         modifierRow.setModifier(newName);
         this._prerender();
         this.setState(state =>
         {
            state.it[updatedIndex].name = newName;
            return state;
         });
      }
   };
   updateRankByKey = (newRank, updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      this._rowArray[updatedIndex].setRank(newRank);
      this._prerender();
      this.setState(state =>
      {
         state.it[updatedIndex].rank = newRank;
         return state;
      });
   };
   updateTextByKey = (newText, updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      this._rowArray[updatedIndex].setText(newText);

      if (this._hasDuplicate())
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         this._prerender();
         this.setState(state =>
         {
            state.it[updatedIndex].text = newText;
            return state;
         });
      }
   };
   //endregion public functions

   //region 'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/
   addRow = (newName) =>
   {
      const modifierObject = this._addRowNoPush(newName);
      this._rowArray.push(modifierObject);
      this._prerender();
      this.setState(state =>
      {
         state.it.push(modifierObject.getState());
         return state;
      });
   };
   _addRowNoPush = (newName) =>
   {
      //the row that was blank no longer is so use the blank key
      const modifierObject = new ModifierObject({
         key: this._blankKey,
         powerRowParent: this.props.powerRowParent,
         modifierListParent: this,
         initialPowerRowIndex: this.state.sectionRowIndex,
         sectionName: this.props.sectionName
      });
      modifierObject.setModifier(newName);
      //need a new key for the new blank row
      this._blankKey = MainObject.generateKey();
      return modifierObject;
   };
   /**@returns true if 2+ rows in rowArray have the same UniqueName*/
   _hasDuplicate = () =>
   {
      //can't change this to take an arg because update name/text will already be in state
      return this._rowArray.map(item => item.getUniqueName())
      .some((val, id, array) =>
      {
         return array.indexOf(val) !== id;
      });
   };
   /**Call this after updating rowArray but before setState*/
   _prerender = () =>
   {
      //don't update any state in render
      this.calculateValues();
      this.props.powerRowParent.getSection()
      .update();
   };
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
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   _sanitizeRows = () =>
   {
      const namesSoFar = [];
      let canHaveAttack = true;
      if (this.props.powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack = false;  //feature has a default range of Personal
      for (let i = 0; i < this._rowArray.length; i++)
      {
         if (this._rowArray[i].isBlank() && i < this._rowArray.length)
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
   /**Removes the row from the array and updates the index of all others in the list.*/
   _removeRow = (rowIndexToRemove) =>
   {
      this._rowArray.remove(rowIndexToRemove);
      this.setState(state =>
      {
         state.it.remove(rowIndexToRemove);
         return state;
      });
   };
   //endregion 'private' functions section. Although all public none of these should be called from outside of this object
}

function createModifierList(callback, powerRowParent, sectionName, sectionRowIndex)
{
   ReactDOM.render(
      <ModifierList callback={callback} powerRowParent={powerRowParent} sectionName={sectionName} sectionRowIndex={sectionRowIndex} />,
      //TODO: if sectionRowIndex updates the whole thing will die. vanishes on generate so can't be used at all
      document.getElementById(sectionName + 'ModifierSection' + sectionRowIndex)
   );
}

/*next:
how to keep mod list: maybe pow row saves element
convert mod list
   replace sanitizeRows with duplicate check
   sort on add?
   test all
convert power row
convert power list
*/
