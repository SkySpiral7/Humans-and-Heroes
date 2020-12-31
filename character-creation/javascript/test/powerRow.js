'use strict';
TestSuite.powerRow = {};
TestSuite.powerRow.save = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerName' + Main.powerSection.indexToKey(0), 'big slash');
   ReactUtil.changeValue('powerSkill' + Main.powerSection.indexToKey(0), 'sword');
   assertions.push({
      Expected: {
         "effect": "Damage",
         "text": "Descriptors and other text",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "big slash",
         "skill": "sword",
         "Modifiers": [],
         "rank": 1
      },
      Actual: Main.powerSection.getRowByIndex(0).save(),
      Description: 'all with name, skill'
   });

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
   assertions.push({
      Expected: undefined,
      Actual: Main.powerSection.getRowByIndex(0).save().skill,
      Description: 'no skill'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Attain Knowledge');
   assertions.push({
      Expected: 2,
      Actual: Main.powerSection.getRowByIndex(0).save().cost,
      Description: 'base cost'
   });
   assertions.push({
      Expected: undefined,
      Actual: Main.powerSection.getRowByIndex(0).save().name,
      Description: 'no name'
   });

   return TestRunner.displayResults('TestSuite.powerRow.save', assertions, testState);
};
TestSuite.powerRow.validateActivationInfo=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions = [];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({effect: "Damage", action: "Standard", range: "Ranged"});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 'Standard',
      Actual: Main.powerSection.getRowByIndex(0).getAction(),
      Description: 'happy non-reaction Damage: action'
   });
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'happy non-reaction Damage: no error'});

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", action: "Reaction", range: "Close"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Reaction',
         Actual: Main.powerSection.getRowByIndex(0).getAction(),
         Description: 'happy reaction Damage: action'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'happy reaction Damage: error'});

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Luck Control", action: "Reaction", range: "Ranged"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Reaction',
         Actual: Main.powerSection.getRowByIndex(0).getAction(),
         Description: 'happy ranged Luck Control reaction: action'
      });
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getRowByIndex(0).getRange(),
         Description: 'happy ranged Luck Control reaction: range'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'happy ranged Luck Control reaction: error'});

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Feature", action: "Reaction", range: "Ranged", duration: "Instant"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Reaction',
         Actual: Main.powerSection.getRowByIndex(0).getAction(),
         Description: 'happy ranged Feature reaction: action'
      });
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getRowByIndex(0).getRange(),
         Description: 'happy ranged Feature reaction: range'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'happy ranged Feature reaction: error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'happy reaction'});}

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({effect: "Damage", action: "Reaction", range: "Ranged"});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 'Reaction',
      Actual: Main.powerSection.getRowByIndex(0).getAction(),
      Description: 'ranged Damage reaction: keep action'
   });
   assertions.push({
      Expected: 'Close',
      Actual: Main.powerSection.getRowByIndex(0).getRange(),
      Description: 'ranged Damage reaction: change range'
   });
   assertions.push({
      Expected: [
         {
            errorCode: 'PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose',
            message: 'Power #1: Damage has an action of Reaction and therefore must have a range of Close.',
            amLoading: true
         }],
      Actual: Messages.getAll(),
      Description: 'ranged Damage reaction: error'
   });

   Main.setRuleset(3, 3);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({effect: "Damage", action: "Reaction", range: "Ranged"});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 'Reaction',
      Actual: Main.powerSection.getRowByIndex(0).getAction(),
      Description: 'v3.3 ranged Damage Reaction: action'
   });
   assertions.push({
      Expected: 'Ranged',
      Actual: Main.powerSection.getRowByIndex(0).getRange(),
      Description: 'v3.3 ranged Damage Reaction: allows ranged'
   });
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 ranged Damage Reaction: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfo', assertions, testState);
};
TestSuite.powerRow.validateAndGetPossibleActions=function(testState={})
{
   TestRunner.clearResults(testState);
   //this func doesn't need feature tests

   var dataToLoad, assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 'Permanent',
      Actual: Main.powerSection.getRowByIndex(0)
      .getDuration(),
      Description: 'None action happy Flight: getDuration'
   });
   assertions.push({
      Expected: 'None',
      Actual: Main.powerSection.getRowByIndex(0)
      .getAction(),
      Description: 'None action happy Flight: action'
   });
   assertions.push({
      Expected: ['None'],
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'None action happy Flight: possibleActions'
   });
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'None action happy Flight: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Change action to none: getAction'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Change action to none: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'], Actual: Messages.errorCodes(), Description: 'Change action to none: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'notNone: getAction'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'notNone: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.notNone'], Actual: Messages.errorCodes(), Description: 'notNone: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Growth","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Move action happy: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Move action happy: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free'],
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'happy: returns all actions except Reaction'  //and None
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'moveNotAllowed isAttack: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed'], Actual: Messages.errorCodes(), Description: 'moveNotAllowed isAttack: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Reaction'],
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'isAttack: returns all actions except Move, Free'  //and None
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Move Object","text":"","action":"Move","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'move action Move Object: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'move action Move Object: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Free action happy: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Free action happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'freeNotAllowedForAttacks: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForAttacks: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'freeNotAllowedForMovement: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForMovement: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move'],
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'movement: returns all actions except Free, Reaction'  //and None
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'freeNotAllowedForHealing: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForHealing: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Move Object","text":"","action":"Free","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'free action Move Object: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'free action Move Object: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Reaction happy: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Reaction happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Reaction","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'reactionNotAllowed: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed'], Actual: Messages.errorCodes(), Description: 'reactionNotAllowed: error'});

   Main.powerSection.clear();
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Illusion');  //isAttack but !allowReaction
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard'],
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'Illusion: returns all actions except Move, Free, Reaction'  //and None
   });
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Luck Control');  //!isAttack and allowReaction
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction'],
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'Luck Control: returns all actions'  //except None
   });
   //every other allowReaction is also isAttack. Damage has been tested above

   Main.setRuleset(3,3);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'v3.3 move isAttack happy: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 move isAttack happy: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered'],  //except None
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'v3.3 returns all actions'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'v3.3 free isAttack happy: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 free isAttack happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'v3.3 Free isMovement: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 Free isMovement: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'v3.3 Free Healing: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 Free Healing: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Reaction","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'v3.3 Reaction Flight: action'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 Reaction Flight: error'});

   Main.setRuleset(2,7);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered'],  //except None
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'v2.x returns all actions'
   });

   Main.setRuleset(1,0);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: ['Standard', 'Move', 'Free', 'Reaction'],  //except None
      Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleActions,
      Description: 'v1.0 returns all actions'
   });

   return TestRunner.displayResults('TestSuite.powerRow.validateAndGetPossibleActions', assertions, testState);
};
TestSuite.powerRow.validateAndGetPossibleDurations=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Instant happy: duration'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Instant happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'onlyInstant: duration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant'], Actual: Messages.errorCodes(), Description: 'onlyInstant: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'notPermanent: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Immunity","text":"","action":"Standard","range":"Close","duration":"Permanent",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'notPermanent default Permanent: Duration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent default Permanent: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'notPermanent Feature: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Instant Feature happy: duration'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Instant Feature happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'notInstant: Duration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant'], Actual: Messages.errorCodes(), Description: 'notInstant: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateAndGetPossibleDurations', assertions, testState);
};
TestSuite.powerRow.getPossibleRanges = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
      assertions.push({
         Expected: ['Personal', 'Close', 'Ranged', 'Perception'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'Feature choices'
      });
      //need to set duration because currently: Permanent with None action
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: ['Personal', 'Close', 'Ranged', 'Perception'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'Feature choices same for reaction'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Feature'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      assertions.push({
         Expected: ['Close', 'Ranged', 'Perception'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'happy path choices'
      });

      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: ['Close'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'Aura: only choice is close'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Damage'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Luck Control');
      assertions.push({
         Expected: 'Reaction',
         Actual: Main.powerSection.getRowByIndex(0).getAction(),
         Description: 'luck control default action'
      });
      assertions.push({
         Expected: ['Close', 'Ranged', 'Perception'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'luck control choices'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Luck Control'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
      assertions.push({
         Expected: 'Personal',
         Actual: Main.powerSection.getRowByIndex(0).getRange(),
         Description: 'Flight default range'
      });
      assertions.push({
         Expected: ['Personal'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'Personal only choice'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Personal'});}

   try
   {
      Main.setRuleset(3, 3);
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: ['Close', 'Ranged', 'Perception'],
         Actual: Main.powerSection.getRowByIndex(0).getDerivedValues().possibleRanges,
         Description: 'v3.3 reaction Damage choices'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'v3.3'});}

   return TestRunner.displayResults('TestSuite.powerRow.getPossibleRanges', assertions, testState);
};
TestSuite.powerRow.validatePersonalRange=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'range Feature allows close range'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'range Feature allows close range: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'range Feature allows Personal range'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'range Feature allows Personal range: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Create', Actual: Main.powerSection.getRowByIndex(0).getEffect(), Description: 'Can\'t change to personal: power was loaded'});
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Can\'t change to personal: getAction'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Can\'t change to personal: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Can\'t change to personal: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validatePersonalRange.notPersonal'], Actual: Messages.errorCodes(), Description: 'Can\'t change to personal: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Flight forced to be personal range'});
   assertions.push({Expected: ['PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed'], Actual: Messages.errorCodes(), Description: 'range Personal Flight can\'t change range: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'ranged Flight with modifier allowed: range'});
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'ranged Flight with modifier allowed: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validatePersonalRange', assertions, testState);
};
TestSuite.powerRow.updateDurationModifiers=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Feature does\'t auto gain Increased Duration: getDuration'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature does\'t auto gain Increased Duration: before is blank'});
    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature does\'t auto gain Increased Duration: after is still blank'});
    } catch(e){assertions.push({Error: e, Description: 'Feature does\'t auto gain Increased Duration'});}

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature does\'t auto gain Decreased Duration: before is blank'});
    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature does\'t auto gain Decreased Duration: after is still blank'});
    } catch(e){assertions.push({Error: e, Description: 'Feature does\'t auto gain Decreased Duration'});}

    try{
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight'); ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
    assertions.push({Expected: 'Continuous', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Increased Duration: duration'});
    assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Increased Duration: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Increased Duration: is rank 1'});

    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Increased Duration: setting the duration back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Increased Duration: was auto removed'});

    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous'); ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
    assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Increased Duration: setting duration up then down'});
    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Increased Duration: was auto replaced with Decreased Duration'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Increased Duration: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Increased Duration'});}

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight'); ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
    assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Decreased Duration: duration'});
    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Decreased Duration: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Decreased Duration: is rank 1'});

    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Decreased Duration: setting the duration back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Decreased Duration: was auto removed'});

    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration'); ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
    assertions.push({Expected: 'Continuous', Actual: Main.powerSection.getRowByIndex(0).getDuration(), Description: 'Decreased Duration: setting duration up then down'});
    assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Decreased Duration: was auto replaced with Increased Duration'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Decreased Duration: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Decreased Duration'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateDurationModifiers', assertions, testState);
};
TestSuite.powerRow.updateActionModifiers=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    Main.setRuleset(3,3);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Teleport'); ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Faster Action: action'});
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Faster Action: was auto created'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Faster Action: rank'});

    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Move');
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Faster Action: setting the action back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Faster Action: was auto removed'});

    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction'); ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Full');
    assertions.push({Expected: 'Full', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Faster Action: setting action up then down'});
    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Faster Action: was auto replaced with Slower Action'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Faster Action: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Faster Action'});}

    try{
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Full');
    assertions.push({Expected: 'Full', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Slower Action: action'});
    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Slower Action: was auto created'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Slower Action: is rank 1'});

    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Move');
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Slower Action: setting the action back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Slower Action: was auto removed'});

    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Full'); ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Slower Action: setting action down then up'});
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Slower Action: was auto replaced with Faster Action'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Slower Action: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Slower Action'});}

    try{
    Main.setRuleset(3,4);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage'); ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Aura: action'});
    assertions.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Aura: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Aura: calculates distance from Standard'});

    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Standard');
    assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Aura: setting the action back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Aura: was auto removed'});
    } catch(e){assertions.push({Error: e, Description: 'Aura'});}

    try{
    Main.setRuleset(3,3);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Teleport'); ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
    assertions.push({Expected: 'Triggered', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Add Selective: action'});
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Add Selective: Faster Action was auto created'});
    assertions.push({Expected: 3, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Add Selective: Faster Action rank 3'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Add Selective: Selective was auto created'});
    } catch(e){assertions.push({Error: e, Description: 'Add Selective'});}

    try{
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Move');
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Keep Selective: action'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Keep Selective: Selective still there'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Keep Selective: no other modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Keep Selective'});}

    try{
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Only 1 Selective: Faster Action was auto created'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Only 1 Selective: Selective still there'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Only 1 Selective: no other modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Only 1 Selective'});}

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Feature doesn\'t auto gain Faster Action: getAction'});
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature doesn\'t auto gain Faster Action: after'});
    } catch(e){assertions.push({Error: e, Description: 'Feature doesn\'t auto gain Faster Action'});}

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature doesn\'t auto gain Slower Action: after'});
    } catch(e){assertions.push({Error: e, Description: 'Feature doesn\'t auto gain Slower Action'});}

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Feature auto gains Selective: Selective added'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature auto gains Selective: no other modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Feature auto gains Selective'});}

    try{
    Main.setRuleset(3,4);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Luck Control'); ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Free');
    assertions.push({Expected: 'Luck Control', Actual: Main.powerSection.getRowByIndex(0).getEffect(), Description: 'Luck Control doesn\'t have Aura: power'});
    assertions.push({Expected: 'Free', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Luck Control doesn\'t have Aura: free action'});
    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Luck Control doesn\'t have Aura: Slower Action from Reaction (name)'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Luck Control doesn\'t have Aura: Slower Action from Reaction (rank)'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Luck Control doesn\'t have Aura: only modifier'});

    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRowByIndex(0).getAction(), Description: 'Luck Control doesn\'t have Aura: Reaction action'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Luck Control doesn\'t have Aura: no modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Luck Control doesn\'t have Aura'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateActionModifiers', assertions, testState);
};
TestSuite.powerRow.updateRangeModifiers=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    Main.powerSection.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature does\'t auto gain Increased Range: before is blank'});
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Feature does\'t auto gain Increased Range: after is still blank'});
    } catch(e){assertions.push({Error: e, Description: 'Feature does\'t auto gain Increased Range'});}
    //can't test 'Feature does\'t auto gain Decreased Range' because Feature's default range is Personal

    try{
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Move Object'); ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
    assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Increased Range: range'});
    assertions.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Increased Range: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Increased Range: is rank 1'});

    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
    assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Increased Range: setting the range back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Increased Range: was auto removed'});

    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception'); ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    assertions.push({Expected: 'Close', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Increased Range: setting range up then down'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Increased Range: was auto replaced with Reduced Range'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Increased Range: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Increased Range'});}

    try{
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    assertions.push({Expected: 'Close', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Reduced Range: range'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Reduced Range: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0,0).state.rank, Description: 'Reduced Range: is rank 1'});

    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
    assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Reduced Range: setting the range back'});
    assertions.push({Expected: 0, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Reduced Range: was auto removed'});

    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close'); ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
    assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Reduced Range: setting range down then up'});
    assertions.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Reduced Range: was auto replaced with Increased Range'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getState().it[0].Modifiers.length, Description: 'Reduced Range: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Reduced Range'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateRangeModifiers', assertions, testState);
};
TestSuite.powerRow.calculateDerivedValues = function (testState = {})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual;

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Variable');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      //(7+1)*2 = 16
      assertions.push({Expected: 8, Actual: actual.costPerRank, Description: 'Rank extras: costPerRank'});
      assertions.push({Expected: 16, Actual: actual.total, Description: 'Rank extras: total'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Rank extras'});}

   try
   {
      Main.powerSection.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Variable');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Limited');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      //(7-1)*2 = 12
      assertions.push({Expected: 6, Actual: actual.costPerRank, Description: 'Rank flaws: costPerRank'});
      assertions.push({Expected: 12, Actual: actual.total, Description: 'Rank flaws: total'});

      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 4);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Limited');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 0, Actual: actual.costPerRank, Description: 'Rank flaws fraction: costPerRank'});
      assertions.push({Expected: 2, Actual: actual.total, Description: 'Rank flaws fraction: total'});

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 3);
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      //costPerRank still 0
      assertions.push({Expected: 2, Actual: actual.total, Description: 'fraction rounds up: total'});

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Other Rank Flaw');
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 100);
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: -3, Actual: actual.costPerRank, Description: 'Rank flaws min 1/5: costPerRank'});
      assertions.push({Expected: 20, Actual: actual.total, Description: 'Rank flaws min 1/5: total'});

      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Variable');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Other Rank Flaw');
      //7-6 = 1 but is 5 instead
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 6);
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 5, Actual: actual.costPerRank, Description: 'Variable has a min cost of 5/rank'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Rank flaws'});}

   try
   {
      Main.powerSection.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 4, Actual: actual.total, Description: 'without free mod'});
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Linked');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 4, Actual: actual.total, Description: 'same total'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Free mods'});}

   try
   {
      Main.powerSection.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 4, Actual: actual.total, Description: 'without flat extra'});
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Accurate');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 5, Actual: actual.total, Description: 'Flat Extras add to cost after ranks'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Flat Extras'});}

   try
   {
      Main.powerSection.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 4, Actual: actual.total, Description: 'without flat flaw'});
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Inaccurate');
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 3, Actual: actual.total, Description: 'Flat flaws reduce cost after ranks'});

      Main.powerSection.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Inaccurate');
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 3);
      //2 per rank - 3
      assertions.push({Expected: 2, Actual: Main.powerSection.getRowByIndex(0).getRank(), Description: 'Flat flaws may increase ranks'});
      //(1+1)*2 - 3 = 1. this works for floor+1 but also ciel would work
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Flat flaws retains total of 1'});

      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 3);
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 4);
      //4 per rank - 4
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);
      //(1+3)*1 - 4 = 0 not allowed so (1+3)*2 - 4 = 4 instead. this proves the floor+1 (ciel wouldn't work)
      assertions.push({Expected: 2, Actual: Main.powerSection.getRowByIndex(0).getRank(), Description: 'Flat flaws can\'t make total 0'});
      assertions.push({Expected: 4, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'total = flat flaw'});

      Main.powerSection.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Limited');
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 2);
      //cost is 1/3
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Inaccurate');
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 3);
      //1/3 per rank - 3
      assertions.push({Expected: 10, Actual: Main.powerSection.getRowByIndex(0).getRank(), Description: 'Flat flaws with fraction: rank'});
      //(1/3)*10 - 3 = 0.3 rounds to 1
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Flat flaws with fraction: total'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Flat flaws'});}

   try
   {
      Main.powerSection.clear();
      DomUtil.changeValue('transcendence', 1);
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'A God I Am');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      assertions.push({Expected: 155, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '2 ranks: A God I Am'});

      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Reality Warp');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      assertions.push({
         Expected: 80 + Data.Power['Phantom Ranks'].baseCost,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: '2 ranks: Reality Warp'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Odd first rank values'});}

   try
   {
      Main.setRuleset(3, 4);
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Variable');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Other Rank Flaw');
      ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 6);
      actual = Main.powerSection.getRowByIndex(0).getDerivedValues();
      assertions.push({Expected: 1, Actual: actual.costPerRank, Description: 'v3.4 Variable has no min cost'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'old Variable min cost'});}

   return TestRunner.displayResults('TestSuite.powerRow.calculateDerivedValues', assertions, testState);
};
TestSuite.powerRow.validateNameAndSkill=function(testState={})
{
   TestRunner.clearResults(testState);

   const assertions=[];
   let dataToLoad;

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Flight", name: 'jetpack', skill: 'backpacking'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getState().name,
         Description: 'ignores flight name'
      });
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getState().skillUsed,
         Description: 'ignores flight skill'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'ignores name/skill'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", name: 'slash', skill: 'sword'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'slash',
         Actual: Main.powerSection.getRowByIndex(0).getState().name,
         Description: 'Damage name'
      });
      assertions.push({
         Expected: 'sword',
         Actual: Main.powerSection.getRowByIndex(0).getState().skillUsed,
         Description: 'Damage skill'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({
         effect: "Flight", name: 'sky shot', skill: 'gun', range: 'Close',
         Modifiers: [{name: 'Attack'}]
      });
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'sky shot',
         Actual: Main.powerSection.getRowByIndex(0).getState().name,
         Description: 'Flight attack name'
      });
      assertions.push({
         Expected: 'gun',
         Actual: Main.powerSection.getRowByIndex(0).getState().skillUsed,
         Description: 'Flight attack skill'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'happy'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      assertions.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRowByIndex(0).getName(), Description: 'power Default name'});
      assertions.push({
         Expected: 'Skill used for attack',
         Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(),
         Description: 'Default skill'
      });
      ReactUtil.changeValue('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Nullify');
      assertions.push({
         Expected: 'Equipment 1 Nullify',
         Actual: Main.equipmentSection.getRowByIndex(0).getName(),
         Description: 'equipment Default name'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Power 1 Damage',
         Actual: Main.powerSection.getRowByIndex(0).getState().name,
         Description: 'load Default name'
      });
      assertions.push({
         Expected: 'Skill used for attack',
         Actual: Main.powerSection.getRowByIndex(0).getState().skillUsed,
         Description: 'load Default skill'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Default name and skill'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(), Description: 'Aura has no skill'});
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Standard');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(),
         Description: 'Perception has no skill'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'No skill'});}

   return TestRunner.displayResults('TestSuite.powerRow.validateNameAndSkill', assertions, testState);
};
TestSuite.powerRow.sanitizeStateAndGetDerivedValues = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let dataToLoad;

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Invalid"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 0, Actual: Main.powerSection.getState().it.length, Description: 'invalid not loaded'});
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.sanitizeStateAndGetDerivedValues.notExist',
               message: 'Power #1: Invalid is not a power name.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid: error'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'load invalid'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Hero.transcendence = -1;
      dataToLoad.Powers.push({effect: "A God I Am"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: false, Actual: Main.canUseGodhood(), Description: 'Godhood is off'});
      assertions.push({Expected: 0, Actual: Main.powerSection.getState().it.length, Description: 'bad godhood: not illegally loaded'});
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.sanitizeStateAndGetDerivedValues.godhood',
               message: 'Power #1: A God I Am is not allowed because transcendence is -1.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'bad godhood: error'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'bad godhood'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Hero.transcendence = 1;  //set godhood
      dataToLoad.Powers.push({effect: "Flight"});
      //flight is to make sure transcendence isn't reset during the loop
      dataToLoad.Powers.push({effect: "A God I Am"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: true, Actual: Main.canUseGodhood(), Description: 'Godhood is on'});
      assertions.push({Expected: "A God I Am", Actual: Main.powerSection.getState().it[1].effect, Description: 'godhood: loaded'});
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'godhood: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'happy godhood'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", cost: 3});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getState().baseCost,
         Description: '!hasInputBaseCost: use default'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Attain Knowledge"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 2,
         Actual: Main.powerSection.getRowByIndex(0).getState().baseCost,
         Description: 'hasInputBaseCost: default baseCost'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Attain Knowledge", cost: 3});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 3,
         Actual: Main.powerSection.getRowByIndex(0).getState().baseCost,
         Description: 'hasInputBaseCost: valid baseCost'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Attain Knowledge", cost: -5});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getState().baseCost,
         Description: 'hasInputBaseCost: min baseCost'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'baseCost'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Descriptors and other text',
         Actual: Main.powerSection.getRowByIndex(0).getState().text,
         Description: 'default text'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", text: 'magic electric ice'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'magic electric ice',
         Actual: Main.powerSection.getRowByIndex(0).getState().text,
         Description: 'loaded text'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'text'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Flight"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getState().name,
         Description: 'no name'
      });
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getState().skillUsed,
         Description: 'no skill'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Flight", name: 'jetpack', skill: 'backpacking'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getState().name,
         Description: 'ignores name'
      });
      assertions.push({
         Expected: undefined,
         Actual: Main.powerSection.getRowByIndex(0).getState().skillUsed,
         Description: 'ignores skill'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'no name/skill'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", rank: -3});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getState().rank,
         Description: 'min rank'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", rank: 3});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 3,
         Actual: Main.powerSection.getRowByIndex(0).getState().rank,
         Description: 'valid rank'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getState().rank,
         Description: 'default rank'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'rank'});}

   return TestRunner.displayResults('TestSuite.powerRow.sanitizeStateAndGetDerivedValues', assertions, testState);
};
TestSuite.powerRow.validateActivationInfoExists = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let dataToLoad;

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Standard', Actual: Main.powerSection.getState().it[0].action, Description: 'no action: loaded default'});
      assertions.push({Expected: [], Actual: Messages.getAll(), Description: 'no action: error'});

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", action: 'invalid'});
      Loader.sendData(dataToLoad);
      assertions.push(
         {Expected: 'Standard', Actual: Main.powerSection.getState().it[0].action, Description: 'invalid action: loaded default instead'});
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.validateActivationInfoExists.actionNotExist',
               message: 'Power #1: invalid is not the name of an action. Using default of Standard instead.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid action: error'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", action: 'Full'});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Full', Actual: Main.powerSection.getState().it[0].action, Description: 'with action: loaded'});
      assertions.push({Expected: [], Actual: Messages.getAll(), Description: 'with action: error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'action'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Close', Actual: Main.powerSection.getState().it[0].range, Description: 'no range: loaded default'});
      assertions.push({Expected: [], Actual: Messages.getAll(), Description: 'no range: error'});

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", range: 'invalid'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Close',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'invalid range: loaded default instead'
      });
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.validateActivationInfoExists.rangeNotExist',
               message: 'Power #1: invalid is not the name of a range. Using default of Close instead.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid range: error'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Damage", range: 'Ranged'});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getState().it[0].range, Description: 'with range: loaded'});
      assertions.push({Expected: [], Actual: Messages.getAll(), Description: 'with range: error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'range'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Flight"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'no duration: loaded default'
      });
      assertions.push({Expected: [], Actual: Messages.getAll(), Description: 'no duration: error'});

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Flight", duration: 'invalid'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'invalid duration: loaded default instead'
      });
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.validateActivationInfoExists.durationNotExist',
               message: 'Power #1: invalid is not the name of a duration. Using default of Sustained instead.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid duration: error'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Flight", duration: 'Concentration'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Concentration',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'with duration: loaded'
      });
      assertions.push({Expected: [], Actual: Messages.getAll(), Description: 'with duration: error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'duration'});}

   //feature is tested because validatePersonalRange allows everything for feature
   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Feature", action: 'invalid'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'None',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'invalid action feature: loaded default instead'
      });
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.validateActivationInfoExists.actionNotExist',
               message: 'Power #1: invalid is not the name of an action. Using default of None instead.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid action feature: error'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Feature", range: 'invalid'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Personal',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'invalid range feature: loaded default instead'
      });
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.validateActivationInfoExists.rangeNotExist',
               message: 'Power #1: invalid is not the name of a range. Using default of Personal instead.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid range feature: error'
      });

      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({effect: "Feature", duration: 'invalid'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Permanent',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'invalid duration feature: loaded default instead'
      });
      assertions.push({
         Expected: [
            {
               errorCode: 'PowerObjectAgnostic.validateActivationInfoExists.durationNotExist',
               message: 'Power #1: invalid is not the name of a duration. Using default of Permanent instead.',
               amLoading: true
            }],
         Actual: Messages.getAll(),
         Description: 'invalid duration feature: error'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'feature'});}

   return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfoExists', assertions, testState);
};
