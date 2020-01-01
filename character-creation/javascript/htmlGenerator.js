'use strict';
var HtmlGenerator = {};
HtmlGenerator.advantageRow = function (state, derivedValues)
{
   var htmlString = '<div class="row">', i;
   if (state.name === 'Equipment') htmlString += '<div class="col-6 col-lg-4 col-xl-auto"><b id="advantageEquipment">Equipment</b></div>\n';
   else
   {
      htmlString += '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
         '<select id="advantageChoices' + state.index + '" onChange="Main.advantageSection.getRow(' + state.index + ').select();">\n';
      htmlString += '    <option>Select Advantage</option>\n';
      var displayGodhood = (undefined !== Main && (Main.advantageSection.hasGodhoodAdvantages() || Main.canUseGodhood()));
      //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
      for (i = 0; i < Data.Advantage.names.length; i++)
      {
         if ('Equipment' !== Data.Advantage.names[i] && (displayGodhood || !Data.Advantage[Data.Advantage.names[i]].isGodhood))
            htmlString += '    <option>' + Data.Advantage.names[i] + '</option>\n';
      }
      htmlString += '</select></div>\n';
   }
   if (undefined === state.name) return htmlString + '</div>';  //done for blank

   if (state.name === 'Equipment') htmlString += '<div class="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost ' +
      '<span id="advantageEquipmentRankSpan"></span></div>\n';
   //state.rank is always defined but only show this if max rank is > 1
   else if (derivedValues.hasRank) htmlString += '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank ' +
      '<input type="text" size="1" id="advantageRank' + state.index + '" ' +
      'onChange="Main.advantageSection.getRow(' + state.index + ').changeRank();" /></label>\n';

   if (undefined !== state.text) htmlString += '<div class="col-12 col-sm-6"><input type="text" style="width: 100%" ' +
      'id="advantageText' + state.index + '" ' + 'onChange="Main.advantageSection.getRow(' + state.index + ').changeText();" /></div>\n';
   if (derivedValues.costPerRank > 1) htmlString += '<div class="col-auto">=&nbsp;<span id="advantageRowTotal' + state.index + '"></span></div>\n';
   htmlString += '</div>\n';
   return htmlString;
};
//TODO: have every html use state, derivedValues
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
HtmlGenerator.powerRow=function(isBlank, possibleActions, possibleRanges, possibleDurations, powerListParent, rowIndex,
   sectionName, effect, canSetBaseCost, skillUsed, modifierHtml)
{
   var htmlString = '<div class="container-fluid"><div class="row">\n', i;
   htmlString+='<div class="col-12 col-sm-6 col-xl-auto"><select id="'+sectionName+'Choices'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').select();">\n';
   htmlString+='    <option>Select Power</option>\n';
   var displayGodhood = (undefined !== Main && powerListParent !== Main.equipmentSection && (Main.powerSection.isUsingGodhoodPowers() || Main.canUseGodhood()));
   //equipment can't be god-like so I only need to check power section's switch
      //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
   for (i = 0; i < Data.Power.names.length; ++i)
   {
      if(displayGodhood || !Data.Power[Data.Power.names[i]].isGodhood)
         htmlString+='    <option>'+Data.Power.names[i]+'</option>\n';
   }
   htmlString+='</select></div>\n';
   if(isBlank) return htmlString + '</div></div>';  //done

   if (canSetBaseCost)
   {
      htmlString+='<label class="col">Base Cost per Rank:\n';
      htmlString+='<input type="text" size="1" id="'+sectionName+'BaseCost'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeBaseCost();" />';
      htmlString+='</label>\n';  //end col
   }
   else
   {
      htmlString+='<div class="col">Base Cost per Rank:\n';
      htmlString+='<span id="'+sectionName+'BaseCost'+rowIndex+'" style="display: inline-block; width: 50px; text-align: center;"></span>\n';
      htmlString+='</div>\n';  //end col
   }
   htmlString+='</div>\n';  //end row
   htmlString+='<div class="row"><input type="text" style="width: 100%" id="'+sectionName+'Text'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeText();" /></div>\n';
   htmlString+='<div class="row justify-content-center">\n';

   htmlString+='<div class="col-12 col-sm-4 col-lg-3">\n';
   if(1 === possibleActions.length) htmlString+='Action <span id="'+sectionName+'SelectAction'+rowIndex+'" style="display: inline-block; width: 85px; text-align: center;"></span>\n';
      //although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
   else
   {
      htmlString+='<label>Action';
      htmlString+='         <select id="'+sectionName+'SelectAction'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectAction();">\n';
      for (i = 0; i < possibleActions.length; ++i)
      {
         htmlString+='             <option>' + possibleActions[i] + '</option>\n';
      }
      htmlString+='         </select></label>\n';
   }
   htmlString+='      </div>\n';

   htmlString+='      <div class="col-12 col-sm-4 col-lg-3">\n';
   if(1 === possibleRanges.length) htmlString+='Range <span id="'+sectionName+'SelectRange'+rowIndex+'" style="display: inline-block; width: 90px; text-align: center;"></span>\n';
   else
   {
      htmlString+='<label>Range';
      htmlString+='          <select id="'+sectionName+'SelectRange'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectRange();">\n';
      for (i = 0; i < possibleRanges.length; ++i)
      {
         htmlString+='             <option>' + possibleRanges[i] + '</option>\n';
      }
      htmlString+='         </select></label>\n';
   }
   htmlString+='      </div>\n';

   htmlString+='      <div class="col-12 col-sm-4 col-lg-3">\n';
   if(1 === possibleDurations.length) htmlString+='Duration <span id="'+sectionName+'SelectDuration'+rowIndex+'" style="display: inline-block; width: 80px; text-align: center;"></span>\n';
   else
   {
      htmlString+='<label>Duration';
      htmlString+='          <select id="'+sectionName+'SelectDuration'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectDuration();">\n';
      for (i = 0; i < possibleDurations.length; ++i)
      {
         htmlString+='             <option>' + possibleDurations[i] + '</option>\n';
      }
      htmlString+='         </select></label>\n';
   }
   htmlString+='      </div>\n';
   htmlString+='   </div>\n';  //row

   if (Data.Power[effect].isAttack)  //don't check for attack modifier because that's handled by the modifier generate
   {
      htmlString+='   <div class="row justify-content-end justify-content-xl-center">\n';
      htmlString+='      <div class="col-12 col-sm-6 col-lg-5 col-xl-4">\n';
      htmlString+=Data.SharedHtml.powerName(sectionName, rowIndex);
      htmlString+='      </div>\n';
      if(undefined !== skillUsed) htmlString+='<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' + Data.SharedHtml.powerSkill(sectionName, rowIndex) + '</div>';
      htmlString+='   </div>\n';
   }

   htmlString+=modifierHtml;

   htmlString+='<div class="row">\n';
   htmlString+='<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ';
   htmlString+='<input type="text" size="1" id="'+sectionName+'Rank'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeRank();" /></label>\n';
   htmlString+='<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank:\n';
   htmlString+='<span id="'+sectionName+'TotalCostPerRank'+rowIndex+'"></span></div>\n';
   htmlString+='<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost:\n';
   htmlString+='<span id="'+sectionName+'FlatModifierCost'+rowIndex+'"></span></div>\n';
   htmlString+='</div>\n';
   htmlString+='<div class="row"><div class="col">Grand total for ' + sectionName.toTitleCase() + ': ';
   htmlString+='<span id="'+sectionName+'RowTotal'+rowIndex+'"></span></div>\n';
   htmlString+='</div>\n';
   htmlString+='</div><hr />\n\n';
   return htmlString;
};
HtmlGenerator.skillRow=function(isBlank, rowIndex, hasText)
{
      var htmlString = '<div class="row">\n';
      htmlString+='<div class="col-12 col-sm-4 col-lg-3 col-xl-auto">';
      htmlString+='<select id="skillChoices'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').select();">\n';
      htmlString+='   <option>Select Skill</option>\n';
      for (var i=0; i < Data.Skill.names.length; i++)
      {
         htmlString+='   <option>'+Data.Skill.names[i]+'</option>\n';
      }
      htmlString+='</select></div>\n';
      if(isBlank) return htmlString + '</div>';  //done

      if (hasText)
      {
         htmlString += '<div class="col-12 col-sm-8 col-md-5">';
         htmlString += '<input type="text" style="width: 100%" id="skillText' + rowIndex + '" onChange="Main.skillSection.getRow(' + rowIndex + ').changeText();" />';
         htmlString += '</div>\n';
         htmlString += '<div class="col-12 col-md-3 col-lg-4 col-xl-auto">';
      }
      else htmlString+='<div class="col-12 col-sm-8 col-xl-auto">';
      htmlString+='<label>Ranks <input type="text" size="1" id="skillRank'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').changeRank();" /></label>\n';
      //v1 Expertise can use any ability but PL sounds like Int only. Also sounds like the rest are set
      htmlString+='+&nbsp;<select id="skillAbility'+rowIndex+'" onChange="Main.skillSection.getRow('+rowIndex+').selectAbility();">\n';
      htmlString+='   <option>Strength</option>\n';  //hard coding is more readable and Data.Ability.names doesn't change
      htmlString+='   <option>Agility</option>\n';
      htmlString+='   <option>Fighting</option>\n';
      htmlString+='   <option>Dexterity</option>\n';
      htmlString+='   <option>Stamina</option>\n';
      htmlString+='   <option>Intellect</option>\n';
      htmlString+='   <option>Awareness</option>\n';
      htmlString+='   <option>Presence</option>\n';
      htmlString+='</select>\n';
      htmlString+='(<span id="skillBonus'+rowIndex+'"></span>)\n';
      htmlString+='</div>\n';
      htmlString+='</div>\n';
      return htmlString;
};
