'use strict';

/**Updates:
 Main.updateInitiative();
 Main.updateOffense();
 Main.defenseSection.calculateValues();
 */
class AdvantageList extends React.Component
{
   //TODO: upgrade to babel 7 to get real private by using # (although IDE doesn't support it?)
   state;

   constructor(props)
   {
      super(props);
      //state isn't allowed to be an array therefore everything is under the prop it
      //main is an external dependency
      this.state = {it: [], main: {godhood: false}};
      //TODO: move all this junk into derivedValues
      this.equipmentMaxTotal = 0;
      this.usingGodhoodAdvantages = false;
      this.total = 0;
      this.pettyRulesApply = true;
      this.rankMap = new MapDefault({}, 0);
      this.rowArray = [];
      props.callback(this);
      this.blankKey = MainObject.generateKey();
   }

   //region Single line function
   hasGodhoodAdvantages = () => {return this.usingGodhoodAdvantages;};  //TODO: is this redundant with main?
   /**Returns false if the advantage "Your Petty Rules Don't Apply to Me" exists and true otherwise*/
   isUsingPettyRules = () => {return this.pettyRulesApply;};
   getEquipmentMaxTotal = () => {return this.equipmentMaxTotal;};
   getRankMap = () => {return this.rankMap;};
   getTotal = () => {return this.total;};
   getState = () => {return JSON.clone(this.state);};  //defensive copy is important to prevent tamper
   //endregion Single line function

   //region public functions
   /**Creates a new row at the end of the array*/
   addRow = (newName) =>
   {
      if (undefined === newName) newName = SelectUtil.getTextById('advantageChoices' + this.blankKey);
      const advantageObject = this._addRowNoPush(newName);

      this.rowArray.push(advantageObject);
      if (this._isDuplicate())  //requires duplicate to be in this.rowArray
      {
         this.rowArray.pop();
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

      if (false && this._isDuplicate())
      {
         //TODO: is setState twice better than forceUpdate? is there a way to store a complex state using redux etc?
         this.rowArray.pop();
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
      this.equipmentMaxTotal = newEquipmentRank * 5;  //rounded up to nearest 5

      //TODO: retest things like this
      if (this.rowArray.isEmpty() ||
         'Equipment' !== this.rowArray[equipmentIndex].getName())  //if there is no equipment advantage
      {
         if (0 === equipTotal) return;  //I don't need to add a row

         //doesn't use addRow because unshift instead of push and already did duplicate check
         const advantageObject = this._addRowNoPush('Equipment');

         //unshift = addFirst
         this.rowArray.unshift(advantageObject);
         this.setState((state) =>
         {
            state.it.unshift(advantageObject.getState());
            return state;
         });
      }
      else if (0 === equipTotal)  //don't need the row any more
      {
         this._removeRow(equipmentIndex);
         return;
      }

      //don't connect with else since this happens when adding or updating
      this.rowArray[equipmentIndex].setRank(newEquipmentRank);
      this.setState((state) =>
      {
         state.it[equipmentIndex].rank = newEquipmentRank;
         return state;
      });
   };
   /**Removes all rows then updates*/
   clear = () =>
   {
      this.rowArray = [];
      this.setState(() =>
      {
         return {it: []};
      });
   };
   getIndexById = (rowId) =>
   {
      if (rowId === this.blankKey)
      {
         //TODO: remove these throws since they are asserts until this class is re-tested
         throw new Error('Can\'t get blank row ' + rowId);
      }
      //TODO: could speed up with a map<uuid, index> that reindexes on equipment and remove
      for (let i = 0; i < this.rowArray.length; i++)
      {
         if (this.rowArray[i].getKey() === rowId) return i;
      }
      throw new Error('No row with id ' + rowId + ' (rowArray.length=' + this.rowArray.length + ')');
   };
   /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
   getRowByIndex = (rowIndex) => {return CommonsLibrary.getRow(this.rowArray, rowIndex);};
   /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
   getRowById = (rowId) =>
   {
      return this.rowArray[this.getIndexById(rowId)];
   };
   indexToKey = (rowIndex) =>
   {
      if (rowIndex === this.rowArray.length) return this.blankKey;
      return this.rowArray[rowIndex].getKey();
   };
   /**Sets data from a json object given then updates.*/
   load = (jsonSection) =>
   {
      //rowArray=[];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      if (this.rowArray.length > 1 || this.state.it.length > 1) throw new Error('Should\'ve cleared first');
      const newState = [];
      if (0 !== this.equipmentMaxTotal) newState.push(this.rowArray[0].getState());
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
         //TODO: check for duplicates
         this.rowArray.push(advantageObject);

         if (undefined !== jsonSection[i].rank) advantageObject.setRank(jsonSection[i].rank);
         if (undefined !== jsonSection[i].text) advantageObject.setText(jsonSection[i].text);
         newState.push(advantageObject.getState());
      }
      this.setState(() =>
      {
         return {it: newState};
      });
   };
   /**Returns an array of json objects for this section's data*/
   save = () =>
   {
      const json = [];
      for (let i = 0; i < this.rowArray.length; i++)
      {
         json.push(this.rowArray[i].save());
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
   updateByKey = (updatedKey) =>
   {
      if (updatedKey === this.blankKey)
      {
         throw new Error('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexById(updatedKey);
      const newStateRow = this.rowArray[updatedIndex].getState();
      this.setState((state) =>
      {
         //TODO: race conditions? merge issues? can this replace the others?
         state.it[updatedIndex] = newStateRow;
         return state;
      });
   };
   updateNameByKey = (updatedKey) =>
   {
      if (updatedKey === this.blankKey)
      {
         throw new Error('Can\'t update name of blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexById(updatedKey);
      const newName = this.rowArray[updatedIndex].getName();

      if (undefined === newName || this._isDuplicate())
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
      if (updatedKey === this.blankKey)
      {
         throw new Error('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexById(updatedKey);
      const newRank = this.rowArray[updatedIndex].getRank();
      this.setState((state) =>
      {
         state.it[updatedIndex].rank = newRank;
         return state;
      });
   };
   updateTextByKey = (updatedKey) =>
   {
      if (updatedKey === this.blankKey)
      {
         throw new Error('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexById(updatedKey);
      const newText = this.rowArray[updatedIndex].getText();
      if (this._isDuplicate())
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
      const advantageObject = new AdvantageObject(this.blankKey);
      advantageObject.setAdvantage(newName);
      //need a new key for the new blank row
      this.blankKey = MainObject.generateKey();
      return advantageObject;
   };
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   _calculateValues = () =>
   {
      this.rankMap.clear();
      this.usingGodhoodAdvantages = false;
      this.pettyRulesApply = true;
      this.total = 0;  //reset all these then recount them

      for (let i = 0; i < this.rowArray.length; i++)
      {
         const advantageName = this.rowArray[i].getName();
         if (Data.Advantage[advantageName].isGodhood) this.usingGodhoodAdvantages = true;
         //do not connected with else since Petty Rules are godhood
         if (advantageName === 'Your Petty Rules Don\'t Apply to Me') this.pettyRulesApply = false;
         //this needs to be tracked because it changes minimum possible power level
         if (Data.Advantage.mapThese.contains(advantageName)) this.rankMap.add(this.rowArray[i].getUniqueName(),
            this.rowArray[i].getRank());
         //add instead of set these since map is empty and there are no redundant rows (using unique name)
         this.total += this.rowArray[i].getTotal();
      }
   };
   /**@returns true if 2+ rows in rowArray have the same UniqueName*/
   _isDuplicate = () =>
   {
      return this.rowArray.map((item) => item.getUniqueName())
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
         Main.updateInitiative();
         Main.updateOffense();  //some 1.0 advantages might affect this so it needs to be updated
         Main.defenseSection.calculateValues();
      }
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   _removeRow = (rowIndex) =>
   {
      this.rowArray.remove(rowIndex);
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
      const generateGodHood = (this.usingGodhoodAdvantages || this.state.main.godhood);
      //must check both since they are not yet in sync

      const elementArray = this.rowArray.map((advantageObject) =>
      {
         return (<AdvantageRowHtml key={advantageObject.getKey()} myKey={advantageObject.getKey()}
                                   state={advantageObject.getState()} derivedValues={advantageObject.getDerivedValues()}
                                   generateGodHood={generateGodHood} />);
      });
      elementArray.push(<AdvantageRowHtml key={this.blankKey} myKey={this.blankKey} state={{}} generateGodHood={generateGodHood} />);
      return elementArray;
   };
   //endregion private functions
}

function createAdvantageList(callback)
{
   ReactDOM.render(
      <AdvantageList callback={callback} />,
      document.getElementById('advantage-section')
   );
}