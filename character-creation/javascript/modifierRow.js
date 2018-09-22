'use strict';
/**Call List onChange
Select Modifier: select();
Rank: changeRank();
Text: changeText();
*/
function ModifierObject(modifierListParent, powerRowIndex, modifierRowIndex, sectionName)
{
   //private variable section:
    var name, modifierType, costPerRank, hasRank, maxRank, rank, hasText, text, hasAutoTotal, rawTotal, autoTotal;

   //Basic getter section (all single line)
    /**If true then getAutoTotal must be called*/
    this.doesHaveAutoTotal=function(){return hasAutoTotal;};
    this.doesHaveRank=function(){return hasRank;};
    this.doesHaveText=function(){return hasText;};
    /**Should be used only for testing not point calculations*/
    this.getAutoTotal=function(){return autoTotal;};
    this.getCostPerRank=function(){return costPerRank;};
    this.getMaxRank=function(){return maxRank;};
    this.getModifierType=function(){return modifierType;};
    /**Get the name of the modifier*/
    this.getName=function(){return name;};
    this.getRank=function(){return rank;};
    /**This total will be either flat or rank (or 0). If hasAutoTotal then the total is 0.*/
    this.getRawTotal=function(){return rawTotal;};
    this.getText=function(){return text;};

   //Single line function section
    this.getModifierRowIndex=function(){return modifierRowIndex;};
    this.getPower=function(){return modifierListParent.getPower();};
    /**True if this row has no data*/
    this.isBlank=function(){return (name === undefined);};
    /**True if this modifier increases the total power cost in any way*/
    this.isExtra=function(){return (costPerRank > 0);};
    /**True if this modifier changes the total power cost but not cost per rank*/
    this.isFlat=function(){return (modifierType === 'Flat');};
    /**True if this modifier reduces the total power cost in any way*/
    this.isFlaw=function(){return (costPerRank < 0);};
    /**True if this modifier doesn't change any totals*/
    this.isFree=function(){return (modifierType === 'Free');};
    /**True if this modifier changes the cost per rank*/
    this.isRank=function(){return (modifierType === 'Rank');};
    this.setPowerRowIndex=function(newPowerRowIndex){powerRowIndex=newPowerRowIndex;};
    this.setModifierRowIndex=function(newModifierRowIndex){modifierRowIndex=newModifierRowIndex;};

   //Onchange section
    /**Onchange function for selecting a modifier*/
    this.select=function(){CommonsLibrary.select.call(this, this.setModifier, (sectionName+'ModifierChoices'+powerRowIndex+'.'+modifierRowIndex), modifierListParent);};
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, (sectionName+'ModifierRank'+powerRowIndex+'.'+modifierRowIndex), modifierListParent);};
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, (sectionName+'ModifierText'+powerRowIndex+'.'+modifierRowIndex), modifierListParent);};

   //Value setting section
   /**Populates data of the modifier by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setModifier=function(nameGiven)
   {
      var wasAttack = ('Attack' === name || 'Affects Others Only' === name || 'Affects Others Also' === name);
      //TODO: remove these modifiers from GUI for non-personal powers. Those would need to be Enhanced trait attack
      if(wasAttack && 'Feature' !== this.getPower().getEffect()) this.getPower().setRange('Personal');

      if (!Data.Modifier.names.contains(nameGiven))  //if row is removed, ie: 'Select Modifier'
      {
         this.constructor();  //reset row
         if(wasAttack) this.getPower().generateNameAndSkill();  //technically only necessary if 'Attack' === name
         return;
      }

      name = nameGiven;
      modifierType = Data.Modifier[name].type;
      costPerRank = Data.Modifier[name].cost;
      maxRank = Data.Modifier[name].maxRank;
      hasRank = (1 !== maxRank);
      rank = 1;
      hasText = Data.Modifier[name].hasText;
      if(hasText) text = Data.Modifier[name].defaultText;
      else text = undefined;
      hasAutoTotal = Data.Modifier[name].hasAutoTotal;
      this.calculateTotal();

      if(('Attack' === name || 'Affects Others Only' === name || 'Affects Others Also' === name)
         && 'Personal' === this.getPower().getRange())
         this.getPower().setRange('Close');  //when loading this value is redundantly set then later overridden by load's setRange
      if(wasAttack || 'Attack' === name) this.getPower().generateNameAndSkill();  //create or destroy as needed
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       //TODO: test that this allows setting auto
      //if (Data.Modifier[name].hasAutoRank)  //ModifierList.allAutoModifierCanCreate are span so that this isn't called (can't change them anyway)
          //return;  //can't change the rank since it is auto
       if(!hasRank) return;  //can only happen when loading bad data
       if(name === 'Fragile') rank = sanitizeNumber(rankGiven, 0, 0);  //the only modifier than can have 0 ranks
       else rank = sanitizeNumber(rankGiven, 1, 1);  //all others must have at least 1 rank
       if(rank > maxRank) rank = maxRank;
       this.calculateTotal();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       if(!hasText) return;  //can only happen when loading bad data
       text=textGiven;
   };

   //Other public functions section
   /**A place that address all quirks in total cost. Will set the total to the correct number for raw total calculation.*/
   this.calculateTotal=function()
   {
       if(hasAutoTotal){rawTotal=0; return;}  //so that it will not affect the rawTotal
       rawTotal=costPerRank*rank;
       if((name === 'Decreased Duration' && this.getPower().getDefaultDuration() === 'Permanent') ||
          (name === 'Increased Duration' && this.getPower().getDuration() === 'Permanent')) rawTotal=costPerRank*(rank-2);
       if((name === 'Reduced Range' && this.getPower().getDefaultRange() === 'Perception') ||
          (name === 'Increased Range' && this.getPower().getRange() === 'Perception')) rawTotal=costPerRank*(rank+1);
   };
   /**This creates the page's html (for the row). called by modifier section only*/
   this.generate=function()
   {
      var totalIndex = powerRowIndex+'.'+modifierRowIndex;
      var htmlString='';
      htmlString+='   <div class="row">\n';  //TODO: confirm html
      htmlString+='      <div class="col-12 col-sm-5 col-lg-4 col-xl-auto">\n';
      var amReadOnly = ('Selective' === name && 'Triggered' === this.getPower().getAction());
         //Triggered requires Selective started between 2.0 and 2.5. Triggered isn't an action in 1.0
      if(undefined !== name && !amReadOnly) amReadOnly = Data.Modifier[name].isReadOnly;
      if (this.getPower().getEffect() === 'Feature' || !amReadOnly)
      {
         htmlString+='         <select id="'+sectionName+'ModifierChoices'+totalIndex+'" ' +
            'onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').select()">\n';
         htmlString+='             <option>Select Modifier</option>\n';
         for (var i=0; i < Data.Modifier.names.length; i++)
         {
            if(this.getPower().getSection() === Main.equipmentSection &&
               (Data.Modifier.names[i] === 'Removable' || Data.Modifier.names[i] === 'Easily Removable')) continue;
                  //equipment has removable built in and can't have the modifiers
            if(this.getPower().getEffect() === 'Feature' || !Data.Modifier[Data.Modifier.names[i]].isReadOnly)
               htmlString+='             <option>'+Data.Modifier.names[i]+'</option>\n';
         }
         htmlString+='         </select>\n';
      }
      else htmlString+='          <b><span id="'+sectionName+'ModifierName'+totalIndex+'"></span></b>\n';  //I know I could have the b tag with the id but I don't like that
      htmlString+='      </div>\n';
      if(this.isBlank()) return htmlString + '   </div>\n';  //done

      if (name === 'Attack')
      {
         htmlString+='      <div class="col-12 col-sm-6 col-lg-4">\n';
         htmlString+=Data.SharedHtml.powerName(sectionName, powerRowIndex);
         htmlString+='      </div>\n';
         if(this.getPower().getRange() !== 'Perception') htmlString+='<div class="col-12 col-sm-6 col-lg-4">' +
            Data.SharedHtml.powerSkill(sectionName, powerRowIndex) + '</div>';
      }
      else  //attack doesn't have anything in this block so I might as well use else here
      {
         //if hasAutoTotal then hasRank is false
         if (hasRank)
         {
            if(this.getPower().getEffect() !== 'Feature' && Data.Modifier[name].hasAutoRank) htmlString+='<div class="col-6 col-sm-3 col-xl-auto">' +
               'Cost <span id="'+sectionName+'ModifierRankSpan'+totalIndex+'"></span></div>\n';
               //only Feature can change the ranks of these
            else
            {
               htmlString+='<label class="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto">Applications ';
               htmlString+='<input type="text" size="1" id="'+sectionName+'ModifierRank'+totalIndex+'" ' +
                  'onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').changeRank()" />';
               htmlString+='</label>\n';
            }
         }
         if(hasText) htmlString+='<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text&nbsp;<input type="text" id="'+sectionName+'ModifierText'+totalIndex+'" ' +
            'onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').changeText()" /></label>\n';
         if(hasAutoTotal || Math.abs(costPerRank) > 1 || rawTotal !== (costPerRank*rank)) htmlString+='<div class="col-auto">' +
            '=&nbsp;<span id="'+sectionName+'ModifierRowTotal'+totalIndex+'"></span></div>\n';
         //auto total must see total (it doesn't show ranks), if costPerRank isn't 1 then show total to show how much its worth,
         //if total doesn't match then it has had some cost quirk so show the total
         //yes I know if hasAutoTotal then rawTotal !== (costPerRank*rank) but checking hasAutoTotal is fast and more clear
      }
      htmlString+='   </div>\n';
      return htmlString;
   };
   /**Get the name of the modifier appended with text to determine redundancy*/
   this.getUniqueName=function(includeText)
   {
       var nameToUse;
       //all these are exclusive:
       if(name === 'Affects Others Also' || name === 'Affects Others Only') nameToUse='Affects Others';
       else if(name === 'Affects Objects Also' || name === 'Affects Objects Only') nameToUse='Affects Objects';
       else if(name === 'Alternate Resistance (Free)' || name === 'Alternate Resistance (Cost)') nameToUse='Alternate Resistance';
       else if(name === 'Easily Removable') nameToUse='Removable';
       else if(name === 'Dynamic Alternate Effect') nameToUse='Alternate Effect';
       else if(name === 'Inaccurate') nameToUse='Accurate';
       else if(name === 'Extended Range' || name === 'Diminished Range') nameToUse='Extended/Diminished Range';
       //TODO: is uncontrollable entirely a unique modifier?
       else nameToUse=name;
       //TODO: so I noticed that text should not be used most of the time for uniqueness (check required is only maybe)

       if(includeText && hasText) return (nameToUse+' ('+text+')');
       return nameToUse;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
       var json={};
       json.name=name;
       if(hasRank) json.applications=rank;
       if(hasText) json.text=text;
       return json;
   };
   /**Takes the power row raw total, sets the auto ranks, and returns the power row grand total.*/
   this.setAutoRank=function(powerRowRawTotal)
   {
       if(this.isBlank() || !hasAutoTotal) return powerRowRawTotal;

       //these autoTotals can be negative, 0, or 1 because they always cost 2 and 1
       if('Dynamic Alternate Effect' === name){autoTotal = 2 - powerRowRawTotal; return 2;}  //only exists in ruleset 1.x
       if('Alternate Effect' === name && 1 === Main.getActiveRuleset().major){autoTotal = 1 - powerRowRawTotal; return 1;}
       //Alternate Effect in ruleset 1.x forced the power to be worth a total of 1 (or 2 for Dynamic). the the flaw is all but 1
       //technically 1.x Alternate Effect was an extra to spent 1 point on a whole other sub-power

       //name can't be both alt and removable
       if('Alternate Effect' === name) autoTotal = -Math.floor(powerRowRawTotal / 2);
       else if('Easily Removable' === name) autoTotal = -Math.floor(powerRowRawTotal * 2/5);
       else if('Removable' === name) autoTotal = -Math.floor(powerRowRawTotal / 5);

       return (powerRowRawTotal + autoTotal);  //autoTotal is always negative or 0
   };
   /**This set the page's data. called only by section generate*/
   this.setValues=function()
   {
       if(this.isBlank()) return;  //already set (to default)
       var totalIndex = powerRowIndex+'.'+modifierRowIndex;
       if (document.getElementById(sectionName+'ModifierChoices'+totalIndex) !== null)
          SelectUtil.setText((sectionName+'ModifierChoices'+totalIndex), name);
       else document.getElementById(sectionName+'ModifierName'+totalIndex).innerHTML = name;
       if(document.getElementById(sectionName+'ModifierRankSpan'+totalIndex) !== null)
          document.getElementById(sectionName+'ModifierRankSpan'+totalIndex).innerHTML = rank;
       else if(hasRank) document.getElementById(sectionName+'ModifierRank'+totalIndex).value = rank;  //input
       if(hasText) document.getElementById(sectionName+'ModifierText'+totalIndex).value = text;
       if(document.getElementById(sectionName+'ModifierRowTotal'+totalIndex) !== null && hasAutoTotal)
          document.getElementById(sectionName+'ModifierRowTotal'+totalIndex).innerHTML = autoTotal;
       else if(document.getElementById(sectionName+'ModifierRowTotal'+totalIndex) !== null)
          document.getElementById(sectionName+'ModifierRowTotal'+totalIndex).innerHTML = rawTotal;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this.constructor=function()
   {
       name = undefined;
       modifierType = undefined;
       costPerRank = undefined;
       maxRank = undefined;
       hasRank = undefined;
       rank = undefined;
       hasText = undefined;
       text = undefined;
       hasAutoTotal = false;
       rawTotal = 0;
       autoTotal = undefined;
   };
   //constructor:
    this.constructor();
}
