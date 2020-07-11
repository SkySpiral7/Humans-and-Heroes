'use strict';
var HtmlGenerator = {};
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
      htmlString += Data.SharedHtml.powerName(props.sectionName, state.powerRowIndex, props.powerRowParent.getName());
      htmlString += '</div>';
      if (props.powerRowParent.getRange() !== 'Perception') htmlString += '<div class="col-12 col-sm-6 col-lg-4">' +
         Data.SharedHtml.powerSkill(props.sectionName, state.powerRowIndex, props.powerRowParent.getSkillUsed()) + '</div>';
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
var derivedValues = {possibleActions, possibleRanges, possibleDurations, canSetBaseCost};
*/
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

   var htmlString = '<div class="container-fluid"><div class="row">', i;
   htmlString += '<div class="col-12 col-sm-6 col-xl-auto"><select id="' +
      idFor('Choices') + '" onChange="' + onChangeFor('select') + '">';
   htmlString += '<option>Select Power</option>';
   var displayGodhood = (undefined !== Main && props.powerListParent !== Main.equipmentSection &&
      Main.canUseGodhood());
   /*displayGodhood is false during main's constructor
   equipment can't be god-like so exclude it
   don't check isUsingGodhoodPowers because global includes that (more relevant with react)*/
   for (i = 0; i < Data.Power.names.length; ++i)
   {
      if (displayGodhood || !Data.Power[Data.Power.names[i]].isGodhood)
      {
         htmlString += '<option';
         if (state.effect === Data.Power.names[i]) htmlString += ' selected';
         htmlString += '>' + Data.Power.names[i] + '</option>';
      }
   }
   htmlString += '</select></div>';
   if (undefined === state.effect) return htmlString + '</div></div>';  //done for blank

   if (derivedValues.canSetBaseCost)
   {
      htmlString += '<label class="col">Base Cost per Rank: ';
      htmlString += '<input type="text" size="1" id="' + idFor('BaseCost') + '" onChange="' +
         onChangeFor('changeBaseCost') + '" value="' + state.baseCost + '" />';
      htmlString += '</label>';  //end base cost col
   }
   else
   {
      htmlString += '<div class="col">Base Cost per Rank: ';
      htmlString += '<span id="' + idFor('BaseCost') + '" style="display: inline-block; width: 50px; ' +
         'text-align: center;">' + state.baseCost + '</span>';
      htmlString += '</div>';  //end base cost col
   }
   htmlString += '</div>';  //end power/cost row
   htmlString += '<div class="row"><input type="text" style="width: 100%" id="' + idFor('Text') + '" ' +
      'onChange="' + onChangeFor('changeText') + '" value="' + state.text + '" /></div>';
   htmlString += '<div class="row justify-content-center">';  //action, range, duration row

   htmlString += '<div class="col-12 col-sm-4 col-lg-3">';
   if (1 === derivedValues.possibleActions.length) htmlString += 'Action <span id="' + idFor('SelectAction') + '" ' +
      'style="display: inline-block; width: 85px; text-align: center;"><b>' + state.action + '</b></span>';
   //although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
   else
   {
      htmlString += '<label>Action';
      htmlString += '<select id="' + idFor('SelectAction') + '" onChange="' +
         onChangeFor('selectAction') + '">';
      for (i = 0; i < derivedValues.possibleActions.length; ++i)
      {
         htmlString += '<option';
         if (state.action === derivedValues.possibleActions[i]) htmlString += ' selected';
         htmlString += '>' + derivedValues.possibleActions[i] + '</option>';
      }
      htmlString += '</select></label>';
   }
   htmlString += '</div>';

   htmlString += '<div class="col-12 col-sm-4 col-lg-3">';
   if (1 === derivedValues.possibleRanges.length) htmlString += 'Range <span id="' + idFor('SelectRange') + '" ' +
      'style="display: inline-block; width: 90px; text-align: center;"><b>' + state.range + '</b></span>';
   else
   {
      htmlString += '<label>Range';
      htmlString += '<select id="' + idFor('SelectRange') + '" onChange="' +
         onChangeFor('selectRange') + '">';
      for (i = 0; i < derivedValues.possibleRanges.length; ++i)
      {
         htmlString += '<option';
         if (state.range === derivedValues.possibleRanges[i]) htmlString += ' selected';
         htmlString += '>' + derivedValues.possibleRanges[i] + '</option>';
      }
      htmlString += '</select></label>';
   }
   htmlString += '</div>';

   htmlString += '<div class="col-12 col-sm-4 col-lg-3">';
   if (1 === derivedValues.possibleDurations.length) htmlString += 'Duration <span id="' +
      idFor('SelectDuration') + '" style="display: inline-block; width: 80px; text-align: center;"><b>' + state.duration + '</b></span>';
   else
   {
      htmlString += '<label>Duration';
      htmlString += '<select id="' + idFor('SelectDuration') + '" onChange="' +
         onChangeFor('selectDuration') + '">';
      for (i = 0; i < derivedValues.possibleDurations.length; ++i)
      {
         htmlString += '<option';
         if (state.duration === derivedValues.possibleDurations[i]) htmlString += ' selected';
         htmlString += '>' + derivedValues.possibleDurations[i] + '</option>';
      }
      htmlString += '</select></label>';
   }
   htmlString += '</div>';
   htmlString += '</div>';  //end action, range, duration row

   //don't check for attack modifier because that's handled by the modifier generate
   if (Data.Power[state.effect].isAttack)
   {
      htmlString += '<div class="row justify-content-end justify-content-xl-center">';
      htmlString += '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">';
      htmlString += Data.SharedHtml.powerName(props.sectionName, state.rowIndex, state.name);
      htmlString += '</div>';
      if (undefined !== state.skillUsed) htmlString += '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
         Data.SharedHtml.powerSkill(props.sectionName, state.rowIndex, state.skillUsed) + '</div>';
      htmlString += '</div>';
   }

   htmlString += '<div id="' + props.sectionName + 'ModifierSection' + state.rowIndex + '">';
   //modifiers will hook into here
   htmlString += '</div>';

   htmlString += '<div class="row">';
   htmlString += '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ';
   htmlString += '<input type="text" size="1" id="' + idFor('Rank') + '" onChange="' +
      onChangeFor('changeRank') + '" value="' + state.rank + '" /></label>';
   var costPerRankDisplay = derivedValues.costPerRank;
   if (derivedValues.costPerRank > 0) costPerRankDisplay = '' + derivedValues.costPerRank;
   else costPerRankDisplay = '(1/' + (2 - derivedValues.costPerRank) + ')';  //0 is 1/2 and -1 is 1/3
   htmlString += '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: ' + costPerRankDisplay + '</div>';
   htmlString += '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: ' + derivedValues.flatValue + '</div>';
   htmlString += '</div>';  //end row of costs
   htmlString += '<div class="row"><div class="col">Grand total for ' + props.sectionName.toTitleCase() + ': ';
   htmlString += state.total + '</div>';
   htmlString += '</div>';
   htmlString += '</div><hr />';
   return htmlString;
};
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
