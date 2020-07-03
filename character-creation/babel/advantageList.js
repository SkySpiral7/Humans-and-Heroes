'use strict';

/**Updates:
 Main.updateInitiative();
 Main.updateOffense();
 Main.defenseSection.calculateValues();
 */
class AdvantageList extends React.Component
{
   constructor(props)
   {
      super(props);
      //state isn't allowed to be an array therefore everything is under the prop it
      //main is an external dependency
      this.state = {it: [], main: {godhood: false}};
      this._rowArray = [];  //state.it as custom objects
      this._derivedValues = {
         equipmentMaxTotal: 0,
         usingGodhoodAdvantages: false,
         total: 0,
         pettyRulesApply: true,
         rankMap: new MapDefault({}, 0)  //this has toJSON defined
      };
      this._blankKey = MainObject.generateKey();
      props.callback(this);
   }

   //region Single line function
   hasGodhoodAdvantages = () => {return this._derivedValues.usingGodhoodAdvantages;};
   hasSeizeInitiative = () => {return this._derivedValues.rankMap.containsKey('Seize Initiative');};
   /**Returns false if the advantage "Your Petty Rules Don't Apply to Me" exists and true otherwise*/
   isUsingPettyRules = () => {return this._derivedValues.pettyRulesApply;};
   //rankMap is converted to json. defensive copy required since always same object
   getDerivedValues = () => {return JSON.clone(this._derivedValues);};
   getEquipmentMaxTotal = () => {return this._derivedValues.equipmentMaxTotal;};
   /**the rank of the row with that unique name (if in map)*/
   getRankFromMap = (uniqueName) => {return this._derivedValues.rankMap.get(uniqueName);};
   getRankMap = () => {return this._derivedValues.rankMap;};
   getTotal = () => {return this._derivedValues.total;};
   getState = () => {return JSON.clone(this.state);};  //defensive copy is important to prevent tamper
   //endregion Single line function

   //region public functions
   /**Creates a new row at the end of the array*/
   addRow = (newName) =>
   {
      //if coming from blank row's onChange then grab the added name from UI
      if (undefined === newName) newName = SelectUtil.getTextById('advantageChoices' + this._blankKey);
      const advantageObject = this._addRowNoPush(newName);

      this._rowArray.push(advantageObject);
      if (this._hasDuplicate())  //requires duplicate to be in this.rowArray
      {
         this._rowArray.pop();
         this.forceUpdate();  //to undo the DOM value
      }
      else
      {
         this.setState((state) =>
         {
            state.it.push(advantageObject.getState());
            return state;
         });
      }

      if (false && this._hasDuplicate())
      {
         //TODO: is setState twice better than forceUpdate? is there a way to store a complex state using redux etc?
         this._rowArray.pop();
         this.setState((state) =>
         {
            state.it.pop();
            return state;
         });
      }
   };
   /**This calculates the required rank of the equipment advantage and adds or removes the advantage row accordingly*/
   calculateEquipmentRank = (equipTotal) =>
   {
      const equipmentIndex = 0;  //due to sorting it is always first
      const newEquipmentRank = Math.ceil(equipTotal / 5);
      this._derivedValues.equipmentMaxTotal = newEquipmentRank * 5;  //rounded up to nearest 5

      const equipAdvDoesExists = !this._rowArray.isEmpty() &&
         'Equipment' === this._rowArray[equipmentIndex].getName();
      const equipAdvShouldExist = 0 !== newEquipmentRank;

      if (equipAdvDoesExists && equipAdvShouldExist)
      {
         /*update the rank is the only thing to do
         if rank is already correct don't trigger an update
         this happens when equipment updates something that doesn't change the rank*/
         if (this._rowArray[equipmentIndex].getRank() === newEquipmentRank) return;

         this._rowArray[equipmentIndex].setRank(newEquipmentRank);
         this.setState((state) =>
         {
            state.it[equipmentIndex].rank = newEquipmentRank;
            return state;
         });
      }
      else if (equipAdvDoesExists && !equipAdvShouldExist)
      {
         this._removeRow(equipmentIndex);
      }
      else if (!equipAdvDoesExists && equipAdvShouldExist)
      {
         //doesn't use addRow because unshift instead of push and already did duplicate check
         const advantageObject = this._addRowNoPush('Equipment');

         //unshift = addFirst
         this._rowArray.unshift(advantageObject);
         advantageObject.setRank(newEquipmentRank);
         this.setState((state) =>
         {
            state.it.unshift(advantageObject.getState());
            return state;
         });
      }
      /*else if(!equipAdvDoesExists && !equipAdvShouldExist)
      equipment section was empty and an update was triggered but nothing changed
      so do nothing because there's nothing to do.
      power list clear does this for now (react should fix)*/
   };
   /**Removes all rows except equipment. Equipment needs to stay as long as equipment section has points.*/
   clear = () =>
   {
      const equipmentIndex = 0;  //due to sorting it is always first
      const equipAdvDoesExists = !this._rowArray.isEmpty() &&
         'Equipment' === this._rowArray[equipmentIndex].getName();
      if (equipAdvDoesExists)
      {
         //slice makes an array with only Equipment
         this._rowArray = this._rowArray.slice(equipmentIndex, 1);
         this.setState((state) =>
         {
            state.it = state.it.slice(equipmentIndex, 1);
            //doesn't change state.main
            return state;
         });
      }
      else
      {
         this._rowArray = [];
         this.setState((state) =>
         {
            state.it = [];
            //doesn't change state.main
            return state;
         });
      }
   };
   getIndexByKey = (rowId) =>
   {
      if (rowId === this._blankKey) throw new Error('Blank row (' + rowId + ') has no row index');
      //TODO: could speed up with a map<uuid, index> that reindexes on equipment add/remove and remove row
      for (let i = 0; i < this._rowArray.length; i++)
      {
         if (this._rowArray[i].getKey() === rowId) return i;
      }
      throw new Error('No row with id ' + rowId + ' (rowArray.length=' + this._rowArray.length + ')');
   };
   /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
   getRowByIndex = (rowIndex) => {return this._rowArray[rowIndex];};
   /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
   getRowByKey = (rowId) =>
   {
      return this._rowArray[this.getIndexByKey(rowId)];
   };
   /**This is only used by tests. Blank row is considered === arr.length to make it easier to hit DOM*/
   indexToKey = (rowIndex) =>
   {
      if (rowIndex === this._rowArray.length) return this._blankKey;
      return this._rowArray[rowIndex].getKey();
   };
   /**Sets data from a json object given then updates.*/
   load = (jsonSection) =>
   {
      //rowArray=[];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      //TODO: remove these throws since they are asserts until this class is re-tested
      if (this._rowArray.length > 1 || this.state.it.length > 1) throw new Error('Should\'ve cleared first');
      const newState = [];
      const duplicateCheck = [];
      /*keep the Equipment advantage if it exists
      if equipment section was loaded first then it would've created Equipment advantage so keep it
      if equipment section was loaded second then it will add/remove Equipment advantage next*/
      if (1 === this.state.it.length) newState.push(this._rowArray[0].getState());
      for (let i = 0; i < jsonSection.length; i++)
      {
         const nameToLoad = jsonSection[i].name;
         if (!Data.Advantage.names.contains(nameToLoad))
         {
            Main.messageUser('AdvantageList.load.notExist', 'Advantage #' + (i + 1) + ': ' + nameToLoad + ' is not an advantage name.');
            continue;
         }
         if (Data.Advantage[nameToLoad].isGodhood && !Main.canUseGodhood())
         {
            Main.messageUser('AdvantageList.load.godhood', 'Advantage #' + (i + 1) + ': ' + nameToLoad +
               ' is not allowed because transcendence is ' + Main.getTranscendence() + '.');
            continue;
         }
         if ('Equipment' === nameToLoad) continue;  //allowed but ignored since it's always regenerated
         //doesn't use addRow for sake of bulk state change
         const advantageObject = this._addRowNoPush(nameToLoad);

         //leave value as default if not in json. advantageObject will make sure the value is valid
         if (undefined !== jsonSection[i].rank) advantageObject.setRank(jsonSection[i].rank);
         if (undefined !== jsonSection[i].text) advantageObject.setText(jsonSection[i].text);

         //duplicateCheck after setting all values for the sake of getUniqueName
         if (duplicateCheck.contains(advantageObject.getUniqueName()))
         {
            Main.messageUser('AdvantageList.load.duplicate', 'Advantage #' + (i + 1) + ': ' + nameToLoad +
               ' is not allowed because the advantage already exists. Increase the rank instead or use different text.');
            continue;
         }
         this._rowArray.push(advantageObject);
         duplicateCheck.push(advantageObject.getUniqueName());
         newState.push(advantageObject.getState());
      }
      this.setState((state) =>
      {
         state.it = newState;
         return state;
      });
   };
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
   setMainState = (value) =>
   {
      this.setState((state) =>
      {
         state.main.godhood = value;
         return state;
      });
   };
   /**Unused until safe or deleted*/
   updateByKey = (updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new Error('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const newStateRow = this._rowArray[updatedIndex].getState();
      this.setState((state) =>
      {
         //TODO: race conditions? merge issues? can this replace the others?
         state.it[updatedIndex] = newStateRow;
         return state;
      });
   };
   updateNameByKey = (updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new Error('Can\'t update name of blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const newName = this._rowArray[updatedIndex].getName();

      if (undefined === newName || this._hasDuplicate())
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         this.setState((state) =>
         {
            state.it[updatedIndex].name = newName;
            return state;
         });
      }
   };
   updateRankByKey = (updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new Error('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const newRank = this._rowArray[updatedIndex].getRank();
      this.setState((state) =>
      {
         state.it[updatedIndex].rank = newRank;
         return state;
      });
   };
   updateTextByKey = (updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new Error('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const newText = this._rowArray[updatedIndex].getText();
      if (this._hasDuplicate())
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         this.setState((state) =>
         {
            state.it[updatedIndex].text = newText;
            return state;
         });
      }
   };
   //endregion public functions

   //region private functions
   /**Converts blank row into AdvantageObject but doesn't update rowArray or state*/
   _addRowNoPush = (newName) =>
   {
      //the row that was blank no longer is so use the blank key
      const advantageObject = new AdvantageObject(this._blankKey);
      advantageObject.setAdvantage(newName);
      //need a new key for the new blank row
      this._blankKey = MainObject.generateKey();
      return advantageObject;
   };
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   _calculateValues = () =>
   {
      this._derivedValues.rankMap.clear();
      this._derivedValues.usingGodhoodAdvantages = false;
      this._derivedValues.pettyRulesApply = true;
      this._derivedValues.total = 0;  //reset all these then recount them

      for (let i = 0; i < this._rowArray.length; i++)
      {
         const advantageName = this._rowArray[i].getName();
         if (Data.Advantage[advantageName].isGodhood) this._derivedValues.usingGodhoodAdvantages = true;
         //do not connected with else since Petty Rules are godhood
         //petty rules needs to be tracked because it changes minimum possible power level
         if ('Your Petty Rules Don\'t Apply to Me' === advantageName) this._derivedValues.pettyRulesApply = false;
         if (Data.Advantage.mapThese.contains(advantageName))
         {
            //add instead of set these since map was empty and there are no redundant rows (using unique name)
            this._derivedValues.rankMap.add(this._rowArray[i].getUniqueName(), this._rowArray[i].getRank());
         }
         this._derivedValues.total += this._rowArray[i].getTotal();
      }
   };
   /**@returns true if 2+ rows in rowArray have the same UniqueName*/
   _hasDuplicate = () =>
   {
      //TODO: would make more sense to take an arg of unique name before adding to state. or keep a running set of names
      return this._rowArray.map(item => item.getUniqueName())
      .some((val, id, array) =>
      {
         return array.indexOf(val) !== id;
      });
   };
   /**Updates other sections which depend on advantage section*/
   _notifyDependent = () =>
   {
      if (typeof(Main) !== 'undefined')  //happens during main's creation
      {
         Main.updateInitiative();  //Improved/Seize Initiative
         Main.updateOffense();  //some 1.0 advantages affect this so it needs to be updated
         Main.defenseSection.calculateValues();  //Defensive Roll
         Main.update();  //updates totals and power level
      }
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   _removeRow = (rowIndex) =>
   {
      this._rowArray.remove(rowIndex);
      this.setState((state) =>
      {
         state.it.remove(rowIndex);
         return state;
      });
   };
   //only called by react. so it's kinda private because no one else should call it
   render = () =>
   {
      this._calculateValues();
      this._notifyDependent();
      const generateGodHood = (this._derivedValues.usingGodhoodAdvantages || this.state.main.godhood);
      //must check both since state (although queued) may not be updated yet

      const elementArray = this._rowArray.map((advantageObject) =>
      {
         return (<AdvantageRowHtml key={advantageObject.getKey()} keyCopy={advantageObject.getKey()}
                                   state={advantageObject.getState()} derivedValues={advantageObject.getDerivedValues()}
                                   generateGodHood={generateGodHood} />);
      });
      elementArray.push(<AdvantageRowHtml key={this._blankKey} keyCopy={this._blankKey} state={{}} generateGodHood={generateGodHood} />);
      return elementArray;
   };
   //endregion private functions
}

//next items: fix/test godhood, add map

function createAdvantageList(callback)
{
   ReactDOM.render(
      <AdvantageList callback={callback} />,
      document.getElementById('advantage-section')
   );
}
