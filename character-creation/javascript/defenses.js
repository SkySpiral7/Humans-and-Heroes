'use strict';
/**Call List onChange
Defense: change();
*/
function DefenseList()
{
   //private variable section:
    const defenseArray = [];
    var toughnessMaxValue = 0;  //for power level
    var total = 0;
    var calculations;

   //Single line function section
   //getByName is not validated because I want an error thrown so I can debug
   /**Get the defense row based on its name. Will return undefined if not found so that an error will occur.*/
   this.getByName=function(defenseName){return defenseArray[Data.Defense.names.indexOf(defenseName)];};
   this.getCalculations=function(){return calculations;};
   /**Get the total toughness including defensive roll*/
   this.getMaxToughness=function(){return toughnessMaxValue;};
   this.getTotal=function(){return total;};

   //public functions section
   /**Calculates and sets the initial and final values of each defense and calculates the total cost.*/
   this.calculateValues=function()
   {
      total = 0;
      calculations = {};
      for (var i = 0; i < defenseArray.length; i++)  //the array doesn't include toughness
      {
         calculations[Data.Defense.names[i]] = {abilityValue: defenseArray[i].getAbilityValue(), totalBonus: defenseArray[i].getTotalBonus()};
         total+=defenseArray[i].getRank();  //cost is 1:1
      }
      this.calculateToughness();  //split off because it is involved
      this.setValues();
   };
   /**Resets all values then updates*/
   this.clear=function()
   {
       for(var i=0; i < defenseArray.length; i++){defenseArray[i].set(0);}
       this.update();
   };
   /**Sets data from a json object given then updates*/
   this.load=function(jsonSection)
   {
      for (var i=0; i < defenseArray.length; i++)
      {
          defenseArray[i].set(jsonSection[Data.Defense.names[i]]);
      }
       this.update();
   };
   /**Returns a json object of this section's data*/
   this.save=function()
   {
      var json = {};
      for (var i=0; i < defenseArray.length; i++)
      {
         json[Data.Defense.names[i]] = defenseArray[i].getRank();
      }
      return json;
   };
   /**Does each step for an onChange*/
   this.update=function()
   {
      this.calculateValues();
      Main.update();  //updates totals and power level
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Calculates and sets the total toughness value. This accounts for all sections that influence toughness (advantages, powers, and equipment).*/
   this.calculateToughness=function()
   {
      //TODO: there is no enhanced toughness. probably need a new power 'Enhanced Toughness' can't set base cost and is detected like protection is
      //make Main.getEnhancedToughness which adds both sections and stamina
      var staminaValue = Main.abilitySection.getByName('Stamina').getZeroedValue();  //Zeroed because you can't lack toughness
      var protectionValue = Main.getProtectionTotal();
      var defensiveRollValue = Main.advantageSection.getRankMap().get('Defensive Roll');

      var toughnessWithoutDefensiveRoll;
      if(1 === Main.getActiveRuleset().major) toughnessWithoutDefensiveRoll = protectionValue + staminaValue;  //in ruleset 1.x stamina stacked but nothing else
      //TODO: actually in v1.x everything stacked
      else if(protectionValue > staminaValue) toughnessWithoutDefensiveRoll = protectionValue;
      else toughnessWithoutDefensiveRoll = staminaValue;
      toughnessMaxValue = toughnessWithoutDefensiveRoll + defensiveRollValue;  //defensive Roll stacks

      calculations.Toughness = {totalBonus: toughnessMaxValue};
      if(toughnessWithoutDefensiveRoll !== toughnessMaxValue) calculations.Toughness.withoutDefensiveRoll = toughnessWithoutDefensiveRoll;
   };
   /**This sets the page's data. called only by calculateValues*/
   this.setValues=function()
   {
      for (var i = 0; i < defenseArray.length; i++)  //the array doesn't include toughness
      {
         document.getElementById(Data.Defense.names[i]+'-start').innerHTML = calculations[Data.Defense.names[i]].abilityValue;
         //input is set by user and is never out of date
         document.getElementById(Data.Defense.names[i]+'-final').innerHTML = calculations[Data.Defense.names[i]].totalBonus;
      }
      var toughnessString = '' + toughnessMaxValue;
      if(undefined !== calculations.Toughness.withoutDefensiveRoll) toughnessString+=' ('+calculations.Toughness.withoutDefensiveRoll+' without Defensive Roll)';
      document.getElementById('Toughness').innerHTML=toughnessString;
   };
   this.constructor=function()
   {
      for(var i=0; i < Data.Defense.names.length-1; i++)  //-1 to avoid toughness
         {defenseArray.push(new DefenseObject(Data.Defense.names[i]));}
      Object.freeze(defenseArray);
   };
   //constructor:
   this.constructor();
}
function DefenseObject(defenseName)
{
    var defenseValue = 0;
    /**Onchange function for changing the defense-input*/
    this.change=function(){CommonsLibrary.change.call(this, this.set, (defenseName+'-input'), Main.defenseSection, false);};
    this.getRank=function(){return defenseValue;};
   /**Call this to get the initial defense value. The ability name and zeroed value is not saved.
   It asks Data.Defense for name and abilitySection for the value each time.
   The ability value is not saved so that it will never be out of date.
   The ability name is not saved so that it is possible to change between old and new rules (again never out of date).
   The ability value is zeroed because you can't lack defense scores*/
   this.getAbilityValue=function()
   {
       var abilityUsed = Data.Defense[defenseName].ability;
       return Main.abilitySection.getByName(abilityUsed).getZeroedValue();  //TODO: defenses should auto fail if ability lacked
   };
    /**Call this to get the final defense value. The ability value used is from this.getAbilityValue()*/
    this.getTotalBonus=function(){return (defenseValue + this.getAbilityValue());};
   /**Validates and sets this defense to the value given. Because there is no generate the document's value must also be set here.*/
   this.set=function(valueGiven)
   {
       document.getElementById(defenseName+'-input').value=defenseValue=sanitizeNumber(valueGiven, 0, 0);
   };
}