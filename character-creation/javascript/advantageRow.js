'use strict';
/**Call List onChange
Select Advantage: select();
Rank: changeRank();
Text: changeText();
*/
function AdvantageObject(rowIndex)
{
   //private variable section:
    var name, maxRank, costPerRank, hasRank, rank, hasText, text, total;

   //Basic getter section (all single line)
    this.doesHaveRank=function(){return hasRank;};
    this.doesHaveText=function(){return hasText;};
    this.getCostPerRank=function(){return costPerRank;};
    this.getmaxRank=function(){return maxRank;};
    this.getName=function(){return name;};
    this.getRank=function(){return rank;};
    this.getText=function(){return text;};
    this.getTotal=function(){return total;};

   //Single line function section
    this.getRowIndex=function(){return rowIndex;};
    this.setRowIndex=function(indexGiven){rowIndex=indexGiven;};
    this.isBlank=function(){return (name === undefined);};

   //Onchange section
    /**Onchange function for selecting an advantage*/
    this.select=function(){CommonsLibrary.select.call(this, this.setAdvantage, ('advantageChoices'+rowIndex), Main.advantageSection);};
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, ('advantageRank'+rowIndex), Main.advantageSection);};
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, ('advantageText'+rowIndex), Main.advantageSection);};

   //Value setting section
   /**Populates data of the advantage by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setAdvantage=function(nameGiven)
   {
       if(!Data.Advantage.names.contains(nameGiven)){this.constructor(); return;}  //reset values
       var useNewData = !((name === 'Minion' && nameGiven === 'Sidekick') || (name === 'Sidekick' && nameGiven === 'Minion'));
          //if switching between 'Minion' and 'Sidekick' then keep the data, otherwise clear it out
       name = nameGiven;
       maxRank = Data.Advantage[name].maxRank;
       hasRank = (1 !== maxRank);  //if max rank is 1 then there are no ranks
       if(useNewData) rank = 1;
       costPerRank = Data.Advantage[name].costPerRank;
       total = costPerRank * rank;
       hasText = Data.Advantage[name].hasText;
       if(hasText && useNewData) text = Data.Advantage[name].defaultText;
       else if(useNewData) text = undefined;  //needs to be explicit so that the previous data is destroyed
       //else keep using the current text
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       if(!hasRank) return;  //can only happen when loading
       rank = sanitizeNumber(rankGiven, 1, 1);
       if(rank > maxRank) rank = maxRank;
       total=costPerRank*rank;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;  //TODO: looks like cargo cult
       if(!hasText) return;  //can only happen when loading
       text = textGiven.trim();  //trimmed in case it needs to match up with something else
   };

   //public function section
   /**This creates the page's html (for the row). called by advantage section only*/
   this.generate=function()
   {
      var htmlString = '<div class="row">', i;
      if(name === 'Equipment') htmlString+='<div class="col-6 col-xl-4"><b id="advantageEquipment">Equipment</b></div>\n';
      else
      {
         htmlString+='<div class="col-12 col-sm-6 col-xl-4">' +
            '<select id="advantageChoices'+rowIndex+'" onChange="Main.advantageSection.getRow('+rowIndex+').select();">\n';
         htmlString+='    <option>Select Advantage</option>\n';
         var displayGodhood = (undefined !== Main && (Main.advantageSection.hasGodhoodAdvantages() || Main.canUseGodhood()));
            //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
         for (i=0; i < Data.Advantage.names.length; i++)
         {
            if('Equipment' !== Data.Advantage.names[i] && (displayGodhood || !Data.Advantage[Data.Advantage.names[i]].isGodhood))
               htmlString+='    <option>'+Data.Advantage.names[i]+'</option>\n';
         }
         htmlString+='</select></div>\n';
      }
      if(this.isBlank()) return htmlString + '</div>';  //done

      if(name === 'Equipment') htmlString+='<div class="col-6 col-sm-3 col-xl-2">Cost <span id="advantageEquipmentRankSpan"></span></div>\n';
      else if(hasRank) htmlString+='<label class="col-5 col-sm-3 col-xl-2">Rank <input type="text" size="1" id="advantageRank'+rowIndex+'" ' +
         'onChange="Main.advantageSection.getRow('+rowIndex+').changeRank();" /></label>\n';

      if(hasText) htmlString+='<div class="col-12 col-sm-6"><input type="text" style="width: 100%" id="advantageText'+rowIndex+'" ' +
         'onChange="Main.advantageSection.getRow('+rowIndex+').changeText();" /></div>\n';
      if(costPerRank > 1) htmlString+='<div class="col-3 col-sm-2 col-xl-1">=&nbsp;<span id="advantageRowTotal'+rowIndex+'"></span></div>\n';
      htmlString+='</div>\n';
      return htmlString;
   };
   /**Get the name of the advantage appended with text to determine redundancy*/
   this.getUniqueName=function()
   {
       if(this.isBlank()) return;  //never hit
       if(name === 'Minion' || name === 'Sidekick') return ('Helper: '+text);  //you can't have the same character be a minion and sidekick
       if(hasText) return (name+': '+text);
       return name;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
       var json={};
       json.name=name;
       if(hasRank) json.rank=rank;
       if(hasText) json.text=text;
       return json;
   };
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
   {
       if(this.isBlank()) return;  //already set (to default)
       if(name !== 'Equipment') SelectUtil.setText(('advantageChoices'+rowIndex), name);

       //do not connect else with above because non-equipment might also have text
       if(name === 'Equipment') document.getElementById('advantageEquipmentRankSpan').innerHTML = rank;
       else if(hasRank) document.getElementById('advantageRank'+rowIndex).value = rank;

       if(hasText) document.getElementById('advantageText'+rowIndex).value = text;
       if(costPerRank !== 1) document.getElementById('advantageRowTotal'+rowIndex).innerHTML = total;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this.constructor=function()
   {
       name = undefined;
       maxRank = undefined;
       hasRank = undefined;
       rank = undefined;
       hasText = undefined;
       text = undefined;
       costPerRank = undefined;
       total = 0;
   };
   //constructor:
    this.constructor();
}
