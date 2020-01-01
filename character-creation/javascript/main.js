'use strict';
/**Call List onChange
Hero Name: Nothing (only need to look at it when saving or loading)
Transcendence: changeTranscendence()
bio box: nothing: same as hero name
*/
function MainObject()
{
   //private variable section:
   const latestRuleset = new VersionObject(3, latestMinorRuleset), latestSchemaVersion = 2;  //see bottom of this file for a schema change list
   var characterPointsSpent = 0, transcendence = 0, minimumTranscendence = 0, previousGodhood = false;
   var powerLevel = 0, powerLevelMaxAttack = 0, powerLevelMaxEffect = 0, powerLevelAttackEffect = 0, powerLevelPerceptionEffect = 0;
   var activeRuleset = latestRuleset.clone();
   var mockMessenger;  //used for testing
   var amLoading = false;  //used by the default messenger
   var derivedValues = {};  //will be used by html, exists for testing

   //Single line function section
   this.canUseGodhood=function(){return (transcendence > 0);};
   //does a defensive copy so that yoda conditions function
   this.getActiveRuleset=function(){return activeRuleset.clone();};
   this.getCalculations = function ()
   {
      //TODO: replace getCalculations with getDerivedValues (also in defense)
      return {
         powerLevel: powerLevel,
         characterPointsSpent: characterPointsSpent,
         transcendence: transcendence
      };
   };
   this.getLatestRuleset=function(){return latestRuleset.clone();};  //used for testing
   this.getTranscendence=function(){return transcendence;};
   this.getDerivedValues=function(){return JSON.clone(derivedValues);};
   /**This sets the code-box with the saved text.*/
   this.saveToTextArea=function(){document.getElementById('code-box').value = this.saveAsString();};
   /**This loads the text text within the code-box.*/
   this.loadFromTextArea=function(){this.loadFromString(document.getElementById('code-box').value);};
   /**Set a replacement function that is called in place of the normal user messenger.*/
   this.setMockMessenger=function(mockedFun){mockMessenger = mockedFun;};
   /**Restores the default function for messaging the user*/
   this.clearMockMessenger=function(){mockMessenger = undefined;};

   //Onchange section
   /**Onchange function for changing the ruleset. Sets the document values as needed*/
   this.changeRuleset=function()
   {
       var ruleset = document.getElementById('ruleset').value.trim();
      if ('' !== ruleset)
      {
          ruleset = ruleset.split('.');
          //major needs special treatment so only use Number.parseInt
          ruleset = new VersionObject(Number.parseInt(ruleset[0]), sanitizeNumber(ruleset[1], 0, 0));
          //if ruleset[1] is undefined then minor will be 0
          //ignore ruleset[2+] if there is any: eg 2.7.0184e9a
         if (!Number.isNaN(ruleset.major))  //ignore NaN. could be a typo like v2.0 in which case don't convert the version
         {
             if(ruleset.major < 1) ruleset = new VersionObject(1, 0);  //easy way to change to the oldest version
             else if(ruleset.isGreaterThan(latestRuleset)) ruleset = latestRuleset.clone();  //easy way to change to the latest version
             if(ruleset.minor > largestPossibleMinorRulesets[ruleset.major]) ruleset.minor = largestPossibleMinorRulesets[ruleset.major];

            if (!ruleset.equals(activeRuleset))  //if changed
            {
                var jsonDoc = this.save();
                this.setRuleset(ruleset.major, ruleset.minor);
                jsonDoc.ruleset = activeRuleset.toString();  //so that the activeRuleset isn't reverted on load
                this.load(jsonDoc);
            }
         }
      }
       document.getElementById('ruleset').value = activeRuleset.toString();
       //TODO: make transcendence-span be visibility:hidden when possible
   };
   /**Onchange function for changing the transcendence. Sets the document values as needed*/
   this.changeTranscendence=function()
   {
       if(1 === activeRuleset.major){transcendence = 0; return;}  //1.0 doesn't have transcendence
       transcendence = sanitizeNumber(document.getElementById('transcendence').value, -1, 0);
       if((this.powerSection.isUsingGodhoodPowers() || this.advantageSection.hasGodhoodAdvantages()) && transcendence <= 0)
          transcendence = 1;  //must raise the minimum due to currently using god-like powers
       minimumTranscendence = transcendence;
       this.updateTranscendence();
   };

   //public functions section
   /**Resets all values that can be saved (except ruleset), then updates. Each section is cleared. The file selectors are not touched.*/
   this.clear=function()
   {
      derivedValues = {};
      document.getElementById('hero-name').value = 'Hero Name';
      document.getElementById('transcendence').value = transcendence = minimumTranscendence = 0;
      this.abilitySection.clear();
      document.getElementById('img-file-path').value='';
      this.loadImageFromPath();  //after setting the image path to blank this will reset the image
      this.powerSection.clear();
      this.equipmentSection.clear();
      this.advantageSection.clear();
      this.skillSection.clear();
      this.defenseSection.clear();
      document.getElementById('bio-box').value = 'Complications, background and other information';
      document.getElementById('code-box').value = '';
      //do not change ruleset
      //I also decided not to touch either file chooser so that the user can easily select from same folder again
      this.update();
   };
   /**Used to save the character in a mostly human readable plain text.*/
   this.exportToMarkdown=function()
   {
      //TODO: store all UI values after calc so that they can be exported or at least defense, skills, offense
      document.getElementById('code-box').value = jsonToMarkdown(this.save(), powerLevel, characterPointsSpent);
   };
   /**Loads the file's data*/
   this.loadFile=function()
   {
       var filePath=document.getElementById('file-chooser').files[0];
       if(undefined === filePath || null === filePath) return;  //no file to load
       var oFReader=new FileReader();  //reference: https://developer.mozilla.org/en-US/docs/DOM/FileReader
       oFReader.readAsText(filePath);
       oFReader.onload=function(oFREvent){Main.loadFromString(oFREvent.target.result);};  //Main has been defined in order to use Main.loadFile() button
   };
   /**Loads the image file*/
   this.loadImageFromFile=function()
   {
       var filePath=document.getElementById('img-file-chooser').files[0];  //there's only ever 1 file
       if(undefined === filePath || null === filePath) return;  //no file to load
       var oFReader=new FileReader();  //reference: https://developer.mozilla.org/en-US/docs/DOM/FileReader
       oFReader.readAsDataURL(filePath);
       oFReader.onload=function(oFREvent){document.getElementById('character-image').src = oFREvent.target.result;};
   };
   /**Loads the image path. If blank the image path is reset*/
   this.loadImageFromPath=function()
   {
       if(document.getElementById('img-file-path').value === '')  //the reason for this is because the user doesn't know this default image path
          document.getElementById('img-file-path').value = '../images/Sirocco.png';
       document.getElementById('character-image').src = document.getElementById('img-file-path').value;
   };
   /**Gets the total protection value of the sections power and equipment.*/
   this.getProtectionTotal=function()
   {
       var powerProtectionRanks = this.powerSection.getProtectionRankTotal();
       var equipmentProtectionRanks = this.equipmentSection.getProtectionRankTotal();
       //this correctly returns null if both are null
       if (null === powerProtectionRanks) return equipmentProtectionRanks;
       if (null === equipmentProtectionRanks) return powerProtectionRanks;

       //protection stacks only in v1.0
       if(1 === activeRuleset.major) return (powerProtectionRanks + equipmentProtectionRanks);
       if(powerProtectionRanks > equipmentProtectionRanks) return powerProtectionRanks;
       return equipmentProtectionRanks;
   };
   /**This method passes a message to the user in some way (currently uses code-box).
   It is abstracted for mocking and so it can easily be changed later.
   errorCode only exists to be sent to the mockMessenger*/
   this.messageUser=function(errorCode, messageSent)
   {
       if(undefined !== mockMessenger) mockMessenger(errorCode, amLoading);
       else if(amLoading) document.getElementById('code-box').value += messageSent + '\n';
       else alert(messageSent);
   };
   /**Onclick event for the save-to-file-link anchor link only.
   It changes the a tag so that the link downloads the document as a saved file.*/
   this.saveToFile=function()
   {
      var link = document.getElementById('save-to-file-link');
      link.download = document.getElementById('hero-name').value+'.json';
      link.href = 'data:application/json;charset=utf-8,'+encodeURIComponent(this.saveAsString());
      //encodeURIComponent is called to convert end lines etc
      //there is no way to clear out the link info right after the save as prompt. So just ignore the huge href
      //assigning window.location doesn't work because it just takes you to the page instead of save prompt
      //This doesn't work in IE (even 12)
      //TODO: use a form internet submit because it works in all browsers and the data is small
   };
   /**This function handles all changes needed when switching between rules. Main.clear() is called unless no change is needed.*/
   this.setRuleset=function(major, minor)
   {
       if(activeRuleset.major === major && activeRuleset.minor === minor) return;  //done. don't clear out everything
       activeRuleset.major = major;
       activeRuleset.minor = minor;

       Data.change(activeRuleset);
       this.clear();  //needed to regenerate advantages etc
   };
   /**This counts character points and power level and sets the document. It needs to be called by every section's update.*/
   this.update=function()
   {
      this._calculateTotal();

      //start by looking at character points
      //CP -5 => PL -0 which should be fine
      //CP 0 => PL 0 rounds up after that.
      powerLevel = Math.ceil(characterPointsSpent / 15);
      //min PL is now 1. M&M has min 0 (kinda). old H&H can also use 0
      if (activeRuleset.isGreaterThanOrEqualTo(3, 16) && powerLevel < 1) powerLevel = 1;
      //CP -30 => needs to be PL 0 or 1
      else if(powerLevel < 0) powerLevel = 0;

      //if you are no longer limited by power level limitations that changes the minimum possible power level:
      if (this.advantageSection.isUsingPettyRules())
         this._calculatePowerLevelLimitations();

      document.getElementById('power-level').innerHTML = powerLevel.toString();
      document.getElementById('grand-total-max').innerHTML = (powerLevel * 15).toString();
      if (activeRuleset.major > 1)
      {
         transcendence = Math.floor(powerLevel / 20);  //gain a transcendence every 20 PL
         //don't auto-set below the user requested value
         if (transcendence < minimumTranscendence) transcendence = minimumTranscendence;
         this.updateTranscendence();  //to regenerate as needed
      }
   };
   /**Calculates initiative and sets the document.*/
   this.updateInitiative=function()
   {
       var agilityScore = this.abilitySection.getByName('Agility').getZeroedValue();  //used zeroed because even absent agility has initiative
       var initiative = this.advantageSection.getRankMap().get('Improved Initiative');
       if(1 === activeRuleset.major) initiative *= 4;
       else if(2 === activeRuleset.major) initiative *= 2;
       //else v3.0 initiative *1
       initiative += agilityScore;

       var stringUsed;
       if(initiative >= 0) stringUsed = '+' + initiative;
       else stringUsed = initiative;
       if(1 === this.advantageSection.getRankMap().get('Seize Initiative')) stringUsed += ' with Seize Initiative';  //if has Seize Initiative
       document.getElementById('initiative').innerHTML = stringUsed;
   };
   /**Calculates and creates the offense section of the document.*/
   this.updateOffense=function()
   {
      powerLevelMaxAttack = powerLevelMaxEffect = powerLevelAttackEffect = powerLevelPerceptionEffect = -Infinity;
      var attackBonus;
      var allOffensiveRows = '';
      derivedValues.Offense = [];
      var closeSkillMap = this.skillSection.getCloseCombatMap();
      var rangeSkillMap = this.skillSection.getRangedCombatMap();
      var closeAttackBonus = this.advantageSection.getRankMap().get('Close Attack');  //these only exist in ruleset 1.0. will be 0 otherwise
      var rangedAttackBonus = this.advantageSection.getRankMap().get('Ranged Attack');
      var effectRank;

      //if Unarmed is possible then it will be the first row
      if (closeSkillMap.containsKey('Unarmed') || this.abilitySection.getByName('Fighting').getValue() !== '--')
      {
         var strengthValue = this.abilitySection.getByName('Strength').getValue();
         if (strengthValue !== '--')
         {
            //if can deal unarmed damage
            attackBonus = closeAttackBonus;
            if(closeSkillMap.containsKey('Unarmed')) attackBonus += closeSkillMap.get('Unarmed');
            else attackBonus += this.abilitySection.getByName('Fighting').getValue();  //Fighting is the default for unarmed

            //attackBonus can't be -- so don't need to check powerLevelPerceptionEffect
            if(powerLevelAttackEffect < (attackBonus + strengthValue))
               powerLevelAttackEffect = (attackBonus + strengthValue);
            if(powerLevelMaxAttack < attackBonus) powerLevelMaxAttack = attackBonus;
            if(powerLevelMaxEffect < strengthValue) powerLevelMaxEffect = strengthValue;

            derivedValues.Offense.push({skillName: 'Unarmed', attackBonus: attackBonus, range: 'Close',
               effect: 'Damage', rank: strengthValue});
            allOffensiveRows += this._makeOffenseRow('Unarmed', attackBonus, 'Close', 'Damage', strengthValue);
         }
      }

      //TODO: bug: this allows the same attack name for power and equipment
      var sectionArray = [this.powerSection, this.equipmentSection];
      for (var sectionIndex=0; sectionIndex < sectionArray.length; sectionIndex++)
      {
         var sectionPointer = sectionArray[sectionIndex];
         var damageKeys = sectionPointer.getAttackEffectRanks().getAllKeys();

         //TODO: bug: missing ability messes up offense section
         for (var i=0; i < damageKeys.length; i++)
         {
            var rowPointer = sectionPointer.getRow(sectionPointer.getAttackEffectRanks().get(damageKeys[i]));
            var range = rowPointer.getRange();
            var skillUsed = rowPointer.getSkillUsed();

            //TODO: probably won't work for Feature
            if (undefined === skillUsed) attackBonus = '--';  //can't miss
            else
            {
               if ('Close' === range)
               {
                  attackBonus = closeAttackBonus;
                  if(closeSkillMap.containsKey(skillUsed)) attackBonus += closeSkillMap.get(skillUsed);
                  else attackBonus += this.abilitySection.getByName('Fighting').getValue();  //Fighting is the default for close range
               }
               else  //if('Ranged' === range)
               {
                  attackBonus = rangedAttackBonus;
                  if(rangeSkillMap.containsKey(skillUsed)) attackBonus += rangeSkillMap.get(skillUsed);
                  else attackBonus += this.abilitySection.getByName('Dexterity').getValue();  //Dexterity is the default for close range
               }

               var modifierList = rowPointer.getModifierList();
               var accurateIndex = modifierList.findRowByName('Accurate');
               if (undefined !== accurateIndex)
               {
                  var accurateApplications = modifierList.getRow(accurateIndex).getRank();
                  //in all versions accurate is +2 attack/rank
                  attackBonus += accurateApplications * 2;
               }
            }
            //keep track of the highest values for PL
            //TODO: test for PL?
            effectRank = rowPointer.getRank();
            if ('--' === attackBonus && powerLevelPerceptionEffect < effectRank) powerLevelPerceptionEffect = effectRank;
            if ('--' !== attackBonus)
            {
               if (powerLevelMaxAttack < attackBonus) powerLevelMaxAttack = attackBonus;
               if (powerLevelAttackEffect < (attackBonus + effectRank))
                  powerLevelAttackEffect = (attackBonus + effectRank);
            }
            if (powerLevelMaxEffect < effectRank) powerLevelMaxEffect = effectRank;

            derivedValues.Offense.push({skillName: rowPointer.getName(), attackBonus: attackBonus, range: range,
               effect: rowPointer.getEffect(), rank: effectRank});
            allOffensiveRows+=this._makeOffenseRow(rowPointer.getName(), attackBonus, range, rowPointer.getEffect(), effectRank);
         }
      }

      //TODO: doesn't include skills like Swords
      //TODO: (v1.0) if Improvised Weapon advantage then use Unarmed damage
      document.getElementById('offensive-section').innerHTML = allOffensiveRows;
      //offense example: Close, Weaken 4, Crit. 19-20 |or| Perception, Flight 3, Crit. 16-20
   };
   /**Updates the document for transcendence field and might regenerate powers and advantages.*/
   this.updateTranscendence=function()
   {
       document.getElementById('transcendence').value = transcendence;
       if(previousGodhood === this.canUseGodhood()) return;  //same transcendence so don't need to regenerate
       previousGodhood = this.canUseGodhood();
       this.powerSection.update();  //transcendence changed so update these
       this.advantageSection.update();
       //although devices can have godhood powers (if maker is T2+) equipment can't so equipment isn't regenerated
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**This returns the minimum possible power level based on the powerLevel given and the power level limitations.*/
   this._calculatePowerLevelLimitations=function()
   {
      var compareTo;
      //Skills and Abilities. Skills (which can't be negative) includes abilities even if there are no skills
      //therefore this covers Abilities just fine (for every ruleset)
      //TODO: ruleset 1.0 has advantages I need to include:
      //Close Attack etc (Improvised Weapon, Ranged Attack, Throwing Mastery), Eidetic Memory, Great Endurance
      for (var i = 0; i < Data.Ability.names.length; i++)
      {
         compareTo = this.skillSection.getMaxSkillRanks().get(Data.Ability.names[i]);
         compareTo -= 10;
         if (compareTo > powerLevel) powerLevel = compareTo;  //won't replace if compareTo is negative
      }

      if (activeRuleset.isGreaterThanOrEqualTo(3, 16))
      {
         //Attack and Effect
         if(powerLevelMaxAttack > powerLevel) powerLevel = powerLevelMaxAttack;
         if(powerLevelMaxEffect > powerLevel) powerLevel = powerLevelMaxEffect;

         //Defenses
         compareTo = this.defenseSection.getByName('Dodge').getTotalBonus();
         if (compareTo > powerLevel) powerLevel = compareTo;

         compareTo = this.defenseSection.getByName('Parry').getTotalBonus();
         if (compareTo > powerLevel) powerLevel = compareTo;

         compareTo = this.defenseSection.getByName('Fortitude').getTotalBonus();
         if (compareTo > powerLevel) powerLevel = compareTo;

         compareTo = this.defenseSection.getByName('Will').getTotalBonus();
         if (compareTo > powerLevel) powerLevel = compareTo;

         compareTo = this.defenseSection.getMaxToughness();
         if (compareTo > powerLevel) powerLevel = compareTo;
      }
      else
      {
         //Attack and Effect
         compareTo = powerLevelAttackEffect;  //only the highest 2 were stored for power level
         compareTo /= 2;
         if (compareTo > powerLevel) powerLevel = Math.ceil(compareTo);  //round up

         //Effect without Attack (ie Perception range)
         compareTo = powerLevelPerceptionEffect;
         if (compareTo > powerLevel) powerLevel = compareTo;

         //Dodge and Toughness
         compareTo = this.defenseSection.getByName('Dodge').getTotalBonus();
         compareTo += this.defenseSection.getMaxToughness();
         compareTo /= 2;
         if (compareTo > powerLevel) powerLevel = Math.ceil(compareTo);

         //Parry and Toughness
         compareTo = this.defenseSection.getByName('Parry').getTotalBonus();
         compareTo += this.defenseSection.getMaxToughness();
         compareTo /= 2;
         if (compareTo > powerLevel) powerLevel = Math.ceil(compareTo);

         //Fortitude and Will
         compareTo = this.defenseSection.getByName('Fortitude').getTotalBonus();
         compareTo += this.defenseSection.getByName('Will').getTotalBonus();
         compareTo /= 2;
         if (compareTo > powerLevel) powerLevel = Math.ceil(compareTo);
      }
   };
   /**This calculates the grand total based on each section's total and sets the document.*/
   this._calculateTotal=function()
   {
       characterPointsSpent = 0;
       document.getElementById('ability-total').innerHTML = this.abilitySection.getTotal();
       characterPointsSpent += this.abilitySection.getTotal();
       document.getElementById('power-total').innerHTML = this.powerSection.getTotal();
       characterPointsSpent += this.powerSection.getTotal();
       document.getElementById('equipment-points-used').innerHTML = this.equipmentSection.getTotal();
       document.getElementById('equipment-points-max').innerHTML = this.advantageSection.getEquipmentMaxTotal();
       //the character points spent for equipment points is accounted for in the advantage section
       document.getElementById('advantage-total').innerHTML = this.advantageSection.getTotal();
       characterPointsSpent += this.advantageSection.getTotal();
       document.getElementById('skill-total').innerHTML = this.skillSection.getTotal();
       characterPointsSpent += this.skillSection.getTotal();
       document.getElementById('defense-total').innerHTML = this.defenseSection.getTotal();
       characterPointsSpent += this.defenseSection.getTotal();
       document.getElementById('grand-total-used').innerHTML = characterPointsSpent;
   };
   /**Given an older json document, this function converts it to the newest document format.*/
   this._convertDocument=function(jsonDoc)
   {
      if (1 === jsonDoc.version)
      {
          var powerSections = [jsonDoc.Powers, jsonDoc.Equipment];
         for (var sectionIndex = 0; sectionIndex < powerSections.length; ++sectionIndex)
         {
            for (var rowIndex = 0; rowIndex < powerSections[sectionIndex].length; ++rowIndex)
            {
                   var thisRow = powerSections[sectionIndex][rowIndex];
                   thisRow.effect = thisRow.name;  //was renamed
                   thisRow.name = undefined;
                   //don't need to default name and skill since they will be auto-defaulted if not populated
            }
         }
          //also some images were renamed like: ../images/TCP Elf 11611.jpg => ../images/Energy-Controller.jpg
          //but I don't care about converting those
          ++jsonDoc.version;
      }
       //if(2 ===) convert it; ++; repeat until it is the most recent version
   };
   /**Given the json, this compares the version and rule set then alerts the user with a message if necessary.*/
   this._determineCompatibilityIssues=function(jsonDoc)
   {
       //the ruleset is for game rules. The version is to inform the user of possible incompatibility
       var version, ruleset;

       version = sanitizeNumber(jsonDoc.version, 1, 1);  //only version 1 doesn't have a version number so that's default
       //user shouldn't mess with the version but users might mess with ruleset

      if (undefined === jsonDoc.ruleset)
      {
          jsonDoc.ruleset = '2.7';  //there's no way to know if the document is for 1.0 or 2.x so guess the more common 2.x
             //2.x ruleset is fairly compatible so the most recent is default
             //3.x should always have a ruleset defined but user tampering may cause it to default to 2.x
         //TODO: add window.prompt in a test safe way
          Main.messageUser('MainObject.determineCompatibilityIssues.noRuleset', 'The requested document doesn\'t have the version for the game rules defined. It might not load correctly.\n'+
             'Version 2.7 has been assumed, if this is incorrect add ruleset to the root element with value "1.0" (save a blank document for an example but don\'t add "version").');
      }
       jsonDoc.ruleset = jsonDoc.ruleset.split('.');
       //major needs special treatment so only use Number.parseInt
       ruleset = new VersionObject(Number.parseInt(jsonDoc.ruleset[0]), sanitizeNumber(jsonDoc.ruleset[1], 0, 0));

       if(Number.isNaN(ruleset.major)) ruleset = new VersionObject(2, 7);  //see above comments for why 2.7
       else if(ruleset.major < 1) ruleset = new VersionObject(1, 0);

       //inform user as needed:
      if (ruleset.isGreaterThan(latestRuleset))
      {
          Main.messageUser('MainObject.determineCompatibilityIssues.newRuleset', 'The requested document uses game rules newer than what is supported by this code. It might not load correctly.');
          ruleset = latestRuleset.clone();  //default so that things can possibly load
      }
      if (version > latestSchemaVersion)
      {
          Main.messageUser('MainObject.determineCompatibilityIssues.newVersion', 'The requested document was saved in a format newer than what is supported by this code. It might not load correctly.');
          version = latestSchemaVersion;
      }

       //(re)set these so they can be used later
       jsonDoc.ruleset = ruleset;
       jsonDoc.version = version;
   };
   /**This function loads the json document.*/
   this.load=function(jsonDoc)
   {
      amLoading = true;
      document.getElementById('code-box').value = '';
      location.hash = '';  //clear out so that it may change later

      this._determineCompatibilityIssues(jsonDoc);
      if(jsonDoc.version < latestSchemaVersion) this._convertDocument(jsonDoc);
      //TODO: if(!this.isValidDocument(jsonDoc)) return;  //checks for the things I assume exist below (Hero etc)

      this.setRuleset(jsonDoc.ruleset.major, jsonDoc.ruleset.minor);
      document.getElementById('ruleset').value = activeRuleset.toString();
      //clear does not change activeRuleset
      this.clear();  //must clear out all other data first so not to have any remain
      document.getElementById('hero-name').value = jsonDoc.Hero.name;
      if (activeRuleset.major > 1)
      {
         transcendence = minimumTranscendence = sanitizeNumber(jsonDoc.Hero.transcendence, -1, 0);
         document.getElementById('transcendence').value = transcendence;
      }
      document.getElementById('img-file-path').value = jsonDoc.Hero.image;
      this.loadImageFromPath();  //can't set the file chooser for obvious security reasons
      document.getElementById('bio-box').value = jsonDoc.Information;
      this.abilitySection.load(jsonDoc.Abilities);  //at the end of each load it updates and generates

      this.powerSection.load(jsonDoc.Powers);
      this.equipmentSection.load(jsonDoc.Equipment);  //equipment can't have godhood

      this.advantageSection.load(jsonDoc.Advantages);
      this.skillSection.load(jsonDoc.Skills);
      this.defenseSection.load(jsonDoc.Defenses);
      if ('' !== document.getElementById('code-box').value)
      {
         location.hash = '#code-box';  //scroll to the code-box if there's an error
         alert('An error has occurred, see text box for details.');  //won't trigger in test because messageUser won't write to box
      }
      else location.hash = '#top';  //(built in anchor) jump to top (but don't scroll horizontally)
      amLoading = false;
   };
   /**This function loads the document according to the text string given.*/
   this.loadFromString=function(fileString)
   {
      fileString = fileString.trim();
      if('' === fileString) return;  //ignore

      var jsonDoc, docType;
      try {
         if(fileString[0] === '<'){docType = 'XML'; jsonDoc = xmlToJson(fileString);}  //if the first character is less than then assume XML
         else{docType = 'JSON'; jsonDoc = JSON.parse(fileString);}  //else assume JSON
      }
      catch(e)
      {
         amLoading = true;
         document.getElementById('code-box').value = '';
         Main.messageUser('MainObject.loadFromString.parsing.'+docType, 'A parsing error has occurred. The document you provided is not legal '+docType+'.\n\n'+e);
         //yeah I know the error message is completely unhelpful but there's nothing more I can do

         if (undefined === mockMessenger)
         {
            location.hash = '';  //clear out then set it in order to force scroll
            location.hash = '#code-box';  //scroll to the code-box
            alert('Invalid document, see text box for details.');
         }
         amLoading = false;
         throw e;  //stop the process and cause a console.error
      }

      this.load(jsonDoc);
   };
   /**This is a simple generator called by updateOffense to create a row of offense information.*/
   this._makeOffenseRow=function(skillName, attackBonus, range, effect, rank)
   {
      //TODO: move makeOffenseRow to GenerateHtml.js file
      var thisOffensiveRow = '<div class="row"><div class="character-sheet-offense-row col">' + skillName + ' ';
      if(attackBonus !== '--' && attackBonus >= 0) thisOffensiveRow+='+';  //add leading plus. checking for '--' is unneeded but more clear
      thisOffensiveRow+=attackBonus+'</div><div class="character-sheet-offense-row col">' + range + ', ' + effect + ' ' + rank;

      //Improved Critical only exists when it was d20
      //TODO: move crit range to arg
      var minCritNum = (20 - this.advantageSection.getRankMap().get('Improved Critical: '+skillName));
      if(minCritNum < 20) thisOffensiveRow+=', Crit. '+minCritNum+'-20';  //the '-20' is a range through 20

      thisOffensiveRow+='</div></div>\n';
      return thisOffensiveRow;
   };
   /**This returns the document's data as a json object*/
   this.save=function()
   {
       var jsonDoc = {Hero: {}, Abilities: {}, Powers: [], Equipment: [], Advantages: [], Skills: [], Defenses: {}};
          //skeleton so I don't need to create these later
       jsonDoc.ruleset = activeRuleset.toString();
       jsonDoc.version = latestSchemaVersion;
       jsonDoc.Hero.name = document.getElementById('hero-name').value;
       if(activeRuleset.major > 1) jsonDoc.Hero.transcendence = transcendence;
       jsonDoc.Hero.image = document.getElementById('img-file-path').value;
       //TODO: use jsonDoc.Hero.image = document.getElementById('character-image').src;
       jsonDoc.Information = document.getElementById('bio-box').value;
       jsonDoc.Abilities = this.abilitySection.save();
       jsonDoc.Powers = this.powerSection.save();
       jsonDoc.Equipment = this.equipmentSection.save();
       jsonDoc.Advantages = this.advantageSection.save();
       jsonDoc.Skills = this.skillSection.save();
       jsonDoc.Defenses = this.defenseSection.save();
       return jsonDoc;
   };
   /**This returns the document's data as a string*/
   this.saveAsString=function()
   {
      var jsonDoc = this.save();
      var fileString = JSON.stringify(jsonDoc);
      return fileString;
   };
   this._constructor=function()
   {
       Data.change(activeRuleset);  //needed to initialize some data
       this.abilitySection = new AbilityList();
       this.powerSection = new PowerListAgnostic('power');
       //Object.freeze(this.powerSection);  //TODO: what should and shouldn't be frozen? Main and data only (and commons etc?). freeze isn't deep. maybe screw it because tests
       this.equipmentSection = new PowerListAgnostic('equipment');  //give it the section name and the rest is the same
       //TODO: define the naming conventions for html elements.
       //I'm thinking: user input: TitleCase, output: snake_case, else: two words
       //but why not make them all TitleCase? Power row.generate uses 'Main.'+sectionName+'Section' for onchange
       this.advantageSection = new AdvantageList();
       this.skillSection = new SkillList();
       this.defenseSection = new DefenseList();
       this.updateOffense();  //for the default damage
   };
   //constructor:
   this._constructor();
}

/*Map of objects that update others:
everything (except modifier) calls Main.update();  //updates totals and power level
Main.updateOffense(); is called by ability, advantages, power, and skills
ability:
{
    Main.skillSection.calculateValues();
    Main.skillSection.generate();
    Main.updateOffense();
    Main.defenseSection.calculateValues();
}
advantages:
{
    Main.defenseSection.calculateValues();
    Main.updateOffense();
}
power:
{
    modifiers
   if (equipment)
   {
       Main.advantageSection.calculateValues();
       Main.advantageSection.generate();
   }
    Main.updateOffense();
    Main.defenseSection.calculateValues();
}
skill: Main.updateOffense();
*/
/*latestSchemaVersion change list:
1: original format from ruleset 2.5
2: added version and ruleset. name and skill attributes were added to both powers. old power "name" was renamed to "effect"
pending: 3: added header (3.0.0;application/xml;) removed version. Added feature exclusive baseAction, baseRange, baseDuration. renamed power name to attackName and skill to attackSkill
    TODO: What do these numbers mean? If I use more than 1
*/
