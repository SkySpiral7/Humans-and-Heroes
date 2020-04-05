'use strict';
/**Updates:
Main.updateInitiative();
Main.updateOffense();
Main.defenseSection.calculateValues();
*/
function AdvantageList()
{
   //private variable section:
    var equipmentMaxTotal=0, usingGodhoodAdvantages=false, total=0, pettyRulesApply=true;
    var rankMap=new MapDefault({}, 0);
    var rowArray=[], elementArray=[];

   //Single line function section
    this.hasGodhoodAdvantages=function(){return usingGodhoodAdvantages;};  //TODO: do I ever care about hasGodhoodAdvantages?
    /**Returns false if the advantage "Your Petty Rules Don't Apply to Me" exists and true otherwise*/
    this.isUsingPettyRules=function(){return pettyRulesApply;};
    this.getEquipmentMaxTotal=function(){return equipmentMaxTotal;};
    this.getRankMap=function(){return rankMap;};
    this.getTotal=function(){return total;};

   //public common section
    /**Removes all rows then updates*/
    this.clear=function(){CommonsLibrary.clear.call(this, rowArray);};
    /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
    //TODO: rename to getRowByIndex
    this.getRow=function(rowIndex){return CommonsLibrary.getRow(rowArray, rowIndex);};
    /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/
    this.getRowById = function (rowId)
    {
       for (var i = 0; i < rowArray.length; i++)  //include blank row
       {
          if (rowArray[i].getKey() === rowId) return rowArray[i];
       }
       throw new Error('No row with id ' + rowId + ' (rowArray.length=' + rowArray.length + ')');
    };
    /**Returns an array of json objects for this section's data*/
    this.save=function(){return CommonsLibrary.saveRows(rowArray);};
    /**Does each step for an onChange*/
    this.update=function(){CommonsLibrary.update.call(this);};

   //'private' commons section. Although all public none of these should be called from outside of this object
    /**This creates the page's html (for the section)*/
    this.generate=function(){renderAdvantageArray(elementArray);};
    /**Removes the row from the array and updates the index of all others in the list.*/
    this.removeRow=function(rowIndex){rowArray.remove(rowIndex); elementArray.remove(rowIndex);};
    /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
    this.sanitizeRows=function(){CommonsLibrary.sanitizeRows.call(this, rowArray);};

   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
       this.sanitizeRows();
       this._sort();
       rankMap.clear();
       usingGodhoodAdvantages = false;
       pettyRulesApply = true;
       total = 0;  //reset all these then recount them
       this._calculateEquipmentRank();  //changes the rank and adds/ removes the row. therefore must be before the total is counted

      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
          var advantageName = rowArray[i].getName();
          if(Data.Advantage[advantageName].isGodhood) usingGodhoodAdvantages = true;
          //do not connected with else since Petty Rules are godhood
          if(advantageName === 'Your Petty Rules Don\'t Apply to Me') pettyRulesApply = false;
             //this needs to be tracked because it changes minimum possible power level
          if(Data.Advantage.mapThese.contains(advantageName)) rankMap.add(rowArray[i].getUniqueName(), rowArray[i].getRank());
             //add instead of set these since map is empty and there are no redundant rows (using unique name)
          total+=rowArray[i].getTotal();
      }
   };
   /**Sets data from a json object given then updates.*/
   this.load=function(jsonSection)
   {
       //rowArray=[new AdvantageObject(0)];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      for (var i=0; i < jsonSection.length; i++)
      {
          var nameToLoad = jsonSection[i].name;
          if(!Data.Advantage.names.contains(nameToLoad))
             {Main.messageUser('AdvantageList.load.notExist', 'Advantage #' + (i+1) + ': ' + nameToLoad + ' is not an advantage name.'); continue;}
          if(Data.Advantage[nameToLoad].isGodhood && !Main.canUseGodhood())
             {Main.messageUser('AdvantageList.load.godhood', 'Advantage #' + (i+1) + ': ' + nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.'); continue;}
          var rowPointer = rowArray.last();
          rowPointer.setAdvantage(nameToLoad);
          if(undefined !== jsonSection[i].rank) rowPointer.setRank(jsonSection[i].rank);
          if(undefined !== jsonSection[i].text) rowPointer.setText(jsonSection[i].text);
          this.addRow();
      }
       this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/
   this.addRow = function ()
   {
      var advantageObject = createAdvantageObject();
      rowArray.push(advantageObject.instance);
      elementArray.push(advantageObject.element);
   };
   /**This calculates the required rank of the equipment advantage and adds or removes the advantage row accordingly*/
   this._calculateEquipmentRank=function()
   {
      var equipmentRow;
      for (var i=0; i < rowArray.length-1; i++)  //last row is blank
      {
         if(rowArray[i].getName() === 'Equipment'){equipmentRow = i; break;}
      }
      if (equipmentRow === undefined)  //if there is no equipment advantage
      {
         if(Main.equipmentSection.getTotal() === 0){equipmentMaxTotal=0; return;}  //I don't need to add a row
         equipmentRow = rowArray.length-1;  //index is at last existing row (which was blank)
         rowArray[equipmentRow].setAdvantage('Equipment');
         this.addRow();  //add a new blank row
      }
      var newEquipmentRank = Math.ceil(Main.equipmentSection.getTotal()/5);
      equipmentMaxTotal = newEquipmentRank*5;  //rounded up to nearest 5
      if(newEquipmentRank === 0) this.removeRow(equipmentRow);  //don't need the row any more
      else rowArray[equipmentRow].setRank(newEquipmentRank);
   };
   this._sort = function ()
   {
      var i, combinedArray = [];
      for (i = 0; i < rowArray.length; i++)
      {
         combinedArray.push({
            instance: rowArray[i],
            element: elementArray[i]
         });
      }
      //TODO: can this be less stupid?
      combinedArray.stableSort(this._sortOrder);
      rowArray = [];
      elementArray = [];
      for (i = 0; i < rowArray.length; i++)
      {
         rowArray.push(combinedArray[i].instance);
         elementArray.push(combinedArray[i].element);
      }
   };
   /**Pass into Array.prototype.sort so that the automatic advantages come first (equipment then the rest).*/
   this._sortOrder=function(a, b)
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
   this._testSortStability=function(){unstableSort(rowArray, this._sortOrder);};  //throws if unstableSort doesn't exist
   /**Updates other sections which depend on advantage section*/
   this.notifyDependent=function()
   {
       Main.updateInitiative();
       Main.updateOffense();  //some 1.0 advantages might affect this so it needs to be updated
       Main.defenseSection.calculateValues();
   };
   //constructor:
   CommonsLibrary.initializeRows.call(this);
}
