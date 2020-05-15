'use strict';

/**Call List onChange
 Select Advantage: select();
 Rank: changeRank();
 Text: changeText();
 */
function AdvantageObject(key)
{
   //private variable section:
   var state, derivedValues;

   //region Basic getter (all single line)
   this.getState = function () {return JSON.clone(state);};  //defensive copy is important to prevent tamper
   this.getDerivedValues = function () {return JSON.clone(derivedValues);};  //clone is for tests
   this.doesHaveRank = function () {return derivedValues.hasRank;};
   this.doesHaveText = function () {return derivedValues.hasText;};
   this.getCostPerRank = function () {return derivedValues.costPerRank;};
   this.getMaxRank = function () {return derivedValues.maxRank;};
   this.getName = function () {return state.name;};
   this.getRank = function () {return state.rank;};
   this.getText = function () {return state.text;};
   this.getTotal = function () {return derivedValues.total;};
   this.getKey = function () {return key;};
   //endregion Basic getter

   //region Onchange
   /**Onchange function for selecting an advantage*/
   this.select = function ()
   {
      var nameGiven = SelectUtil.getTextById('advantageChoices' + key);
      if (Data.Advantage.names.contains(nameGiven)) this.setAdvantage(nameGiven);
      else state.name = undefined;  //mark for delete (since I can't delete myself)
      Main.advantageSection.updateNameByKey(key);
   };
   /**Onchange function for changing the rank*/
   this.changeRank = function ()
   {
      this.setRank(document.getElementById('advantageRank' + key).value);
      Main.advantageSection.updateRankByKey(key);
   };
   /**Onchange function for changing the text*/
   this.changeText = function ()
   {
      this.setText(document.getElementById('advantageText' + key).value);
      Main.advantageSection.updateTextByKey(key);
   };
   //endregion Onchange

   //region Value setting
   /**Populates data of the advantage by using the name (which is validated).
    This must be called before any other data of this row is set.
    The data set is independent of the document and doesn't call update.*/
   this.setAdvantage = function (nameGiven)
   {
      var useNewData = !((state.name === 'Minion' && nameGiven === 'Sidekick') || (state.name === 'Sidekick' && nameGiven === 'Minion'));
      //if switching between 'Minion' and 'Sidekick' then keep the data, otherwise clear it out
      state.name = nameGiven;
      derivedValues.maxRank = Data.Advantage[state.name].maxRank;
      derivedValues.hasRank = (1 !== derivedValues.maxRank);  //if max rank is 1 then there are no ranks
      if (useNewData) state.rank = 1;
      derivedValues.costPerRank = Data.Advantage[state.name].costPerRank;
      derivedValues.total = derivedValues.costPerRank * state.rank;
      derivedValues.hasText = Data.Advantage[state.name].hasText;
      if (derivedValues.hasText && useNewData) state.text = Data.Advantage[state.name].defaultText;
      //!derivedValues.hasText && useNewData (useNewData always true when !hasText):
      else if (useNewData) state.text = undefined;  //needs to be explicit so that the previous data is destroyed
      //else (!useNewData which always hasText) keep using the current text
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank = function (rankGiven)
   {
      if (!derivedValues.hasRank) return;  //can only happen when loading
      state.rank = sanitizeNumber(rankGiven, 1, 1);
      if (state.rank > derivedValues.maxRank) state.rank = derivedValues.maxRank;
      derivedValues.total = derivedValues.costPerRank * state.rank;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText = function (textGiven)
   {
      if (!derivedValues.hasText) return;  //can only happen when loading
      state.text = textGiven.trim();  //trimmed in case it needs to match up with something else (eg helper, +Crit, skill master)
   };
   //endregion Value setting

   //region public function
   /**Get the name of the advantage appended with text to determine redundancy*/
   this.getUniqueName = function ()
   {
      //you can't have the same character be a minion and sidekick
      if ('Minion' === state.name || 'Sidekick' === state.name) return ('Helper: ' + state.text);
      //technically having ': undefined' is still unique but doesn't look as nice
      if (derivedValues.hasText) return (state.name + ': ' + state.text);
      return state.name;
   };
   /**Returns a json object of this row's data*/
   this.save = function ()
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
   //endregion public function

   //constructor:
   state = {};
   derivedValues = {total: 0};
}
