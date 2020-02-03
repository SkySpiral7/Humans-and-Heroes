'use strict';
var HtmlGenerator = {};
HtmlGenerator.advantageRow = function (state, derivedValues)
{
   var htmlString = '<div class="row">', i;
   if (state.name === 'Equipment') htmlString += '<div class="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>';
   else
   {
      htmlString += '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
         '<select id="advantageChoices' + state.rowIndex + '" onChange="Main.advantageSection.getRow(' + state.rowIndex + ').select();">';
      htmlString += '<option>Select Advantage</option>';
      var displayGodhood = (undefined !== Main && (Main.advantageSection.hasGodhoodAdvantages() || Main.canUseGodhood()));
      //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
      for (i = 0; i < Data.Advantage.names.length; i++)
      {
         if ('Equipment' !== Data.Advantage.names[i] && (displayGodhood || !Data.Advantage[Data.Advantage.names[i]].isGodhood))
         {
            htmlString += '<option';
            if (state.name === Data.Advantage.names[i]) htmlString += ' selected';
            htmlString += '>' + Data.Advantage.names[i] + '</option>';
         }
      }
      htmlString += '</select></div>';
   }
   if (undefined === state.name) return htmlString + '</div>';  //done for blank

   if (state.name === 'Equipment') htmlString += '<div class="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost ' +
      state.rank + '</div>';
   //state.rank is always defined but only show this if max rank is > 1
   else if (derivedValues.hasRank) htmlString += '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank ' +
      '<input type="text" size="1" id="advantageRank' + state.rowIndex + '" ' +
      'onChange="Main.advantageSection.getRow(' + state.rowIndex + ').changeRank();" value="' + state.rank + '" /></label>';

   if (undefined !== state.text) htmlString += '<div class="col-12 col-sm-6"><input type="text" style="width: 100%" ' +
      'id="advantageText' + state.rowIndex + '" onChange="Main.advantageSection.getRow(' + state.rowIndex + ').changeText();" ' +
      'value="' + state.text + '" /></div>';
   if (derivedValues.costPerRank > 1) htmlString += '<div class="col-auto">=&nbsp;' + derivedValues.total + '</div>';
   htmlString += '</div>';
   return htmlString;
};
/*
values used:
props: {powerRowParent, sectionName};
state: {powerRowIndex, modifierRowIndex, name, rank};
derivedValues: {costPerRank, hasRank, hasText, hasAutoTotal, rawTotal};
*/
HtmlGenerator.modifierRow=function(props, state, derivedValues)
{
   function idFor(elementLabel)
   {
      return props.sectionName + 'Modifier' + elementLabel + state.powerRowIndex + '.' + state.modifierRowIndex;
   }

   var onChangePrefix = 'Main.' + props.sectionName + 'Section.getModifierRowShort(' +
      state.powerRowIndex + ',' + state.modifierRowIndex + ')';
   var htmlString = '<div class="row">';
   htmlString += '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">';
   var amReadOnly = ('Selective' === state.name && 'Triggered' === props.powerRowParent.getAction());
   //Triggered requires Selective started between 2.0 and 2.5. Triggered is only an action in 2.x
   //Triggered's Selective is amReadOnly even for Feature
   if (!amReadOnly && undefined !== state.name &&
      props.powerRowParent.getEffect() !== 'Feature') amReadOnly = Data.Modifier[state.name].isReadOnly;
   if (!amReadOnly)
   {
      htmlString += '<select id="' + idFor('Choices') + '" ' +
         'onChange="' + onChangePrefix + '.select()">';
      htmlString += '<option>Select Modifier</option>';
      for (var i = 0; i < Data.Modifier.names.length; i++)
      {
         if (props.powerRowParent.getSection() === Main.equipmentSection &&
            (Data.Modifier.names[i] === 'Removable' || Data.Modifier.names[i] === 'Easily Removable')) continue;
         //equipment has removable built in and can't have the modifiers
         if (props.powerRowParent.getEffect() === 'Feature' || !Data.Modifier[Data.Modifier.names[i]].isReadOnly)
         {
            htmlString += '<option';
            if (state.name === Data.Modifier.names[i]) htmlString += ' selected';
            htmlString += '>' + Data.Modifier.names[i] + '</option>';
         }
      }
      htmlString += '</select>';
   }
   else htmlString += '<b>'+state.name+'</b>';
   htmlString += '</div>';  //end col
   if (undefined === state.name) return htmlString + '</div>';  //done for blank

   if ('Attack' === state.name)
   {
      htmlString += '<div class="col-12 col-sm-6 col-lg-4">';
      htmlString += Data.SharedHtml.powerName(props.sectionName, state.powerRowIndex);
      htmlString += '</div>';
      if (props.powerRowParent.getRange() !== 'Perception') htmlString += '<div class="col-12 col-sm-6 col-lg-4">' +
         Data.SharedHtml.powerSkill(props.sectionName, state.powerRowIndex) + '</div>';
   }
   else  //attack doesn't have anything in this block so I might as well use else here
   {
      //if hasAutoTotal then hasRank is false
      if (derivedValues.hasRank)
      {
         if (props.powerRowParent.getEffect() !== 'Feature' && Data.Modifier[state.name].hasAutoRank) htmlString +=
            '<div class="col-6 col-sm-3 col-xl-auto">' +
            'Cost ' + state.rank + '</div>';
         //only Feature can change the ranks of these
         else
         {
            htmlString += '<label class="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto">Applications ';
            htmlString += '<input type="text" size="1" id="' + idFor('Rank') + '" ' +
               'onChange="' + onChangePrefix + '.changeRank()" value="' + state.rank + '" />';
            htmlString += '</label>';
         }
      }
      if (derivedValues.hasText) htmlString += '<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text' +
         '&nbsp;<input type="text" id="' + idFor('Text') + '" ' +
         'onChange="' + onChangePrefix + '.changeText()" value="'+state.text+'" /></label>';
      //auto total must see total (it doesn't show ranks)
      if (derivedValues.hasAutoTotal)
         htmlString += '<div class="col-auto">' +
            '=&nbsp;' + derivedValues.autoTotal + '</div>';
      //if costPerRank isn't 1 then show total to show how much its worth,
      //if total doesn't match then it has had some cost quirk so show the total
      else if (Math.abs(derivedValues.costPerRank) > 1
         || derivedValues.rawTotal !== (derivedValues.costPerRank * state.rank))
         htmlString += '<div class="col-auto">' +
            '=&nbsp;' + derivedValues.rawTotal + '</div>';
   }
   htmlString += '</div>';
   return htmlString;
};
/*
values used:
var props = {powerListParent, sectionName};
var state = {rowIndex, effect, skillUsed};
var derivedValues = {possibleActions, possibleRanges, possibleDurations, canSetBaseCost, modifierHtml};
*/
//TODO: delete setValues. have generate populate the values as it creates (closer to react)
HtmlGenerator.powerRow = function (props, state, derivedValues)
{
   function idFor(elementLabel)
   {
      return props.sectionName + elementLabel + state.rowIndex;
   }

   function onChangeFor(nextFunctionName)
   {
      return 'Main.' + props.sectionName + 'Section.getRow(' + state.rowIndex + ').' + nextFunctionName + '();'
   }

   var htmlString = '<div class="container-fluid"><div class="row">\n', i;
   htmlString += '<div class="col-12 col-sm-6 col-xl-auto"><select id="' +
      idFor('Choices') + '" onChange="' + onChangeFor('select') + '">\n';
   htmlString += '    <option>Select Power</option>\n';
   var displayGodhood = (undefined !== Main && props.powerListParent !== Main.equipmentSection &&
      (Main.powerSection.isUsingGodhoodPowers() || Main.canUseGodhood()));
   //equipment can't be god-like so I only need to check power section's switch
   //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
   for (i = 0; i < Data.Power.names.length; ++i)
   {
      if (displayGodhood || !Data.Power[Data.Power.names[i]].isGodhood)
         htmlString += '    <option>' + Data.Power.names[i] + '</option>\n';
   }
   htmlString += '</select></div>\n';
   if (undefined === state.effect) return htmlString + '</div></div>';  //done for blank

   if (derivedValues.canSetBaseCost)
   {
      htmlString += '<label class="col">Base Cost per Rank:\n';
      htmlString += '<input type="text" size="1" id="' + idFor('BaseCost') + '" onChange="' +
         onChangeFor('changeBaseCost') + '" />';
      htmlString += '</label>\n';  //end col
   }
   else
   {
      htmlString += '<div class="col">Base Cost per Rank:\n';
      htmlString += '<span id="' + idFor('BaseCost') + '" style="display: inline-block; width: 50px; ' +
         'text-align: center;"></span>\n';
      htmlString += '</div>\n';  //end col
   }
   htmlString += '</div>\n';  //end row
   htmlString += '<div class="row"><input type="text" style="width: 100%" id="' + idFor('Text') + '" ' +
      'onChange="' + onChangeFor('changeText') + '" /></div>\n';
   htmlString += '<div class="row justify-content-center">\n';

   htmlString += '<div class="col-12 col-sm-4 col-lg-3">\n';
   if (1 === derivedValues.possibleActions.length) htmlString += 'Action <span id="' + idFor('SelectAction') + '" ' +
      'style="display: inline-block; width: 85px; text-align: center;"></span>\n';
   //although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
   else
   {
      htmlString += '<label>Action';
      htmlString += '         <select id="' + idFor('SelectAction') + '" onChange="' +
         onChangeFor('selectAction') + '">\n';
      for (i = 0; i < derivedValues.possibleActions.length; ++i)
      {
         htmlString += '             <option>' + derivedValues.possibleActions[i] + '</option>\n';
      }
      htmlString += '         </select></label>\n';
   }
   htmlString += '      </div>\n';

   htmlString += '      <div class="col-12 col-sm-4 col-lg-3">\n';
   if (1 === derivedValues.possibleRanges.length) htmlString += 'Range <span id="' + idFor('SelectRange') + '" ' +
      'style="display: inline-block; width: 90px; text-align: center;"></span>\n';
   else
   {
      htmlString += '<label>Range';
      htmlString += '          <select id="' + idFor('SelectRange') + '" onChange="' +
         onChangeFor('selectRange') + '">\n';
      for (i = 0; i < derivedValues.possibleRanges.length; ++i)
      {
         htmlString += '             <option>' + derivedValues.possibleRanges[i] + '</option>\n';
      }
      htmlString += '         </select></label>\n';
   }
   htmlString += '      </div>\n';

   htmlString += '      <div class="col-12 col-sm-4 col-lg-3">\n';
   if (1 === derivedValues.possibleDurations.length) htmlString += 'Duration <span id="' +
      idFor('SelectDuration') + '" style="display: inline-block; width: 80px; text-align: center;"></span>\n';
   else
   {
      htmlString += '<label>Duration';
      htmlString += '          <select id="' + idFor('SelectDuration') + '" onChange="' +
         onChangeFor('selectDuration') + '">\n';
      for (i = 0; i < derivedValues.possibleDurations.length; ++i)
      {
         htmlString += '             <option>' + derivedValues.possibleDurations[i] + '</option>\n';
      }
      htmlString += '         </select></label>\n';
   }
   htmlString += '      </div>\n';
   htmlString += '   </div>\n';  //row

   //don't check for attack modifier because that's handled by the modifier generate
   if (Data.Power[state.effect].isAttack)
   {
      htmlString += '   <div class="row justify-content-end justify-content-xl-center">\n';
      htmlString += '      <div class="col-12 col-sm-6 col-lg-5 col-xl-4">\n';
      htmlString += Data.SharedHtml.powerName(props.sectionName, state.rowIndex);
      htmlString += '      </div>\n';
      if (undefined !== state.skillUsed) htmlString += '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
         Data.SharedHtml.powerSkill(props.sectionName, state.rowIndex) + '</div>';
      htmlString += '   </div>\n';
   }

   htmlString += derivedValues.modifierHtml;

   htmlString += '<div class="row">\n';
   htmlString += '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ';
   htmlString += '<input type="text" size="1" id="' + idFor('Rank') + '" onChange="' +
      onChangeFor('changeRank') + '" /></label>\n';
   htmlString += '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank:\n';
   htmlString += '<span id="' + idFor('TotalCostPerRank') + '"></span></div>\n';
   htmlString += '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost:\n';
   htmlString += '<span id="' + idFor('FlatModifierCost') + '"></span></div>\n';
   htmlString += '</div>\n';
   htmlString += '<div class="row"><div class="col">Grand total for ' + props.sectionName.toTitleCase() + ': ';
   htmlString += '<span id="' + idFor('RowTotal') + '"></span></div>\n';
   htmlString += '</div>\n';
   htmlString += '</div><hr />\n\n';
   return htmlString;
};
HtmlGenerator.skillRow=function(state, derivedValues)
{
   var htmlString = '<div class="row">\n';
   htmlString += '<div class="col-12 col-sm-4 col-lg-3 col-xl-auto">';
   htmlString += '<select id="skillChoices' + state.rowIndex + '" ' +
      'onChange="Main.skillSection.getRow(' + state.rowIndex + ').select();">\n';
   htmlString += '   <option>Select Skill</option>\n';
   for (var i = 0; i < Data.Skill.names.length; i++)
   {
      htmlString += '   <option>' + Data.Skill.names[i] + '</option>\n';
   }
   htmlString += '</select></div>\n';
   if (undefined === state.name) return htmlString + '</div>';  //done

   if (derivedValues.hasText)
   {
      htmlString += '<div class="col-12 col-sm-8 col-md-5">';
      htmlString += '<input type="text" style="width: 100%" id="skillText' + state.rowIndex + '" ' +
         'onChange="Main.skillSection.getRow(' + state.rowIndex + ').changeText();" />';
      htmlString += '</div>\n';
      htmlString += '<div class="col-12 col-md-3 col-lg-4 col-xl-auto">';
   }
   else htmlString += '<div class="col-12 col-sm-8 col-xl-auto">';
   htmlString += '<label>Ranks <input type="text" size="1" id="skillRank' + state.rowIndex + '" ' +
      'onChange="Main.skillSection.getRow(' + state.rowIndex + ').changeRank();" /></label>\n';
   //v1 Expertise can use any ability but PL sounds like Int only. Also sounds like the rest are set
   htmlString += '+&nbsp;<select id="skillAbility' + state.rowIndex + '" ' +
      'onChange="Main.skillSection.getRow(' + state.rowIndex + ').selectAbility();">\n';
   htmlString += '   <option>Strength</option>\n';  //hard coding is more readable and Data.Ability.names doesn't change
   htmlString += '   <option>Agility</option>\n';
   htmlString += '   <option>Fighting</option>\n';
   htmlString += '   <option>Dexterity</option>\n';
   htmlString += '   <option>Stamina</option>\n';
   htmlString += '   <option>Intellect</option>\n';
   htmlString += '   <option>Awareness</option>\n';
   htmlString += '   <option>Presence</option>\n';
   htmlString += '</select>\n';
   htmlString += '(<span id="skillBonus' + state.rowIndex + '"></span>)\n';
   htmlString += '</div>\n';
   htmlString += '</div>\n';
   return htmlString;
};
