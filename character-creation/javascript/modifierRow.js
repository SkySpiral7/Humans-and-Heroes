'use strict';

var ModifierObject = {};
/**Returns a json object of this row's data*/
ModifierObject.toSave = function (state, derivedValues)
{
   //don't just clone state: rank is different
   var json = {};
   json.name = state.name;
   //don't include rank if there's only 1 possible rank
   if (derivedValues.hasRank) json.applications = state.rank;
   //checking hasText is redundant but more clear
   if (derivedValues.hasText) json.text = state.text;
   return json;
};
ModifierObject.sanitizeStateAndGetDerivedValues = function (inputState, powerEffect, validActivationInfoObj, powerSectionName, loadLocation)
{
   if (!Data.Modifier.names.contains(inputState.name))
   {
      Main.messageUser(
         'ModifierObject.sanitizeStateAndGetDerivedValues.notExist', loadLocation + ': ' +
         inputState.name + ' is not a modifier name. Did you mean "Other" with text?');
      return;  //undefined
   }
   if ('equipment' === powerSectionName && ('Removable' === inputState.name || 'Easily Removable' === inputState.name))
   {
      Main.messageUser(
         'ModifierObject.sanitizeStateAndGetDerivedValues.removableEquipment', loadLocation + ': ' +
         'equipment can\'t have removable modifier since it is built in.');
      return;  //undefined
   }
   var validState = {name: inputState.name};

   var derivedValues = {};
   derivedValues.modifierType = Data.Modifier[validState.name].type;
   derivedValues.costPerRank = Data.Modifier[validState.name].cost;
   derivedValues.maxRank = Data.Modifier[validState.name].maxRank;
   derivedValues.hasRank = (1 !== derivedValues.maxRank);
   derivedValues.hasText = Data.Modifier[validState.name].hasText;
   derivedValues.hasAutoTotal = Data.Modifier[validState.name].hasAutoTotal;
   //derivedValues.autoTotal is undefined for most. will be set in ModifierList.calculateGrandTotal

   if (derivedValues.hasRank)
   {
      if ('Fragile' === validState.name) validState.rank = sanitizeNumber(inputState.rank, 0, 0);  //the only modifier than can have 0 ranks
      else validState.rank = sanitizeNumber(inputState.rank, 1, 1);  //all others must have at least 1 rank
      if (validState.rank > derivedValues.maxRank) validState.rank = derivedValues.maxRank;
   }
   else validState.rank = 1;

   if (derivedValues.hasText && undefined === inputState.text) validState.text = Data.Modifier[validState.name].defaultText;
   else if (derivedValues.hasText) validState.text = inputState.text;
   else validState.text = undefined;

   //else: derivedValues.rawTotal = undefined
   if (!derivedValues.hasAutoTotal)
   {
      var effectiveRank = validState.rank;
      if ((validState.name === 'Decreased Duration' && Data.Power[powerEffect].defaultDuration === 'Permanent') ||
         (validState.name === 'Increased Duration' && validActivationInfoObj.duration.current === 'Permanent')) effectiveRank -= 2;
      else if ((validState.name === 'Reduced Range' && Data.Power[powerEffect].defaultRange === 'Perception') ||
         (validState.name === 'Increased Range' && validActivationInfoObj.range.current === 'Perception')) effectiveRank++;

      derivedValues.rawTotal = derivedValues.costPerRank * effectiveRank;
   }

   return {state: validState, derivedValues: derivedValues};
};
/**Get the name of the modifier appended with text to determine redundancy*/
ModifierObject.getUniqueName = function (state, includeText)
{
   var nameToUse;
   //all these are exclusive:
   if ('Affects Others Also' === state.name || 'Affects Others Only' === state.name || 'Attack' === state.name) nameToUse = 'Non personal';
   else if ('Affects Objects Also' === state.name || 'Affects Objects Only' === state.name) nameToUse = 'Affects Objects';
   else if ('Alternate Resistance (Free)' === state.name || 'Alternate Resistance (Cost)' === state.name) nameToUse = 'Alternate Resistance';
   else if ('Easily Removable' === state.name) nameToUse = 'Removable';
   else if ('Dynamic Alternate Effect' === state.name) nameToUse = 'Alternate Effect';
   else if ('Inaccurate' === state.name) nameToUse = 'Accurate';
   else if ('Extended Range' === state.name || 'Diminished Range' === state.name) nameToUse = 'Extended/Diminished Range';
   //TODO: is uncontrollable entirely a unique modifier?
   else nameToUse = state.name;
   //TODO: so I noticed that text should not be used most of the time for uniqueness (check required is only maybe)

   if (includeText && undefined !== state.text) return (nameToUse + ' (' + state.text + ')');
   return nameToUse;
};
