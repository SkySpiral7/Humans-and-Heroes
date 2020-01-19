'use strict';
/**Call List onChange
Select Modifier: select();
Rank: changeRank();
Text: changeText();
*/
function ModifierObject(props)
{
   //private variable section:
   var state, derivedValues;

   //Basic getter section (all single line)
   /**If true then getAutoTotal must be called*/
   this.doesHaveAutoTotal=function(){return derivedValues.hasAutoTotal;};
   this.doesHaveRank=function(){return derivedValues.hasRank;};
   this.doesHaveText=function(){return derivedValues.hasText;};
   /**Should be used only for testing not point calculations*/
   this.getAutoTotal=function(){return derivedValues.autoTotal;};
   this.getCostPerRank=function(){return derivedValues.costPerRank;};
   this.getMaxRank=function(){return derivedValues.maxRank;};
   this.getModifierType=function(){return derivedValues.modifierType;};
   /**Get the name of the modifier*/
   this.getName=function(){return state.name;};
   this.getRank=function(){return state.rank;};
   /**This total will be either flat or rank (or 0). If hasAutoTotal then the total is 0.*/
   this.getRawTotal=function(){return derivedValues.rawTotal;};
   this.getText=function(){return state.text;};

   //Single line function section
   this.getModifierRowIndex=function(){return state.modifierRowIndex;};
   this.getPower=function(){return props.powerRowParent;};
   /**True if this row has no data*/
   this.isBlank=function(){return (state.name === undefined);};
   /**True if this modifier increases the total power cost in any way*/
   this.isExtra=function(){return (derivedValues.costPerRank > 0);};
   /**True if this modifier changes the total power cost but not cost per rank*/
   this.isFlat=function(){return (derivedValues.modifierType === 'Flat');};
   /**True if this modifier reduces the total power cost in any way*/
   this.isFlaw=function(){return (derivedValues.costPerRank < 0);};
   /**True if this modifier doesn't change any totals*/
   this.isFree=function(){return (derivedValues.modifierType === 'Free');};
   /**True if this modifier changes the cost per rank*/
   this.isRank=function(){return (derivedValues.modifierType === 'Rank');};
   this.setPowerRowIndex=function(newPowerRowIndex){state.powerRowIndex=newPowerRowIndex;};
   this.setModifierRowIndex=function(newModifierRowIndex){state.modifierRowIndex=newModifierRowIndex;};

   //Onchange section
   /**Onchange function for selecting a modifier*/
   this.select=function(){CommonsLibrary.select.call(this, this.setModifier,
      (props.sectionName+'ModifierChoices'+state.powerRowIndex+'.'+state.modifierRowIndex), props.modifierListParent);};
   /**Onchange function for changing the rank*/
   this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank,
      (props.sectionName+'ModifierRank'+state.powerRowIndex+'.'+state.modifierRowIndex), props.modifierListParent);};
   /**Onchange function for changing the text*/
   this.changeText=function(){CommonsLibrary.change.call(this, this.setText,
      (props.sectionName+'ModifierText'+state.powerRowIndex+'.'+state.modifierRowIndex), props.modifierListParent);};

   //Value setting section
   /**Populates data of the modifier by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setModifier=function(nameGiven)
   {
      var wasAttack = ('Attack' === state.name || 'Affects Others Only' === state.name || 'Affects Others Also' === state.name);
      //TODO: remove these modifiers from GUI for non-personal powers. Those would need to be Enhanced trait attack
      if(wasAttack && 'Feature' !== props.powerRowParent.getEffect()) props.powerRowParent.setRange('Personal');

      if (!Data.Modifier.names.contains(nameGiven))  //if row is removed, ie: 'Select Modifier'
      {
         this._resetValues();
         if(wasAttack) props.powerRowParent.generateNameAndSkill();  //technically only necessary if 'Attack' === state.name
         return;
      }

      state.name = nameGiven;
      derivedValues.modifierType = Data.Modifier[state.name].type;
      derivedValues.costPerRank = Data.Modifier[state.name].cost;
      derivedValues.maxRank = Data.Modifier[state.name].maxRank;
      derivedValues.hasRank = (1 !== derivedValues.maxRank);
      state.rank = 1;
      derivedValues.hasText = Data.Modifier[state.name].hasText;
      if(derivedValues.hasText) state.text = Data.Modifier[state.name].defaultText;
      else state.text = undefined;
      derivedValues.hasAutoTotal = Data.Modifier[state.name].hasAutoTotal;
      this.calculateTotal();

      if(('Attack' === state.name || 'Affects Others Only' === state.name || 'Affects Others Also' === state.name)
         && 'Personal' === props.powerRowParent.getRange())
         props.powerRowParent.setRange('Close');  //when loading this value is redundantly set then later overridden by load's setRange
      if(wasAttack || 'Attack' === state.name) props.powerRowParent.generateNameAndSkill();  //create or destroy as needed
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       //TODO: test that this allows setting auto
      //if (Data.Modifier[state.name].hasAutoRank)  //ModifierList.allAutoModifierCanCreate are span so that this isn't called (can't change them anyway)
          //return;  //can't change the rank since it is auto
       if(!derivedValues.hasRank) return;  //can only happen when loading bad data
       if(state.name === 'Fragile') state.rank = sanitizeNumber(rankGiven, 0, 0);  //the only modifier than can have 0 ranks
       else state.rank = sanitizeNumber(rankGiven, 1, 1);  //all others must have at least 1 rank
       if(state.rank > derivedValues.maxRank) state.rank = derivedValues.maxRank;
       this.calculateTotal();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       if(!derivedValues.hasText) return;  //can only happen when loading bad data
       state.text=textGiven;
   };

   //Other public functions section
   /**A place that address all quirks in total cost. Will set the total to the correct number for raw total calculation.*/
   this.calculateTotal=function()
   {
       if(derivedValues.hasAutoTotal){derivedValues.rawTotal=0; return;}  //so that it will not affect the rawTotal
       derivedValues.rawTotal=derivedValues.costPerRank*state.rank;
       if((state.name === 'Decreased Duration' && props.powerRowParent.getDefaultDuration() === 'Permanent') ||
          (state.name === 'Increased Duration' && props.powerRowParent.getDuration() === 'Permanent')) derivedValues.rawTotal=derivedValues.costPerRank*(state.rank-2);
       if((state.name === 'Reduced Range' && props.powerRowParent.getDefaultRange() === 'Perception') ||
          (state.name === 'Increased Range' && props.powerRowParent.getRange() === 'Perception')) derivedValues.rawTotal=derivedValues.costPerRank*(state.rank+1);
   };
   /**This creates the page's html (for the row). called by modifier section only*/
   this.generate=function()
   {
      return HtmlGenerator.modifierRow(props, state, derivedValues);
   };
   /**Get the name of the modifier appended with text to determine redundancy*/
   this.getUniqueName=function(includeText)
   {
       var nameToUse;
       //all these are exclusive:
       if(state.name === 'Affects Others Also' || state.name === 'Affects Others Only') nameToUse='Affects Others';
       else if(state.name === 'Affects Objects Also' || state.name === 'Affects Objects Only') nameToUse='Affects Objects';
       else if(state.name === 'Alternate Resistance (Free)' || state.name === 'Alternate Resistance (Cost)') nameToUse='Alternate Resistance';
       else if(state.name === 'Easily Removable') nameToUse='Removable';
       else if(state.name === 'Dynamic Alternate Effect') nameToUse='Alternate Effect';
       else if(state.name === 'Inaccurate') nameToUse='Accurate';
       else if(state.name === 'Extended Range' || state.name === 'Diminished Range') nameToUse='Extended/Diminished Range';
       //TODO: is uncontrollable entirely a unique modifier?
       else nameToUse=state.name;
       //TODO: so I noticed that text should not be used most of the time for uniqueness (check required is only maybe)

       if(includeText && derivedValues.hasText) return (nameToUse+' ('+state.text+')');
       return nameToUse;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
      //don't just clone state: rank is different
      var json = {};
      json.name = state.name;
      //don't include rank if there's only 1 possible rank
      if (derivedValues.hasRank) json.applications = state.rank;
      //checking hasText is redundant but more clear
      if (derivedValues.hasText) json.text = state.text;
      return json;
   };
   /**Takes the power row raw total, sets the auto ranks, and returns the power row grand total.*/
   this.setAutoRank=function(powerRowRawTotal)
   {
       if(this.isBlank() || !derivedValues.hasAutoTotal) return powerRowRawTotal;

       //these autoTotals can be negative, 0, or 1 because they always cost 2 and 1
       if('Dynamic Alternate Effect' === state.name){derivedValues.autoTotal = 2 - powerRowRawTotal; return 2;}  //only exists in ruleset 1.0
       if('Alternate Effect' === state.name && 1 === Main.getActiveRuleset().major){derivedValues.autoTotal = 1 - powerRowRawTotal; return 1;}
       //Alternate Effect in ruleset 1.0 forced the power to be worth a total of 1 (or 2 for Dynamic). the the flaw is all but 1
       //technically 1.0 Alternate Effect was an extra to spent 1 point on a whole other sub-power

       //name can't be both alt and removable
       if('Alternate Effect' === state.name) derivedValues.autoTotal = -Math.floor(powerRowRawTotal / 2);
       else if('Easily Removable' === state.name) derivedValues.autoTotal = -Math.floor(powerRowRawTotal * 2/5);
       else if('Removable' === state.name) derivedValues.autoTotal = -Math.floor(powerRowRawTotal / 5);

       return (powerRowRawTotal + derivedValues.autoTotal);  //autoTotal is always negative or 0
   };
   /**This set the page's data. called only by section generate*/
   this.setValues=function()
   {
      //no-op until they can all be removed from commons
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this._constructor=function()
   {
      state = {powerRowIndex: props.initialPowerRowIndex, modifierRowIndex: props.initialModifierRowIndex};
      this._resetValues();
   };
   this._resetValues=function()
   {
      //props and indexes are not reset
      state = {powerRowIndex: state.powerRowIndex, modifierRowIndex: state.modifierRowIndex};
      derivedValues = {hasAutoTotal: false, rawTotal: 0};
   };
   //constructor:
   this._constructor();
}
