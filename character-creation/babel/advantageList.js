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
      this.state = {it: []};
      this.equipmentMaxTotal=0;
      this.usingGodhoodAdvantages=false;
      this.total=0;
      this.pettyRulesApply=true;
      this.rankMap=new MapDefault({}, 0);
      this.rowArray=[];
      props.callback(this);
      this.blankKey = MainObject.generateKey();
   }

   //Single line function section
    hasGodhoodAdvantages=()=>{return this.usingGodhoodAdvantages;};  //TODO: do I ever care about hasGodhoodAdvantages?
    /**Returns false if the advantage "Your Petty Rules Don't Apply to Me" exists and true otherwise*/
    isUsingPettyRules=()=>{return this.pettyRulesApply;};
    getEquipmentMaxTotal=()=>{return this.equipmentMaxTotal;};
    getRankMap=()=>{return this.rankMap;};
    getTotal=()=>{return this.total;};

   //public common section
    /**Removes all rows then updates*/
    clear=()=>{
       this.rowArray = [];
       this.setState(() =>
       {
          return {it: []};
       });
    };
    /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
    //TODO: rename to getRowByIndex
    getRow=(rowIndex)=>{return CommonsLibrary.getRow(this.rowArray, rowIndex);};
    /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
    getRowById=(rowId)=>
    {
       return this.rowArray[this.getIndexById(rowId)];
    };
   getIndexById=(rowId)=>
   {
      if (rowId === this.blankKey){
         throw new Error('Can\'t get blank row ' + rowId);
      }
      //TODO: could speed up with a map<uuid, index> that reindexes on sort and remove
      for (var i = 0; i < this.rowArray.length; i++)
      {
         if (this.rowArray[i].getKey() === rowId) return i;
      }
      throw new Error('No row with id ' + rowId + ' (rowArray.length=' + this.rowArray.length + ')');
   };
    /**Returns an array of json objects for this section's data*/
    save=()=>{return CommonsLibrary.saveRows(this.rowArray);};
    /**Does each step for an onChange*/
    update=()=>{this.render();};
    updateByKey=(updatedKey)=>{
       const updatedIndex = this.getIndexById(updatedKey);
       const newStateRow = this.rowArray[updatedIndex].getState();
       this.setState((state) =>
       {
          //TODO: race conditions? merge issues?
          state.it[updatedIndex] = newStateRow;
          return state;
       });
    };
   updateNameByKey=(updatedKey)=>{
      if (updatedKey === this.blankKey)
      {
         throw new Error('Can\'t update name of blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexById(updatedKey);
      const newName = this.rowArray[updatedIndex].getName();

      if (undefined === newName || this.isDuplicate())
      {
         this.removeRow(updatedIndex);
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
   updateRankByKey=(updatedKey)=>{
      const updatedIndex = this.getIndexById(updatedKey);
      const newRank = this.rowArray[updatedIndex].getRank();
      this.setState((state) =>
      {
         state.it[updatedIndex].rank = newRank;
         return state;
      });
   };
   updateTextByKey=(updatedKey)=>{
      const updatedIndex = this.getIndexById(updatedKey);
      const newText = this.rowArray[updatedIndex].getText();
      if (this.isDuplicate())
      {
         this.removeRow(updatedIndex);
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

   //'private' commons section. Although all public none of these should be called from outside of this object
    /**This creates the page's html (for the section)*/
    generate=()=>{this.render();};
    render=()=>{
       this.calculateValues();
       this.notifyDependent();

       var elementArray = this.rowArray.map((advantageObject) =>
       {
          return (<AdvantageRowHtml key={advantageObject.getKey()} myKey={advantageObject.getKey()}
                                              state={advantageObject.getState()} derivedValues={advantageObject.getDerivedValues()} />);
       });
       elementArray.push(<AdvantageRowHtml key={this.blankKey} myKey={this.blankKey} state={{}} />);
       return (
          //TODO: does this div show?
          <div>
             {elementArray}
          </div>
       );
    };
    /**Removes the row from the array and updates the index of all others in the list.*/
    removeRow=(rowIndex)=>{
       this.rowArray.remove(rowIndex);
       this.setState((state) =>
       {
          state.it.remove(rowIndex);
          return state;
       });
    };
    /**@returns true if 2+ rows in rowArray have the same UniqueName*/
    isDuplicate=()=>{
       return this.rowArray.map((item)=>item.getUniqueName())
       .some((val, id, array) =>
       {
          return array.indexOf(val) !== id;
       });
    };

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   calculateValues=()=>
   {
       //TODO: this._sort();
       this.rankMap.clear();
       this.usingGodhoodAdvantages = false;
       this.pettyRulesApply = true;
       this.total = 0;  //reset all these then recount them
       //TODO: this._calculateEquipmentRank();  //changes the rank and adds/ removes the row. therefore must be before the total is counted

      for (var i=0; i < this.rowArray.length; i++)
      {
          var advantageName = this.rowArray[i].getName();
          if(Data.Advantage[advantageName].isGodhood) this.usingGodhoodAdvantages = true;
          //do not connected with else since Petty Rules are godhood
          if(advantageName === 'Your Petty Rules Don\'t Apply to Me') this.pettyRulesApply = false;
             //this needs to be tracked because it changes minimum possible power level
          if(Data.Advantage.mapThese.contains(advantageName)) this.rankMap.add(this.rowArray[i].getUniqueName(), this.rowArray[i].getRank());
             //add instead of set these since map is empty and there are no redundant rows (using unique name)
          this.total+=this.rowArray[i].getTotal();
      }
   };
   /**Sets data from a json object given then updates.*/
   load=(jsonSection)=>
   {
       //rowArray=[new AdvantageObject(0)];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      for (var i=0; i < jsonSection.length; i++)
      {
          var nameToLoad = jsonSection[i].name;
          if(!Data.Advantage.names.contains(nameToLoad))
             {Main.messageUser('AdvantageList.load.notExist', 'Advantage #' + (i+1) + ': ' + nameToLoad + ' is not an advantage name.'); continue;}
          if(Data.Advantage[nameToLoad].isGodhood && !Main.canUseGodhood())
             {Main.messageUser('AdvantageList.load.godhood', 'Advantage #' + (i+1) + ': ' + nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.'); continue;}
          var rowPointer = this.rowArray.last();
          rowPointer.setAdvantage(nameToLoad);
          if(undefined !== jsonSection[i].rank) rowPointer.setRank(jsonSection[i].rank);
          if(undefined !== jsonSection[i].text) rowPointer.setText(jsonSection[i].text);
      }
       this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/
   addRow=()=>
   {
      //the row that was blank no longer is so use the blank key
      const advantageObject = new AdvantageObject(this.blankKey);
      advantageObject.setAdvantage(SelectUtil.getTextById('advantageChoices'+this.blankKey));
      //need a new key for the new blank row
      this.blankKey = MainObject.generateKey();

      this.rowArray.push(advantageObject);
      if (this.isDuplicate())  //requires duplicate to be in this.rowArray
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

      if (false && this.isDuplicate())
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
   _calculateEquipmentRank=()=>
   {
      var equipmentRow;
      for (var i=0; i < this.rowArray.length; i++)
      {
         if(this.rowArray[i].getName() === 'Equipment'){equipmentRow = i; break;}
      }
      var equipTotal = typeof(Main) === 'undefined' ? 0 : Main.equipmentSection.getTotal();
      if (equipmentRow === undefined)  //if there is no equipment advantage
      {
         if(equipTotal === 0){this.equipmentMaxTotal=0; return;}  //I don't need to add a row
         equipmentRow = this.rowArray.length;  //index is at last existing row +1
         this.rowArray[equipmentRow].setAdvantage('Equipment');
      }
      var newEquipmentRank = Math.ceil(equipTotal/5);
      this.equipmentMaxTotal = newEquipmentRank*5;  //rounded up to nearest 5
      if(newEquipmentRank === 0) this.removeRow(equipmentRow);  //don't need the row any more
      else this.rowArray[equipmentRow].setRank(newEquipmentRank);
   };
   _sort=()=>
   {
      var i, combinedArray = [];
      for (i = 0; i < this.rowArray.length; i++)
      {
         combinedArray.push({
            instance: this.rowArray[i],
            element: this.elementArray[i]
         });
      }
      //TODO: can this be less stupid?
      combinedArray.stableSort(this._sortOrder);
      this.rowArray = [];
      this.elementArray = [];
      for (i = 0; i < this.rowArray.length; i++)
      {
         this.rowArray.push(combinedArray[i].instance);
         this.elementArray.push(combinedArray[i].element);
      }
   };
   /**Pass into Array.prototype.sort so that the automatic advantages come first (equipment then the rest).*/
   _sortOrder=(a, b)=>
   {
       const aFirst = -1;
       const bFirst = 1;

       if(a.instance.isBlank()) return bFirst;
       if(b.instance.isBlank()) return aFirst;

       //TODO: bug: when first adding equipment the new advantage is placed last without sorting
       if('Equipment' === a.instance.getName()) return aFirst;
       if('Equipment' === b.instance.getName()) return bFirst;

       return 0;
   };
   /**This is only for testing. Calling it otherwise will throw. This simply re-sorts with an unstable algorithm.*/
   _testSortStability=()=>{unstableSort(this.rowArray, this._sortOrder);};  //throws if unstableSort doesn't exist
   /**Updates other sections which depend on advantage section*/
   notifyDependent=()=>
   {
       if(typeof(Main) !== 'undefined')
       {
          Main.updateInitiative();
          Main.updateOffense();  //some 1.0 advantages might affect this so it needs to be updated
          Main.defenseSection.calculateValues();
          Main.update();  //updates totals and power level
       }
   };
}

/*all state changes must be setState:
this.setState((state) =>
   {
      state.equipment.removeByValue(oldName);
      return state;
   });
*/
   //TODO: how to manage instance?
   //doesn't work doc: https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
   //need to pull state up 1 and steal list instance. make row pure component that edits parent state
   /*
   total and unique name are only ones that need to change on state change
   AdvantageRowHtml pure function
   list (should be named section) can have a json state list, ad row list, derivedValues (don't track total and uniq name)
   map<uuid, index> for all on change. only need to reindex when sorting or removing which can loop over ad row list
   */
//TODO: test
/*current state (besides a mess of to do):
self state edits (sort) need to be done in callbacks (before render)
list.update should only do things that depend on other sections
*/

function createAdvantageList(callback)
{
   ReactDOM.render(
      <AdvantageList callback={callback} />,
      document.getElementById('advantage-section')
   );
}
