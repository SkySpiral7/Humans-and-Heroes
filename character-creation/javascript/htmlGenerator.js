'use strict';
var HtmlGenerator = {};
/*
values used:
state: {rowIndex, name, text, rank, abilityName};
derivedValues: {hasText, totalBonus};
*/
HtmlGenerator.skillRow = function (state, derivedValues)
{
   var htmlString = '<div class="row">', i;
   htmlString += '<div class="col-12 col-sm-4 col-lg-3 col-xl-auto">';
   htmlString += '<select id="skillChoices' + state.rowIndex + '" ' +
      'onChange="Main.skillSection.getRow(' + state.rowIndex + ').select();">';
   htmlString += '<option>Select Skill</option>';
   for (i = 0; i < Data.Skill.names.length; i++)
   {
      htmlString += '<option';
      if (state.name === Data.Skill.names[i]) htmlString += ' selected';
      htmlString += '>' + Data.Skill.names[i] + '</option>';
   }
   htmlString += '</select></div>';
   if (undefined === state.name) return htmlString + '</div>';  //done

   if (derivedValues.hasText)
   {
      htmlString += '<div class="col-12 col-sm-8 col-md-5">';
      htmlString += '<input type="text" style="width: 100%" id="skillText' + state.rowIndex + '" ' +
         'onChange="Main.skillSection.getRow(' + state.rowIndex + ').changeText();" value="' + state.text + '" />';
      htmlString += '</div>';
      htmlString += '<div class="col-12 col-md-3 col-lg-4 col-xl-auto">';
   }
   else htmlString += '<div class="col-12 col-sm-8 col-xl-auto">';
   htmlString += '<label>Ranks <input type="text" size="1" id="skillRank' + state.rowIndex + '" ' +
      'onChange="Main.skillSection.getRow(' + state.rowIndex + ').changeRank();" value="' + state.rank + '" /></label>';
   //v1 Expertise can use any ability but PL sounds like Int only. Also sounds like the rest are set
   htmlString += '+&nbsp;<select id="skillAbility' + state.rowIndex + '" ' +
      'onChange="Main.skillSection.getRow(' + state.rowIndex + ').selectAbility();">';
   //data doesn't change but loop makes selected easier
   for (i = 0; i < Data.Ability.names.length; i++)
   {
      htmlString += '<option';
      if (state.abilityName === Data.Ability.names[i]) htmlString += ' selected';
      htmlString += '>' + Data.Ability.names[i] + '</option>';
   }
   htmlString += '</select>';
   htmlString += '(' + derivedValues.totalBonus + ')';
   htmlString += '</div>';
   htmlString += '</div>';
   return htmlString;
};
