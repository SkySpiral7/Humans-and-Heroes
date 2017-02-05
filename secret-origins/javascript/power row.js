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
       return Data.Power.defaultAction.get(effect);
   };
   /**Returns the default duration for this power or nothing if this row is blank.*/
   this.getDefaultDuration=function()
   {
       if(this.isBlank()) return;
       return Data.Power.defaultDuration.get(effect);
   };
   /**Returns the default range or nothing if this row is blank.*/
   this.getDefaultRange=function()
   {
       if(this.isBlank()) return;
       return Data.Power.defaultRange.get(effect);
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
       if(!Data.Power.names.contains(effectNameGiven) && !Data.Power.godhoodNames.contains(effectNameGiven)){this.constructor(); return;}  //reset values
          //this is only reachable if you select the default value in the drop down

       effect = effectNameGiven;
       canSetBaseCost = Data.Power.hasInputBaseCost.contains(effect);
       baseCost = Data.Power.baseCost.get(effect);
       if(undefined === text) text = 'Descriptors and other text';  //let the text stay if changing between powers
       action = Data.Power.defaultAction.get(effect);
       range = Data.Power.defaultRange.get(effect);
       duration = Data.Power.defaultDuration.get(effect);
       rank = 1;
       //name = skillUsed = undefined;  //don't clear so that if changing between 2 different attacks these carry over
       this.generateNameAndSkill();
   };
   /**Used to set data independent of the document and without calling update*/
   this.setBaseCost=function(baseGiven)
   {
       if(!canSetBaseCost || this.isBlank()) return;  //only possible when loading bad data
       baseCost = sanitizeNumber(baseGiven, 1, Data.Power.baseCost.get(effect));  //unique defaults
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
          var defaultDuration = Data.Power.defaultDuration.get(effect);
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

       var defaultDurationName = Data.Power.defaultDuration.get(effect);

       if('Permanent' === newDurationName) this.setAction('None');  //if changing to Permanent
      else if('Permanent' === oldDuration)  //if changing from Permanent
      {
          //then reset action
          if('Permanent' === defaultDurationName) this.setAction('Free');  //default action is None so use Free instead
          else this.setAction(Data.Power.defaultAction.get(effect));
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
      var htmlString = '', i;
      htmlString+='<select id="'+sectionName+'Choices'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').select();">\n';
      htmlString+='    <option>Select One</option>\n';
      for (i=0; i < Data.Power.names.length; i++)
      {
         htmlString+='    <option>'+Data.Power.names[i]+'</option>\n';
      }
      if (Main !== undefined && powerListParent !== Main.equipmentSection && (Main.powerSection.isUsingGodhoodPowers() || Main.canUseGodHood()))
      //equipment can't be god-like so I only need to check power section's switch
         //must check both hasGodhoodAdvantages and canUseGodHood since they are not yet in sync
         for (i=0; i < Data.Power.godhoodNames.length; i++)
         {
            htmlString+='    <option>'+Data.Power.godhoodNames[i]+'</option>\n';
         }
      htmlString+='</select>\n';
      if(this.isBlank()) return htmlString;  //done

      htmlString+='Base Cost per Rank:\n';
      if(canSetBaseCost) htmlString+='<input type="text" size="1" id="'+sectionName+'BaseCost'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeBaseCost();" />';
      else htmlString+='<span id="'+sectionName+'BaseCost'+rowIndex+'" style="display: inline-block; width: 50px; text-align: center;"></span>\n';
      htmlString+='<input type="text" size="90" id="'+sectionName+'Text'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeText();" />\n';
      htmlString+='<br />\n';
      htmlString+='<table width="100%">\n';
      htmlString+='   <tr>\n';

      htmlString+='      <td width="34%" style="text-align:right;">\n';
      htmlString+='          Action\n';
      //feature has the same action as the others
      if(action === 'None') htmlString+='          <span id="'+sectionName+'SelectAction'+rowIndex+'" style="display: inline-block; width: 85px; text-align: center;"></span>\n';
         //same as duration === 'Permanent'. although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
      else
      {
         htmlString+='         <select id="'+sectionName+'SelectAction'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectAction();">\n';
         var allowMoveAction = (Main.getActiveRuleset().isLessThan(3,4) || !Data.Power.isAttack.contains(effect) || 'Move Object' === effect);
         var allowFreeAction = (Main.getActiveRuleset().isLessThan(3,4) || (allowMoveAction && !Data.Power.isMovement.contains(effect) && 'Healing' !== effect));
         var allowReaction = (Main.getActiveRuleset().isLessThan(3,4) || Data.Power.allowReaction.contains(effect));
         for (i=0; i < Data.Power.actions.length-1; i++)  //-1 to avoid 'None'
         {
            //I'd rather not unroll the loop because Data.Power.actions.length is dependent on the version
            if(!allowMoveAction && 'Move' === Data.Power.actions[i]) continue;
            if(!allowFreeAction && 'Free' === Data.Power.actions[i]) continue;
            if(!allowReaction && 'Reaction' === Data.Power.actions[i]) continue;
            htmlString+='             <option>'+Data.Power.actions[i]+'</option>\n';
         }
         htmlString+='         </select>\n';
      }
      htmlString+='      </td>\n';

      htmlString+='      <td colspan="2" width="66%">\n';
      htmlString+='          Range\n';
      var forcedCloseRange = (Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Reaction' === action && 'Luck Control' !== effect);
      if('Feature' !== effect && ('Personal' === range || forcedCloseRange))
         htmlString+='          <span id="'+sectionName+'SelectRange'+rowIndex+'" style="display: inline-block; width: 90px; text-align: center;"></span>\n';
      else
      {
         htmlString+='          <select id="'+sectionName+'SelectRange'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectRange();">\n';
         if(effect === 'Feature') htmlString+='             <option>Personal</option>\n';
         htmlString+='             <option>Close</option>\n';
         htmlString+='             <option>Ranged</option>\n';
         htmlString+='             <option>Perception</option>\n';
         htmlString+='          </select>\n';
      }
      htmlString+='          Duration\n';
      if(duration === 'Instant' && effect !== 'Feature') htmlString+='          <span id="'+sectionName+'SelectDuration'+rowIndex+'" style="display: inline-block; width: 80px; text-align: center;"></span>\n';
      else
      {
         htmlString+='          <select id="'+sectionName+'SelectDuration'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').selectDuration();">\n';
         htmlString+='             <option>Concentration</option>\n';
         htmlString+='             <option>Sustained</option>\n';
         htmlString+='             <option>Continuous</option>\n';
         if(range === 'Personal') htmlString+='             <option>Permanent</option>\n';
         if(effect === 'Feature') htmlString+='             <option>Instant</option>\n';
         htmlString+='          </select>\n';
      }
      htmlString+='      </td>\n';
      htmlString+='   </tr>\n';
      if (Data.Power.isAttack.contains(effect))  //don't check for attack modifier because that's handled by the modifier generate
      {
         htmlString+='   <tr>\n';
         htmlString+='       <td width="34%" style="text-align:right;"></td>\n';
         htmlString+='      <td colspan="2" width="66%">\n';
         htmlString+=Data.SharedHtml.powerName(sectionName, rowIndex);
         if(undefined !== skillUsed) htmlString+=Data.SharedHtml.powerSkill(sectionName, rowIndex);
         htmlString+='      </td>\n';
         htmlString+='   </tr>\n';
      }

      htmlString+=modifierSection.generate();

      htmlString+='</table>\n';
      htmlString+='Ranks:\n';
      htmlString+='<input type="text" size="1" id="'+sectionName+'Rank'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeRank();" />\n';
      htmlString+='Total Cost Per Rank:\n';
      htmlString+='<span id="'+sectionName+'TotalCostPerRank'+rowIndex+'"></span>.\n';
      htmlString+='Total Flat Modifier Cost:\n';
      htmlString+='<span id="'+sectionName+'FlatModifierCost'+rowIndex+'"></span>\n';
      htmlString+='=\n';
      htmlString+='<span id="'+sectionName+'RowTotal'+rowIndex+'"></span>\n';
      htmlString+='<br /><br />\n\n';
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
      if (!Data.Power.isAttack.contains(effect) && undefined === modifierSection.findRowByName('Attack'))
      {
         name = skillUsed = undefined;
         return;
      }
      if(undefined === name) name = (sectionName.toTitleCase() + ' ' + (rowIndex+1) + ' ' + effect);  //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness

      var isAura = (Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Reaction' === action && 'Luck Control' !== effect);
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
   /**Called when loading after action, range, and duration have been set. This function validates the values
   making sure the values are possible and consistent with priority given to range then duration.
   It will changes values to be valid. The precedence is range, duration, then action.*/
   this.validateActivationInfo=function()
   {
      shouldValidateActivationInfo = true;

      var defaultRange = Data.Power.defaultRange.get(effect);
      if ('Personal' === range  && 'Personal' !== defaultRange)
      {
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.notPersonal', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
         range = defaultRange;  //can't change something to personal unless it started out as that (Feature's baseRange is Personal)
      }

      var defaultDuration = Data.Power.defaultDuration.get(effect);
      if ('Instant' === defaultDuration)
      {
         if ('Instant' !== duration)
         {
            Main.messageUser('PowerObjectAgnostic.validateActivationInfo.onlyInstant', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
               effect + ' can\'t have ' + duration + ' duration. It can only be Instant.');
            duration = 'Instant';  //can't be changed (Feature's baseDuration is Permanent)
         }
      }
      else if ('Instant' === duration && 'Feature' !== effect)
      {
         //only Feature can change to Instant duration
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.notInstant', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
         duration = defaultDuration;
      }
      else if ('Permanent' === duration && 'Personal' !== range)  //only personal range can have Permanent duration
      {
         if('Permanent' === defaultDuration) duration = 'Sustained';
         else duration = defaultDuration;
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.notPermanent', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + range + '). Using duration of ' + duration + ' instead.');
      }

      if ('None' === action && 'Permanent' !== duration)  //only Permanent duration can have action None
      {
         action = Data.Power.defaultAction.get(effect);
         if('None' === action) action = 'Free';
         //use default action if possible. otherwise use Free
         //either way it will cost 0
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.notNone', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + duration + '). Using action of ' + action + ' instead.');
      }
      else if ('None' !== action && 'Permanent' === duration)
      {
         Main.messageUser('PowerObjectAgnostic.validateActivationInfo.onlyNone', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
            effect + ' can\'t have an action of ' + action + '. It can only be None because the duration is Permanent.');
         //Permanent duration can only have action None
         action = 'None';
      }
      else if ('Reaction' === action && Main.getActiveRuleset().isGreaterThanOrEqualTo(3,4) && 'Feature' !== effect && 'Luck Control' !== effect)
      {
         if (!Data.Power.allowReaction.contains(effect))
         {
            action = Data.Power.defaultAction.get(effect);
            if('None' === action) action = 'Free';
            Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionNotAllowed', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
               effect + ' can\'t have an action of Reaction because it isn\'t an attack type. Using action of ' + action + ' instead.');
         }
         else if ('Close' !== range)
         {
            action = Data.Power.defaultAction.get(effect);
            if('None' === action) action = 'Free';  //dead code since there are none like this
            Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionNotCloseRange', sectionName.toTitleCase() + ' #' + (rowIndex+1) + ': ' +
               effect + ' can\'t have an action of Reaction because it isn\'t Close range (range is ' + range + '). Using action of ' + action + ' instead.');
         }
      }

      //create all of the modifiers
      this.updateActionModifiers();
      this.updateRangeModifiers();
      this.updateDurationModifiers();
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

      var defaultActionName = Data.Power.defaultAction.get(effect);
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

       var defaultDurationName = Data.Power.defaultDuration.get(effect);
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

       var defaultRangeName = Data.Power.defaultRange.get(effect);
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
   //constructor:
    this.constructor();
}
