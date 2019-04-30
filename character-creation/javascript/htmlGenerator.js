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
