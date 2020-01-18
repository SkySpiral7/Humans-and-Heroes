'use strict';
/**Call List onChange
Select Advantage: select();
Rank: changeRank();
Text: changeText();
*/
function AdvantageObject(initialRowIndex)
{
   //private variable section:
   var state, derivedValues;

   //Basic getter section (all single line)
    this.doesHaveRank=function(){return derivedValues.hasRank;};
    this.doesHaveText=function(){return derivedValues.hasText;};
    this.getCostPerRank=function(){return derivedValues.costPerRank;};
    this.getMaxRank=function(){return derivedValues.maxRank;};
    this.getName=function(){return state.name;};
    this.getRank=function(){return state.rank;};
    this.getText=function(){return state.text;};
    this.getTotal=function(){return derivedValues.total;};

   //Single line function section
    this.getRowIndex=function(){return state.rowIndex;};
    this.setRowIndex=function(indexGiven){state.rowIndex=indexGiven;};
    this.isBlank=function(){return (state.name === undefined);};

   //Onchange section
    /**Onchange function for selecting an advantage*/
    this.select=function(){CommonsLibrary.select.call(this, this.setAdvantage, ('advantageChoices'+state.rowIndex), Main.advantageSection);};
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, ('advantageRank'+state.rowIndex), Main.advantageSection);};
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, ('advantageText'+state.rowIndex), Main.advantageSection);};

   //Value setting section
   /**Populates data of the advantage by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setAdvantage=function(nameGiven)
   {
       if(!Data.Advantage.names.contains(nameGiven)){this._constructor(); return;}  //reset values
       var useNewData = !((state.name === 'Minion' && nameGiven === 'Sidekick') || (state.name === 'Sidekick' && nameGiven === 'Minion'));
          //if switching between 'Minion' and 'Sidekick' then keep the data, otherwise clear it out
       state.name = nameGiven;
       derivedValues.maxRank = Data.Advantage[state.name].maxRank;
       derivedValues.hasRank = (1 !== derivedValues.maxRank);  //if max rank is 1 then there are no ranks
       if(useNewData) state.rank = 1;
       derivedValues.costPerRank = Data.Advantage[state.name].costPerRank;
       derivedValues.total = derivedValues.costPerRank * state.rank;
       derivedValues.hasText = Data.Advantage[state.name].hasText;
       if(derivedValues.hasText && useNewData) state.text = Data.Advantage[state.name].defaultText;
       else if(useNewData) state.text = undefined;  //needs to be explicit so that the previous data is destroyed
       //else keep using the current text
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       if(!derivedValues.hasRank) return;  //can only happen when loading
       state.rank = sanitizeNumber(rankGiven, 1, 1);
       if(state.rank > derivedValues.maxRank) state.rank = derivedValues.maxRank;
       derivedValues.total=derivedValues.costPerRank*state.rank;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;  //TODO: looks like cargo cult
       if(!derivedValues.hasText) return;  //can only happen when loading
       state.text = textGiven.trim();  //trimmed in case it needs to match up with something else
   };

   //public function section
   /**This creates the page's html (for the row). called by advantage section only*/
   this.generate=function()
   {
      return HtmlGenerator.advantageRow(state, derivedValues);
   };
   /**Get the name of the advantage appended with text to determine redundancy*/
   this.getUniqueName=function()
   {
       if(this.isBlank()) return;  //never hit
       if(state.name === 'Minion' || state.name === 'Sidekick') return ('Helper: '+state.text);  //you can't have the same character be a minion and sidekick
       if(derivedValues.hasText) return (state.name+': '+state.text);
       return state.name;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
      //don't just clone state: rank is different
      var json = {};
      json.name = state.name;
      //don't include rank if there's only 1 possible rank
      if (derivedValues.hasRank) json.rank = state.rank;
      //checking hasText is redundant but more clear
      if (derivedValues.hasText) json.text = state.text;
      return json;
   };
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
   {
      //no-op until they can all be removed from commons
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this._constructor=function()
   {
      state = {rowIndex: initialRowIndex};
      derivedValues = {total: 0};
   };
   //constructor:
   this._constructor();
}
