'use strict';
/**Call List onChange
Select Modifier: select();
Rank: changeRank();
Text: changeText();
*/
//Immutable (state/derivedValues don't change)
function ModifierObject(props)
{
   //private variable section:
   var state, derivedValues;

   //Basic getter section (all single line)
   /**If true then getAutoTotal must be called*/
   this.doesHaveAutoTotal=function(){return derivedValues.hasAutoTotal;};
   this.doesHaveRank=function(){return derivedValues.hasRank;};
   this.doesHaveText=function(){return derivedValues.hasText;};
   this.getCostPerRank=function(){return derivedValues.costPerRank;};
   this.getDerivedValues = function () {return JSON.clone(derivedValues);};  //clone is for tests
   this.getKey = function () {return props.key;};
   this.getMaxRank=function(){return derivedValues.maxRank;};
   this.getModifierType=function(){return derivedValues.modifierType;};
   /**Get the name of the modifier*/
   this.getName=function(){return state.name;};
   this.getRank=function(){return state.rank;};
   /**This total will be either flat or rank (or 0). If hasAutoTotal then the total is 0.*/
   this.getRawTotal=function(){return derivedValues.rawTotal;};
   this.getState=function(){return JSON.clone(state);};  //defensive copy is important to prevent tamper
   this.getText=function(){return state.text;};

   //Single line function section
   this.getPower=function(){return props.powerRowParent;};
   this.getSection=function(){return props.modifierListParent;};
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

   //Other public functions section
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

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**A place that address all quirks in total cost. Will set the total to the correct number for raw total calculation.*/
   this._calculateTotal=function()
   {
      if(derivedValues.hasAutoTotal){derivedValues.rawTotal=0; return;}  //so that it will not affect the rawTotal
      derivedValues.rawTotal=derivedValues.costPerRank*state.rank;
      if((state.name === 'Decreased Duration' && props.powerRowParent.getDefaultDuration() === 'Permanent') ||
         (state.name === 'Increased Duration' && props.powerRowParent.getDuration() === 'Permanent')) derivedValues.rawTotal=derivedValues.costPerRank*(state.rank-2);
      if((state.name === 'Reduced Range' && props.powerRowParent.getDefaultRange() === 'Perception') ||
         (state.name === 'Increased Range' && props.powerRowParent.getRange() === 'Perception')) derivedValues.rawTotal=derivedValues.costPerRank*(state.rank+1);
   };
   this._constructor=function()
   {
      state = {};
      derivedValues = {hasAutoTotal: false, rawTotal: 0};
      this._setModifier(props.state.name);
      this._setRank(props.state.rank);
      this._setText(props.state.text);
   };
   /**Populates data of the modifier by using the name (which is validated).
    This must be called before any other data of this row is set.
    The data set is independent of the document and doesn't call update.*/
   this._setModifier=function(nameGiven)
   {
      state.name = nameGiven;
      derivedValues.modifierType = Data.Modifier[state.name].type;
      derivedValues.costPerRank = Data.Modifier[state.name].cost;
      derivedValues.maxRank = Data.Modifier[state.name].maxRank;
      derivedValues.hasRank = (1 !== derivedValues.maxRank);
      derivedValues.hasText = Data.Modifier[state.name].hasText;
      derivedValues.hasAutoTotal = Data.Modifier[state.name].hasAutoTotal;
   };
   /**Used to set data independent of the document and without calling update*/
   this._setRank=function(rankGiven)
   {
      //TODO: test that this allows setting auto
      //if (Data.Modifier[state.name].hasAutoRank)  //ModifierList.allAutoModifierCanCreate are span so that this isn't called (can't change them anyway)
      //return;  //can't change the rank since it is auto
      if(!derivedValues.hasRank) return;  //can only happen when loading bad data
      if(state.name === 'Fragile') state.rank = sanitizeNumber(rankGiven, 0, 0);  //the only modifier than can have 0 ranks
      else state.rank = sanitizeNumber(rankGiven, 1, 1);  //all others must have at least 1 rank
      if(state.rank > derivedValues.maxRank) state.rank = derivedValues.maxRank;
      this._calculateTotal();
   };
   /**Used to set data independent of the document and without calling update*/
   this._setText=function(textGiven)
   {
      if (derivedValues.hasText && undefined === textGiven) state.text = Data.Modifier[state.name].defaultText;
      else if (derivedValues.hasText) state.text = textGiven;
      else state.text = undefined;  //can only happen when loading bad data
   };
   //constructor:
   this._constructor();
}
