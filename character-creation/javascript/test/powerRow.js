'use strict';
TestSuite.powerRow={};
TestSuite.powerRow.disableValidationForActivationInfo=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];
   //these tests are things that wouldn't be valid if loaded in order: action, range, duration

   Main.setRuleset(3,3);
   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Personal to close Range: Effect'});
   assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Personal to close Range: 1 row'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Personal to close Range: getRange'});
   } catch(e){assertions.push({Error: e, Description: 'Personal to close Range'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent",
      "Modifiers":[{"name":"Increased Duration","applications":2}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Action None: Effect'});
   assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Action None: 1 row'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Action None: getAction'});
   } catch(e){assertions.push({Error: e, Description: 'Action None'});}

   return TestRunner.displayResults('TestSuite.powerRow.disableValidationForActivationInfo', assertions, testState);
};
TestSuite.powerRow.updateActivationModifiers=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Move","range":"Ranged","duration":"Sustained",
      "Modifiers":[{"name":"Slower Action"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'updateActionModifiers: action'});
   assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'updateActionModifiers: modifier'});
   assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'updateActionModifiers: no more modifiers'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'updateActionModifiers: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Increased Range"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'updateRangeModifiers: action'});
   assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'updateRangeModifiers: modifier'});
   assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'updateRangeModifiers: no more modifiers'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'updateRangeModifiers: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Continuous",
      "Modifiers":[{"name":"Decreased Duration"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'updateDurationModifiers: action'});
   assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'updateDurationModifiers: modifier'});
   assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'updateDurationModifiers: no more modifiers'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'updateDurationModifiers: error'});

   return TestRunner.displayResults('TestSuite.powerRow.disableValidationForActivationInfo', assertions, testState);
};
TestSuite.powerRow.validateActivationInfo=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 happy reaction Damage: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.4 happy reaction Damage: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Luck Control","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 ranged Luck Control reaction: action'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 ranged Luck Control reaction: range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.4 ranged Luck Control reaction: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 ranged Feature reaction: action'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 ranged Feature reaction: range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.4 ranged Feature reaction: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 ranged Damage reaction: action'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 ranged Damage reaction: range'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose'], Actual: Messages.errorCodes(), Description: 'v3.4 ranged Damage reaction: error'});

   Main.setRuleset(3,3);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 range Damage action Reaction'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Reaction Damage allows ranged range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 range Reaction Damage allows ranged range: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfo', assertions, testState);
};
TestSuite.powerRow.validateActivationInfo_valid=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.4 allows reaction: power'});
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 allows reaction: getAction'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 allows reaction: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.4 allows reaction: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.4 allows reaction: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 1: power was loaded'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 1: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 1: getRange'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 1: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 1: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 2: power was loaded'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 2: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 2: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 2: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 2: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 3: power was loaded'});
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 3: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 3: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 3: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 3: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 4: power was loaded'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 4: getAction'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 4: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 4: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 4: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 5: power was loaded'});
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 5: getAction'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 5: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 5: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 5: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature v3.4 allows reaction: power'});
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature v3.4 allows reaction: getAction'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature v3.4 allows reaction: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature v3.4 allows reaction: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Feature v3.4 allows reaction: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Luck Control","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Luck Control', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Luck Control v3.4 allows reaction: power'});
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Luck Control v3.4 allows reaction: getAction'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Luck Control v3.4 allows reaction: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Luck Control v3.4 allows reaction: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Luck Control v3.4 allows reaction: no errors'});

   Main.setRuleset(3,3);
   //most of these tests will have modifiers because they should be ignored and recreated

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 1: power was loaded'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 1: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 1: getRange'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 1: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Valid 1: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 2: power was loaded'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 2: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 2: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 2: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Valid 2: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 3: power was loaded'});
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 3: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 3: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 3: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Valid 3: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 4: power was loaded'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 4: getAction'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 4: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 4: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Valid 4: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Close","duration":"Instant",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 5: power was loaded'});
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 5: getAction'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 5: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 5: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Valid 5: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Reaction","range":"Ranged","duration":"Instant",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.3 allows reaction: power was loaded'});
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 allows reaction: getAction'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 allows reaction: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.3 allows reaction: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 allows reaction: no errors'});

   return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfo_valid', assertions, testState);
};
TestSuite.powerRow.validateAndGetPossibleActions=function(testState={})
{
   TestRunner.clearResults(testState);
   //this func doesn't need feature tests but it has them anyway

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'None action happy: getAction'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'None action happy: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'None action happy: error'});
   assertions.push({
      Expected: ['None'],
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'None action happy: return'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'None action happy Feature: getAction'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'None action happy Feature: getDuration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'None action happy Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action to none: getAction'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action to none: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'], Actual: Messages.errorCodes(), Description: 'Change action to none: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'onlyNone Feature: getAction'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'onlyNone Feature: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'], Actual: Messages.errorCodes(), Description: 'onlyNone Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'notNone: getAction'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notNone: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.notNone'], Actual: Messages.errorCodes(), Description: 'notNone: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'notNone Feature: getAction'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notNone Feature: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.notNone'], Actual: Messages.errorCodes(), Description: 'notNone Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Growth","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Move action happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Move action happy: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free'],
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'happy: returns all actions except Reaction'  //and None
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'moveNotAllowed isAttack: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed'], Actual: Messages.errorCodes(), Description: 'moveNotAllowed isAttack: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Reaction'],
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'isAttack: returns all actions except Move, Free'  //and None
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Move Object","text":"","action":"Move","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'move action Move Object: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'move action Move Object: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Free action happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Free action happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'freeNotAllowedForAttacks: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForAttacks: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'freeNotAllowedForMovement: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForMovement: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move'],
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'movement: returns all actions except Free, Reaction'  //and None
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'freeNotAllowedForHealing: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForHealing: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Move Object","text":"","action":"Free","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'free action Move Object: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'free action Move Object: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Reaction happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Reaction happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Reaction","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'reactionNotAllowed: action'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed'], Actual: Messages.errorCodes(), Description: 'reactionNotAllowed: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Move Feature happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Move Feature happy: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Free Feature happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Free Feature happy: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Reaction Feature happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Reaction Feature happy: error'});

   Main.powerSection.clear();
   SelectUtil.changeText('powerChoices0', 'Illusion');  //isAttack but !allowReaction
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard'],
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'Illusion: returns all actions except Move, Free, Reaction'  //and None
   });
   SelectUtil.changeText('powerChoices0', 'Luck Control');  //!isAttack and allowReaction
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction'],
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'Luck Control: returns all actions'  //except None
   });
   //every other allowReaction is also isAttack. Damage has been tested above

   Main.setRuleset(3,3);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 move isAttack happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 move isAttack happy: error'});
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered'],  //except None
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'v3.3 returns all actions'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 free isAttack happy: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 free isAttack happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 Free isMovement: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 Free isMovement: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 Free Healing: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 Free Healing: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Reaction","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 Reaction Flight: action'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'v3.3 Reaction Flight: error'});

   Main.setRuleset(2,7);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered'],  //except None
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
      Description: 'v2.x returns all actions'
   });

   Main.setRuleset(1,0);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: ['Standard', 'Move', 'Free', 'Reaction'],  //except None
      Actual: Main.powerSection.getRow(0)._validateAndGetPossibleActions(),
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
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Instant happy: duration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Instant happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'onlyInstant: duration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant'], Actual: Messages.errorCodes(), Description: 'onlyInstant: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notPermanent: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Immunity","text":"","action":"Standard","range":"Close","duration":"Permanent",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notPermanent default Permanent: Duration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent default Permanent: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notPermanent Feature: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Instant Feature happy: duration'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Instant Feature happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notInstant: Duration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant'], Actual: Messages.errorCodes(), Description: 'notInstant: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateAndGetPossibleDurations', assertions, testState);
};
TestSuite.powerRow.validatePersonalRange=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'range Feature allows close range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'range Feature allows close range: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'range Feature allows Personal range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'range Feature allows Personal range: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Can\'t change to personal: power was loaded'});
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Can\'t change to personal: getAction'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Can\'t change to personal: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Can\'t change to personal: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.validatePersonalRange.notPersonal'], Actual: Messages.errorCodes(), Description: 'Can\'t change to personal: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Flight forced to be personal range'});
   assertions.push({Expected: ['PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed'], Actual: Messages.errorCodes(), Description: 'range Personal Flight can\'t change range: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'ranged Flight with modifier allowed: range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'ranged Flight with modifier allowed: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validatePersonalRange', assertions, testState);
};
TestSuite.powerRow.setAction=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];

   var dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"invalid action","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Action does not exist: getAction'});
   assertions.push({Expected: ['PowerObjectAgnostic.setAction.notExist'], Actual: Messages.errorCodes(), Description: 'Action does not exist: error'});

    try{
    Main.setRuleset(3, 3);
    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v2.7 Reaction Damage doesn\'t become close range: power'});
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v2.7 Reaction Damage doesn\'t become close range: getAction'});
    assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v2.7 Reaction Damage doesn\'t become close range: getRange'});
    } catch(e){assertions.push({Error: e, Description: 'v2.7 Reaction Damage doesn\'t become close range'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.4 Reaction Damage becomes close range: power'});
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Reaction Damage becomes close range: getAction'});
    assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Reaction Damage becomes close range: getRange'});
    } catch(e){assertions.push({Error: e, Description: 'v3.4 Reaction Damage becomes close range'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.4 Reaction Feature doesn\'t become close range: power'});
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Reaction Feature doesn\'t become close range: getAction'});
    assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Reaction Feature doesn\'t become close range: getRange'});
    } catch(e){assertions.push({Error: e, Description: 'v3.4 Reaction Feature doesn\'t become close range'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Luck Control');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Luck Control starts as ranged: getAction'});
    assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Luck Control starts as ranged: getRange'});

    SelectUtil.changeText('powerSelectAction0', 'Free');
    assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Luck Control changed to Free'});
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Luck Control doesn\'t become close range: getAction'});
    assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Luck Control doesn\'t become close range: getRange'});
    } catch(e){assertions.push({Error: e, Description: 'v3.4 Luck Control not close range'});}

    return TestRunner.displayResults('TestSuite.powerRow.setAction', assertions, testState);
};
TestSuite.powerRow.setDuration=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];

   var dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Protection","text":"","action":"None","range":"Personal","duration":"invalid duration","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration does not exist: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.setDuration.notExist'], Actual: Messages.errorCodes(), Description: 'Duration does not exist: error'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Instant');
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change to Instant: power'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change to Instant: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change to Instant: getRange'});
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change to Instant: getDuration'});

   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change from Instant: power'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change from Instant: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change from Instant: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change from Instant: getDuration'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change to permanent (non-permanent default): power'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to permanent (non-permanent default): getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to permanent (non-permanent default): getRange'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to permanent (non-permanent default): getDuration'});

   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from permanent (non-permanent default): getAction'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from permanent (non-permanent default): getDuration'});

   SelectUtil.changeText('powerChoices0', 'Protection');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change from permanent (permanent default): power'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from permanent (permanent default): getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from permanent (permanent default): getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from permanent (permanent default): getDuration'});

   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to permanent (permanent default): getAction'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to permanent (permanent default): getDuration'});

   return TestRunner.displayResults('TestSuite.powerRow.setDuration', assertions, testState);
};
TestSuite.powerRow.updateDurationModifiers=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature does\'t auto gain Increased Duration: getDuration'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Duration: after is still blank'});
    } catch(e){assertions.push({Error: e, Description: 'Feature does\'t auto gain Increased Duration'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Decreased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Decreased Duration: after is still blank'});
    } catch(e){assertions.push({Error: e, Description: 'Feature does\'t auto gain Decreased Duration'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    assertions.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: duration'});
    assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Duration: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Increased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: setting the duration back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Increased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Continuous'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: setting duration up then down'});
    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Duration: was auto replaced with Decreased Duration'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Increased Duration: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Increased Duration'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: duration'});
    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Decreased Duration: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Decreased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: setting the duration back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Decreased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Concentration'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    assertions.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: setting duration up then down'});
    assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Decreased Duration: was auto replaced with Increased Duration'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Decreased Duration: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Decreased Duration'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateDurationModifiers', assertions, testState);
};
TestSuite.powerRow.setPower=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.powerRow.setPower', assertions, testState);
};
TestSuite.powerRow.updateActionModifiers=function(testState={})
{
    TestRunner.clearResults(testState);

    //testing for setting to None exists in setDuration tests
    var assertions=[];

    try{
    Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Teleport'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Action: action'});
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Faster Action: was auto created'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Faster Action: rank'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Action: setting the action back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Faster Action: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Reaction'); SelectUtil.changeText('powerSelectAction0', 'Full');
    assertions.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Action: setting action up then down'});
    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Faster Action: was auto replaced with Slower Action'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Faster Action: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Faster Action'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Full');
    assertions.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Action: action'});
    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Slower Action: was auto created'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Slower Action: is rank 1'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Action: setting the action back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Slower Action: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Full'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Action: setting action down then up'});
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Slower Action: was auto replaced with Faster Action'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Slower Action: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Slower Action'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Damage'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Aura: action'});
    assertions.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Aura: was auto created'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Aura: calculates distance from Standard'});

    SelectUtil.changeText('powerSelectAction0', 'Standard');
    assertions.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Aura: setting the action back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Aura: was auto removed'});
    } catch(e){assertions.push({Error: e, Description: 'Aura'});}

    try{
    Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Teleport'); SelectUtil.changeText('powerSelectAction0', 'Triggered');
    assertions.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Add Selective: action'});
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Add Selective: Faster Action was auto created'});
    assertions.push({Expected: 3, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Add Selective: Faster Action rank 3'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Description: 'Add Selective: Selective was auto created'});
    } catch(e){assertions.push({Error: e, Description: 'Add Selective'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Move');
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Keep Selective: action'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Keep Selective: Selective still there'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Keep Selective: no other modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Keep Selective'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Only 1 Selective: Faster Action was auto created'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Description: 'Only 1 Selective: Selective still there'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 2).isBlank(), Description: 'Only 1 Selective: no other modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Only 1 Selective'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature doesn\'t auto gain Faster Action: getAction'});
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature doesn\'t auto gain Faster Action: after'});
    } catch(e){assertions.push({Error: e, Description: 'Feature doesn\'t auto gain Faster Action'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature doesn\'t auto gain Slower Action: after'});
    } catch(e){assertions.push({Error: e, Description: 'Feature doesn\'t auto gain Slower Action'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Feature auto gains Selective: Selective added'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Feature auto gains Selective: no other modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Feature auto gains Selective'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Luck Control'); SelectUtil.changeText('powerSelectAction0', 'Free');
    assertions.push({Expected: 'Luck Control', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Luck Control doesn\'t have Aura: power'});
    assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Luck Control doesn\'t have Aura: free action'});
    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Luck Control doesn\'t have Aura: Slower Action from Reaction (name)'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Luck Control doesn\'t have Aura: Slower Action from Reaction (rank)'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Luck Control doesn\'t have Aura: only modifier'});

    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Luck Control doesn\'t have Aura: Reaction action'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Luck Control doesn\'t have Aura: no modifiers'});
    } catch(e){assertions.push({Error: e, Description: 'Luck Control doesn\'t have Aura'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateActionModifiers', assertions, testState);
};
TestSuite.powerRow.setRange=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"invalid range","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Range does not exist: power was loaded'});
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Range does not exist: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Range does not exist: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Range does not exist: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.setRange.notExist'], Actual: Messages.errorCodes(), Description: 'Range does not exist: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"invalid range","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Range does not exist: power was loaded'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Range does not exist: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Range does not exist: getRange'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Range does not exist: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.setRange.notExist'], Actual: Messages.errorCodes(), Description: 'Feature Range does not exist: error'});

   SelectUtil.changeText('powerChoices0', 'Damage');
   assertions.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change to Perception: power'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to Perception: getRange before'});
   assertions.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change to Perception: getName before'});
   assertions.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change to Perception: getSkillUsed before'});

   SelectUtil.changeText('powerSelectRange0', 'Perception');
   assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to Perception: getRange after'});
   assertions.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change to Perception: getName after'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change to Perception: getSkillUsed after'});

   try{
   SelectUtil.changeText('powerSelectRange0', 'Close');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from Perception: getRange'});
   assertions.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change from Perception: getName'});
   assertions.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change from Perception: getSkillUsed'});
   } catch(e){assertions.push({Error: e, Description: 'Change from Perception'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Protection');
   assertions.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change from personal: power'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from personal: getAction before'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from personal: getRange before'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from personal: getDuration before'});

   SelectUtil.changeText('powerModifierChoices0.0', 'Affects Others Only');
   assertions.push({Expected: 'Affects Others Only', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Change from personal: modifier'});
   assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Change from personal: no other modifiers'});
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from personal: getAction after'});
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from personal: getRange after'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from personal: getDuration after'});
   } catch(e){assertions.push({Error: e, Description: 'Change from personal'});}

   try{
   SelectUtil.changeText('powerSelectAction0', 'Move');
   SelectUtil.changeText('powerSelectDuration0', 'Concentration');
   SelectUtil.changeText('powerModifierChoices0.2', 'Select Modifier');  //removes Affects Others (first 2 are for action and duration)
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to personal changes nothing: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to personal changes nothing: getRange'});
   assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to personal changes nothing: getDuration'});
   } catch(e){assertions.push({Error: e, Description: 'Change to personal changes nothing'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Feature');
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature change from personal: power'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change from personal: getAction before'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change from personal: getRange before'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change from personal: getDuration before'});

   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change from personal: getAction after'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change from personal: getRange after'});
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change from personal: getDuration after'});
   } catch(e){assertions.push({Error: e, Description: 'Feature change from personal'});}

   try{
   Main.powerSection.clear();
   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   SelectUtil.changeText('powerSelectDuration0', 'Concentration');
   SelectUtil.changeText('powerSelectRange0', 'Personal');  //must be last here
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change to personal changes nothing: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change to personal changes nothing: getRange'});
   assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change to personal changes nothing: getDuration'});
   } catch(e){assertions.push({Error: e, Description: 'Feature change to personal changes nothing'});}

   return TestRunner.displayResults('TestSuite.powerRow.setRange', assertions, testState);
};
TestSuite.powerRow.updateRangeModifiers=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Range: before is blank'});
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Range: after is still blank'});
    } catch(e){assertions.push({Error: e, Description: 'Feature does\'t auto gain Increased Range'});}
    //can't test 'Feature does\'t auto gain Decreased Range' because Feature's default range is Personal

    try{
    SelectUtil.changeText('powerChoices0', 'Move Object'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: range'});
    assertions.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Range: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Increased Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: setting the range back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Increased Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Perception'); SelectUtil.changeText('powerSelectRange0', 'Close');
    assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: setting range up then down'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Range: was auto replaced with Reduced Range'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Increased Range: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Increased Range'});}

    try{
    SelectUtil.changeText('powerSelectRange0', 'Close');
    assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: range'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Reduced Range: was auto created'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Reduced Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: setting the range back'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Reduced Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Close'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    assertions.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: setting range down then up'});
    assertions.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Reduced Range: was auto replaced with Increased Range'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Reduced Range: was in fact removed'});
    } catch(e){assertions.push({Error: e, Description: 'Reduced Range'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateRangeModifiers', assertions, testState);
};
TestSuite.powerRow.calculateValues=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    try{
    SelectUtil.changeText('powerChoices0', 'Variable');
    DomUtil.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Area');
    assertions.push({Expected: 16, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank extras increase cost/rank'});
    } catch(e){assertions.push({Error: e, Description: 'Rank extras'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Variable');
    DomUtil.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
    assertions.push({Expected: 12, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank flaws reduce cost/rank'});

    SelectUtil.changeText('powerChoices0', 'Damage');
    DomUtil.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank flaws can reduce to fraction'});

    DomUtil.changeValue('powerRank0', 3);
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Total cost rounds up'});

    DomUtil.changeValue('powerRank0', 100);
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    DomUtil.changeValue('powerModifierRank0.0', 100);
    assertions.push({Expected: 20, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank flaws min of 1/5'});
    } catch(e){assertions.push({Error: e, Description: 'Rank flaws'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    DomUtil.changeValue('powerModifierRank0.0', 6);
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'v3.4 Variable has no min cost'});

    Main.setRuleset(3,5);
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    DomUtil.changeValue('powerModifierRank0.0', 6);
    assertions.push({Expected: 5, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'v3.5 Variable has a min cost of 5/rank'});
    } catch(e){assertions.push({Error: e, Description: 'Variable min cost'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Damage');
    DomUtil.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Area');
    SelectUtil.changeText('powerModifierChoices0.1', 'Accurate');
    assertions.push({Expected: 5, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Flat Extras add to cost after ranks'});
    } catch(e){assertions.push({Error: e, Description: 'Flat Extras'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Damage');
    DomUtil.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Area');
    SelectUtil.changeText('powerModifierChoices0.1', 'Inaccurate');
    assertions.push({Expected: 3, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Flat flaws reduce cost after ranks'});

    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerModifierChoices0.0', 'Inaccurate');
    DomUtil.changeValue('powerModifierRank0.0', 3);
    assertions.push({Expected: 4, Actual: Main.powerSection.getRow(0).getRank(), Description: 'Flat flaws may increase ranks'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Flat flaws retains total of 1'});
    } catch(e){assertions.push({Error: e, Description: 'Flat flaws'});}

    try{
    Main.powerSection.clear();
    //Main.setRuleset(3,5);
    DomUtil.changeValue('Strength', 100);
    SelectUtil.changeText('powerChoices0', 'A God I Am');
    DomUtil.changeValue('powerRank0', 2);
    assertions.push({Expected: 155, Actual: Main.powerSection.getRow(0).getTotal(), Description: '2 ranks: A God I Am'});

    SelectUtil.changeText('powerChoices0', 'Reality Warp');
    DomUtil.changeValue('powerRank0', 2);
    assertions.push({Expected: 85, Actual: Main.powerSection.getRow(0).getTotal(), Description: '2 ranks: Reality Warp'});
    } catch(e){assertions.push({Error: e, Description: 'Odd first rank values'});}

    return TestRunner.displayResults('TestSuite.powerRow.calculateValues', assertions, testState);
};
TestSuite.powerRow.generate=function(testState={})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   /*2 different values for each to show they aren't hard coded.
   check DOM to show that it's passed to HTML*/
   SelectUtil.changeText('powerChoices0', 'Damage');
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Move'), Description: 'Possible Actions 1'});
   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerSelectAction0', 'Move'), Description: 'Possible Actions 2'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerSelectRange0', 'Personal'), Description: 'Possible Ranges 1'});
   SelectUtil.changeText('powerChoices0', 'Damage');
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectRange0', 'Personal'), Description: 'Possible Ranges 2'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push(
      {Expected: true, Actual: SelectUtil.containsText('powerSelectDuration0', 'Permanent'), Description: 'Possible Durations 1'});
   SelectUtil.changeText('powerChoices0', 'Create');
   assertions.push(
      {Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Permanent'), Description: 'Possible Durations 2'});

   return TestRunner.displayResults('TestSuite.powerRow.generate', assertions, testState);
};
TestSuite.powerRow.generateNameAndSkill=function(testState={})
{
   TestRunner.clearResults(testState);

   const assertions=[];
   try{
      SelectUtil.changeText('powerChoices0', 'Damage');
      assertions.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Default name 1'});
      assertions.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Default skill 1'});
      SelectUtil.changeText('powerChoices1', 'Affliction');
      assertions.push({Expected: 'Power 2 Affliction', Actual: Main.powerSection.getRow(1).getName(), Description: 'Default name 2'});
      SelectUtil.changeText('equipmentChoices0', 'Nullify');
      assertions.push({Expected: 'Equipment 1 Nullify', Actual: Main.equipmentSection.getRow(0).getName(), Description: 'Default name 3'});
      assertions.push({Expected: 'Skill used for attack', Actual: Main.equipmentSection.getRow(0).getSkillUsed(), Description: 'Default skill 2'});
   } catch(e){assertions.push({Error: e, Description: 'Default name and skill'});}

   try{
      Main.clear();
      Main.setRuleset(3,4);
      SelectUtil.changeText('powerChoices0', 'Flight');
      assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'No name'});
      assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'No skill'});

      SelectUtil.changeText('powerChoices0', 'Damage');
      SelectUtil.changeText('powerSelectAction0', 'Reaction');
      assertions.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Default name'});
      assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Aura has no skill'});
      SelectUtil.changeText('powerSelectAction0', 'Standard');
      SelectUtil.changeText('powerSelectRange0', 'Perception');
      assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Perception has no skill'});
   } catch(e){assertions.push({Error: e, Description: 'No name or skill'});}

   return TestRunner.displayResults('TestSuite.powerRow.generateNameAndSkill', assertions, testState);
};
