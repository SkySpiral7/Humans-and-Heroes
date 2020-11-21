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
      this.state = {};
      //modifierSection is lazy because it is re-created each render
      this._derivedValues = {shouldValidateActivationInfo: true, total: 0};
   };

   //Basic getter section (all single line)
   getAction = () => {return this.state.action;};
   getBaseCost = () => {return this.state.baseCost;};
   getDuration = () => {return this.state.duration;};
   getDerivedValues = () => {return JSON.clone(this._derivedValues);};
   /**Get the effect name of the power*/
   getEffect = () => {return this.state.effect;};
   getKey = () => {return this.props.keyCopy;};
   /**Get the user's name for the power*/
   getName = () => {return this.state.name;};
   getRange = () => {return this.state.range;};
   getRank = () => {return this.state.rank;};
   getSectionName = () => {return this.props.sectionName;};
   getSkillUsed = () => {return this.state.skillUsed;};
   getState = () => {return JSON.clone(this.state);};
   getText = () => {return this.state.text;};
   /**The total with respect to auto changes and raw total*/
   getTotal = () => {return this.state.total;};
   //for modifierSection see this.getModifierList in the onChange section
   isBaseCostSettable = () => {return this._derivedValues.canSetBaseCost;};
   getSection = () => {return this.props.powerListParent;};

   //Single line function section (ignoring isBlank check)
   /**After this is called setAction, setRange, and setDuration will only check if the value exists.*/
   disableValidationForActivationInfo = () => {this._derivedValues.shouldValidateActivationInfo = false;};
   /**Returns the default action for this power or nothing if this row is blank.*/
   getDefaultAction = () =>
   {
      if (this.isBlank()) return;
      return Data.Power[this.state.effect].defaultAction;
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   getDefaultDuration = () =>
   {
      if (this.isBlank()) return;
      return Data.Power[this.state.effect].defaultDuration;
   };
   /**Returns the default range or nothing if this row is blank.*/
   getDefaultRange = () =>
   {
      if (this.isBlank()) return;
      return Data.Power[this.state.effect].defaultRange;
   };
   /**Get the name of the power appended with text and modifiers to determine redundancy*/
   getUniqueName = () =>
   {
      let modListName = '';
      if (undefined !== this.modifierSection) modListName = this.modifierSection.getUniqueName();
      return this.state.effect + ': ' + this.state.text + '; ' + modListName;  //text might be empty
   };
   /**If true then getAutoTotal must be called*/
      //TODO: these are useless?
   hasAutoTotal = () => {return this.modifierSection.hasAutoTotal();};
   /**True if this row has no data*/
   isBlank = () => {return (undefined === this.state.effect);};
   setRowIndex = (indexGiven) =>
   {
      this.state.rowIndex = indexGiven;
      this.modifierSection.setSectionRowIndex(this.state.rowIndex);
   };

   //Onchange section
   /**Onchange function for selecting a power*/
   select = () =>
   {
      CommonsLibrary.select.call(this, this.setPower,
         (this.props.sectionName + 'Choices' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the base cost (if possible)*/
   changeBaseCost = () =>
   {
      //won't be called if you can't set base cost
      CommonsLibrary.change.call(this, this.setBaseCost,
         (this.props.sectionName + 'BaseCost' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the text*/
   changeText = () =>
   {
      CommonsLibrary.change.call(this, this.setText,
         (this.props.sectionName + 'Text' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the action*/
   selectAction = () =>
   {
      //won't be called if SelectAction doesn't exist
      CommonsLibrary.select.call(this, this.setAction,
         (this.props.sectionName + 'SelectAction' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the range*/
   selectRange = () =>
   {
      CommonsLibrary.select.call(this, this.setRange,
         (this.props.sectionName + 'SelectRange' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the duration*/
   selectDuration = () =>
   {
      CommonsLibrary.select.call(this, this.setDuration,
         (this.props.sectionName + 'SelectDuration' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the user's name for the power*/
   changeName = () =>
   {
      CommonsLibrary.change.call(this, this.setName,
         (this.props.sectionName + 'Name' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Onchange function for changing the skill name used for the power's attack*/
   changeSkill = () =>
   {
      CommonsLibrary.change.call(this, this.setSkill,
         (this.props.sectionName + 'Skill' + this.state.rowIndex), this.props.powerListParent);
   };
   /**Getter is used for onChange events and for other information gathering*/
      //listed here instead of getter section to match its document location
   getModifierList = () => {return this.modifierSection;};
   /**Onchange function for changing the rank*/
   changeRank = () =>
   {
      CommonsLibrary.change.call(this, this.setRank,
         (this.props.sectionName + 'Rank' + this.state.rowIndex), this.props.powerListParent);
   };

   //Value setting section
   /**Populates data of the power by using the name (which is validated).
    This must be called before any other data of this row is set.
    The data set is independent of the document and doesn't call update.*/
   setPower = (effectNameGiven) =>
   {
      this.state.Modifiers = [];  //always clear them out on select
      if (!Data.Power.names.contains(effectNameGiven))
      {
         //TODO: delete this row instead
         this._resetValues();
         return;
      }
      //this is only reachable if you select the default value in the drop down

      this.state.effect = effectNameGiven;
      this._derivedValues.canSetBaseCost = Data.Power[this.state.effect].hasInputBaseCost;
      this.state.baseCost = Data.Power[this.state.effect].baseCost;
      if (undefined === this.state.text) this.state.text = 'Descriptors and other text';  //let the text stay if changing between powers
      this.state.action = Data.Power[this.state.effect].defaultAction;
      this.state.range = Data.Power[this.state.effect].defaultRange;
      this.state.duration = Data.Power[this.state.effect].defaultDuration;
      this.state.rank = 1;
      //name = skillUsed = undefined;  //don't clear so that if changing between 2 different attacks these carry over
      this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   setBaseCost = (baseGiven) =>
   {
      if (!this._derivedValues.canSetBaseCost || this.isBlank()) return;  //only possible when loading bad data
      this.state.baseCost = sanitizeNumber(baseGiven, 1, Data.Power[this.state.effect].baseCost);  //unique defaults
   };
   /**Used to set data independent of the document and without calling update*/
   setText = (textGiven) =>
   {
      if (this.isBlank()) return;
      this.state.text = textGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   setAction = (newActionName) =>
   {
      if (this.isBlank()) return;
      if (this.state.action === newActionName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.actions.contains(newActionName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser('PowerObjectAgnostic.setAction.notExist', this.props.sectionName.toTitleCase() + ' #' +
            (this.state.rowIndex + 1) + ': ' + newActionName + ' is not the name of an action.');
         return;
      }

      this.state.action = newActionName;

      if (!this._derivedValues.shouldValidateActivationInfo) return;  //done
      this._updateActionModifiers();
      if ('Reaction' === this.state.action && 'Feature' !== this.state.effect && 'Luck Control' !== this.state.effect &&
         Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4)) this.setRange('Close');
      this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   setRange = (newRangeName) =>
   {
      if (this.isBlank()) return;
      if (this.state.range === newRangeName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.ranges.contains(newRangeName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser('PowerObjectAgnostic.setRange.notExist', this.props.sectionName.toTitleCase() + ' #' +
            (this.state.rowIndex + 1) + ': ' + newRangeName + ' is not the name of a range.');
         return;
      }

      const oldRange = this.state.range;
      this.state.range = newRangeName;

      if (!this._derivedValues.shouldValidateActivationInfo) return;  //done

      //TODO: loading should make sure that skillUsed can't be set when Perception range
      this.generateNameAndSkill();

      if ('Personal' === oldRange && 'Permanent' === this.state.duration)
      {
         //changing from personal must change duration to not be permanent
         const defaultDuration = Data.Power[this.state.effect].defaultDuration;
         if ('Permanent' === defaultDuration) this.setDuration('Sustained');
         else this.setDuration(defaultDuration);
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
      }

      this._updateRangeModifiers();
   };
   /**Used to set data independent of the document and without calling update*/
   setDuration = (newDurationName) =>
   {
      if (this.isBlank()) return;
      if (this.state.duration === newDurationName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.durations.contains(newDurationName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser(
            'PowerObjectAgnostic.setDuration.notExist', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' + newDurationName + ' is not the name of a duration.');
         return;
      }

      const oldDuration = this.state.duration;
      this.state.duration = newDurationName;

      if (!this._derivedValues.shouldValidateActivationInfo) return;  //done

      const defaultDurationName = Data.Power[this.state.effect].defaultDuration;

      if ('Permanent' === newDurationName) this.setAction('None');  //if changing to Permanent
      else if ('Permanent' === oldDuration)  //if changing from Permanent
      {
         //then reset action
         if ('Permanent' === defaultDurationName) this.setAction('Free');  //default action is None so use Free instead
         else this.setAction(Data.Power[this.state.effect].defaultAction);
         //use default action if possible otherwise use Free
         //either way it will cost 0
      }

      this._updateDurationModifiers();
   };
   /**Used to set data independent of the document and without calling update*/
   setName = (nameGiven) =>
   {
      if (this.isBlank()) return;
      this.state.name = nameGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   setSkill = (skillGiven) =>
   {
      if (this.isBlank()) return;
      this.state.skillUsed = skillGiven;
   };
   //for modifierSection see this.getModifierList in the onChange section
   /**Used to set data independent of the document and without calling update*/
   setRank = (rankGiven) =>
   {
      if (this.isBlank()) return;
      this.state.rank = sanitizeNumber(rankGiven, 1, 1);
   };

   //public function section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   calculateValues = () =>
   {
      if (undefined === this.modifierSection) return;  //nothing to calculate for before rendering
      this.modifierSection.calculateValues();
      let costPerRank = (this.state.baseCost + this.modifierSection.getRankTotal());
      if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 5) && 'Variable' === this.state.effect && costPerRank < 5) costPerRank = 5;
      else if (costPerRank < -3) costPerRank = -3;  //can't be less than 1/5
      this._derivedValues.costPerRank = costPerRank;  //save the non-decimal version
      if (costPerRank < 1) costPerRank = 1 / (2 - costPerRank);

      this.state.total = Math.ceil(costPerRank * this.state.rank);  //round up
      const flatValue = this.modifierSection.getFlatTotal();
      if (flatValue < 0 && (this.state.total + flatValue) < 1)  //flat flaw more than (or equal to) the total cost is not allowed. so adjust the
      // power rank
      {
         this.state.rank = (Math.abs(flatValue) / costPerRank);
         this.state.rank = Math.floor(this.state.rank) + 1;  //must be higher than for this to work. don't use ceil so that if whole number
                                                             // will still be +1
         this.state.total = Math.ceil(costPerRank * this.state.rank);  //round up
      }
      this._derivedValues.flatValue = flatValue;
      this.state.total += flatValue;  //flatValue might be negative
      if ('A God I Am' === this.state.effect) this.state.total += 145;  //for first ranks
      else if ('Reality Warp' === this.state.effect) this.state.total += 75;
      this.state.total = this.modifierSection.calculateGrandTotal(this.state.total);  //used to calculate all auto modifiers
   };
   render = () =>
   {
      const callback = function (newThing) {this.modifierSection = newThing;};

      this._derivedValues.possibleActions = this._validateAndGetPossibleActions();
      this._derivedValues.possibleRanges = this._getPossibleRanges();
      this._derivedValues.possibleDurations = this._validateAndGetPossibleDurations();

      //TODO: pretty sure need different key in which case generate in new()
      return (<PowerRowHtml sectionName={this.props.sectionName} powerRow={this} state={this.state}
                            derivedValues={this._derivedValues} key={this.props.keyCopy} keyCopy={this.props.keyCopy}
                            modCallback={callback} modState={this.state.Modifiers} />);
   };
   /**Call this in order to generate or clear out name and skill. Current values are preserved (if not cleared) or default text is generated.*/
   generateNameAndSkill = () =>
   {
      return;  //TODO: disabled generateNameAndSkill
      if (!Data.Power[this.state.effect].isAttack && undefined === this.modifierSection.findRowByName('Attack'))
      {
         this.state.name = this.state.skillUsed = undefined;
         return;
      }
      if (undefined === this.state.name) this.state.name = (this.props.sectionName.toTitleCase() + ' ' + (this.state.rowIndex + 1) +
         ' ' + this.state.effect);  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness

      const isAura = (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4) && 'Reaction' === this.state.action &&
         'Luck Control' !== this.state.effect && 'Feature' !== this.state.effect);
      if ('Perception' === this.state.range || isAura) this.state.skillUsed = undefined;
      else if (undefined === this.state.skillUsed) this.state.skillUsed = 'Skill used for attack';
   };
   /**Returns a json object of this row's data*/
   save = () =>
   {
      //don't just clone this.state: skill, cost is different
      const json = {};
      json.effect = this.state.effect;
      if (this._derivedValues.canSetBaseCost) json.cost = this.state.baseCost;
      json.text = this.state.text;
      json.action = this.state.action;
      json.range = this.state.range;
      json.duration = this.state.duration;
      //checking undefined is redundant but more clear
      if (undefined !== this.state.name) json.name = this.state.name;
      //skill requires name however perception range has name without skill
      if (undefined !== this.state.skillUsed) json.skill = this.state.skillUsed;
      json.Modifiers = this.modifierSection.save();
      json.rank = this.state.rank;
      return json;
   };
   /**Only used for loading. This function resets all of the modifiers for action, range, duration.*/
   updateActivationModifiers = () =>
   {
      this._derivedValues.shouldValidateActivationInfo = true;
      this._updateActionModifiers();
      this._updateRangeModifiers();
      this._updateDurationModifiers();
   };
   /**Called when loading after action, range, and duration have been set. This function validates the values
    making sure the values are possible and consistent with priority given to range then duration.
    It will changes values to be valid. This function requires modifiers to be loaded (but doesn't affect them).
    The precedence is personal range, duration, action, reaction range, (then modifiers which aren't affected here).*/
   validateActivationInfo = () =>
   {
      this._validatePersonalRange();
      this._validateAndGetPossibleDurations();
      this._validateAndGetPossibleActions();
      /*the order is Range, Duration, Action, Range again
      first 3 are required order based on dependencies,
      visit range again so that Reaction can have a more reasonable fallback action*/
      if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== this.state.effect && 'Feature' !== this.state.effect &&
         'Reaction' === this.state.action && 'Close' !== this.state.range)
      {
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose', this.props.sectionName.toTitleCase() +
            ' #' + (this.state.rowIndex + 1) + ': ' +
            this.state.effect + ' has an action of Reaction and therefore must have a range of Close.');
         this.state.range = 'Close';
         //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
      }
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**@returns {Array} of all ranges that are possible for this power based on current state.*/
   _getPossibleRanges = () =>
   {
      const possibleRanges = [];
      if ('Feature' === this.state.effect) possibleRanges.push('Personal');
      else
      {
         if (Main.getActiveRuleset()
            .isGreaterThanOrEqualTo(3, 4) && 'Reaction' === this.state.action && 'Luck Control' !== this.state.effect) return ['Close'];
         if ('Personal' === this.state.range) return ['Personal'];
      }
      return possibleRanges.concat(['Close', 'Ranged', 'Perception']);
   };
   /**This function creates Selective if needed and recreates Faster/Slower Action as needed.*/
   _updateActionModifiers = () =>
   {
      if ('Triggered' === this.state.action) this.modifierSection.createByNameRank('Selective', 1);  //Triggered must also be selective so
                                                                                                     // it auto adds but doesn't remove

      if ('Feature' === this.state.effect) return;  //Feature doesn't change any other modifiers

      //remove all if possible
      this.modifierSection.removeByName('Faster Action');
      this.modifierSection.removeByName('Slower Action');
      this.modifierSection.removeByName('Aura');

      if ('None' === this.state.action) return;  //don't add any modifiers

      let defaultActionName = Data.Power[this.state.effect].defaultAction;
      if ('None' === defaultActionName) defaultActionName = 'Free';  //calculate distance from free
      const defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
      let newActionIndex = Data.Power.actions.indexOf(this.state.action);
      if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4) && 'Reaction' === this.state.action && 'Luck Control' !== this.state.effect)
      {
         newActionIndex = Data.Power.actions.indexOf('Standard');  //calculate distance from Standard
         this.modifierSection.createByNameRank('Aura', 1);
      }

      let actionDifference = (newActionIndex - defaultActionIndex);
      if (actionDifference > 0) this.modifierSection.createByNameRank('Faster Action', actionDifference);
      else if (actionDifference < 0) this.modifierSection.createByNameRank('Slower Action', -actionDifference);
   };
   /**This function recreates Increased/Decreased Duration as needed.*/
   _updateDurationModifiers = () =>
   {
      if ('Feature' === this.state.effect) return;  //Feature doesn't change modifiers

      const defaultDurationName = Data.Power[this.state.effect].defaultDuration;
      let defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
      const newDurationIndex = Data.Power.durations.indexOf(this.state.duration);
      if ('Permanent' === defaultDurationName && 'Personal' !== this.state.range) defaultDurationIndex = Data.Power.durations.indexOf(
         'Sustained');  //calculate distance from Sustained

      //remove both if possible
      this.modifierSection.removeByName('Increased Duration');
      this.modifierSection.removeByName('Decreased Duration');

      let durationDifference = (newDurationIndex - defaultDurationIndex);
      if (durationDifference > 0) this.modifierSection.createByNameRank('Increased Duration', durationDifference);
      else if (durationDifference < 0) this.modifierSection.createByNameRank('Decreased Duration', -durationDifference);
   };
   /**This function recreates Increased/Reduced Range as needed.*/
   _updateRangeModifiers = () =>
   {
      //when changing to personal nothing else needs to change
      if ('Personal' === this.state.range) return;  //only possible (for feature or) when removing a modifier

      if ('Feature' === this.state.effect) return;  //Feature doesn't change modifiers
      //TODO: refactor so that Feature has a base activation row and a current activation row
      //so that Feature will have the modifiers auto set. This should be less confusing to the user
      //this will also allow and require more edge case testing

      const defaultRangeName = Data.Power[this.state.effect].defaultRange;
      let defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
      const newRangeIndex = Data.Power.ranges.indexOf(this.state.range);
      if ('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close');  //calculate distance from close

      //remove both if possible
      this.modifierSection.removeByName('Increased Range');
      this.modifierSection.removeByName('Reduced Range');

      let rangeDifference = (newRangeIndex - defaultRangeIndex);
      if (rangeDifference > 0) this.modifierSection.createByNameRank('Increased Range', rangeDifference);
      else if (rangeDifference < 0) this.modifierSection.createByNameRank('Reduced Range', -rangeDifference);
   };
   /**@returns {Array} of all actions that are possible for this power based on current state.*/
   _validateAndGetPossibleActions = () =>
   {
      //feature has the same action as the others (because allowReaction is true)
      if ('Permanent' === this.state.duration)
      {
         if ('None' !== this.state.action)
         {
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
               this.state.effect + ' can\'t have an action of ' + this.state.action + '. It can only be None because the duration is Permanent.');
            this.state.action = 'None';
         }
         return ['None'];
      }
      else if ('None' === this.state.action)  //only Permanent duration can have action None
      {
         this.state.action = Data.Power[this.state.effect].defaultAction;
         if ('None' === this.state.action) this.state.action = 'Free';
         //use default action if possible. otherwise use Free
         //either way it will cost 0
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.notNone', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
            this.state.effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + this.state.duration + '). Using action of ' + this.state.action + ' instead.');
      }
      const possibleActions = Data.Power.actions.copy();
      possibleActions.removeByValue('None');  //it would have returned above if none is allowed

      let allowMoveAction = (Main.getActiveRuleset()
      .isLessThan(3, 4) || !Data.Power[this.state.effect].isAttack || 'Move Object' === this.state.effect);
      if (!allowMoveAction) possibleActions.removeByValue('Move');
      if ('Move' === this.state.action && !allowMoveAction)
      {
         this.state.action = Data.Power[this.state.effect].defaultAction;
         if ('None' === this.state.action) this.state.action = 'Free';  //dead code: attacks can't have a default duration of Permanent
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed',
            this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' + this.state.effect + ' can\'t have an action ' +
            'of Move because it is an attack type. Using action of ' + this.state.action + ' instead.');
      }

      let allowFreeAction = (Main.getActiveRuleset()
         .isLessThan(3, 4) ||
         (allowMoveAction && !Data.Power[this.state.effect].isMovement && 'Healing' !== this.state.effect));
      if (!allowFreeAction) possibleActions.removeByValue('Free');
      if ('Free' === this.state.action && !allowFreeAction)
      {
         if (!allowMoveAction)
         {
            this.state.action = Data.Power[this.state.effect].defaultAction;
            if ('None' === this.state.action) this.state.action = 'Free';  //dead code: attacks/movement can't have a default duration of
                                                                           // Permanent
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
               this.state.effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + this.state.action + ' instead.');
         }
         //attacks can't be movements so there's no overlap
         else if (Data.Power[this.state.effect].isMovement)
         {
            this.state.action = Data.Power[this.state.effect].defaultAction;
            if ('None' === this.state.action) this.state.action = 'Free';  //dead code: movements can't have a default duration of Permanent
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
               this.state.effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + this.state.action + ' instead.');
         }
         //healing is not an attack or movement so there's no overlap
         else //if ('Healing' === this.state.effect)
         {
            this.state.action = Data.Power[this.state.effect].defaultAction;
            if ('None' === this.state.action) this.state.action = 'Free';  //dead code: Healing doesn't have a default duration of Permanent
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
               'Healing can\'t have an action of Free. Using action of ' + this.state.action + ' instead.');
         }
      }

      let allowReaction = (Main.getActiveRuleset()
      .isLessThan(3, 4) || Data.Power[this.state.effect].allowReaction);
      if (!allowReaction) possibleActions.removeByValue('Reaction');
      if ('Reaction' === this.state.action && !allowReaction)
      {
         this.state.action = Data.Power[this.state.effect].defaultAction;
         if ('None' === this.state.action) this.state.action = 'Free';  //duration is not Permanent here because that was checked above
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
            this.state.effect + ' can\'t have an action of Reaction because it isn\'t an attack type. Using action of ' + this.state.action + ' instead.');
         //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
      }

      return possibleActions;
   };
   /**@returns {Array} of all durations that are possible for this power based on current state.*/
   _validateAndGetPossibleDurations = () =>
   {
      const defaultDuration = Data.Power[this.state.effect].defaultDuration;
      if ('Instant' === defaultDuration)
      {
         if ('Instant' !== this.state.duration)
         {
            Main.messageUser(
               'PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
               this.state.effect + ' can\'t have ' + this.state.duration + ' duration. It can only be Instant.');
            this.state.duration = 'Instant';  //can't be changed (Feature's defaultDuration is Permanent)
         }
         return ['Instant'];
      }

      const possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
      if ('Personal' === this.state.range) possibleDurations.push('Permanent');  //even Feature needs Personal range for Permanent duration
      //when loading, range may later change to Close but not Personal so this check is safe
      else if ('Permanent' === this.state.duration)  //only personal range can have Permanent duration
      {
         if ('Permanent' === defaultDuration) this.state.duration = 'Sustained';
         else this.state.duration = defaultDuration;
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
            this.state.effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + this.state.range + '). Using duration of ' + this.state.duration + ' instead.');
      }
      if ('Feature' === this.state.effect) possibleDurations.push('Instant');
      else if ('Instant' === this.state.duration)
      {
         //only Feature can change to Instant duration. defaultDuration of instant was checked above
         Main.messageUser(
            'PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
            this.state.effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
         this.state.duration = defaultDuration;
      }
      return possibleDurations;
   };
   /**This function validates range. It changes range and creates user messages as needed.*/
   _validatePersonalRange = () =>
   {
      if ('Feature' === this.state.effect) return;  //allow everything
      const defaultRange = Data.Power[this.state.effect].defaultRange;
      if ('Personal' === this.state.range && 'Personal' !== defaultRange)
      {
         Main.messageUser(
            'PowerObjectAgnostic.validatePersonalRange.notPersonal', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
            this.state.effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
         this.state.range = defaultRange;  //can't change something to personal unless it started out as that (Feature's defaultRange is
                                           // Personal)
      }
      else if ('Personal' !== this.state.range && 'Personal' === defaultRange)
      {
         let hasNonPersonalMod = this.modifierSection.isNonPersonalModifierPresent();
         if (!hasNonPersonalMod)
         {
            Main.messageUser(
               'PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed', this.props.sectionName.toTitleCase() + ' #' + (this.state.rowIndex + 1) + ': ' +
               this.state.effect + ' with ' + this.state.range + ' range requires one of the following modifiers: "Affects Others Also", "Affects Others Only", or "Attack". ' +
               'Using the default range of Personal instead.');
            this.state.range = defaultRange;  //can't create a mod for you since there are 3 possible
         }
      }
   };
   //region converted from mod list
   /**This will set a row (by name) to the rank given. If the row doesn't exist it will be created*/
   createByNameRank = (rowName, rowRank) =>
   {
      let rowIndex = this.modifierSection.findRowByName(rowName);
      if (undefined === rowIndex)
      {
         this.state.Modifiers.push({name: rowName, rank: rowRank});
      }
      else
      {
         this.state.Modifiers[rowIndex].rank = rowRank;
      }
   };
   /**This will remove a row of the given name. Note that this should only be called with modifiers that don't have text.*/
   removeByName = (rowName) =>
   {
      const rowIndex = this.findRowByName(rowName);
      if (undefined !== rowIndex) this.state.Modifiers.remove(rowIndex);
   };
   //endregion converted from mod list


   //region copied from mod list
   /**Sets data from a json object given then updates. The row array is not cleared by this function*/
   load = (jsonSection) =>
   {
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      const newState = [];
      const duplicateCheck = [];
      for (let i = 0; i < jsonSection.length; i++)
      {
         const nameToLoad = jsonSection[i].name;
         //TODO: call a fun to get current power index
         const loadLocation = (this.props.sectionName.toTitleCase() + ' #' + (this.props.state.sectionRowIndex + 1) + ' Modifier #' + (i + 1));
         if (!Data.Modifier.names.contains(nameToLoad))
         {
            Main.messageUser(
               'ModifierList.load.notExist', loadLocation + ': ' +
               nameToLoad + ' is not a modifier name. Did you mean "Other" with text?');
            continue;
         }
         const modifierObject = this._addRowNoPush(nameToLoad);
         if (undefined !== jsonSection[i].applications) modifierObject.setRank(jsonSection[i].applications);
         if (undefined !== jsonSection[i].text) modifierObject.setText(jsonSection[i].text);

         //duplicateCheck after setting all values for the sake of getUniqueName
         if (duplicateCheck.contains(modifierObject.getUniqueName()))
         {
            Main.messageUser('ModifierList.load.duplicate', loadLocation + ': ' + nameToLoad +
               ' is not allowed because the modifier already exists. Increase the rank instead or use different text.');
            continue;
         }
         this._rowArray.push(modifierObject);
         duplicateCheck.push(modifierObject.getUniqueName());
         newState.push(modifierObject.getState());
      }
      this._prerender();
      this.setState(state =>
      {
         state.it = newState;
         return state;
      });
   };
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
yes total is state for now
getTotal = () => {return this.state.total;};
*/
