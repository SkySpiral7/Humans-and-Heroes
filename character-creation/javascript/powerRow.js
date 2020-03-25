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
function PowerObjectAgnostic(props)
{
   //private variable section:
   var state, derivedValues;
   var modifierSection;

   //Basic getter section (all single line)
   this.getAction=function(){return state.action;};
   this.getBaseCost=function(){return state.baseCost;};
   this.getDuration=function(){return state.duration;};
   /**Get the effect name of the power*/
   this.getEffect=function(){return state.effect;};
   /**Get the user's name for the power*/
   this.getName=function(){return state.name;};
   this.getRange=function(){return state.range;};
   this.getRank=function(){return state.rank;};
   this.getSkillUsed=function(){return state.skillUsed;};
   this.getText=function(){return state.text;};
   /**The total with respect to auto changes and raw total*/
   this.getTotal=function(){return state.total;};
   //for modifierSection see this.getModifierList in the onChange section
   this.isBaseCostSettable=function(){return derivedValues.canSetBaseCost;};
   this.getSection=function(){return props.powerListParent;};

   //Single line function section (ignoring isBlank check)
   /**After this is called setAction, setRange, and setDuration will only check if the value exists.*/
   this.disableValidationForActivationInfo=function(){derivedValues.shouldValidateActivationInfo = false;};
   /**Returns the default action for this power or nothing if this row is blank.*/
   this.getDefaultAction=function()
   {
       if(this.isBlank()) return;
       return Data.Power[state.effect].defaultAction;
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   this.getDefaultDuration=function()
   {
       if(this.isBlank()) return;
       return Data.Power[state.effect].defaultDuration;
   };
   /**Returns the default range or nothing if this row is blank.*/
   this.getDefaultRange=function()
   {
       if(this.isBlank()) return;
       return Data.Power[state.effect].defaultRange;
   };
    /**Get the name of the power appended with text and modifiers to determine redundancy*/
    this.getUniqueName=function(){return state.effect+': '+state.text+'; '+modifierSection.getUniqueName();};  //text might be empty
    /**If true then getAutoTotal must be called*/
    this.hasAutoTotal=function(){return modifierSection.hasAutoTotal();};
    /**True if this row has no data*/
    this.isBlank=function(){return (undefined === state.effect);};
    this.setRowIndex=function(indexGiven){state.rowIndex=indexGiven; modifierSection.setSectionRowIndex(state.rowIndex);};

   //Onchange section
    /**Onchange function for selecting a power*/
    this.select=function(){CommonsLibrary.select.call(this, this.setPower,
       (props.sectionName+'Choices'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the base cost (if possible)*/
    //won't be called if you can't set base cost
    this.changeBaseCost=function(){CommonsLibrary.change.call(this, this.setBaseCost,
       (props.sectionName+'BaseCost'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText,
       (props.sectionName+'Text'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the action*/
    //won't be called if SelectAction doesn't exists
    this.selectAction=function(){CommonsLibrary.select.call(this, this.setAction,
       (props.sectionName+'SelectAction'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the range*/
    this.selectRange=function(){CommonsLibrary.select.call(this, this.setRange,
       (props.sectionName+'SelectRange'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the duration*/
    this.selectDuration=function(){CommonsLibrary.select.call(this, this.setDuration,
       (props.sectionName+'SelectDuration'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the user's name for the power*/
    this.changeName=function(){CommonsLibrary.change.call(this, this.setName,
       (props.sectionName+'Name'+state.rowIndex), props.powerListParent);};
    /**Onchange function for changing the skill name used for the power's attack*/
    this.changeSkill=function(){CommonsLibrary.change.call(this, this.setSkill,
       (props.sectionName+'Skill'+state.rowIndex), props.powerListParent);};
    /**Getter is used for onChange events and for other information gathering*/
    //listed here instead of getter section to match its document location
    this.getModifierList=function(){return modifierSection;};
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank,
       (props.sectionName+'Rank'+state.rowIndex), props.powerListParent);};

   //Value setting section
   /**Populates data of the power by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setPower=function(effectNameGiven)
   {
       modifierSection.clear();  //always clear them out on select
       if(!Data.Power.names.contains(effectNameGiven)){this._resetValues(); return;}
          //this is only reachable if you select the default value in the drop down

       state.effect = effectNameGiven;
       derivedValues.canSetBaseCost = Data.Power[state.effect].hasInputBaseCost;
       state.baseCost = Data.Power[state.effect].baseCost;
       if(undefined === state.text) state.text = 'Descriptors and other text';  //let the text stay if changing between powers
       state.action = Data.Power[state.effect].defaultAction;
       state.range = Data.Power[state.effect].defaultRange;
       state.duration = Data.Power[state.effect].defaultDuration;
       state.rank = 1;
       //name = skillUsed = undefined;  //don't clear so that if changing between 2 different attacks these carry over
       this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setBaseCost=function(baseGiven)
   {
       if(!derivedValues.canSetBaseCost || this.isBlank()) return;  //only possible when loading bad data
       state.baseCost = sanitizeNumber(baseGiven, 1, Data.Power[state.effect].baseCost);  //unique defaults
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
      if(this.isBlank()) return;
      state.text = textGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setAction=function(newActionName)
   {
      if(this.isBlank()) return;
      if(state.action === newActionName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.actions.contains(newActionName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser('PowerObjectAgnostic.setAction.notExist', props.sectionName.toTitleCase() + ' #' +
            (state.rowIndex+1) + ': ' + newActionName + ' is not the name of an action.');
         return;
      }

      state.action = newActionName;

      if(!derivedValues.shouldValidateActivationInfo) return;  //done
      this._updateActionModifiers();
      if('Reaction' === state.action && 'Feature' !== state.effect && 'Luck Control' !== state.effect &&
         Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4)) this.setRange('Close');
      this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRange=function(newRangeName)
   {
      if(this.isBlank()) return;
      if(state.range === newRangeName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.ranges.contains(newRangeName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser('PowerObjectAgnostic.setRange.notExist', props.sectionName.toTitleCase() + ' #' +
            (state.rowIndex+1) + ': ' + newRangeName + ' is not the name of a range.');
         return;
      }

      var oldRange = state.range;
      state.range = newRangeName;

      if(!derivedValues.shouldValidateActivationInfo) return;  //done

      //TODO: loading should make sure that skillUsed can't be set when Perception range
      this.generateNameAndSkill();

      if ('Personal' === oldRange && 'Permanent' === state.duration)
      {
         //changing from personal must change duration to not be permanent
         var defaultDuration = Data.Power[state.effect].defaultDuration;
         if('Permanent' === defaultDuration) this.setDuration('Sustained');
         else this.setDuration(defaultDuration);
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
      }

      this._updateRangeModifiers();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setDuration=function(newDurationName)
   {
       if(this.isBlank()) return;
       if(state.duration === newDurationName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.durations.contains(newDurationName))
      {
          //if not found (only possible when loading bad data)
          Main.messageUser('PowerObjectAgnostic.setDuration.notExist', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' + newDurationName + ' is not the name of a duration.');
          return;
      }

       var oldDuration = state.duration;
       state.duration = newDurationName;

       if(!derivedValues.shouldValidateActivationInfo) return;  //done

       var defaultDurationName = Data.Power[state.effect].defaultDuration;

       if('Permanent' === newDurationName) this.setAction('None');  //if changing to Permanent
      else if('Permanent' === oldDuration)  //if changing from Permanent
      {
          //then reset action
          if('Permanent' === defaultDurationName) this.setAction('Free');  //default action is None so use Free instead
          else this.setAction(Data.Power[state.effect].defaultAction);
          //use default action if possible otherwise use Free
          //either way it will cost 0
      }

       this._updateDurationModifiers();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setName=function(nameGiven)
   {
       if(this.isBlank()) return;
       state.name = nameGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setSkill=function(skillGiven)
   {
       if(this.isBlank()) return;
       state.skillUsed = skillGiven;
   };
    //for modifierSection see this.getModifierList in the onChange section
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       state.rank = sanitizeNumber(rankGiven, 1, 1);
   };

   //public function section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
      modifierSection.calculateValues();
      var costPerRank = (state.baseCost + modifierSection.getRankTotal());
      if(Main.getActiveRuleset().isGreaterThanOrEqualTo(3,5) && 'Variable' === state.effect && costPerRank < 5) costPerRank = 5;
      else if(costPerRank < -3) costPerRank = -3;  //can't be less than 1/5
      derivedValues.costPerRank = costPerRank;  //save the non-decimal version
      if(costPerRank < 1) costPerRank = 1/(2 - costPerRank);

      state.total = Math.ceil(costPerRank*state.rank);  //round up
      var flatValue = modifierSection.getFlatTotal();
      if (flatValue < 0 && (state.total + flatValue) < 1)  //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
      {
         state.rank = (Math.abs(flatValue) / costPerRank);
         state.rank = Math.floor(state.rank) + 1;  //must be higher than for this to work. don't use ceil so that if whole number will still be +1
         state.total = Math.ceil(costPerRank * state.rank);  //round up
      }
      derivedValues.flatValue = flatValue;
      state.total += flatValue;  //flatValue might be negative
      if('A God I Am' === state.effect) state.total += 145;  //for first ranks
      else if('Reality Warp' === state.effect) state.total += 75;
      state.total = modifierSection.calculateGrandTotal(state.total);  //used to calculate all auto modifiers
   };
   /**This creates the page's html (for the row). called by power section only*/
   this.generate=function()
   {
      derivedValues.possibleActions = [];
      derivedValues.possibleRanges = [];
      derivedValues.possibleDurations = [];
      derivedValues.modifierHtml = '';
      if (!this.isBlank())  //this is here because the validate methods can't be called during Main.constructor. and don't apply anyway
      {
         derivedValues.possibleActions = this._validateAndGetPossibleActions();
         derivedValues.possibleRanges = this._getPossibleRanges();
         derivedValues.possibleDurations = this._validateAndGetPossibleDurations();
         derivedValues.modifierHtml = modifierSection.generate();
      }
      return HtmlGenerator.powerRow(props, state, derivedValues);
   };
   /**Call this in order to generate or clear out name and skill. Current values are preserved (if not cleared) or default text is generated.*/
   this.generateNameAndSkill=function()
   {
      if (!Data.Power[state.effect].isAttack && undefined === modifierSection.findRowByName('Attack'))
      {
         state.name = state.skillUsed = undefined;
         return;
      }
      if(undefined === state.name) state.name = (props.sectionName.toTitleCase() + ' ' + (state.rowIndex+1) +
         ' ' + state.effect);  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness

      var isAura = (Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Reaction' === state.action &&
         'Luck Control' !== state.effect && 'Feature' !== state.effect);
      if('Perception' === state.range || isAura) state.skillUsed = undefined;
      else if(undefined === state.skillUsed) state.skillUsed = 'Skill used for attack';
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
      //don't just clone state: skill, cost is different
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
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
   {
      //no-op until they can all be removed from commons
      //no-op: modifierSection.setAll();
   };
   /**Only used for loading. This function resets all of the modifiers for action, range, duration.*/
   this.updateActivationModifiers=function()
   {
      derivedValues.shouldValidateActivationInfo = true;
      this._updateActionModifiers();
      this._updateRangeModifiers();
      this._updateDurationModifiers();
   };
   /**Called when loading after action, range, and duration have been set. This function validates the values
   making sure the values are possible and consistent with priority given to range then duration.
   It will changes values to be valid. This function requires modifiers to be loaded (but doesn't affect them).
   The precedence is personal range, duration, action, reaction range, (then modifiers which aren't affected here).*/
   this.validateActivationInfo=function()
   {
      this._validatePersonalRange();
      this._validateAndGetPossibleDurations();
      this._validateAndGetPossibleActions();
      /*the order is Range, Duration, Action, Range again
      first 3 are required order based on dependencies,
      visit range again so that Reaction can have a more reasonable fallback action*/
      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== state.effect && 'Feature' !== state.effect &&
         'Reaction' === state.action && 'Close' !== state.range)
      {
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose', props.sectionName.toTitleCase() +
            ' #' + (state.rowIndex+1) + ': ' +
            state.effect + ' has an action of Reaction and therefore must have a range of Close.');
         state.range = 'Close';
         //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
      }
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this._constructor=function()
   {
      state = {rowIndex: props.initialRowIndex};
      modifierSection = new ModifierList(this, state.rowIndex, props.sectionName);
      this._resetValues();
   };
   /**@returns {Array} of all ranges that are possible for this power based on current state.*/
   this._getPossibleRanges=function()
   {
      var possibleRanges = [];
      if('Feature' === state.effect) possibleRanges.push('Personal');
      else
      {
         if(Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === state.action && 'Luck Control' !== state.effect) return ['Close'];
         if('Personal' === state.range) return ['Personal'];
      }
      return possibleRanges.concat(['Close', 'Ranged', 'Perception']);
   };
   this._resetValues=function()
   {
      //props and indexes are not reset
      state = {rowIndex: state.rowIndex};
      derivedValues = {shouldValidateActivationInfo: true, total: 0};
   };
   /**This function creates Selective if needed and recreates Faster/Slower Action as needed.*/
   this._updateActionModifiers=function()
   {
      if('Triggered' === state.action) modifierSection.createByNameRank('Selective', 1);  //Triggered must also be selective so it auto adds but doesn't remove

      if('Feature' === state.effect) return;  //Feature doesn't change any other modifiers

      //remove all if possible
      modifierSection.removeByName('Faster Action');
      modifierSection.removeByName('Slower Action');
      modifierSection.removeByName('Aura');

      if('None' === state.action) return;  //don't add any modifiers

      var defaultActionName = Data.Power[state.effect].defaultAction;
      if('None' === defaultActionName) defaultActionName = 'Free';  //calculate distance from free
      var defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
      var newActionIndex = Data.Power.actions.indexOf(state.action);
      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Reaction' === state.action && 'Luck Control' !== state.effect)
      {
         newActionIndex = Data.Power.actions.indexOf('Standard');  //calculate distance from Standard
         modifierSection.createByNameRank('Aura', 1);
      }

      var actionDifference = (newActionIndex - defaultActionIndex);
      if(actionDifference > 0) modifierSection.createByNameRank('Faster Action', actionDifference);
      else if(actionDifference < 0) modifierSection.createByNameRank('Slower Action', -actionDifference);
   };
   /**This function recreates Increased/Decreased Duration as needed.*/
   this._updateDurationModifiers=function()
   {
       if('Feature' === state.effect) return;  //Feature doesn't change modifiers

       var defaultDurationName = Data.Power[state.effect].defaultDuration;
       var defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
       var newDurationIndex = Data.Power.durations.indexOf(state.duration);
       if('Permanent' === defaultDurationName && 'Personal' !== state.range) defaultDurationIndex = Data.Power.durations.indexOf('Sustained');  //calculate distance from Sustained

       //remove both if possible
       modifierSection.removeByName('Increased Duration');
       modifierSection.removeByName('Decreased Duration');

       var durationDifference = (newDurationIndex - defaultDurationIndex);
       if(durationDifference > 0) modifierSection.createByNameRank('Increased Duration', durationDifference);
       else if(durationDifference < 0) modifierSection.createByNameRank('Decreased Duration', -durationDifference);
   };
   /**This function recreates Increased/Reduced Range as needed.*/
   this._updateRangeModifiers=function()
   {
       //when changing to personal nothing else needs to change
       if('Personal' === state.range) return;  //only possible (for feature or) when removing a modifier

       if('Feature' === state.effect) return;  //Feature doesn't change modifiers
       //TODO: refactor so that Feature has a base activation row and a current activation row
       //so that Feature will have the modifiers auto set. This should be less confusing to the user
       //this will also allow and require more edge case testing

       var defaultRangeName = Data.Power[state.effect].defaultRange;
       var defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
       var newRangeIndex = Data.Power.ranges.indexOf(state.range);
       if('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close');  //calculate distance from close

       //remove both if possible
       modifierSection.removeByName('Increased Range');
       modifierSection.removeByName('Reduced Range');

       var rangeDifference = (newRangeIndex - defaultRangeIndex);
       if(rangeDifference > 0) modifierSection.createByNameRank('Increased Range', rangeDifference);
       else if(rangeDifference < 0) modifierSection.createByNameRank('Reduced Range', -rangeDifference);
   };
   /**@returns {Array} of all actions that are possible for this power based on current state.*/
   this._validateAndGetPossibleActions=function()
   {
      //feature has the same action as the others (because allowReaction is true)
      if ('Permanent' === state.duration)
      {
         if ('None' !== state.action)
         {
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
               state.effect + ' can\'t have an action of ' + state.action + '. It can only be None because the duration is Permanent.');
            state.action = 'None';
         }
         return ['None'];
      }
      else if ('None' === state.action)  //only Permanent duration can have action None
      {
         state.action = Data.Power[state.effect].defaultAction;
         if('None' === state.action) state.action = 'Free';
         //use default action if possible. otherwise use Free
         //either way it will cost 0
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.notNone', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
            state.effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + state.duration + '). Using action of ' + state.action + ' instead.');
      }
      var possibleActions = Data.Power.actions.copy();
      possibleActions.removeByValue('None');  //it would have returned above if none is allowed

      var allowMoveAction = (Main.getActiveRuleset().isLessThan(3,4) || !Data.Power[state.effect].isAttack || 'Move Object' === state.effect);
      if (!allowMoveAction) possibleActions.removeByValue('Move');
      if ('Move' === state.action && !allowMoveAction)
      {
         state.action = Data.Power[state.effect].defaultAction;
         if('None' === state.action) state.action = 'Free';  //dead code: attacks can't have a default duration of Permanent
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed',
            props.sectionName.toTitleCase() + ' #' + (state.rowIndex + 1) + ': ' + state.effect + ' can\'t have an action ' +
            'of Move because it is an attack type. Using action of ' + state.action + ' instead.');
      }

      var allowFreeAction = (Main.getActiveRuleset().isLessThan(3, 4) ||
         (allowMoveAction && !Data.Power[state.effect].isMovement && 'Healing' !== state.effect));
      if (!allowFreeAction) possibleActions.removeByValue('Free');
      if ('Free' === state.action && !allowFreeAction)
      {
         if (!allowMoveAction)
         {
            state.action = Data.Power[state.effect].defaultAction;
            if ('None' === state.action) state.action = 'Free';  //dead code: attacks/movement can't have a default duration of Permanent
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', props.sectionName.toTitleCase() + ' #' + (state.rowIndex + 1) + ': ' +
               state.effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + state.action + ' instead.');
         }
         //attacks can't be movements so there's no overlap
         else if (Data.Power[state.effect].isMovement)
         {
            state.action = Data.Power[state.effect].defaultAction;
            if ('None' === state.action) state.action = 'Free';  //dead code: movements can't have a default duration of Permanent
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', props.sectionName.toTitleCase() + ' #' + (state.rowIndex + 1) + ': ' +
               state.effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + state.action + ' instead.');
         }
         //healing is not an attack or movement so there's no overlap
         else //if ('Healing' === state.effect)
         {
            state.action = Data.Power[state.effect].defaultAction;
            if ('None' === state.action) state.action = 'Free';  //dead code: Healing doesn't have a default duration of Permanent
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', props.sectionName.toTitleCase() + ' #' + (state.rowIndex + 1) + ': ' +
               'Healing can\'t have an action of Free. Using action of ' + state.action + ' instead.');
         }
      }

      var allowReaction = (Main.getActiveRuleset().isLessThan(3,4) || Data.Power[state.effect].allowReaction);
      if (!allowReaction) possibleActions.removeByValue('Reaction');
      if ('Reaction' === state.action && !allowReaction)
      {
         state.action = Data.Power[state.effect].defaultAction;
         if('None' === state.action) state.action = 'Free';  //duration is not Permanent here because that was checked above
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
            state.effect + ' can\'t have an action of Reaction because it isn\'t an attack type. Using action of ' + state.action + ' instead.');
         //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
      }

      return possibleActions;
   };
   /**@returns {Array} of all durations that are possible for this power based on current state.*/
   this._validateAndGetPossibleDurations=function()
   {
      var defaultDuration = Data.Power[state.effect].defaultDuration;
      if ('Instant' === defaultDuration)
      {
         if ('Instant' !== state.duration)
         {
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
               state.effect + ' can\'t have ' + state.duration + ' duration. It can only be Instant.');
            state.duration = 'Instant';  //can't be changed (Feature's defaultDuration is Permanent)
         }
         return ['Instant'];
      }

      var possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
      if('Personal' === state.range) possibleDurations.push('Permanent');  //even Feature needs Personal range for Permanent duration
      //when loading, range may later change to Close but not Personal so this check is safe
      else if ('Permanent' === state.duration)  //only personal range can have Permanent duration
      {
         if('Permanent' === defaultDuration) state.duration = 'Sustained';
         else state.duration = defaultDuration;
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
            state.effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + state.range + '). Using duration of ' + state.duration + ' instead.');
      }
      if('Feature' === state.effect) possibleDurations.push('Instant');
      else if ('Instant' === state.duration)
      {
         //only Feature can change to Instant duration. defaultDuration of instant was checked above
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
            state.effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
         state.duration = defaultDuration;
      }
      return possibleDurations;
   };
   /**This function validates range. It changes range and creates user messages as needed.*/
   this._validatePersonalRange=function()
   {
      if('Feature' === state.effect) return;  //allow everything
      var defaultRange = Data.Power[state.effect].defaultRange;
      if ('Personal' === state.range  && 'Personal' !== defaultRange)
      {
         Main.messageUser('PowerObjectAgnostic.validatePersonalRange.notPersonal', props.sectionName.toTitleCase() + ' #' + (state.rowIndex+1) + ': ' +
            state.effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
         state.range = defaultRange;  //can't change something to personal unless it started out as that (Feature's defaultRange is Personal)
      }
      else if ('Personal' !== state.range && 'Personal' === defaultRange)
      {
         var hasNonPersonalMod = modifierSection.isNonPersonalModifierPresent();
         if (!hasNonPersonalMod)
         {
            Main.messageUser('PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed', props.sectionName.toTitleCase() + ' #' + (state.rowIndex + 1) + ': ' +
               state.effect + ' with ' + state.range + ' range requires one of the following modifiers: "Affects Others Also", "Affects Others Only", or "Attack". ' +
               'Using the default range of Personal instead.');
            state.range = defaultRange;  //can't create a mod for you since there are 3 possible
         }
      }
   };
   //constructor:
   this._constructor();
}
