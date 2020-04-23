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
      this.state = {it: []};
      this.equipmentMaxTotal=0;
      this.usingGodhoodAdvantages=false;
      this.total=0;
      this.pettyRulesApply=true;
      this.rankMap=new MapDefault({}, 0);
      this.rowArray=[];
      CommonsLibrary.initializeRows.call(this);
      props.callback(this);
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
       this.setState(() =>
       {
          this.rowArray = [];
          return {it: []};
       });
    };
    /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
    //TODO: rename to getRowByIndex
    getRow=(rowIndex)=>{return CommonsLibrary.getRow(this.rowArray, rowIndex);};
    /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
    getRowById=(rowId)=>
    {
       //TODO: could speed up with a map<uuid, index> that reindexes on sort and remove
       for (var i = 0; i < this.rowArray.length; i++)  //include blank row
       {
          if (this.rowArray[i].getKey() === rowId) return this.rowArray[i];
       }
       throw new Error('No row with id ' + rowId + ' (rowArray.length=' + this.rowArray.length + ')');
    };
    /**Returns an array of json objects for this section's data*/
    save=()=>{return CommonsLibrary.saveRows(this.rowArray);};
    /**Does each step for an onChange*/
    update=()=>{this.render();};

   //'private' commons section. Although all public none of these should be called from outside of this object
    /**This creates the page's html (for the section)*/
    generate=()=>{this.render();};
    render=()=>{
       this.calculateValues();
       this.notifyDependent();
       if(typeof(Main) !== 'undefined') Main.update();  //updates totals and power level

       var elementArray = this.rowArray.map((advantageObject) =>
       {
          return (<AdvantageRowHtml key={advantageObject.getKey()} myKey={advantageObject.getKey()}
                                              state={advantageObject.getState()} derivedValues={advantageObject.getDerivedValues()} />);
       });
       return (
          //TODO: does this div show?
          <div>
             {elementArray}
          </div>
       );
    };
    /**Removes the row from the array and updates the index of all others in the list.*/
    removeRow=(rowIndex)=>{
       this.setState((state) =>
       {
          this.rowArray.remove(rowIndex);
          state.it.remove(rowIndex);
          return state;
       });
    };
    /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
    sanitizeRows=()=>{
       //CommonsLibrary.sanitizeRows.call(this, this.rowArray);
    };

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   calculateValues=()=>
   {
       //this.sanitizeRows();
       //TODO: this._sort();
       this.rankMap.clear();
       this.usingGodhoodAdvantages = false;
       this.pettyRulesApply = true;
       this.total = 0;  //reset all these then recount them
       //this._calculateEquipmentRank();  //changes the rank and adds/ removes the row. therefore must be before the total is counted

      for (var i=0; i < this.rowArray.length-1; i++)  //last row is blank
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
          this.addRow();
      }
       this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/
   addRow=()=>
   {
      const key = MainObject.generateKey();
      const advantageObject = new AdvantageObject(key);

      this.setState((state) =>
      {
         this.rowArray.push(advantageObject);
         state.it.push({name: 'Select Advantage'});
         return state;
      });
   };
   /**This calculates the required rank of the equipment advantage and adds or removes the advantage row accordingly*/
   _calculateEquipmentRank=()=>
   {
      var equipmentRow;
      for (var i=0; i < this.rowArray.length-1; i++)  //last row is blank
      {
         if(this.rowArray[i].getName() === 'Equipment'){equipmentRow = i; break;}
      }
      var equipTotal = typeof(Main) === 'undefined' ? 0 : Main.equipmentSection.getTotal();
      if (equipmentRow === undefined)  //if there is no equipment advantage
      {
         if(equipTotal === 0){this.equipmentMaxTotal=0; return;}  //I don't need to add a row
         equipmentRow = this.rowArray.length-1;  //index is at last existing row (which was blank)
         this.rowArray[equipmentRow].setAdvantage('Equipment');
         this.addRow();  //add a new blank row
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
//current state (besides a mess of to do): need to redo life cycle. for just this (somehow)

function createAdvantageList(callback)
{
   ReactDOM.render(
      <AdvantageList callback={callback} />,
      document.getElementById('advantage-section')
   );
}
