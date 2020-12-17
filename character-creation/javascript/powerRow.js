'use strict';

/**Call List onChange
 Select Power: select();
 Base: changeBaseCost();
 Text: changeText();
 Action: selectAction();
 Range: selectRange();
 Duration: selectDuration();
 Name: changeName();
 Skill Used: changeSkill();
 (see modifier file)
 Rank: changeRank();

 Immutable (state/derivedValues don't change)

 @param props: key, sectionName, powerListParent, state
 */
function PowerObjectAgnostic(props)
{
   var state, derivedValues, rowArray, modifierSection;

   //Basic getter section (all single line)
   this.getAction = function () {return state.action;};
   this.getBaseCost = function () {return state.baseCost;};
   this.getDuration = function () {return state.duration;};
   this.getDerivedValues = function () {return JSON.clone(derivedValues);};
   /**Get the effect name of the power*/
   this.getEffect = function () {return state.effect;};
   this.getKey = function () {return props.key;};
   /**Getter is used for onChange events and for other information gathering*/
   this.getModifierList = function () {return modifierSection;};
   /**Get the user's name for the power*/
   this.getName = function () {return state.name;};
   this.getRange = function () {return state.range;};
   this.getRank = function () {return state.rank;};
   this.getSectionName = function () {return props.sectionName;};
   this.getSkillUsed = function () {return state.skillUsed;};
   this.getState = function () {return JSON.clone(state);};
   this.getText = function () {return state.text;};
   /**The total with respect to auto changes and raw total*/
   this.getTotal = function () {return derivedValues.total;};
   this.isBaseCostSettable = function () {return derivedValues.canSetBaseCost;};
   this.getSection = function () {return props.powerListParent;};

   //Single line function section
   /**Returns the default action for this power or nothing if this row is blank.*/
   this.getDefaultAction = function ()
   {
      return Data.Power[state.effect].defaultAction;
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   this.getDefaultDuration = function ()
   {
      return Data.Power[state.effect].defaultDuration;
   };
   /**Returns the default range or nothing if this row is blank.*/
   this.getDefaultRange = function ()
   {
      return Data.Power[state.effect].defaultRange;
   };

   //public function section
   /**Returns a json object of this row's data*/
   this.save = function ()
   {
      //don't just clone this.state: skill, cost is different
      var json = {};
      json.effect = state.effect;
      if (derivedValues.canSetBaseCost) json.cost = state.baseCost;
      json.text = state.text;
      json.action = state.action;
      json.range = state.range;
      json.duration = state.duration;
      //checking undefined is redundant but more clear
      if (undefined !== state.name) json.name = state.name;
      //skill requires name however perception range has name without skill
      if (undefined !== state.skillUsed) json.skill = state.skillUsed;
      json.Modifiers = modifierSection.save();
      json.rank = state.rank;
      return json;
   };

   //region copied from mod list
   /**@returns true if 2+ rows in rowArray have the same UniqueName*/
   this._hasDuplicate = function ()
   {
      //can't change this to take an arg because update name/text will already be in state
      return rowArray.map(item => item.getUniqueName())
      .some((val, id, array) =>
      {
         return array.indexOf(val) !== id;
      });
   };
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   this._sanitizeRows = function ()
   {
      var namesSoFar = [];
      var canHaveAttack = true;
      if (props.powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack = false;  //feature has a default range of Personal
      for (var i = 0; i < rowArray.length; i++)
      {
         if (rowArray[i].isBlank() && i < rowArray.length)
         {
            this._removeRow(i);
            i--;
            continue;
         }  //remove blank row that isn't last
         else if (rowArray[i].isBlank()) continue;  //do nothing if last row is blank

         if (props.powerRowParent.getSection() === Main.equipmentSection &&
            (rowArray[i].getName() === 'Removable' || rowArray[i].getName() === 'Easily Removable'))
         {
            this._removeRow(i);
            i--;
            continue;
         }
         //equipment has removable built in and can't have the modifiers

         var modifierName = rowArray[i].getUniqueName(false);
         if (namesSoFar.contains(modifierName))
         {
            this._removeRow(i);
            i--;
            continue;
         }  //redundant modifier
         if (modifierName === 'Attack' || modifierName === 'Affects Others')  //Affects Others Also and Affects Others Only return same name
         {
            if (!canHaveAttack)
            {
               this._removeRow(i);
               i--;
               continue;
            }  //redundant or invalid modifier
            canHaveAttack = false;
         }
         namesSoFar.push(modifierName);
      }
   };
   /**This is only for testing. Calling it otherwise will throw. This simply re-sorts with an unstable algorithm.*/
   this._testSortStability = function () {unstableSort(rowArray, this._sortOrder);};  //throws if unstableSort doesn't exist
   //endregion copied from mod list

   this.constructor = function ()
   {
      state = props.state;
      derivedValues = props.derivedValues;
      modifierSection = new ModifierList({
         powerRowParent: this,
         state: state.Modifiers,
         keyList: props.modifierKeyList,
         derivedValues: derivedValues.modifiers
      });
   };
   this.constructor();
}

PowerObjectAgnostic.sanitizeStateAndGetDerivedValues = function (inputState, powerSectionName, powerIndex, transcendence)
{
   var loadLocation = powerSectionName.toTitleCase() + ' #' + (powerIndex + 1);
   var nameToLoad = inputState.effect;
   if (!Data.Power.names.contains(nameToLoad))
   {
      Main.messageUser('PowerListAgnostic.load.notExist', loadLocation + ': ' +
         nameToLoad + ' is not a power name.');
      return;  //undefined
   }
   if (Data.Power[nameToLoad].isGodhood && transcendence <= 0)
   {
      Main.messageUser('PowerListAgnostic.load.godhood', loadLocation + ': ' +
         nameToLoad + ' is not allowed because transcendence is ' + transcendence + '.');
      return;  //undefined
   }
   var validState = {effect: inputState.effect};

   //unique defaults
   var defaultBaseCost = Data.Power[validState.effect].baseCost;
   if (Data.Power[validState.effect].hasInputBaseCost) validState.baseCost = sanitizeNumber(inputState.baseCost, 1, defaultBaseCost);
   else validState.baseCost = defaultBaseCost;

   //TODO: onchange: text stay if changing between powers
   if (undefined === inputState.text) validState.text = 'Descriptors and other text';
   else validState.text = inputState.text;

   //each value is valid but maybe not the combination
   var existingActivationInfo = PowerObjectAgnostic._validateActivationInfoExists(validState, inputState, loadLocation);
   /*unvalidated modifiers are needed to validate personal range. when mods are validated it calculates cost from the ARD
   therefore give it short lived mods in a funny variable name to beat chicken vs egg*/
   existingActivationInfo.Modifiers = inputState.Modifiers;
   var validActivationInfoObj = PowerObjectAgnostic._validateActivationInfo(validState, existingActivationInfo, loadLocation);
   validState.action = validActivationInfoObj.action.current;
   validState.range = validActivationInfoObj.range.current;
   validState.duration = validActivationInfoObj.duration.current;

   //first pass to make sure they exist and no duplicates
   var pendingModifiersAndDv = ModifierList.sanitizeStateAndGetDerivedValues(inputState.Modifiers, validState.effect,
      validActivationInfoObj, powerSectionName, powerIndex);

   pendingModifiersAndDv = PowerObjectAgnostic._updateActionModifiers(validState, pendingModifiersAndDv, validActivationInfoObj,
      powerSectionName, powerIndex);
   pendingModifiersAndDv = PowerObjectAgnostic._updateRangeModifiers(validState, pendingModifiersAndDv, validActivationInfoObj,
      powerSectionName, powerIndex);
   pendingModifiersAndDv = PowerObjectAgnostic._updateDurationModifiers(validState, pendingModifiersAndDv, validActivationInfoObj,
      powerSectionName, powerIndex);
   validState.Modifiers = pendingModifiersAndDv.state;

   var validAttackInfo = PowerObjectAgnostic._validateNameAndSkill(validState, inputState, powerSectionName, powerIndex);
   if (undefined !== validAttackInfo)
   {
      validState.name = validAttackInfo.name;
      validState.skillUsed = validAttackInfo.skillUsed;
   }

   validState.rank = sanitizeNumber(inputState.rank, 1, 1);

   var derivedValues = PowerObjectAgnostic._calculateDerivedValues(validState, validActivationInfoObj, pendingModifiersAndDv.derivedValues);
   return {state: validState, derivedValues: derivedValues};
};
/**Counts totals etc. All values that are not user set or final are created by this method*/
PowerObjectAgnostic._calculateDerivedValues = function (validState, validActivationInfoObj, modifierDerivedValues)
{
   var derivedValues = {
      possibleActions: validActivationInfoObj.action.choices,
      possibleRanges: validActivationInfoObj.range.choices,
      possibleDurations: validActivationInfoObj.duration.choices,
      total: 0,
      canSetBaseCost: Data.Power[validState.effect].hasInputBaseCost,
      modifiers: modifierDerivedValues
   };

   var costPerRank = (validState.baseCost + modifierDerivedValues.rankTotal);
   if (Main.getActiveRuleset()
      .isGreaterThanOrEqualTo(3, 5) && 'Variable' === validState.effect && costPerRank < 5) costPerRank = 5;
   else if (costPerRank < -3) costPerRank = -3;  //can't be less than 1/5
   derivedValues.costPerRank = costPerRank;  //save the non-decimal version
   if (costPerRank < 1) costPerRank = 1 / (2 - costPerRank);

   derivedValues.total = Math.ceil(costPerRank * validState.rank);  //round up
   var flatValue = modifierDerivedValues.flatTotal;
   //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
   if (flatValue < 0 && (derivedValues.total + flatValue) < 1)
   {
      validState.rank = (Math.abs(flatValue) / costPerRank);
      //must be higher than for this to work. don't use ceil so that if whole number will still be +1
      validState.rank = Math.floor(validState.rank) + 1;
      derivedValues.total = Math.ceil(costPerRank * validState.rank);  //round up
   }
   derivedValues.flatValue = flatValue;
   derivedValues.total += flatValue;  //flatValue might be negative
   if ('A God I Am' === validState.effect) derivedValues.total += 145;  //for first ranks
   else if ('Reality Warp' === validState.effect) derivedValues.total += 75;
   //used to calculate all auto modifiers
   derivedValues.total = ModifierList.calculateGrandTotal(modifierDerivedValues, derivedValues.total);

   return derivedValues;
};
PowerObjectAgnostic._validateActivationInfoExists = function (validState, inputState, loadLocation)
{
   var existingActivationInfo = {};
   if (undefined === inputState.action) existingActivationInfo.action = Data.Power[validState.effect].defaultAction;
   else if (!Data.Power.actions.contains(inputState.action))
   {
      existingActivationInfo.action = Data.Power[validState.effect].defaultAction;
      Main.messageUser(
         'PowerObjectAgnostic.setAction.notExist', loadLocation + ': ' + inputState.action + ' is not the name of an action. ' +
         'Using default of ' + existingActivationInfo.action + ' instead.');
   }
   else existingActivationInfo.action = inputState.action;

   if (undefined === inputState.range) existingActivationInfo.range = Data.Power[validState.effect].defaultRange;
   else if (!Data.Power.ranges.contains(inputState.range))
   {
      existingActivationInfo.range = Data.Power[validState.effect].defaultRange;
      Main.messageUser('PowerObjectAgnostic.setRange.notExist', loadLocation + ': ' + inputState.range + ' is not the name of a range. ' +
         'Using default of ' + existingActivationInfo.range + ' instead.');
   }
   else existingActivationInfo.range = inputState.range;

   if (undefined === inputState.duration) existingActivationInfo.duration = Data.Power[validState.effect].defaultDuration;
   else if (!Data.Power.durations.contains(inputState.duration))
   {
      existingActivationInfo.duration = Data.Power[validState.effect].defaultDuration;
      Main.messageUser(
         'PowerObjectAgnostic.setDuration.notExist', loadLocation + ': ' + inputState.duration + ' is not the name of a duration. ' +
         'Using default of ' + existingActivationInfo.duration + ' instead.');
   }
   else existingActivationInfo.duration = inputState.duration;

   return existingActivationInfo;
};
/**Call this in order to generate or clear out name and skill. Current values are preserved (if not cleared) or default text is generated.*/
PowerObjectAgnostic._validateNameAndSkill = function (validState, inputState, sectionName, rowIndex)
{
   //TODO: should give warning about removing name and skill?
   if (!Data.Power[validState.effect].isAttack && !validState.Modifiers.some(it => 'Attack' === it.name))
   {
      return;  //undefined
   }
   var validAttackInfo = {};

   if (undefined === inputState.name) validAttackInfo.name = (sectionName.toTitleCase() + ' ' + (rowIndex + 1) +
      ' ' + validState.effect);  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness
   else validAttackInfo.name = inputState.name;

   if ('Perception' === validState.range || validState.Modifiers.some(it => 'Aura' === it.name)) validAttackInfo.skillUsed = undefined;
   else if (undefined === inputState.skillUsed) validAttackInfo.skillUsed = 'Skill used for attack';
   else validAttackInfo.skillUsed = inputState.skillUsed;

   return validAttackInfo;
};
/**Called when loading after action, range, and duration have been set. This function validates the values
 making sure the values are possible and consistent with priority given to range then duration.
 It will changes values to be valid. This function requires modifiers to be loaded (but doesn't affect them).
 The precedence is personal range, duration, action, reaction range, (then modifiers which aren't affected here).*/
PowerObjectAgnostic._validateActivationInfo = function (validState, inputState, loadLocation)
{
   var pendingRange = PowerObjectAgnostic._validatePersonalRange(validState, inputState, loadLocation);
   var durationObj = PowerObjectAgnostic._validateAndGetPossibleDurations(validState, inputState, pendingRange, loadLocation);
   var actionObj = PowerObjectAgnostic._validateAndGetPossibleActions(validState, inputState, durationObj.current, loadLocation);
   /*the order is Range, Duration, Action, Range again
   first 3 are required order based on dependencies,
   then range again so that Reaction can have a more reasonable fallback action*/

   //can't trust modifiers yet since this is an unvalidated auto mod
   var isAura = (Main.getActiveRuleset()
      .isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== validState.effect && 'Feature' !== validState.effect &&
      'Reaction' === actionObj.current);
   if (isAura && 'Close' !== pendingRange)
   {
      Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose',
         loadLocation + ': ' + validState.effect + ' has an action of Reaction and therefore must have a range of Close.');
      pendingRange = 'Close';
      //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
   }
   var possibleRanges = PowerObjectAgnostic._getPossibleRanges(validState, actionObj.current, pendingRange);
   return {
      action: actionObj,
      range: {current: pendingRange, choices: possibleRanges},
      duration: durationObj
   };
};

//'private' functions section. Although all public none of these should be called from outside of this object
/**@returns {Array} of all ranges that are possible for this power based on current state.*/
PowerObjectAgnostic._getPossibleRanges = function (validState, validAction, validRange)
{
   var possibleRanges = [];
   if ('Feature' === validState.effect) possibleRanges.push('Personal');
   else
   {
      if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3,
            4) && 'Reaction' === validAction && 'Luck Control' !== validState.effect) return ['Close'];
      if ('Personal' === validRange) return ['Personal'];
   }
   return possibleRanges.concat(['Close', 'Ranged', 'Perception']);
};
/**This function creates Selective if needed and recreates Faster/Slower Action as needed.*/
PowerObjectAgnostic._updateActionModifiers = function (validState, pendingModifiersAndDv, validActivationInfoObj, powerSectionName,
                                                       powerIndex)
{
   var outputPendingModifiers = JSON.clone(pendingModifiersAndDv);
   //Triggered must also be selective so it auto adds but doesn't remove
   if ('Triggered' === validState.action) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName,
      powerIndex, 'Selective', 1);

   if ('Feature' === validState.effect) return outputPendingModifiers;  //Feature doesn't change any other modifiers

   //remove all if possible
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Faster Action');
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Slower Action');
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Aura');

   if ('None' === validState.action) return outputPendingModifiers;  //don't add any modifiers

   var defaultActionName = Data.Power[validState.effect].defaultAction;
   if ('None' === defaultActionName) defaultActionName = 'Free';  //calculate distance from free
   var defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
   var newActionIndex = Data.Power.actions.indexOf(validState.action);
   if (Main.getActiveRuleset()
      .isGreaterThanOrEqualTo(3, 4) && 'Reaction' === validState.action && 'Luck Control' !== validState.effect)
   {
      newActionIndex = Data.Power.actions.indexOf('Standard');  //calculate distance from Standard
      outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
         powerIndex, 'Aura', 1);
   }

   var actionDifference = (newActionIndex - defaultActionIndex);
   if (actionDifference > 0) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName, powerIndex,
      'Faster Action', actionDifference);
   else if (actionDifference < 0) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName,
      powerIndex, 'Slower Action', -actionDifference);

   return outputPendingModifiers;
};
/**This function recreates Increased/Decreased Duration as needed.*/
PowerObjectAgnostic._updateDurationModifiers = function (validState, pendingModifiersAndDv, validActivationInfoObj, powerSectionName,
                                                         powerIndex)
{
   var outputPendingModifiers = JSON.clone(pendingModifiersAndDv);
   if ('Feature' === validState.effect) return outputPendingModifiers;  //Feature doesn't change modifiers

   var defaultDurationName = Data.Power[validState.effect].defaultDuration;
   var defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
   var newDurationIndex = Data.Power.durations.indexOf(validState.duration);
   if ('Permanent' === defaultDurationName && 'Personal' !== validState.range)
      defaultDurationIndex = Data.Power.durations.indexOf('Sustained');  //calculate distance from Sustained

   //remove both if possible
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Increased Duration');
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Decreased Duration');

   var durationDifference = (newDurationIndex - defaultDurationIndex);
   if (durationDifference > 0) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName, powerIndex,
      'Increased Duration', durationDifference);
   else if (durationDifference < 0) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName,
      powerIndex, 'Decreased Duration',
      -durationDifference);

   return outputPendingModifiers;
};
/**This function recreates Increased/Reduced Range as needed.*/
PowerObjectAgnostic._updateRangeModifiers = function (validState, pendingModifiersAndDv, validActivationInfoObj, powerSectionName,
                                                      powerIndex)
{
   var outputPendingModifiers = JSON.clone(pendingModifiersAndDv);
   //when changing to personal nothing else needs to change
   if ('Personal' === validState.range) return outputPendingModifiers;  //only possible (for feature or) when removing a modifier

   if ('Feature' === validState.effect) return outputPendingModifiers;  //Feature doesn't change modifiers
   //TODO: refactor so that Feature has a base activation row and a current activation row
   //so that Feature will have the modifiers auto set. This should be less confusing to the user
   //this will also allow and require more edge case testing

   var defaultRangeName = Data.Power[validState.effect].defaultRange;
   var defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
   var newRangeIndex = Data.Power.ranges.indexOf(validState.range);
   if ('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close');  //calculate distance from close

   //remove both if possible
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Increased Range');
   outputPendingModifiers = ModifierList.removeByName(validState, outputPendingModifiers, validActivationInfoObj, powerSectionName,
      powerIndex, 'Reduced Range');

   var rangeDifference = (newRangeIndex - defaultRangeIndex);
   if (rangeDifference > 0) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName, powerIndex,
      'Increased Range', rangeDifference);
   else if (rangeDifference < 0) outputPendingModifiers = ModifierList.createByNameRank(validState, outputPendingModifiers,
      validActivationInfoObj, powerSectionName, powerIndex,
      'Reduced Range', -rangeDifference);

   return outputPendingModifiers;
};
/**@returns {Object} of all actions that are possible for this power based on current state.*/
PowerObjectAgnostic._validateAndGetPossibleActions = function (validState, inputState, validDuration, loadLocation)
{
   //feature has the same action as the others (because allowReaction is true)
   var pendingAction = inputState.action;
   if ('Permanent' === validDuration)
   {
      if ('None' !== pendingAction)
      {
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', loadLocation + ': ' +
            validState.effect + ' can\'t have an action of ' + pendingAction + '. It can only be None because the duration is Permanent.');
      }
      return {current: 'None', choices: ['None']};
   }
   else if ('None' === pendingAction)  //only Permanent duration can have action None
   {
      pendingAction = Data.Power[validState.effect].defaultAction;
      if ('None' === pendingAction) pendingAction = 'Free';
      //use default action if possible. otherwise use Free
      //either way it will cost 0
      Main.messageUser(
         'PowerObjectAgnostic.validateAndGetPossibleActions.notNone', loadLocation + ': ' +
         validState.effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + validDuration + '). ' +
         'Using action of ' + pendingAction + ' instead.');
   }
   var possibleActions = Data.Power.actions.copy();
   possibleActions.removeByValue('None');  //it would have returned above if none is allowed

   var allowMoveAction = (Main.getActiveRuleset()
   .isLessThan(3, 4) || !Data.Power[validState.effect].isAttack || 'Move Object' === validState.effect);
   if (!allowMoveAction) possibleActions.removeByValue('Move');
   if ('Move' === pendingAction && !allowMoveAction)
   {
      pendingAction = Data.Power[validState.effect].defaultAction;
      //dead code: attacks can't have a default duration of Permanent
      if ('None' === pendingAction) pendingAction = 'Free';
      Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed',
         loadLocation + ': ' + validState.effect + ' can\'t have an action ' +
         'of Move because it is an attack type. Using action of ' + pendingAction + ' instead.');
   }

   var allowFreeAction = (Main.getActiveRuleset()
      .isLessThan(3, 4) ||
      (allowMoveAction && !Data.Power[validState.effect].isMovement && 'Healing' !== validState.effect));
   if (!allowFreeAction) possibleActions.removeByValue('Free');
   if ('Free' === pendingAction && !allowFreeAction)
   {
      if (!allowMoveAction)
      {
         pendingAction = Data.Power[validState.effect].defaultAction;
         //dead code: attacks/movement can't have a default duration of Permanent
         if ('None' === pendingAction) pendingAction = 'Free';
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', loadLocation + ': ' +
            validState.effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + pendingAction + ' instead.');
      }
      //attacks can't be movements so there's no overlap
      else if (Data.Power[validState.effect].isMovement)
      {
         pendingAction = Data.Power[validState.effect].defaultAction;
         //dead code: movements can't have a default duration of Permanent
         if ('None' === pendingAction) pendingAction = 'Free';
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', loadLocation + ': ' +
            validState.effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + pendingAction + ' instead.');
      }
      //healing is not an attack or movement so there's no overlap
      else //if ('Healing' === validState.effect)
      {
         pendingAction = Data.Power[validState.effect].defaultAction;
         //dead code: Healing doesn't have a default duration of Permanent
         if ('None' === pendingAction) pendingAction = 'Free';
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', loadLocation + ': ' +
            'Healing can\'t have an action of Free. Using action of ' + pendingAction + ' instead.');
      }
   }

   var allowReaction = (Main.getActiveRuleset()
   .isLessThan(3, 4) || Data.Power[validState.effect].allowReaction);
   if (!allowReaction) possibleActions.removeByValue('Reaction');
   if ('Reaction' === pendingAction && !allowReaction)
   {
      pendingAction = Data.Power[validState.effect].defaultAction;
      //duration is not Permanent here because that was checked above
      if ('None' === pendingAction) pendingAction = 'Free';
      Main.messageUser(
         'PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', loadLocation + ': ' +
         validState.effect + ' can\'t have an action of Reaction because it isn\'t an attack type. ' +
         'Using action of ' + pendingAction + ' instead.');
      //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
   }

   return {current: pendingAction, choices: possibleActions};
};
/**@returns {Object} of all durations that are possible for this power based on current state.*/
PowerObjectAgnostic._validateAndGetPossibleDurations = function (validState, inputState, pendingRange, loadLocation)
{
   var defaultDuration = Data.Power[validState.effect].defaultDuration;
   var pendingDuration = inputState.duration;
   if ('Instant' === defaultDuration)
   {
      if ('Instant' !== pendingDuration)
      {
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', loadLocation + ': ' +
            validState.effect + ' can\'t have ' + pendingDuration + ' duration. It can only be Instant.');
         //can't be changed (Feature's defaultDuration is Permanent)
      }
      return {current: 'Instant', choices: ['Instant']};
   }

   var possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
   if ('Personal' === pendingRange) possibleDurations.push('Permanent');  //even Feature needs Personal range for Permanent duration
   //when loading, range may later change to Close but not Personal so this check is safe
   else if ('Permanent' === pendingDuration)  //only personal range can have Permanent duration
   {
      if ('Permanent' === defaultDuration) pendingDuration = 'Sustained';
      else pendingDuration = defaultDuration;
      //(backwards) use default duration if possible. otherwise use Sustained
      //either way it will cost 0
      Main.messageUser(
         'PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent', loadLocation + ': ' +
         validState.effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + pendingRange + '). ' +
         'Using duration of ' + pendingDuration + ' instead.');
   }
   if ('Feature' === validState.effect) possibleDurations.push('Instant');
   else if ('Instant' === pendingDuration)
   {
      //only Feature can change to Instant duration. defaultDuration of instant was checked above
      Main.messageUser(
         'PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant', loadLocation + ': ' +
         validState.effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
      pendingDuration = defaultDuration;
   }
   return {current: pendingDuration, choices: possibleDurations};
};
/**@returns {String} This function validates range. It changes range and creates user messages as needed.*/
PowerObjectAgnostic._validatePersonalRange = function (validState, inputState, loadLocation)
{
   if ('Feature' === validState.effect) return inputState.range;  //allow everything
   var defaultRange = Data.Power[validState.effect].defaultRange;
   if ('Personal' === inputState.range && 'Personal' !== defaultRange)
   {
      Main.messageUser(
         'PowerObjectAgnostic.validatePersonalRange.notPersonal', loadLocation + ': ' +
         validState.effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
      //can't change something to personal unless it started out as that (Feature's defaultRange is Personal)
      return defaultRange;
   }
   else if ('Personal' !== inputState.range && 'Personal' === defaultRange)
   {
      if (!ModifierList.isNonPersonalModifierPresent(inputState.Modifiers))
      {
         Main.messageUser(
            'PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed', loadLocation + ': ' +
            validState.effect + ' with ' + inputState.range + ' range requires one of the following modifiers: ' +
            '"Affects Others Also", "Affects Others Only", or "Attack". ' +
            'Using the default range of Personal instead.');
         return defaultRange;  //can't create a mod for you since there are 3 possible
      }
   }
   return inputState.range;
};
