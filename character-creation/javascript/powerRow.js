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
function PowerObjectAgnostic(powerListParent, rowIndex, sectionName)
{
   //private variable section:
   var effect, canSetBaseCost, baseCost, text, action, range, duration, name, skillUsed, rank, total;
   var modifierSection = new ModifierList(this, rowIndex, sectionName);
   var shouldValidateActivationInfo;  //used internally

   //Basic getter section (all single line)
   this.getAction=function(){return action;};
   this.getBaseCost=function(){return baseCost;};
   this.getDuration=function(){return duration;};
   /**Get the effect name of the power*/
   this.getEffect=function(){return effect;};
   /**Get the user's name for the power*/
   this.getName=function(){return name;};
   this.getRange=function(){return range;};
   this.getRank=function(){return rank;};
   this.getSkillUsed=function(){return skillUsed;};
   this.getText=function(){return text;};
   /**The total with respect to auto changes and raw total*/
   this.getTotal=function(){return total;};
   //for modifierSection see this.getModifierList in the onChange section
   this.isBaseCostSettable=function(){return canSetBaseCost;};
   this.getSection=function(){return powerListParent;};

   //Single line function section (ignoring isBlank check)
   /**After this is called setAction, setRange, and setDuration will only check if the value exists.*/
   this.disableValidationForActivationInfo=function(){shouldValidateActivationInfo = false;};
   /**Returns the default action for this power or nothing if this row is blank.*/
   this.getDefaultAction=function()
   {
       if(this.isBlank()) return;
       return Data.Power[effect].defaultAction;
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   this.getDefaultDuration=function()
   {
       if(this.isBlank()) return;
       return Data.Power[effect].defaultDuration;
   };
   /**Returns the default range or nothing if this row is blank.*/
   this.getDefaultRange=function()
   {
       if(this.isBlank()) return;
       return Data.Power[effect].defaultRange;
   };
    /**Get the name of the power appended with text and modifiers to determine redundancy*/
    this.getUniqueName=function(){return effect+': '+text+'; '+modifierSection.getUniqueName();};  //text might be empty
    /**If true then getAutoTotal must be called*/
    this.hasAutoTotal=function(){return modifierSection.hasAutoTotal();};
    /**True if this row has no data*/
    this.isBlank=function(){return (effect === undefined);};
    this.setRowIndex=function(indexGiven){rowIndex=indexGiven; modifierSection.setSectionRowIndex(rowIndex);};

   //Onchange section
    /**Onchange function for selecting a power*/
    this.select=function(){CommonsLibrary.select.call(this, this.setPower, (sectionName+'Choices'+rowIndex), powerListParent);};
    /**Onchange function for changing the base cost (if possible)*/
    this.changeBaseCost=function(){CommonsLibrary.change.call(this, this.setBaseCost, (sectionName+'BaseCost'+rowIndex), powerListParent);};
       //won't be called if you can't set base cost
    /**Onchange function for changing the text*/
    this.changeText=function(){CommonsLibrary.change.call(this, this.setText, (sectionName+'Text'+rowIndex), powerListParent);};
    /**Onchange function for changing the action*/
    this.selectAction=function(){CommonsLibrary.select.call(this, this.setAction, (sectionName+'SelectAction'+rowIndex), powerListParent);};
       //won't be called if SelectAction doesn't exists
    /**Onchange function for changing the range*/
    this.selectRange=function(){CommonsLibrary.select.call(this, this.setRange, (sectionName+'SelectRange'+rowIndex), powerListParent);};
    /**Onchange function for changing the duration*/
    this.selectDuration=function(){CommonsLibrary.select.call(this, this.setDuration, (sectionName+'SelectDuration'+rowIndex), powerListParent);};
    /**Onchange function for changing the user's name for the power*/
    this.changeName=function(){CommonsLibrary.change.call(this, this.setName, (sectionName+'Name'+rowIndex), powerListParent);};
    /**Onchange function for changing the skill name used for the power's attack*/
    this.changeSkill=function(){CommonsLibrary.change.call(this, this.setSkill, (sectionName+'Skill'+rowIndex), powerListParent);};
    /**Getter is used for onChange events and for other information gathering*/
    this.getModifierList=function(){return modifierSection;};  //listed here instead of getter section to match its document location
    /**Onchange function for changing the rank*/
    this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, (sectionName+'Rank'+rowIndex), powerListParent);};

   //Value setting section
   /**Populates data of the power by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setPower=function(effectNameGiven)
   {
       modifierSection.clear();  //always clear them out on select
       if(!Data.Power.names.contains(effectNameGiven)){this.constructor(); return;}  //reset values
          //this is only reachable if you select the default value in the drop down

       effect = effectNameGiven;
       canSetBaseCost = Data.Power[effect].hasInputBaseCost;
       baseCost = Data.Power[effect].baseCost;
       if(undefined === text) text = 'Descriptors and other text';  //let the text stay if changing between powers
       action = Data.Power[effect].defaultAction;
       range = Data.Power[effect].defaultRange;
       duration = Data.Power[effect].defaultDuration;
       rank = 1;
       //name = skillUsed = undefined;  //don't clear so that if changing between 2 different attacks these carry over
       this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setBaseCost=function(baseGiven)
   {
       if(!canSetBaseCost || this.isBlank()) return;  //only possible when loading bad data
       baseCost = sanitizeNumber(baseGiven, 1, Data.Power[effect].baseCost);  //unique defaults
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
      if(this.isBlank()) return;
      text = textGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setAction=function(newActionName)
   {
      if(this.isBlank()) return;
      if(action === newActionName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.actions.contains(newActionName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser('PowerObjectAgnostic.setAction.notExist', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' + newActionName + ' is not the name of an action.');
         return;
      }

      action = newActionName;

      if(!shouldValidateActivationInfo) return;  //done
      this.updateActionModifiers();
      if('Reaction' === action && 'Feature' !== effect && 'Luck Control' !== effect && Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4)) this.setRange('Close');
      this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRange=function(newRangeName)
   {
      if(this.isBlank()) return;
      if(range === newRangeName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.ranges.contains(newRangeName))
      {
         //if not found (only possible when loading bad data)
         Main.messageUser('PowerObjectAgnostic.setRange.notExist', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' + newRangeName + ' is not the name of a range.');
         return;
      }

      var oldRange = range;
      range = newRangeName;

      if(!shouldValidateActivationInfo) return;  //done

      //TODO: loading should make sure that skillUsed can't be set when Perception range
      this.generateNameAndSkill();

      if ('Personal' === oldRange && 'Permanent' === duration)
      {
         //changing from personal must change duration to not be permanent
         var defaultDuration = Data.Power[effect].defaultDuration;
         if('Permanent' === defaultDuration) this.setDuration('Sustained');
         else this.setDuration(defaultDuration);
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
      }

      this.updateRangeModifiers();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setDuration=function(newDurationName)
   {
       if(this.isBlank()) return;
       if(duration === newDurationName) return;  //nothing has changed (only possible when loading)
      if (!Data.Power.durations.contains(newDurationName))
      {
          //if not found (only possible when loading bad data)
          Main.messageUser('PowerObjectAgnostic.setDuration.notExist', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' + newDurationName + ' is not the name of a duration.');
          return;
      }

       var oldDuration = duration;
       duration = newDurationName;

       if(!shouldValidateActivationInfo) return;  //done

       var defaultDurationName = Data.Power[effect].defaultDuration;

       if('Permanent' === newDurationName) this.setAction('None');  //if changing to Permanent
      else if('Permanent' === oldDuration)  //if changing from Permanent
      {
          //then reset action
          if('Permanent' === defaultDurationName) this.setAction('Free');  //default action is None so use Free instead
          else this.setAction(Data.Power[effect].defaultAction);
          //use default action if possible otherwise use Free
          //either way it will cost 0
      }

       this.updateDurationModifiers();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setName=function(nameGiven)
   {
       if(this.isBlank()) return;
       name = nameGiven;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setSkill=function(skillGiven)
   {
       if(this.isBlank()) return;
       skillUsed = skillGiven;
   };
    //for modifierSection see this.getModifierList in the onChange section
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       rank = sanitizeNumber(rankGiven, 1, 1);
   };

   //public function section
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   this.calculateValues=function()
   {
      modifierSection.calculateValues();
      var costPerRank = (baseCost + modifierSection.getRankTotal());
      if(costPerRank < 1) costPerRank = 1/(2 - costPerRank);
      if(Main.getActiveRuleset().isGreaterThanOrEqualTo(3,5) && 'Variable' === effect && costPerRank < 5) costPerRank = 5;
      else if(costPerRank < 0.2) costPerRank = 0.2;  //can't be less than 1/5

      total = Math.ceil(costPerRank*rank);  //round up
      var flatValue = modifierSection.getFlatTotal();
      if (flatValue < 0 && (total + flatValue) < 1)  //flat flaw more than (or equal to) the total cost is not allowed. so adjust the power rank
      {
         rank = (Math.abs(flatValue) / costPerRank);
         rank = Math.floor(rank) + 1;  //must be higher than for this to work. don't use ceil so that if whole number will still be +1
         total = Math.ceil(costPerRank * rank);  //round up
      }
      total += flatValue;  //flatValue might be negative
      if('A God I Am' === effect) total += 145;  //for first ranks
      else if('Reality Warp' === effect) total += 75;
      total = modifierSection.calculateGrandTotal(total);  //used to calculate all auto modifiers
   };
   /**This creates the page's html (for the row). called by power section only*/
   this.generate=function()
   {
      var htmlString = '<div class="container-fluid"><div class="row">\n', i;
      htmlString+='<div class="col-12 col-sm-6"><select id="'+sectionName+'Choices'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').select();">\n';
      htmlString+='    <option>Select One</option>\n';
      var displayGodhood = (undefined !== Main && powerListParent !== Main.equipmentSection && (Main.powerSection.isUsingGodhoodPowers() || Main.canUseGodhood()));
      //equipment can't be god-like so I only need to check power section's switch
         //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
      for (i = 0; i < Data.Power.names.length; ++i)
      {
         if(displayGodhood || !Data.Power[Data.Power.names[i]].isGodhood)
            htmlString+='    <option>'+Data.Power.names[i]+'</option>\n';
      }
      htmlString+='</select></div>\n';
      if(this.isBlank()) return htmlString + '</div></div>';  //done

      htmlString+='<div class="col">Base Cost per Rank:\n';
      if(canSetBaseCost) htmlString+='<input type="text" size="1" id="'+sectionName+'BaseCost'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeBaseCost();" />';
      else htmlString+='<span id="'+sectionName+'BaseCost'+rowIndex+'" style="display: inline-block; width: 50px; text-align: center;"></span>\n';
      htmlString+='</div></div>\n';  //end col, row
      htmlString+='<div class="row"><input type="text" style="width: 100%" id="'+sectionName+'Text'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeText();" /></div>\n';
      htmlString+='<div class="row justify-content-center" style="width:100%">\n';

      htmlString+='<div class="col-12 col-sm-4 col-xl-3">\n';
      htmlString+='          Action\n';
      var possibleActions = this.validateAndGetPossibleActions();
      if(1 === possibleActions.length) htmlString+='          <span id="'+sectionName+'SelectAction'+rowIndex+'" style="display: inline-block; width: 85px; text-align: center;"></span>\n';
         //although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
      else
      {
         htmlString+='         <select id="'+sectionName+'SelectAction'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectAction();">\n';
         for (i = 0; i < possibleActions.length; ++i)
         {
            htmlString+='             <option>' + possibleActions[i] + '</option>\n';
         }
         htmlString+='         </select>\n';
      }
      htmlString+='      </div>\n';

      htmlString+='      <div class="col-12 col-sm-4 col-xl-3">\n';
      htmlString+='          Range\n';
      var possibleRanges = this.getPossibleRanges();
      if(1 === possibleRanges.length) htmlString+='          <span id="'+sectionName+'SelectRange'+rowIndex+'" style="display: inline-block; width: 90px; text-align: center;"></span>\n';
      else
      {
         htmlString+='          <select id="'+sectionName+'SelectRange'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectRange();">\n';
         for (i = 0; i < possibleRanges.length; ++i)
         {
            htmlString+='             <option>' + possibleRanges[i] + '</option>\n';
         }
         htmlString+='          </select>\n';
      }
      htmlString+='      </div>\n';

      htmlString+='      <div class="col-12 col-sm-4 col-xl-3">\n';
      htmlString+='          Duration\n';
      var possibleDurations = this.validateAndGetPossibleDurations();
      if(1 === possibleDurations.length) htmlString+='          <span id="'+sectionName+'SelectDuration'+rowIndex+'" style="display: inline-block; width: 80px; text-align: center;"></span>\n';
      else
      {
         htmlString+='          <select id="'+sectionName+'SelectDuration'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectDuration();">\n';
         for (i = 0; i < possibleDurations.length; ++i)
         {
            htmlString+='             <option>' + possibleDurations[i] + '</option>\n';
         }
         htmlString+='          </select>\n';
      }
      htmlString+='      </div>\n';
      htmlString+='   </div>\n';  //row

      if (Data.Power[effect].isAttack)  //don't check for attack modifier because that's handled by the modifier generate
      {
         htmlString+='   <div class="row justify-content-end" style="width:100%">\n';
         htmlString+='      <div class="col-12 col-sm-6 col-lg-5 col-xl-4">\n';
         htmlString+=Data.SharedHtml.powerName(sectionName, rowIndex);
         htmlString+='      </div>\n';
         if(undefined !== skillUsed) htmlString+='<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' + Data.SharedHtml.powerSkill(sectionName, rowIndex) + '</div>';
         htmlString+='   </div>\n';
      }

      htmlString+=modifierSection.generate();

      htmlString+='<div class="row" style="width:100%">\n';
      htmlString+='<div class="col-12 col-sm-6 col-md-4">Ranks:\n';
      htmlString+='<input type="text" size="1" id="'+sectionName+'Rank'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeRank();" /></div>\n';
      htmlString+='<div class="col-12 col-sm-6 col-md-4">Total Cost Per Rank:\n';
      htmlString+='<span id="'+sectionName+'TotalCostPerRank'+rowIndex+'"></span></div>\n';
      htmlString+='<div class="col-12 col-md-4">Total Flat Modifier Cost:\n';
      htmlString+='<span id="'+sectionName+'FlatModifierCost'+rowIndex+'"></span></div>\n';
      htmlString+='</div>\n';
      htmlString+='<div class="row" style="width:100%"><div class="col">Grand total for ' + sectionName.toTitleCase() + ':';
      htmlString+='<span id="'+sectionName+'RowTotal'+rowIndex+'"></span></div>\n';
      htmlString+='</div>\n';
      htmlString+='</div><hr />\n\n';
      return htmlString;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
      var json={};
      json.effect=effect;
      if(canSetBaseCost) json.cost=baseCost;
      json.text=text;
      json.action=action;
      json.range=range;
      json.duration=duration;
      if(name !== undefined) json.name=name;
      if(skillUsed !== undefined) json.skill=skillUsed;  //if no name then there is also no skill but can have name without skill
      json.Modifiers=modifierSection.save();
      json.rank=rank;
      return json;
   };
   /**Call this in order to generate or clear out name and skill. Current values are preserved (if not cleared) or default text is generated.*/
   this.generateNameAndSkill=function()
   {
      if (!Data.Power[effect].isAttack && undefined === modifierSection.findRowByName('Attack'))
      {
         name = skillUsed = undefined;
         return;
      }
      if(undefined === name) name = (sectionName.toTitleCase() + ' ' + (rowIndex+1) + ' ' + effect);  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness

      var isAura = (Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Reaction' === action && 'Luck Control' !== effect && 'Feature' !== effect);
      if('Perception' === range || isAura) skillUsed = undefined;
      else if(undefined === skillUsed) skillUsed = 'Skill used for attack';
   };
   /**This sets the page's data. called only by section generate*/
   this.setValues=function()
   {
      if(this.isBlank()) return;  //already set (to default)
      SelectUtil.setText((sectionName+'Choices'+rowIndex), effect);
      if(canSetBaseCost) document.getElementById(sectionName+'BaseCost'+rowIndex).value = baseCost;
      else document.getElementById(sectionName+'BaseCost'+rowIndex).innerHTML = baseCost;
      document.getElementById(sectionName+'Text'+rowIndex).value=text;  //might be empty
      if('SPAN' === document.getElementById(sectionName+'SelectAction'+rowIndex).tagName)
         document.getElementById(sectionName+'SelectAction'+rowIndex).innerHTML = '<b>' + action + '</b>';
      else SelectUtil.setText((sectionName+'SelectAction'+rowIndex), action);  //Feature edge cases are handled in generate
      if (effect === 'Feature')  //has unique drop downs
      {
         //these 2 holders always have selects
         SelectUtil.setText((sectionName+'SelectRange'+rowIndex), range);
         SelectUtil.setText((sectionName+'SelectDuration'+rowIndex), duration);
      }
      else
      {
         if('SPAN' === document.getElementById(sectionName+'SelectRange'+rowIndex).tagName)
            document.getElementById(sectionName+'SelectRange'+rowIndex).innerHTML = '<b>' + range + '</b>';
         else SelectUtil.setText((sectionName+'SelectRange'+rowIndex), range);
         if(duration === 'Instant') document.getElementById(sectionName+'SelectDuration'+rowIndex).innerHTML = '<b>Instant</b>';
         else SelectUtil.setText((sectionName+'SelectDuration'+rowIndex), duration);
      }
      if(document.getElementById(sectionName+'Name'+rowIndex) !== null)  //might have been defined by power or modifier
         document.getElementById(sectionName+'Name'+rowIndex).value = name;
      if(document.getElementById(sectionName+'Skill'+rowIndex) !== null)
         document.getElementById(sectionName+'Skill'+rowIndex).value = skillUsed;
      document.getElementById(sectionName+'Rank'+rowIndex).value=rank;  //must come before modifiers
      modifierSection.setAll();

      var totalRankCost=baseCost+modifierSection.getRankTotal();
      if(Main.getActiveRuleset().isGreaterThanOrEqualTo(3,5) && 'Variable' === effect && totalRankCost < 5) totalRankCost = 5;
      else if(totalRankCost < -3) totalRankCost = -3;  //can't be less than 1/5

      if(totalRankCost > 0) document.getElementById(sectionName+'TotalCostPerRank'+rowIndex).innerHTML=totalRankCost;
      else document.getElementById(sectionName+'TotalCostPerRank'+rowIndex).innerHTML='(1/'+(2-totalRankCost)+')';  //0 is 1/2 and -1 is 1/3
      document.getElementById(sectionName+'FlatModifierCost'+rowIndex).innerHTML=modifierSection.getFlatTotal();
      document.getElementById(sectionName+'RowTotal'+rowIndex).innerHTML=total;
   };
   /**Only used for loading. This function resets all of the modifiers for action, range, duration.*/
   this.updateActivationModifiers=function()
   {
      shouldValidateActivationInfo = true;
      this.updateActionModifiers();
      this.updateRangeModifiers();
      this.updateDurationModifiers();
   };
   /**Called when loading after action, range, and duration have been set. This function validates the values
   making sure the values are possible and consistent with priority given to range then duration.
   It will changes values to be valid. This function requires modifiers to be loaded (but doesn't affect them).
   The precedence is personal range, duration, action, reaction range, (then modifiers which aren't affected here).*/
   this.validateActivationInfo=function()
   {
      this.validatePersonalRange();
      this.validateAndGetPossibleDurations();
      this.validateAndGetPossibleActions();
      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== effect && 'Feature' !== effect &&
         'Reaction' === action && 'Close' !== range)
      {
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' has an action of Reaction and therefore must have a range of Close.');
         range = 'Close';
         //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
      }
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this.constructor=function()
   {
       effect = undefined;
       canSetBaseCost = undefined;
       baseCost = undefined;
       text = undefined;
       action = undefined;
       range = undefined;
       duration = undefined;
       name = undefined;
       skillUsed = undefined;
       rank = undefined;
       total = 0;
       shouldValidateActivationInfo = true;
   };
   /**@returns {Array} of all ranges that are possible for this power based on current state.*/
   this.getPossibleRanges=function()
   {
      var possibleRanges = [];
      if('Feature' === effect) possibleRanges.push('Personal');
      else
      {
         if(Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === action && 'Luck Control' !== effect) return ['Close'];
         if('Personal' === range) return ['Personal'];
      }
      return possibleRanges.concat(['Close', 'Ranged', 'Perception']);
   };
   /**This function creates Selective if needed and recreates Faster/Slower Action as needed.*/
   this.updateActionModifiers=function()
   {
      if('Triggered' === action) modifierSection.createByNameRank('Selective', 1);  //Triggered must also be selective so it auto adds but doesn't remove

      if('Feature' === effect) return;  //Feature doesn't change any other modifiers

      //remove all if possible
      modifierSection.removeByName('Faster Action');
      modifierSection.removeByName('Slower Action');
      modifierSection.removeByName('Aura');

      if('None' === action) return;  //don't add any modifiers

      var defaultActionName = Data.Power[effect].defaultAction;
      if('None' === defaultActionName) defaultActionName = 'Free';  //calculate distance from free
      var defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
      var newActionIndex = Data.Power.actions.indexOf(action);
      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Reaction' === action && 'Luck Control' !== effect)
      {
         newActionIndex = Data.Power.actions.indexOf('Standard');  //calculate distance from Standard
         modifierSection.createByNameRank('Aura', 1);
      }

      var actionDifference = (newActionIndex - defaultActionIndex);
      if(actionDifference > 0) modifierSection.createByNameRank('Faster Action', actionDifference);
      else if(actionDifference < 0) modifierSection.createByNameRank('Slower Action', -actionDifference);
   };
   /**This function recreates Increased/Decreased Duration as needed.*/
   this.updateDurationModifiers=function()
   {
       if('Feature' === effect) return;  //Feature doesn't change modifiers

       var defaultDurationName = Data.Power[effect].defaultDuration;
       var defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
       var newDurationIndex = Data.Power.durations.indexOf(duration);
       if('Permanent' === defaultDurationName && 'Personal' !== range) defaultDurationIndex = Data.Power.durations.indexOf('Sustained');  //calculate distance from Sustained

       //remove both if possible
       modifierSection.removeByName('Increased Duration');
       modifierSection.removeByName('Decreased Duration');

       var durationDifference = (newDurationIndex - defaultDurationIndex);
       if(durationDifference > 0) modifierSection.createByNameRank('Increased Duration', durationDifference);
       else if(durationDifference < 0) modifierSection.createByNameRank('Decreased Duration', -durationDifference);
   };
   /**This function recreates Increased/Reduced Range as needed.*/
   this.updateRangeModifiers=function()
   {
       //when changing to personal nothing else needs to change
       if('Personal' === range) return;  //only possible (for feature or) when removing a modifier

       if('Feature' === effect) return;  //Feature doesn't change modifiers
       //TODO: refactor so that Feature has a base activation row and a current activation row
       //so that Feature will have the modifiers auto set. This should be less confusing to the user
       //this will also allow and require more edge case testing

       var defaultRangeName = Data.Power[effect].defaultRange;
       var defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
       var newRangeIndex = Data.Power.ranges.indexOf(range);
       if('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close');  //calculate distance from close

       //remove both if possible
       modifierSection.removeByName('Increased Range');
       modifierSection.removeByName('Reduced Range');

       var rangeDifference = (newRangeIndex - defaultRangeIndex);
       if(rangeDifference > 0) modifierSection.createByNameRank('Increased Range', rangeDifference);
       else if(rangeDifference < 0) modifierSection.createByNameRank('Reduced Range', -rangeDifference);
   };
   /**@returns {Array} of all actions that are possible for this power based on current state.*/
   this.validateAndGetPossibleActions=function()
   {
      //feature has the same action as the others (because allowReaction is true)
      if ('Permanent' === duration)
      {
         if ('None' !== action)
         {
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
               effect + ' can\'t have an action of ' + action + '. It can only be None because the duration is Permanent.');
            action = 'None';
         }
         return ['None'];
      }
      else if ('None' === action)  //only Permanent duration can have action None
      {
         action = Data.Power[effect].defaultAction;
         if('None' === action) action = 'Free';
         //use default action if possible. otherwise use Free
         //either way it will cost 0
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.notNone', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + duration + '). Using action of ' + action + ' instead.');
      }

      var possibleActions = [];
      var allowMoveAction = (Main.getActiveRuleset().isLessThan(3,4) || !Data.Power[effect].isAttack || 'Move Object' === effect);
      if ('Move' === action && !allowMoveAction)
      {
         action = Data.Power[effect].defaultAction;
         if('None' === action) action = 'Free';  //dead code: attacks can't have a default duration of Permanent
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have an action of Move because it is an attack type. Using action of ' + action + ' instead.');
      }

      var allowFreeAction = (Main.getActiveRuleset().isLessThan(3,4) || (allowMoveAction && !Data.Power[effect].isMovement && 'Healing' !== effect));
      if ('Free' === action && !allowFreeAction)
      {
         if (!allowMoveAction)
         {
            action = Data.Power[effect].defaultAction;
            if ('None' === action) action = 'Free';  //dead code: attacks can't have a default duration of Permanent
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', sectionName.toTitleCase() + ' #' + (rowIndex + 1) + ': ' +
               effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + action + ' instead.');
         }
         //attacks can't be movements so there's no overlap
         else if (Data.Power[effect].isMovement)
         {
            action = Data.Power[effect].defaultAction;
            if ('None' === action) action = 'Free';  //dead code: movements can't have a default duration of Permanent
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', sectionName.toTitleCase() + ' #' + (rowIndex + 1) + ': ' +
               effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + action + ' instead.');
         }
         //healing is not an attack or movement so there's no overlap
         else //if ('Healing' === effect)
         {
            action = Data.Power[effect].defaultAction;
            if ('None' === action) action = 'Free';  //dead code: Healing doesn't have a default duration of Permanent
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', sectionName.toTitleCase() + ' #' + (rowIndex + 1) + ': ' +
               'Healing can\'t have an action of Free. Using action of ' + action + ' instead.');
         }
      }

      var allowReaction = (Main.getActiveRuleset().isLessThan(3,4) || Data.Power[effect].allowReaction);
      if ('Reaction' === action && !allowReaction)
      {
         action = Data.Power[effect].defaultAction;
         if('None' === action) action = 'Free';  //duration is not Permanent here because that was checked above
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have an action of Reaction because it isn\'t an attack type. Using action of ' + action + ' instead.');
         //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
      }

      for (var i = 0; i < Data.Power.actions.length - 1; ++i)  //-1 to avoid 'None'
      {
         //I'd rather not unroll the loop because Data.Power.actions.length is dependent on the version
         if(!allowMoveAction && 'Move' === Data.Power.actions[i]) continue;
         if(!allowFreeAction && 'Free' === Data.Power.actions[i]) continue;
         if(!allowReaction && 'Reaction' === Data.Power.actions[i]) continue;
         possibleActions.push(Data.Power.actions[i]);
      }
      return possibleActions;
   };
   /**@returns {Array} of all durations that are possible for this power based on current state.*/
   this.validateAndGetPossibleDurations=function()
   {
      var defaultDuration = Data.Power[effect].defaultDuration;
      if ('Instant' === defaultDuration)
      {
         if ('Instant' !== duration)
         {
            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
               effect + ' can\'t have ' + duration + ' duration. It can only be Instant.');
            duration = 'Instant';  //can't be changed (Feature's defaultDuration is Permanent)
         }
         return ['Instant'];
      }

      var possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
      if('Personal' === range) possibleDurations.push('Permanent');  //even Feature needs Personal range for Permanent duration
      //when loading, range may later change to Close but not Personal so this check is safe
      else if ('Permanent' === duration)  //only personal range can have Permanent duration
      {
         if('Permanent' === defaultDuration) duration = 'Sustained';
         else duration = defaultDuration;
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + range + '). Using duration of ' + duration + ' instead.');
      }
      if('Feature' === effect) possibleDurations.push('Instant');
      else if ('Instant' === duration)
      {
         //only Feature can change to Instant duration. defaultDuration of instant was checked above
         Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
         duration = defaultDuration;
      }
      return possibleDurations;
   };
   /**This function validates range. It changes range and creates user messages as needed.*/
   this.validatePersonalRange=function()
   {
      if('Feature' === effect) return;  //allow everything
      var defaultRange = Data.Power[effect].defaultRange;
      if ('Personal' === range  && 'Personal' !== defaultRange)
      {
         Main.messageUser('PowerObjectAgnostic.validatePersonalRange.notPersonal', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
         range = defaultRange;  //can't change something to personal unless it started out as that (Feature's defaultRange is Personal)
      }
      else if ('Personal' !== range  && 'Personal' === defaultRange)
      {
         var hasNonPersonalMod = modifierSection.isNonPersonalModifierPresent();
         if (!hasNonPersonalMod)
         {
            Main.messageUser('PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed', sectionName.toTitleCase() + ' #' + (rowIndex + 1) + ': ' +
               effect + ' with ' + range + ' range requires one of the following modifiers: "Affects Others Also", "Affects Others Only", or "Attack". ' +
               'Using the default range of Personal instead.');
            range = defaultRange;  //can't create a mod for you since there are 3 possible
         }
      }
   };
   //constructor:
   this.constructor();
}
