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
 */
class PowerObjectAgnostic extends React.Component
{
   constructor(props)
   {
      super(props);
      this._derivedValues = {total: 0};

      this._derivedValues.canSetBaseCost = Data.Power[props.state.effect].hasInputBaseCost;
      //TODO: power activation onchange
      /*
      //change to reaction action changes range to close without user message
      if ('Reaction' === this.state.action && 'Feature' !== this.state.effect && 'Luck Control' !== this.state.effect &&
         Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4)) this.setRange('Close');

      //changing from personal must change duration to not be permanent
      if ('Personal' === oldRange && 'Permanent' === this.state.duration)
      {
         const defaultDuration = Data.Power[this.state.effect].defaultDuration;
         if ('Permanent' === defaultDuration) this.setDuration('Sustained');
         else this.setDuration(defaultDuration);
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
      }

      if ('Permanent' === newDurationName) this.setAction('None');  //if changing to Permanent
      else if ('Permanent' === oldDuration)  //if changing from Permanent
      {
         //then reset action
         if ('Permanent' === defaultDurationName) this.setAction('Free');  //default action is None so use Free instead
         else this.setAction(Data.Power[this.state.effect].defaultAction);
         //use default action if possible otherwise use Free
         //either way it will cost 0
      }
      */

      this._prerender();
      this.calculateValues();
      props.callback(this);
   };

   //Basic getter section (all single line)
   getAction = () => {return this.props.state.action;};
   getBaseCost = () => {return this.props.state.baseCost;};
   getDuration = () => {return this.props.state.duration;};
   getDerivedValues = () => {return JSON.clone(this._derivedValues);};
   /**Get the effect name of the power*/
   getEffect = () => {return this.props.state.effect;};
   getKey = () => {return this.props.keyCopy;};
   /**Get the user's name for the power*/
   getName = () => {return this.props.state.name;};
   getRange = () => {return this.props.state.range;};
   getRank = () => {return this.props.state.rank;};
   getSectionName = () => {return this.props.sectionName;};
   getSkillUsed = () => {return this.props.state.skillUsed;};
   getState = () => {return JSON.clone(this.props.state);};
   getText = () => {return this.props.state.text;};
   /**The total with respect to auto changes and raw total*/
   getTotal = () => {return this._derivedValues.total;};
   //for modifierSection see this.getModifierList in the onChange section
   isBaseCostSettable = () => {return this._derivedValues.canSetBaseCost;};
   getSection = () => {return this.props.powerListParent;};

   //Single line function section
   /**Returns the default action for this power or nothing if this row is blank.*/
   getDefaultAction = () =>
   {
      return Data.Power[this.props.state.effect].defaultAction;
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   getDefaultDuration = () =>
   {
      return Data.Power[this.props.state.effect].defaultDuration;
   };
   /**Returns the default range or nothing if this row is blank.*/
   getDefaultRange = () =>
   {
      return Data.Power[this.props.state.effect].defaultRange;
   };
   /**If true then getAutoTotal must be called*/
      //TODO: these are useless?
   hasAutoTotal = () => {return this.modifierSection.hasAutoTotal();};

   //Onchange section
   /**Onchange function for selecting a power*/
   select = () =>
   {
      CommonsLibrary.select.call(this, this.setPower,
         (this.props.sectionName + 'Choices' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the base cost (if possible)*/
   changeBaseCost = () =>
   {
      //won't be called if you can't set base cost
      CommonsLibrary.change.call(this, this.setBaseCost,
         (this.props.sectionName + 'BaseCost' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the text*/
   changeText = () =>
   {
      CommonsLibrary.change.call(this, this.setText,
         (this.props.sectionName + 'Text' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the action*/
   selectAction = () =>
   {
      //won't be called if SelectAction doesn't exist
      CommonsLibrary.select.call(this, this.setAction,
         (this.props.sectionName + 'SelectAction' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the range*/
   selectRange = () =>
   {
      CommonsLibrary.select.call(this, this.setRange,
         (this.props.sectionName + 'SelectRange' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the duration*/
   selectDuration = () =>
   {
      CommonsLibrary.select.call(this, this.setDuration,
         (this.props.sectionName + 'SelectDuration' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the user's name for the power*/
   changeName = () =>
   {
      CommonsLibrary.change.call(this, this.setName,
         (this.props.sectionName + 'Name' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the skill name used for the power's attack*/
   changeSkill = () =>
   {
      CommonsLibrary.change.call(this, this.setSkill,
         (this.props.sectionName + 'Skill' + this.props.state.rowIndex), this.props.powerListParent);
   };
   /**Getter is used for onChange events and for other information gathering*/
      //listed here instead of getter section to match its document location
   getModifierList = () => {return this.modifierSection;};
   /**Onchange function for changing the rank*/
   changeRank = () =>
   {
      CommonsLibrary.change.call(this, this.setRank,
         (this.props.sectionName + 'Rank' + this.props.state.rowIndex), this.props.powerListParent);
   };

   //Value setting section
   static sanitizeState = (inputState, powerSectionName, powerIndex, transcendence) =>
   {
      const loadLocation = powerSectionName.toTitleCase() + ' #' + (powerIndex + 1);
      const nameToLoad = inputState.effect;
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
      const validState = {effect: inputState.effect};

      //unique defaults
      const defaultBaseCost = Data.Power[validState.effect].baseCost;
      if (Data.Power[validState.effect].hasInputBaseCost) validState.baseCost = sanitizeNumber(inputState.baseCost, 1, defaultBaseCost);
      else validState.baseCost = defaultBaseCost;

      //TODO: onchange: let the text stay if changing between powers
      if (undefined === inputState.text) validState.text = 'Descriptors and other text';
      else validState.text = inputState.text;

      //each value is valid but maybe not the combination
      const existingActivationInfo = PowerObjectAgnostic._validateActivationInfoExists(inputState, loadLocation);
      const validActivationInfoObj = PowerObjectAgnostic._validateActivationInfo(validState, existingActivationInfo, loadLocation);
      validState.action = validActivationInfoObj.action.current;
      validState.range = validActivationInfoObj.range.current;
      validState.duration = validActivationInfoObj.duration.current;

      //first pass to make sure they exist and no duplicates
      let pendingModifiers = ModifierList.sanitizeState(inputState.Modifiers, powerSectionName, powerIndex);

      pendingModifiers = PowerObjectAgnostic._updateActionModifiers(validState, pendingModifiers);
      pendingModifiers = PowerObjectAgnostic._updateRangeModifiers(validState, pendingModifiers);
      pendingModifiers = PowerObjectAgnostic._updateDurationModifiers(validState, pendingModifiers);
      validState.Modifiers = pendingModifiers;

      const validAttackInfo = PowerObjectAgnostic._validateNameAndSkill(validState, inputState, powerSectionName, powerIndex);
      validState.name = validAttackInfo.name;
      validState.skillUsed = validAttackInfo.skillUsed;

      validState.rank = sanitizeNumber(inputState.rank, 1, 1);
      return validState;
   };
   static _validateActivationInfoExists = (inputState, loadLocation) =>
   {
      if (!Data.Power.actions.contains(inputState.action))
      {
         Main.messageUser(
            'PowerObjectAgnostic.setAction.notExist', loadLocation + ': ' + inputState.action + ' is not the name of an action.');
         return;  //undefined
      }
      //well each value is valid even if together they aren't
      const validState = {action: inputState.action};

      if (!Data.Power.ranges.contains(inputState.range))
      {
         Main.messageUser('PowerObjectAgnostic.setRange.notExist', loadLocation + ': ' + inputState.range + ' is not the name of a range.');
         return;  //undefined
      }
      validState.range = inputState.range;

      if (!Data.Power.durations.contains(inputState.duration))
      {
         Main.messageUser(
            'PowerObjectAgnostic.setDuration.notExist', loadLocation + ': ' + inputState.duration + ' is not the name of a duration.');
         return;  //undefined
      }
      validState.duration = inputState.duration;

      return validState;
   };

   //public function section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   calculateValues = () =>
   {
      if (undefined === this.modifierSection) return;  //nothing to calculate for before rendering
      this.modifierSection.calculateValues();
      let costPerRank = (this.props.state.baseCost + this.modifierSection.getRankTotal());
      if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 5) && 'Variable' === this.props.state.effect && costPerRank < 5) costPerRank = 5;
      else if (costPerRank < -3) costPerRank = -3;  //can't be less than 1/5
      this._derivedValues.costPerRank = costPerRank;  //save the non-decimal version
      if (costPerRank < 1) costPerRank = 1 / (2 - costPerRank);

      this._derivedValues.total = Math.ceil(costPerRank * this.props.state.rank);  //round up
      const flatValue = this.modifierSection.getFlatTotal();
      //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
      if (flatValue < 0 && (this._derivedValues.total + flatValue) < 1)
      {
         this.props.state.rank = (Math.abs(flatValue) / costPerRank);
         //must be higher than for this to work. don't use ceil so that if whole number will still be +1
         this.props.state.rank = Math.floor(this.props.state.rank) + 1;
         this._derivedValues.total = Math.ceil(costPerRank * this.props.state.rank);  //round up
      }
      this._derivedValues.flatValue = flatValue;
      this._derivedValues.total += flatValue;  //flatValue might be negative
      if ('A God I Am' === this.props.state.effect) this._derivedValues.total += 145;  //for first ranks
      else if ('Reality Warp' === this.props.state.effect) this._derivedValues.total += 75;
      //used to calculate all auto modifiers
      this._derivedValues.total = this.modifierSection.calculateGrandTotal(this._derivedValues.total);
   };
   render = () =>
   {
      const callback = (newThing) => {this.modifierSection = newThing;};

      const loadLocation = {toString: function () {throw new AssertionError('Should already be valid.');}};
      const state = this.props.state;
      this._derivedValues.possibleActions = PowerObjectAgnostic._validateAndGetPossibleActions(state, state, state.duration, loadLocation);
      this._derivedValues.possibleRanges = PowerObjectAgnostic._getPossibleRanges(state, state.action, state.range);
      this._derivedValues.possibleDurations = PowerObjectAgnostic._validateAndGetPossibleDurations(state, state, state.range, loadLocation);

      //TODO: pretty sure need different key in which case generate in new()
      return (<PowerRowHtml sectionName={this.props.sectionName} powerRow={this} state={state}
                            derivedValues={this._derivedValues} key={this.props.keyCopy} keyCopy={this.props.keyCopy}
                            modCallback={callback} modState={state.Modifiers} />);
   };
   /**Call this in order to generate or clear out name and skill. Current values are preserved (if not cleared) or default text is generated.*/
   static _validateNameAndSkill = (validState, inputState, sectionName, rowIndex) =>
   {
      //TODO: should give warning about removing name and skill?
      if (!Data.Power[validState.effect].isAttack && !validState.Modifiers.some(it => 'Attack' === it.name))
      {
         return;  //undefined
      }
      const validAttackInfo = {};

      if (undefined === inputState.name) validAttackInfo.name = (sectionName.toTitleCase() + ' ' + (rowIndex + 1) +
         ' ' + validState.effect);  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness
      else validAttackInfo.name = inputState.name;

      if ('Perception' === validState.range || validState.Modifiers.some(it => 'Aura' === it.name)) validAttackInfo.skillUsed = undefined;
      else if (undefined === inputState.skillUsed) validAttackInfo.skillUsed = 'Skill used for attack';
      else validAttackInfo.skillUsed = inputState.skillUsed;

      return validAttackInfo;
   };
   /**Returns a json object of this row's data*/
   save = () =>
   {
      //don't just clone this.state: skill, cost is different
      const json = {};
      json.effect = this.props.state.effect;
      if (this._derivedValues.canSetBaseCost) json.cost = this.props.state.baseCost;
      json.text = this.props.state.text;
      json.action = this.props.state.action;
      json.range = this.props.state.range;
      json.duration = this.props.state.duration;
      //checking undefined is redundant but more clear
      if (undefined !== this.props.state.name) json.name = this.props.state.name;
      //skill requires name however perception range has name without skill
      if (undefined !== this.props.state.skillUsed) json.skill = this.props.state.skillUsed;
      json.Modifiers = this.modifierSection.save();
      json.rank = this.props.state.rank;
      return json;
   };
   /**Called when loading after action, range, and duration have been set. This function validates the values
    making sure the values are possible and consistent with priority given to range then duration.
    It will changes values to be valid. This function requires modifiers to be loaded (but doesn't affect them).
    The precedence is personal range, duration, action, reaction range, (then modifiers which aren't affected here).*/
   static _validateActivationInfo = (validState, inputState, loadLocation) =>
   {
      let pendingRange = PowerObjectAgnostic._validatePersonalRange(validState, inputState, loadLocation);
      const durationObj = PowerObjectAgnostic._validateAndGetPossibleDurations(validState, inputState, pendingRange, loadLocation);
      const actionObj = PowerObjectAgnostic._validateAndGetPossibleActions(validState, inputState, durationObj.current, loadLocation);
      /*the order is Range, Duration, Action, Range again
      first 3 are required order based on dependencies,
      then range again so that Reaction can have a more reasonable fallback action*/

      //can't trust modifiers yet since this is an unvalidated auto mod
      const isAura = (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== validState.effect && 'Feature' !== validState.effect &&
         'Reaction' === actionObj.current);
      if (isAura && 'Close' !== pendingRange)
      {
         Main.messageUser('PowerObjectAgnostic._validateActivationInfo.reactionRequiresClose',
            loadLocation + ': ' + validState.effect + ' has an action of Reaction and therefore must have a range of Close.');
         pendingRange = 'Close';
         //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
      }
      const possibleRanges = PowerObjectAgnostic._getPossibleRanges(validState, actionObj.current, pendingRange);
      return {
         action: actionObj,
         range: {current: pendingRange, choices: possibleRanges},
         duration: durationObj
      };
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**@returns {Array} of all ranges that are possible for this power based on current state.*/
   static _getPossibleRanges = (validState, validAction, validRange) =>
   {
      const possibleRanges = [];
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
   static _updateActionModifiers = (validState, inputPendingModifiers) =>
   {
      const outputPendingModifiers = JSON.clone(inputPendingModifiers);
      //Triggered must also be selective so it auto adds but doesn't remove
      if ('Triggered' === validState.action) ModifierList.createByNameRank(outputPendingModifiers, 'Selective', 1);

      if ('Feature' === validState.effect) return outputPendingModifiers;  //Feature doesn't change any other modifiers

      //remove all if possible
      ModifierList.removeByName(outputPendingModifiers, 'Faster Action');
      ModifierList.removeByName(outputPendingModifiers, 'Slower Action');
      ModifierList.removeByName(outputPendingModifiers, 'Aura');

      if ('None' === validState.action) return outputPendingModifiers;  //don't add any modifiers

      let defaultActionName = Data.Power[validState.effect].defaultAction;
      if ('None' === defaultActionName) defaultActionName = 'Free';  //calculate distance from free
      const defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
      let newActionIndex = Data.Power.actions.indexOf(validState.action);
      if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4) && 'Reaction' === validState.action && 'Luck Control' !== validState.effect)
      {
         newActionIndex = Data.Power.actions.indexOf('Standard');  //calculate distance from Standard
         ModifierList.createByNameRank(outputPendingModifiers, 'Aura', 1);
      }

      let actionDifference = (newActionIndex - defaultActionIndex);
      if (actionDifference > 0) ModifierList.createByNameRank(outputPendingModifiers, 'Faster Action', actionDifference);
      else if (actionDifference < 0) ModifierList.createByNameRank(outputPendingModifiers, 'Slower Action', -actionDifference);

      return outputPendingModifiers;
   };
   /**This function recreates Increased/Decreased Duration as needed.*/
   static _updateDurationModifiers = (validState, inputPendingModifiers) =>
   {
      const outputPendingModifiers = JSON.clone(inputPendingModifiers);
      if ('Feature' === validState.effect) return outputPendingModifiers;  //Feature doesn't change modifiers

      const defaultDurationName = Data.Power[validState.effect].defaultDuration;
      let defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
      const newDurationIndex = Data.Power.durations.indexOf(validState.duration);
      if ('Permanent' === defaultDurationName && 'Personal' !== validState.range)
         defaultDurationIndex = Data.Power.durations.indexOf('Sustained');  //calculate distance from Sustained

      //remove both if possible
      ModifierList.removeByName(outputPendingModifiers, 'Increased Duration');
      ModifierList.removeByName(outputPendingModifiers, 'Decreased Duration');

      let durationDifference = (newDurationIndex - defaultDurationIndex);
      if (durationDifference > 0) ModifierList.createByNameRank(outputPendingModifiers, 'Increased Duration', durationDifference);
      else if (durationDifference < 0) ModifierList.createByNameRank(outputPendingModifiers, 'Decreased Duration',
         -durationDifference);

      return outputPendingModifiers;
   };
   /**This function recreates Increased/Reduced Range as needed.*/
   static _updateRangeModifiers = (validState, inputPendingModifiers) =>
   {
      const outputPendingModifiers = JSON.clone(inputPendingModifiers);
      //when changing to personal nothing else needs to change
      if ('Personal' === validState.range) return outputPendingModifiers;  //only possible (for feature or) when removing a modifier

      if ('Feature' === validState.effect) return outputPendingModifiers;  //Feature doesn't change modifiers
      //TODO: refactor so that Feature has a base activation row and a current activation row
      //so that Feature will have the modifiers auto set. This should be less confusing to the user
      //this will also allow and require more edge case testing

      const defaultRangeName = Data.Power[validState.effect].defaultRange;
      let defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
      const newRangeIndex = Data.Power.ranges.indexOf(validState.range);
      if ('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close');  //calculate distance from close

      //remove both if possible
      ModifierList.removeByName(outputPendingModifiers, 'Increased Range');
      ModifierList.removeByName(outputPendingModifiers, 'Reduced Range');

      let rangeDifference = (newRangeIndex - defaultRangeIndex);
      if (rangeDifference > 0) ModifierList.createByNameRank(outputPendingModifiers, 'Increased Range', rangeDifference);
      else if (rangeDifference < 0) ModifierList.createByNameRank(outputPendingModifiers, 'Reduced Range', -rangeDifference);

      return outputPendingModifiers;
   };
   /**@returns {Object} of all actions that are possible for this power based on current state.*/
   static _validateAndGetPossibleActions = (validState, inputState, validDuration, loadLocation) =>
   {
      //feature has the same action as the others (because allowReaction is true)
      let pendingAction = inputState.action;
      if ('Permanent' === validDuration)
      {
         if ('None' !== inputState.action)
         {
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', loadLocation + ': ' +
               validState.effect + ' can\'t have an action of ' + inputState.action + '. It can only be None because the duration is Permanent.');
         }
         return {current: 'None', choices: ['None']};
      }
      else if ('None' === inputState.action)  //only Permanent duration can have action None
      {
         pendingAction = Data.Power[validState.effect].defaultAction;
         if ('None' === inputState.action) pendingAction = 'Free';
         //use default action if possible. otherwise use Free
         //either way it will cost 0
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.notNone', loadLocation + ': ' +
            validState.effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + validDuration + '). ' +
            'Using action of ' + pendingAction + ' instead.');
      }
      const possibleActions = Data.Power.actions.copy();
      possibleActions.removeByValue('None');  //it would have returned above if none is allowed

      let allowMoveAction = (Main.getActiveRuleset()
      .isLessThan(3, 4) || !Data.Power[validState.effect].isAttack || 'Move Object' === validState.effect);
      if (!allowMoveAction) possibleActions.removeByValue('Move');
      if ('Move' === inputState.action && !allowMoveAction)
      {
         pendingAction = Data.Power[validState.effect].defaultAction;
         //dead code: attacks can't have a default duration of Permanent
         if ('None' === inputState.action) pendingAction = 'Free';
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed',
            loadLocation + ': ' + validState.effect + ' can\'t have an action ' +
            'of Move because it is an attack type. Using action of ' + pendingAction + ' instead.');
      }

      let allowFreeAction = (Main.getActiveRuleset()
         .isLessThan(3, 4) ||
         (allowMoveAction && !Data.Power[validState.effect].isMovement && 'Healing' !== validState.effect));
      if (!allowFreeAction) possibleActions.removeByValue('Free');
      if ('Free' === inputState.action && !allowFreeAction)
      {
         if (!allowMoveAction)
         {
            pendingAction = Data.Power[validState.effect].defaultAction;
            //dead code: attacks/movement can't have a default duration of Permanent
            if ('None' === inputState.action) pendingAction = 'Free';
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', loadLocation + ': ' +
               validState.effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + pendingAction + ' instead.');
         }
         //attacks can't be movements so there's no overlap
         else if (Data.Power[validState.effect].isMovement)
         {
            pendingAction = Data.Power[validState.effect].defaultAction;
            //dead code: movements can't have a default duration of Permanent
            if ('None' === inputState.action) pendingAction = 'Free';
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', loadLocation + ': ' +
               validState.effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + pendingAction + ' instead.');
         }
         //healing is not an attack or movement so there's no overlap
         else //if ('Healing' === validState.effect)
         {
            pendingAction = Data.Power[validState.effect].defaultAction;
            //dead code: Healing doesn't have a default duration of Permanent
            if ('None' === inputState.action) pendingAction = 'Free';
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', loadLocation + ': ' +
               'Healing can\'t have an action of Free. Using action of ' + pendingAction + ' instead.');
         }
      }

      let allowReaction = (Main.getActiveRuleset()
      .isLessThan(3, 4) || Data.Power[validState.effect].allowReaction);
      if (!allowReaction) possibleActions.removeByValue('Reaction');
      if ('Reaction' === inputState.action && !allowReaction)
      {
         pendingAction = Data.Power[validState.effect].defaultAction;
         //duration is not Permanent here because that was checked above
         if ('None' === inputState.action) pendingAction = 'Free';
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', loadLocation + ': ' +
            validState.effect + ' can\'t have an action of Reaction because it isn\'t an attack type. ' +
            'Using action of ' + pendingAction + ' instead.');
         //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
      }

      return {current: pendingAction, choices: possibleActions};
   };
   /**@returns {Object} of all durations that are possible for this power based on current state.*/
   static _validateAndGetPossibleDurations = (validState, inputState, pendingRange, loadLocation) =>
   {
      const defaultDuration = Data.Power[validState.effect].defaultDuration;
      if ('Instant' === defaultDuration)
      {
         if ('Instant' !== inputState.duration)
         {
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', loadLocation + ': ' +
               validState.effect + ' can\'t have ' + inputState.duration + ' duration. It can only be Instant.');
            //can't be changed (Feature's defaultDuration is Permanent)
         }
         return {current: 'Instant', choices: ['Instant']};
      }

      let pendingDuration = inputState.duration;
      const possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
      if ('Personal' === pendingRange) possibleDurations.push('Permanent');  //even Feature needs Personal range for Permanent duration
      //when loading, range may later change to Close but not Personal so this check is safe
      else if ('Permanent' === inputState.duration)  //only personal range can have Permanent duration
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
      else if ('Instant' === inputState.duration)
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
   static _validatePersonalRange = (validState, inputState, loadLocation) =>
   {
      if ('Feature' === validState.effect) return inputState.range;  //allow everything
      const defaultRange = Data.Power[validState.effect].defaultRange;
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
   //region converted from mod list
   //endregion converted from mod list


   //region copied from mod list
   updateNameByRow = (newName, modifierRow) =>
   {
      //TODO: no reason for this to be by row and others by key
      if (undefined === modifierRow)
      {
         this.addRow(newName);
         return;
      }

      const updatedIndex = this.getIndexByKey(modifierRow.getKey());

      if (!Data.Modifier.names.contains(newName) || this._hasDuplicate())
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         const rowState = modifierRow.getState();
         rowState.name = newName;
         this._rowArray[updatedIndex] = new ModifierObject({
            key: this._blankKey,
            powerRowParent: this.props.powerRowParent,
            modifierListParent: this,
            sectionName: this.props.sectionName,
            state: rowState
         });
         this._prerender();
         this.setState(state =>
         {
            state.it[updatedIndex].name = newName;
            return state;
         });
      }
   };
   updateRankByKey = (newRank, updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const rowState = this._rowArray[updatedIndex].getState();
      rowState.rank = newRank;
      this._rowArray[updatedIndex] = new ModifierObject({
         key: this._blankKey,
         powerRowParent: this.props.powerRowParent,
         modifierListParent: this,
         sectionName: this.props.sectionName,
         state: rowState
      });
      this._prerender();
      this.setState(state =>
      {
         state.it[updatedIndex].rank = newRank;
         return state;
      });
   };
   updateTextByKey = (newText, updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const rowState = this._rowArray[updatedIndex].getState();
      rowState.text = newText;
      this._rowArray[updatedIndex] = new ModifierObject({
         key: this._blankKey,
         powerRowParent: this.props.powerRowParent,
         modifierListParent: this,
         sectionName: this.props.sectionName,
         state: rowState
      });

      if (this._hasDuplicate())
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         this._prerender();
         this.setState(state =>
         {
            state.it[updatedIndex].text = newText;
            return state;
         });
      }
   };
   /**Creates a new row at the end of the array*/
   addRow = (newName) =>
   {
      const modifierObject = this._addRowNoPush(newName);
      this._rowArray.push(modifierObject);
      this._prerender();
      this.setState(state =>
      {
         state.it.push(modifierObject.getState());
         return state;
      });
   };
   _addRowNoPush = (newName) =>
   {
      //TODO: move this up. was in mod row
      if (false)
      {
         var wasAttack = ('Attack' === state.name || 'Affects Others Only' === state.name || 'Affects Others Also' === state.name);
         //TODO: remove these modifiers from GUI for non-personal powers. Those would need to be Enhanced trait attack
         if (wasAttack && 'Feature' !== props.powerRowParent.getEffect()) props.powerRowParent.setRange('Personal');

         if (!Data.Modifier.names.contains(nameGiven))  //if row is removed, ie: 'Select Modifier'
         {
            this._resetValues();
            if (wasAttack) props.powerRowParent.generateNameAndSkill();  //technically only necessary if 'Attack' === state.name
            return;
         }


         if (('Attack' === state.name || 'Affects Others Only' === state.name || 'Affects Others Also' === state.name)
            && 'Personal' === props.powerRowParent.getRange())
            props.powerRowParent.setRange('Close');  //when loading this value is redundantly set then later overridden by load's setRange
         if (wasAttack || 'Attack' === state.name) props.powerRowParent.generateNameAndSkill();  //create or destroy as needed
      }

      //the row that was blank no longer is so use the blank key
      const modifierObject = new ModifierObject({
         key: this._blankKey,
         powerRowParent: this.props.powerRowParent,
         modifierListParent: this,
         sectionName: this.props.sectionName,
         state: {name: newName}  //rest are defaulted
      });
      //need a new key for the new blank row
      this._blankKey = MainObject.generateKey();
      return modifierObject;
   };
   /**@returns true if 2+ rows in rowArray have the same UniqueName*/
   _hasDuplicate = () =>
   {
      //can't change this to take an arg because update name/text will already be in state
      return this._rowArray.map(item => item.getUniqueName())
      .some((val, id, array) =>
      {
         return array.indexOf(val) !== id;
      });
   };
   /**Call this after updating rowArray but before setState*/
   _prerender = () =>
   {
      //don't update any state
      this.calculateValues();
   };
   /**Section level validation. Such as remove blank and redundant rows and add a final blank row*/
   _sanitizeRows = () =>
   {
      const namesSoFar = [];
      let canHaveAttack = true;
      if (this.props.powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack = false;  //feature has a default range of Personal
      for (let i = 0; i < this._rowArray.length; i++)
      {
         if (this._rowArray[i].isBlank() && i < this._rowArray.length)
         {
            this._removeRow(i);
            i--;
            continue;
         }  //remove blank row that isn't last
         else if (this._rowArray[i].isBlank()) continue;  //do nothing if last row is blank

         if (this.props.powerRowParent.getSection() === Main.equipmentSection &&
            (this._rowArray[i].getName() === 'Removable' || this._rowArray[i].getName() === 'Easily Removable'))
         {
            this._removeRow(i);
            i--;
            continue;
         }
         //equipment has removable built in and can't have the modifiers

         const modifierName = this._rowArray[i].getUniqueName(false);
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
   /**Pass into Array.prototype.sort so that the automatic modifiers come first. With action, range, duration, then others.*/
   _sortOrder = (a, b) =>
   {
      const aFirst = -1;
      const bFirst = 1;

      if ('Faster Action' === a.getName() || 'Slower Action' === a.getName()) return aFirst;
      if ('Faster Action' === b.getName() || 'Slower Action' === b.getName()) return bFirst;
      //Triggered requires Selective started between 2.0 and 2.5. Triggered isn't an action in 1.0. Triggered and Aura can't both exist
      if ('Aura' === a.getName() || ('Selective' === a.getName() && 'Triggered' === this.props.powerRowParent.getAction())) return aFirst;
      if ('Aura' === b.getName() || ('Selective' === b.getName() && 'Triggered' === this.props.powerRowParent.getAction())) return bFirst;

      if ('Increased Range' === a.getName() || 'Reduced Range' === a.getName()) return aFirst;
      if ('Increased Range' === b.getName() || 'Reduced Range' === b.getName()) return bFirst;

      if ('Increased Duration' === a.getName() || 'Decreased Duration' === a.getName()) return aFirst;
      if ('Increased Duration' === b.getName() || 'Decreased Duration' === b.getName()) return bFirst;

      //else maintain the current order
      //using rowIndex to force sort to be stable (since it might not be)
      if (a.getModifierRowIndex() < b.getModifierRowIndex()) return aFirst;
      return bFirst;
   };
   /**This is only for testing. Calling it otherwise will throw. This simply re-sorts with an unstable algorithm.*/
   _testSortStability = () => {unstableSort(this._rowArray, this._sortOrder);};  //throws if unstableSort doesn't exist
}

//TODO: not sure if setting state should be fixed before pulling state up. probably not

function testPowerRow()
{
   const key = MainObject.generateKey();
   ReactDOM.render(
      <PowerObjectAgnostic sectionName={"power"} powerListParent={Main.powerSection}
                           key={key} keyCopy={key} />,
      document.getElementById('power-section')
   );
}

/*
all state:
getAction = () => {return this.state.action;};
getBaseCost = () => {return this.state.baseCost;};
getDuration = () => {return this.state.duration;};
getEffect = () => {return this.state.effect;};
getName = () => {return this.state.name;};
getRange = () => {return this.state.range;};
getRank = () => {return this.state.rank;};
getSkillUsed = () => {return this.state.skillUsed;};
getText = () => {return this.state.text;};
*/
