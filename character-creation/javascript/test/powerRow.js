'use strict';
TestSuite.powerRow={};
TestSuite.powerRow.disableValidationForActivationInfo=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];
   //these tests are things that wouldn't be valid if loaded in order: action, range, duration

   Main.setRuleset(3,3);
   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Personal to close Range: Effect'});
   testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Personal to close Range: 1 row'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Personal to close Range: getRange'});
   } catch(e){testResults.push({Error: e, Description: 'Personal to close Range'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent",
      "Modifiers":[{"name":"Increased Duration","applications":2}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Action None: Effect'});
   testResults.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Action None: 1 row'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Action None: getAction'});
   } catch(e){testResults.push({Error: e, Description: 'Action None'});}

   return TestRunner.displayResults('TestSuite.powerRow.disableValidationForActivationInfo', testResults, isFirst);
};
TestSuite.powerRow.updateActivationModifiers=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Move","range":"Ranged","duration":"Sustained",
      "Modifiers":[{"name":"Slower Action"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'updateActionModifiers: action'});
   testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'updateActionModifiers: modifier'});
   testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'updateActionModifiers: no more modifiers'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'updateActionModifiers: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Increased Range"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'updateRangeModifiers: action'});
   testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'updateRangeModifiers: modifier'});
   testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'updateRangeModifiers: no more modifiers'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'updateRangeModifiers: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Continuous",
      "Modifiers":[{"name":"Decreased Duration"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'updateDurationModifiers: action'});
   testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'updateDurationModifiers: modifier'});
   testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'updateDurationModifiers: no more modifiers'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'updateDurationModifiers: error'});

   return TestRunner.displayResults('TestSuite.powerRow.disableValidationForActivationInfo', testResults, isFirst);
};
TestSuite.powerRow.validateActivationInfo=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 happy reaction Damage: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.4 happy reaction Damage: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Luck Control","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 ranged Luck Control reaction: action'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 ranged Luck Control reaction: range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.4 ranged Luck Control reaction: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 ranged Feature reaction: action'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 ranged Feature reaction: range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.4 ranged Feature reaction: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 ranged Damage reaction: action'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 ranged Damage reaction: range'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose'], Actual: Messages.errorCodes(), Description: 'v3.4 ranged Damage reaction: error'});

   Main.setRuleset(3,3);
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 range Damage action Reaction'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Reaction Damage allows ranged range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 range Reaction Damage allows ranged range: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfo', testResults, isFirst);
};
TestSuite.powerRow.validateActivationInfo_valid=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.4 allows reaction: power'});
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 allows reaction: getAction'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 allows reaction: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.4 allows reaction: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.4 allows reaction: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 1: power was loaded'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 1: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 1: getRange'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 1: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 1: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 2: power was loaded'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 2: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 2: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 2: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 2: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 3: power was loaded'});
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 3: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 3: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 3: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 3: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 4: power was loaded'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 4: getAction'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 4: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 4: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 4: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Valid 5: power was loaded'});
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Valid 5: getAction'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Valid 5: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Valid 5: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Feature Valid 5: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature v3.4 allows reaction: power'});
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature v3.4 allows reaction: getAction'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature v3.4 allows reaction: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature v3.4 allows reaction: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Feature v3.4 allows reaction: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Luck Control","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Luck Control', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Luck Control v3.4 allows reaction: power'});
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Luck Control v3.4 allows reaction: getAction'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Luck Control v3.4 allows reaction: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Luck Control v3.4 allows reaction: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Luck Control v3.4 allows reaction: no errors'});

   Main.setRuleset(3,3);
   //most of these tests will have modifiers because they should be ignored and recreated

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 1: power was loaded'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 1: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 1: getRange'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 1: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Valid 1: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 2: power was loaded'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 2: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 2: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 2: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Valid 2: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 3: power was loaded'});
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 3: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 3: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 3: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Valid 3: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 4: power was loaded'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 4: getAction'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 4: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 4: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Valid 4: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Move","range":"Close","duration":"Instant",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Valid 5: power was loaded'});
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Valid 5: getAction'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Valid 5: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Valid 5: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Valid 5: no errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Teleport","text":"","action":"Reaction","range":"Ranged","duration":"Instant",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Teleport', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.3 allows reaction: power was loaded'});
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 allows reaction: getAction'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 allows reaction: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.3 allows reaction: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 allows reaction: no errors'});

   return TestRunner.displayResults('TestSuite.powerRow.validateActivationInfo_valid', testResults, isFirst);
};
TestSuite.powerRow.validateAndGetPossibleActions=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'None action happy: getAction'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'None action happy: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'None action happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'None action happy Feature: getAction'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'None action happy Feature: getDuration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'None action happy Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change action to none: getAction'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change action to none: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'], Actual: Messages.errorCodes(), Description: 'Change action to none: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'onlyNone Feature: getAction'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'onlyNone Feature: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'], Actual: Messages.errorCodes(), Description: 'onlyNone Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'notNone: getAction'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notNone: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.notNone'], Actual: Messages.errorCodes(), Description: 'notNone: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"None","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'notNone Feature: getAction'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notNone Feature: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.notNone'], Actual: Messages.errorCodes(), Description: 'notNone Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Growth","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Move action happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Move action happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'moveNotAllowed isAttack: action'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed'], Actual: Messages.errorCodes(), Description: 'moveNotAllowed isAttack: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Move Object","text":"","action":"Move","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'move action Move Object: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'move action Move Object: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Free action happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Free action happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'freeNotAllowedForAttacks: action'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForAttacks: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'freeNotAllowedForMovement: action'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForMovement: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'freeNotAllowedForHealing: action'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing'], Actual: Messages.errorCodes(), Description: 'freeNotAllowedForHealing: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Move Object","text":"","action":"Free","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'free action Move Object: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'free action Move Object: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Reaction","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Reaction happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Reaction happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Reaction","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'reactionNotAllowed: action'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed'], Actual: Messages.errorCodes(), Description: 'reactionNotAllowed: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Move","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Move Feature happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Move Feature happy: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Free Feature happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Free Feature happy: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Reaction","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Reaction Feature happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Reaction Feature happy: error'});

   Main.setRuleset(3,3);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Move","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 move isAttack happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 move isAttack happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 free isAttack happy: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 free isAttack happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 Free isMovement: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 Free isMovement: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Free","range":"Close","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 Free Healing: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 Free Healing: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Reaction","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 Reaction Flight: action'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'v3.3 Reaction Flight: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateAndGetPossibleActions', testResults, isFirst);
};
TestSuite.powerRow.validateAndGetPossibleDurations=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Instant happy: duration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Instant happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'onlyInstant: duration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant'], Actual: Messages.errorCodes(), Description: 'onlyInstant: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notPermanent: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Immunity","text":"","action":"Standard","range":"Close","duration":"Permanent",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notPermanent default Permanent: Duration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent default Permanent: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notPermanent Feature: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent'], Actual: Messages.errorCodes(), Description: 'notPermanent Feature: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Standard","range":"Ranged","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Instant Feature happy: duration'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Instant Feature happy: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Standard","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'notInstant: Duration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant'], Actual: Messages.errorCodes(), Description: 'notInstant: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validateAndGetPossibleDurations', testResults, isFirst);
};
TestSuite.powerRow.validatePersonalRange=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'range Feature allows close range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'range Feature allows close range: error'});
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'range Feature allows Personal range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'range Feature allows Personal range: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"Standard","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Create', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Can\'t change to personal: power was loaded'});
   testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Can\'t change to personal: getAction'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Can\'t change to personal: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Can\'t change to personal: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.validatePersonalRange.notPersonal'], Actual: Messages.errorCodes(), Description: 'Can\'t change to personal: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Flight forced to be personal range'});
   testResults.push({Expected: ['PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed'], Actual: Messages.errorCodes(), Description: 'range Personal Flight can\'t change range: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Only"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'ranged Flight with modifier allowed: range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'ranged Flight with modifier allowed: error'});

   return TestRunner.displayResults('TestSuite.powerRow.validatePersonalRange', testResults, isFirst);
};
TestSuite.powerRow.setAction=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);
   var dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Create","text":"","action":"invalid action","range":"Ranged","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Action does not exist: getAction'});
   testResults.push({Expected: ['PowerObjectAgnostic.setAction.notExist'], Actual: Messages.errorCodes(), Description: 'Action does not exist: error'});

    try{
    Main.setRuleset(3, 3);
    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v2.7 Reaction Damage doesn\'t become close range: power'});
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v2.7 Reaction Damage doesn\'t become close range: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v2.7 Reaction Damage doesn\'t become close range: getRange'});
    } catch(e){testResults.push({Error: e, Description: 'v2.7 Reaction Damage doesn\'t become close range'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.4 Reaction Damage becomes close range: power'});
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Reaction Damage becomes close range: getAction'});
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Reaction Damage becomes close range: getRange'});
    } catch(e){testResults.push({Error: e, Description: 'v3.4 Reaction Damage becomes close range'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'v3.4 Reaction Feature doesn\'t become close range: power'});
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Reaction Feature doesn\'t become close range: getAction'});
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Reaction Feature doesn\'t become close range: getRange'});
    } catch(e){testResults.push({Error: e, Description: 'v3.4 Reaction Feature doesn\'t become close range'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Luck Control');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Luck Control starts as ranged: getAction'});
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Luck Control starts as ranged: getRange'});

    SelectUtil.changeText('powerSelectAction0', 'Free');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Luck Control changed to Free'});
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 Luck Control doesn\'t become close range: getAction'});
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 Luck Control doesn\'t become close range: getRange'});
    } catch(e){testResults.push({Error: e, Description: 'v3.4 Luck Control not close range'});}

    return TestRunner.displayResults('TestSuite.powerRow.setAction', testResults, isFirst);
};
TestSuite.powerRow.setDuration=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);
   var dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Protection","text":"","action":"None","range":"Personal","duration":"invalid duration","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration does not exist: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.setDuration.notExist'], Actual: Messages.errorCodes(), Description: 'Duration does not exist: error'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Instant');
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change to Instant: power'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change to Instant: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change to Instant: getRange'});
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change to Instant: getDuration'});

   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Can change from Instant: power'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Can change from Instant: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Can change from Instant: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Can change from Instant: getDuration'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change to permanent (non-permanent default): power'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to permanent (non-permanent default): getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to permanent (non-permanent default): getRange'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to permanent (non-permanent default): getDuration'});

   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from permanent (non-permanent default): getAction'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from permanent (non-permanent default): getDuration'});

   SelectUtil.changeText('powerChoices0', 'Protection');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change from permanent (permanent default): power'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from permanent (permanent default): getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from permanent (permanent default): getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from permanent (permanent default): getDuration'});

   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to permanent (permanent default): getAction'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to permanent (permanent default): getDuration'});

   return TestRunner.displayResults('TestSuite.powerRow.setDuration', testResults, isFirst);
};
TestSuite.powerRow.updateDurationModifiers=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature does\'t auto gain Increased Duration: getDuration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Duration: after is still blank'});
    } catch(e){testResults.push({Error: e, Description: 'Feature does\'t auto gain Increased Duration'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Decreased Duration: before is blank'});
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Decreased Duration: after is still blank'});
    } catch(e){testResults.push({Error: e, Description: 'Feature does\'t auto gain Decreased Duration'});}

    try{
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: duration'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Duration: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Increased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: setting the duration back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Increased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Continuous'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Increased Duration: setting duration up then down'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Duration: was auto replaced with Decreased Duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Increased Duration: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Increased Duration'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Flight'); SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: duration'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Decreased Duration: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Decreased Duration: is rank 1'});

    SelectUtil.changeText('powerSelectDuration0', 'Sustained');
    testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: setting the duration back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Decreased Duration: was auto removed'});

    SelectUtil.changeText('powerSelectDuration0', 'Concentration'); SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    testResults.push({Expected: 'Continuous', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Decreased Duration: setting duration up then down'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Decreased Duration: was auto replaced with Increased Duration'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Decreased Duration: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Decreased Duration'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateDurationModifiers', testResults, isFirst);
};
TestSuite.powerRow.setPower=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    try{
    SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: 'Equipment Row is not created'});}

    return TestRunner.displayResults('TestSuite.powerRow.setPower', testResults, isFirst);
};
TestSuite.powerRow.updateActionModifiers=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    //testing for setting to None exists in setDuration tests
    var testResults=[];

    try{
    Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Teleport'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Action: action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Faster Action: was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Faster Action: rank'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Action: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Faster Action: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Reaction'); SelectUtil.changeText('powerSelectAction0', 'Full');
    testResults.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Faster Action: setting action up then down'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Faster Action: was auto replaced with Slower Action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Faster Action: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Faster Action'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Full');
    testResults.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Action: action'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Slower Action: was auto created'});
    testResults.push({Expected: 2, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Slower Action: is rank 1'});

    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Action: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Slower Action: was auto removed'});

    SelectUtil.changeText('powerSelectAction0', 'Full'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Slower Action: setting action down then up'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Slower Action: was auto replaced with Faster Action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Slower Action: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Slower Action'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Damage'); SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Aura: action'});
    testResults.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Aura: was auto created'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Aura: calculates distance from Standard'});

    SelectUtil.changeText('powerSelectAction0', 'Standard');
    testResults.push({Expected: 'Standard', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Aura: setting the action back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Aura: was auto removed'});
    } catch(e){testResults.push({Error: e, Description: 'Aura'});}

    try{
    Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Teleport'); SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Triggered', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Add Selective: action'});
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Add Selective: Faster Action was auto created'});
    testResults.push({Expected: 3, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Add Selective: Faster Action rank 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Description: 'Add Selective: Selective was auto created'});
    } catch(e){testResults.push({Error: e, Description: 'Add Selective'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Move');
    testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Keep Selective: action'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Keep Selective: Selective still there'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Keep Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Keep Selective'});}

    try{
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Only 1 Selective: Faster Action was auto created'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 1).getName(), Description: 'Only 1 Selective: Selective still there'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 2).isBlank(), Description: 'Only 1 Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Only 1 Selective'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature doesn\'t auto gain Faster Action: getAction'});
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature doesn\'t auto gain Faster Action: after'});
    } catch(e){testResults.push({Error: e, Description: 'Feature doesn\'t auto gain Faster Action'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature doesn\'t auto gain Slower Action: after'});
    } catch(e){testResults.push({Error: e, Description: 'Feature doesn\'t auto gain Slower Action'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Triggered');
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Feature auto gains Selective: Selective added'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Feature auto gains Selective: no other modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Feature auto gains Selective'});}

    try{
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Luck Control'); SelectUtil.changeText('powerSelectAction0', 'Free');
    testResults.push({Expected: 'Luck Control', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Luck Control doesn\'t have Aura: power'});
    testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Luck Control doesn\'t have Aura: free action'});
    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Luck Control doesn\'t have Aura: Slower Action from Reaction (name)'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Luck Control doesn\'t have Aura: Slower Action from Reaction (rank)'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Luck Control doesn\'t have Aura: only modifier'});

    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Luck Control doesn\'t have Aura: Reaction action'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Luck Control doesn\'t have Aura: no modifiers'});
    } catch(e){testResults.push({Error: e, Description: 'Luck Control doesn\'t have Aura'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateActionModifiers', testResults, isFirst);
};
TestSuite.powerRow.setRange=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"invalid range","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Range does not exist: power was loaded'});
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Range does not exist: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Range does not exist: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Range does not exist: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.setRange.notExist'], Actual: Messages.errorCodes(), Description: 'Range does not exist: error'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"invalid range","duration":"Sustained","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Range does not exist: power was loaded'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Range does not exist: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Range does not exist: getRange'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Range does not exist: getDuration'});
   testResults.push({Expected: ['PowerObjectAgnostic.setRange.notExist'], Actual: Messages.errorCodes(), Description: 'Feature Range does not exist: error'});

   SelectUtil.changeText('powerChoices0', 'Damage');
   testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change to Perception: power'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to Perception: getRange before'});
   testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change to Perception: getName before'});
   testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change to Perception: getSkillUsed before'});

   SelectUtil.changeText('powerSelectRange0', 'Perception');
   testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to Perception: getRange after'});
   testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change to Perception: getName after'});
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change to Perception: getSkillUsed after'});

   try{
   SelectUtil.changeText('powerSelectRange0', 'Close');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from Perception: getRange'});
   testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Change from Perception: getName'});
   testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Change from Perception: getSkillUsed'});
   } catch(e){testResults.push({Error: e, Description: 'Change from Perception'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Protection');
   testResults.push({Expected: 'Protection', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Change from personal: power'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from personal: getAction before'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from personal: getRange before'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from personal: getDuration before'});

   SelectUtil.changeText('powerModifierChoices0.0', 'Affects Others Only');
   testResults.push({Expected: 'Affects Others Only', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Change from personal: modifier'});
   testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Change from personal: no other modifiers'});
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change from personal: getAction after'});
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change from personal: getRange after'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change from personal: getDuration after'});
   } catch(e){testResults.push({Error: e, Description: 'Change from personal'});}

   try{
   SelectUtil.changeText('powerSelectAction0', 'Move');
   SelectUtil.changeText('powerSelectDuration0', 'Concentration');
   SelectUtil.changeText('powerModifierChoices0.2', 'Select One');  //removes Affects Others (first 2 are for action and duration)
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Change to personal changes nothing: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Change to personal changes nothing: getRange'});
   testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Change to personal changes nothing: getDuration'});
   } catch(e){testResults.push({Error: e, Description: 'Change to personal changes nothing'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Feature');
   testResults.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature change from personal: power'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change from personal: getAction before'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change from personal: getRange before'});
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change from personal: getDuration before'});

   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change from personal: getAction after'});
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change from personal: getRange after'});
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change from personal: getDuration after'});
   } catch(e){testResults.push({Error: e, Description: 'Feature change from personal'});}

   try{
   Main.powerSection.clear();
   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   SelectUtil.changeText('powerSelectDuration0', 'Concentration');
   SelectUtil.changeText('powerSelectRange0', 'Personal');  //must be last here
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature change to personal changes nothing: getAction'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature change to personal changes nothing: getRange'});
   testResults.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature change to personal changes nothing: getDuration'});
   } catch(e){testResults.push({Error: e, Description: 'Feature change to personal changes nothing'});}

   return TestRunner.displayResults('TestSuite.powerRow.setRange', testResults, isFirst);
};
TestSuite.powerRow.updateRangeModifiers=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Feature');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Range: before is blank'});
    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Feature does\'t auto gain Increased Range: after is still blank'});
    } catch(e){testResults.push({Error: e, Description: 'Feature does\'t auto gain Increased Range'});}
    //can't test 'Feature does\'t auto gain Decreased Range' because Feature's default range is Personal

    try{
    SelectUtil.changeText('powerChoices0', 'Move Object'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: range'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Range: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Increased Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: setting the range back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Increased Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Perception'); SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Increased Range: setting range up then down'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Increased Range: was auto replaced with Reduced Range'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Increased Range: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Increased Range'});}

    try{
    SelectUtil.changeText('powerSelectRange0', 'Close');
    testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: range'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Reduced Range: was auto created'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0, 0).getRank(), Description: 'Reduced Range: is rank 1'});

    SelectUtil.changeText('powerSelectRange0', 'Ranged');
    testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: setting the range back'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 0).isBlank(), Description: 'Reduced Range: was auto removed'});

    SelectUtil.changeText('powerSelectRange0', 'Close'); SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: 'Perception', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Reduced Range: setting range down then up'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Reduced Range: was auto replaced with Increased Range'});
    testResults.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Reduced Range: was in fact removed'});
    } catch(e){testResults.push({Error: e, Description: 'Reduced Range'});}

    return TestRunner.displayResults('TestSuite.powerRow.updateRangeModifiers', testResults, isFirst);
};
TestSuite.powerRow.calculateValues=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    try{
    SelectUtil.changeText('powerChoices0', 'Variable');
    TestRunner.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Area');
    testResults.push({Expected: 16, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank extras increase cost/rank'});
    } catch(e){testResults.push({Error: e, Description: 'Rank extras'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Variable');
    TestRunner.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
    testResults.push({Expected: 12, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank flaws reduce cost/rank'});

    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
    testResults.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank flaws can reduce to fraction'});

    TestRunner.changeValue('powerRank0', 3);
    testResults.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Total cost rounds up'});

    TestRunner.changeValue('powerRank0', 100);
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    TestRunner.changeValue('powerModifierRank0.0', 100);
    testResults.push({Expected: 20, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Rank flaws min of 1/5'});
    } catch(e){testResults.push({Error: e, Description: 'Rank flaws'});}

    try{
    Main.powerSection.clear();
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    TestRunner.changeValue('powerModifierRank0.0', 6);
    testResults.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'v3.4 Variable has no min cost'});

    Main.powerSection.clear();
    Main.setRuleset(3,5);
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    TestRunner.changeValue('powerModifierRank0.0', 6);
    testResults.push({Expected: 5, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'v3.5 Variable has a min cost of 5/rank'});
    } catch(e){testResults.push({Error: e, Description: 'Variable min cost'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Area');
    SelectUtil.changeText('powerModifierChoices0.1', 'Accurate');
    testResults.push({Expected: 5, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Flat Extras add to cost after ranks'});
    } catch(e){testResults.push({Error: e, Description: 'Flat Extras'});}

    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Area');
    SelectUtil.changeText('powerModifierChoices0.1', 'Inaccurate');
    testResults.push({Expected: 3, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Flat flaws reduce cost after ranks'});

    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerModifierChoices0.0', 'Inaccurate');
    TestRunner.changeValue('powerModifierRank0.0', 3);
    testResults.push({Expected: 4, Actual: Main.powerSection.getRow(0).getRank(), Description: 'Flat flaws may increase ranks'});
    testResults.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Flat flaws retains total of 1'});
    } catch(e){testResults.push({Error: e, Description: 'Flat flaws'});}

    try{
    Main.powerSection.clear();
    //Main.setRuleset(3,5);
    TestRunner.changeValue('Strength', 100);
    SelectUtil.changeText('powerChoices0', 'A God I Am');
    TestRunner.changeValue('powerRank0', 2);
    testResults.push({Expected: 155, Actual: Main.powerSection.getRow(0).getTotal(), Description: '2 ranks: A God I Am'});

    SelectUtil.changeText('powerChoices0', 'Reality Warp');
    TestRunner.changeValue('powerRank0', 2);
    testResults.push({Expected: 85, Actual: Main.powerSection.getRow(0).getTotal(), Description: '2 ranks: Reality Warp'});
    } catch(e){testResults.push({Error: e, Description: 'Odd first rank values'});}

    return TestRunner.displayResults('TestSuite.powerRow.calculateValues', testResults, isFirst);
};
TestSuite.powerRow.generate=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   //ADD TESTS: for power options specifically godhood
   //ADD TESTS: non-if statements
   //ADD TESTS: blank row

   try{
   SelectUtil.changeText('powerChoices0', 'Flight');
   testResults.push({Expected: 'SPAN', Actual: document.getElementById('powerBaseCost0').tagName, Description: 'Fixed base cost for flight'});

   SelectUtil.changeText('powerChoices0', 'Movement');
   testResults.push({Expected: 'INPUT', Actual: document.getElementById('powerBaseCost0').tagName, Description: 'input base cost for movement'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   testResults.push({Expected: 'INPUT', Actual: document.getElementById('powerBaseCost0').tagName, Description: 'input base cost for feature'});
   } catch(e){testResults.push({Error: e, Description: 'input base cost'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Flight');
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'None action: duration = permanent'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'None action: action = none'});
   testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectAction0'), Description: 'None action: The user can\'t change the action'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature None action: duration = permanent'});
   testResults.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature None action: action = none'});
   testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectAction0'), Description: 'Feature None action: The user can\'t change the action'});
   } catch(e){testResults.push({Error: e, Description: 'None action'});}

   try{
   Main.setRuleset(3,3);
   SelectUtil.changeText('powerChoices0', 'Damage');  //isAttack
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows move Damage'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows free Damage'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Reaction Damage'});

   SelectUtil.changeText('powerChoices0', 'Flight');  //isMovement
   SelectUtil.changeText('powerSelectAction0', 'Standard');  //only here for onchange which isn't important
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Move Flight'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Flight'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Reaction Flight'});

   SelectUtil.changeText('powerChoices0', 'Move Object');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows move Move Object'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows free Move Object'});

   SelectUtil.changeText('powerChoices0', 'Healing');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows move Healing'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Healing'});

   SelectUtil.changeText('powerChoices0', 'Growth');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Move Growth'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Growth'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.3 action Feature duration Sustained'});
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Move Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Reaction Feature'});
   } catch(e){testResults.push({Error: e, Description: 'v3.3 action'});}

   try{
   Main.setRuleset(3,4);
   SelectUtil.changeText('powerChoices0', 'Damage');  //isAttack
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Move'), Description: 'v3.4 action prevents move Damage'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Free'), Description: 'v3.4 action prevents free Damage'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Reaction Damage'});

   SelectUtil.changeText('powerChoices0', 'Flight');  //isMovement
   SelectUtil.changeText('powerSelectAction0', 'Standard');  //only here for onchange which isn't important
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Move Flight'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Free'), Description: 'v3.4 action prevents Free Flight'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Reaction'), Description: 'v3.4 action prevents Reaction Flight'});

   SelectUtil.changeText('powerChoices0', 'Move Object');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows move Move Object'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows free Move Object'});

   SelectUtil.changeText('powerChoices0', 'Healing');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows move Healing'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Free'), Description: 'v3.4 action prevents free Healing'});

   SelectUtil.changeText('powerChoices0', 'Growth');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Move Growth'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Free Growth'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.4 action Feature duration Sustained'});
   SelectUtil.changeText('powerSelectAction0', 'Move');
   testResults.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Move Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   testResults.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Free Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Reaction Feature'});
   } catch(e){testResults.push({Error: e, Description: 'v3.4 action'});}

   try{
   Main.setRuleset(3,3);
   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.3 range Feature duration Sustained'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Feature allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Personal');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Feature allows Personal range'});
   testResults.push({Expected: true, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.3 Personal Flight can change range'});

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 range Damage action Reaction'});
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Reaction Damage allows ranged range'});

   SelectUtil.changeText('powerChoices0', 'Luck Control');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 range Luck Control default action reaction'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Luck Control allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Luck Control allows Ranged range'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Flight default range personal'});
   testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.3 range Personal Flight can\'t change range'});
   } catch(e){testResults.push({Error: e, Description: 'v3.3 range'});}

   try{
   Main.setRuleset(3,4);
   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.4 range Feature duration Sustained'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Feature allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Personal');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Feature allows Personal range'});
   testResults.push({Expected: true, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.3 Personal Flight can change range'});

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 range Damage action Reaction'});
   testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.4 range Damage requires close range'});

   SelectUtil.changeText('powerChoices0', 'Luck Control');
   testResults.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 range Luck Control default action reaction'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Luck Control allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   testResults.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Luck Control allows Ranged range'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Flight default range personal'});
   testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.4 range Personal Flight can\'t change range'});
   } catch(e){testResults.push({Error: e, Description: 'v3.4 range'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Damage');
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: Damage default duration Instant'});
   testResults.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectDuration0'), Description: 'Duration: can\'t change duration'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: feature can change to Sustained'});
   SelectUtil.changeText('powerSelectDuration0', 'Instant');
   testResults.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: feature can change to Instant'});
   testResults.push({Expected: true, Actual: SelectUtil.isSelect('powerSelectDuration0'), Description: 'Duration: Instant feature can change back'});
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: Feature default range personal'});
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: personal feature can change to Permanent'});
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: feature change back'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: feature set close range'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Permanent'), Description: 'Duration: close feature can\'t be Permanent'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: Flight default range personal'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Instant'), Description: 'Duration: flight can\'t be Instant'});
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: flight can change to Sustained'});
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   testResults.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: flight can change to Permanent'});
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   testResults.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: flight change back'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Affects Others Also');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: flight has close range'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Permanent'), Description: 'Duration: close flight can\'t be Permanent'});
   testResults.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Instant'), Description: 'Duration: close flight can\'t be Instant'});
   } catch(e){testResults.push({Error: e, Description: 'Duration'});}

   //ADD TESTS: Data.Power[effect].isAttack
   //TODO: TestSuite sections should exist for generate and set all so that the gui logic is tested

   return TestRunner.displayResults('TestSuite.powerRow.generate', testResults, isFirst);
};
TestSuite.powerRow.generateNameAndSkill=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];
    try{
    SelectUtil.changeText('powerChoices0', 'Damage');
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Default name 1'});
    testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Default skill 1'});
    SelectUtil.changeText('powerChoices1', 'Affliction');
    testResults.push({Expected: 'Power 2 Affliction', Actual: Main.powerSection.getRow(1).getName(), Description: 'Default name 2'});
    SelectUtil.changeText('equipmentChoices0', 'Nullify');
    testResults.push({Expected: 'Equipment 1 Nullify', Actual: Main.equipmentSection.getRow(0).getName(), Description: 'Default name 3'});
    testResults.push({Expected: 'Skill used for attack', Actual: Main.equipmentSection.getRow(0).getSkillUsed(), Description: 'Default skill 2'});
    } catch(e){testResults.push({Error: e, Description: 'Default name and skill'});}

    try{
    Main.clear();
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Flight');
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'No name'});
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'No skill'});

    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    testResults.push({Expected: 'Power 1 Damage', Actual: Main.powerSection.getRow(0).getName(), Description: 'Default name'});
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Aura has no skill'});
    SelectUtil.changeText('powerSelectAction0', 'Standard');
    SelectUtil.changeText('powerSelectRange0', 'Perception');
    testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Perception has no skill'});
    } catch(e){testResults.push({Error: e, Description: 'No name or skill'});}

    return TestRunner.displayResults('TestSuite.powerRow.generateNameAndSkill', testResults, isFirst);
};
TestSuite.powerRow.setValues=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    //ADD TESTS
    var testResults=[];
    try{
    Main.powerSection.clear();
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
    testResults.push({Expected: '6', Actual: document.getElementById('powerTotalCostPerRank0').innerHTML, Description: 'Rank flaws reduce cost/rank'});

    SelectUtil.changeText('powerChoices0', 'Damage');
    SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
    testResults.push({Expected: '(1/2)', Actual: document.getElementById('powerTotalCostPerRank0').innerHTML, Description: 'Displays fractional Rank flaws'});

    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    TestRunner.changeValue('powerModifierRank0.0', 100);
    testResults.push({Expected: '(1/5)', Actual: document.getElementById('powerTotalCostPerRank0').innerHTML, Description: 'Rank flaws min of 1/5'});
    } catch(e){testResults.push({Error: e, Description: 'Rank flaws'});}

    try{
    Main.powerSection.clear();
    Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    TestRunner.changeValue('powerModifierRank0.0', 6);
    testResults.push({Expected: '1', Actual: document.getElementById('powerTotalCostPerRank0').innerHTML, Description: 'v3.4 Variable has no min cost'});

    Main.powerSection.clear();
    Main.setRuleset(3,5);
    SelectUtil.changeText('powerChoices0', 'Variable');
    SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
    TestRunner.changeValue('powerModifierRank0.0', 6);
    testResults.push({Expected: '5', Actual: document.getElementById('powerTotalCostPerRank0').innerHTML, Description: 'v3.5 Variable has a min cost of 5/rank'});
    } catch(e){testResults.push({Error: e, Description: 'Variable min cost'});}

    return TestRunner.displayResults('TestSuite.powerRow.setValues', testResults, isFirst);
};
