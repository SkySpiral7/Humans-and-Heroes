'use strict';
var HtmlGenerator = {};
HtmlGenerator.advantageRow=function(rowIndex, isBlank, name, costPerRank, hasRank, hasText)
{
   var htmlString = '<div class="row">', i;
   if(name === 'Equipment') htmlString+='<div class="col-6 col-lg-4 col-xl-auto"><b id="advantageEquipment">Equipment</b></div>\n';
   else
   {
      htmlString+='<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
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
   if(isBlank) return htmlString + '</div>';  //done

   if(name === 'Equipment') htmlString+='<div class="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost <span id="advantageEquipmentRankSpan"></span></div>\n';
   else if(hasRank) htmlString+='<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank <input type="text" size="1" id="advantageRank'+rowIndex+'" ' +
      'onChange="Main.advantageSection.getRow('+rowIndex+').changeRank();" /></label>\n';

   if(hasText) htmlString+='<div class="col-12 col-sm-6"><input type="text" style="width: 100%" id="advantageText'+rowIndex+'" ' +
      'onChange="Main.advantageSection.getRow('+rowIndex+').changeText();" /></div>\n';
   if(costPerRank > 1) htmlString+='<div class="col-auto">=&nbsp;<span id="advantageRowTotal'+rowIndex+'"></span></div>\n';
   htmlString+='</div>\n';
   return htmlString;
};
HtmlGenerator.modifierRow=function(isBlank, power, powerRowIndex, modifierRowIndex, sectionName, name, costPerRank,
                                   hasRank, rank, hasText, hasAutoTotal, rawTotal)
{
   var totalIndex = powerRowIndex+'.'+modifierRowIndex;
   var htmlString='';
   htmlString+='   <div class="row">\n';  //TODO: confirm html and test
   htmlString+='      <div class="col-12 col-sm-5 col-lg-4 col-xl-auto">\n';
   var amReadOnly = ('Selective' === name && 'Triggered' === power.getAction());
   //Triggered requires Selective started between 2.0 and 2.5. Triggered isn't an action in 1.0
   if(undefined !== name && !amReadOnly) amReadOnly = Data.Modifier[name].isReadOnly;
   if (power.getEffect() === 'Feature' || !amReadOnly)
   {
      htmlString+='         <select id="'+sectionName+'ModifierChoices'+totalIndex+'" ' +
         'onChange="Main.'+sectionName+'Section.getRow('+powerRowIndex+').getModifierList().getRow('+modifierRowIndex+').select()">\n';
      htmlString+='             <option>Select Modifier</option>\n';
      for (var i=0; i < Data.Modifier.names.length; i++)
      {
         if(power.getSection() === Main.equipmentSection &&
            (Data.Modifier.names[i] === 'Removable' || Data.Modifier.names[i] === 'Easily Removable')) continue;
         //equipment has removable built in and can't have the modifiers
         if(power.getEffect() === 'Feature' || !Data.Modifier[Data.Modifier.names[i]].isReadOnly)
            htmlString+='             <option>'+Data.Modifier.names[i]+'</option>\n';
      }
      htmlString+='         </select>\n';
   }
   else htmlString+='          <b><span id="'+sectionName+'ModifierName'+totalIndex+'"></span></b>\n';  //I know I could have the b tag with the id but I don't like that
   htmlString+='      </div>\n';
   if(isBlank) return htmlString + '   </div>\n';  //done

   if (name === 'Attack')
   {
      htmlString+='      <div class="col-12 col-sm-6 col-lg-4">\n';
      htmlString+=Data.SharedHtml.powerName(sectionName, powerRowIndex);
      htmlString+='      </div>\n';
      if(power.getRange() !== 'Perception') htmlString+='<div class="col-12 col-sm-6 col-lg-4">' +
         Data.SharedHtml.powerSkill(sectionName, powerRowIndex) + '</div>';
   }
   else  //attack doesn't have anything in this block so I might as well use else here
   {
      //if hasAutoTotal then hasRank is false
      if (hasRank)
      {
         if(power.getEffect() !== 'Feature' && Data.Modifier[name].hasAutoRank) htmlString+='<div class="col-6 col-sm-3 col-xl-auto">' +
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
