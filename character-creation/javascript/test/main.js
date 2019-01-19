'use strict';
TestSuite.main={};
TestSuite.main.changeRuleset=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var rulesetElement = document.getElementById('ruleset');
    var latestRuleString = Main.getLatestRuleset().toString();

    TestRunner.changeValue('ruleset', latestRuleString);
    //unfortunately I can't test the default values because by test runner resets the version every test
    //it needs to do this so that a test for 1.0 doesn't mess up a test for 2.7
    //assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Default ActiveRuleset is LatestRuleset'});
    //assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Default value of element'});

    try{
    TestRunner.changeValue('ruleset', '');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Empty: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Empty: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Empty'});}

    try{
    TestRunner.changeValue('ruleset', '   ');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Blank: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Blank: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Blank'});}

    try{
    TestRunner.changeValue('ruleset', 'zasduiasdhui');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Invalid: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Invalid: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Invalid'});}

    try{
    TestRunner.changeValue('ruleset', 'v2.0');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Typo v2.0: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Typo v2.0: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Typo v2.0'});}

    try{
    TestRunner.changeValue('ruleset', '0');
    assertions.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Zero: ActiveRuleset 0 -> 1.0'});
    assertions.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Zero: Element 0 -> 1.0'});
    } catch(e){assertions.push({Error: e, Description: 'Zero'});}

    try{
    TestRunner.changeValue('ruleset', '-2.0');
    assertions.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Negative: ActiveRuleset -2.0 -> 1.0'});
    assertions.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Negative: Element -2.0 -> 1.0'});
    } catch(e){assertions.push({Error: e, Description: 'Negative'});}

    try{
    TestRunner.changeValue('ruleset', '999');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Huge: ActiveRuleset 999 -> latest'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Huge: Element 999 -> latest'});
    } catch(e){assertions.push({Error: e, Description: 'Huge'});}

    try{
    TestRunner.changeValue('ruleset', '2.5');
    assertions.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Normal: ActiveRuleset 2.5 -> 2.5'});
    assertions.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Normal: Element 2.5 -> 2.5'});
    } catch(e){assertions.push({Error: e, Description: 'Normal'});}

    try{
    TestRunner.changeValue('ruleset', '1.5');
    assertions.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: '1.x Minor too large: ActiveRuleset 1.5 -> 1.0'});
    assertions.push({Expected: '1.0', Actual: rulesetElement.value, Description: '1.x Minor too large: Element 1.5 -> 1.0'});
    } catch(e){assertions.push({Error: e, Description: '1.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '2.55');
    assertions.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: '2.x Minor too large: ActiveRuleset 2.55 -> 2.7'});
    assertions.push({Expected: '2.7', Actual: rulesetElement.value, Description: '2.x Minor too large: Element 2.55 -> 2.7'});
    } catch(e){assertions.push({Error: e, Description: '2.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '3.20');
    assertions.push({Expected: '3.14', Actual: Main.getActiveRuleset().toString(), Description: '3.x Minor too large: ActiveRuleset 3.20 -> 14'});
    assertions.push({Expected: '3.14', Actual: rulesetElement.value, Description: '3.x Minor too large: Element 3.20 -> 14'});
    } catch(e){assertions.push({Error: e, Description: '3.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '4.999');
    assertions.push({Expected: Main.getLatestRuleset(), Actual: Main.getActiveRuleset(), Description: '4.x Minor too large: ActiveRuleset 3.999 -> latest'});
    assertions.push({Expected: Main.getLatestRuleset().toString(), Actual: rulesetElement.value, Description: '4.x Minor too large: Element 3.999 -> latest'});
    } catch(e){assertions.push({Error: e, Description: '4.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '2');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'No minor: ActiveRuleset 2 -> 2.0'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'No minor: Element 2 -> 2.0'});
    } catch(e){assertions.push({Error: e, Description: 'No minor'});}

    try{
    TestRunner.changeValue('ruleset', '2.7.0184e9a');
    assertions.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: 'Ignore micro: ActiveRuleset 2.7.0184e9a -> 2.7'});
    assertions.push({Expected: '2.7', Actual: rulesetElement.value, Description: 'Ignore micro: Element 2.7.0184e9a -> 2.7'});
    } catch(e){assertions.push({Error: e, Description: 'Ignore micro'});}

    try{
    TestRunner.changeValue('ruleset', '2.invalid');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Minor defaults: ActiveRuleset 2.invalid -> 2.0'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Minor defaults: Element 2.invalid -> 2.0'});
    } catch(e){assertions.push({Error: e, Description: 'Minor defaults'});}

    try{
    TestRunner.changeValue('ruleset', 'invalid.5');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Major doesn\'t default: ActiveRuleset invalid.5 -> not changed'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Major doesn\'t default: Element invalid.5 -> not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Major doesn\'t default'});}

    try{
    TestRunner.changeValue('ruleset', '3,3');
    assertions.push({Expected: '3.0', Actual: Main.getActiveRuleset().toString(), Description: 'Typo 3,3: ActiveRuleset minor not changed'});
    assertions.push({Expected: '3.0', Actual: rulesetElement.value, Description: 'Typo 3,3: Element minor not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Typo 3,3'});}

    try{
    TestRunner.changeValue('ruleset', '2.5');  //this will work if above tests pass. so don't assert
    TestRunner.changeValue('ruleset', '2.-5.2');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, negative minor: ActiveRuleset 2.-5.2 -> 2.0'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Edge case, negative minor: Element 2.-5.2 -> 2.0'});
    } catch(e){assertions.push({Error: e, Description: 'Edge case, negative minor'});}

    try{
    TestRunner.changeValue('ruleset', '2.4');
    TestRunner.changeValue('ruleset', '2.5.2.1.7.8');
    assertions.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, numbers and dots: ActiveRuleset 2.5.2.1.7.8 -> 2.5'});
    assertions.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Edge case, numbers and dots: Element 2.5.2.1.7.8 -> 2.5'});
    } catch(e){assertions.push({Error: e, Description: 'Edge case, numbers and dots'});}

    try{
    TestRunner.changeValue('ruleset', '2.6');
    TestRunner.changeValue('Strength', '2');
    TestRunner.changeValue('ruleset', '2.7');
    assertions.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Maintains document on version change'});
    } catch(e){assertions.push({Error: e, Description: 'Maintains document on version change'});}

    return TestRunner.displayResults('TestSuite.main.changeRuleset', assertions, testState);
};
TestSuite.main.changeTranscendence=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.changeTranscendence', assertions, testState);
};
TestSuite.main.clear=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.clear', assertions, testState);
};
TestSuite.main.loadFile=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    try{
    document.getElementById('file-chooser').value = '';  //clear the input
    SelectUtil.changeText('powerChoices0', 'Damage');
    Main.loadFile();
    assertions.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Loading no file does nothing'});
    } catch(e){assertions.push({Error: e, Description: 'Loading no file does nothing'});}

    //this test is complete since I can't set the file chooser to anything else

    return TestRunner.displayResults('TestSuite.main.loadFile', assertions, testState);
};
TestSuite.main.loadImageFromFile=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    try{
    document.getElementById('img-file-chooser').value = '';  //clear the input
    document.getElementById('character-image').src = '../images/Construct.jpg';
    var expected = document.getElementById('character-image').src;  //will be converted to absolute path
    Main.loadImageFromFile();
    assertions.push({Expected: expected, Actual: document.getElementById('character-image').src, Description: 'Loading no file does nothing'});
    } catch(e){assertions.push({Error: e, Description: 'Loading no file does nothing'});}

    //this test is complete since I can't set the file chooser to anything else

    return TestRunner.displayResults('TestSuite.main.loadImageFromFile', assertions, testState);
};
TestSuite.main.getProtectionTotal=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.getProtectionTotal', assertions, testState);

    //be sure to call Main.setRuleset(1, 0); inside tests and:
    //return TestRunner.displayResults('TestSuite.powerRow.setDuration. Rules: '+Main.getActiveRuleset(), assertions, testState);
};
TestSuite.main.update=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.update', assertions, testState);
};
TestSuite.main.updateInitiative=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var initiativeElement = document.getElementById('initiative');

    assertions.push({Expected: 0, Actual: Main.abilitySection.getByName('Agility').getValue(), Description: 'Initial Agility'});
    assertions.push({Expected: '+0', Actual: initiativeElement.innerHTML, Description: 'Initial Initiative'});

    try{
    TestRunner.changeValue('Agility', 2);
    assertions.push({Expected: '+2', Actual: initiativeElement.innerHTML, Description: 'Set Agility 2'});
    } catch(e){assertions.push({Error: e, Description: 'Set Agility 2'});}

    try{
    TestRunner.changeValue('Agility', -3);
    assertions.push({Expected: '-3', Actual: initiativeElement.innerHTML, Description: 'Set Agility -3'});
    } catch(e){assertions.push({Error: e, Description: 'Set Agility -3'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Seize Initiative');
    assertions.push({Expected: '-3 with Seize Initiative', Actual: initiativeElement.innerHTML, Description: 'Add Seize Initiative'});
    } catch(e){assertions.push({Error: e, Description: 'Add Seize Initiative'});}

    try{
    Main.clear();
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 4);
    assertions.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '3.0+ Improved Initiative *1'});
    } catch(e){assertions.push({Error: e, Description: '3.0+ Improved Initiative *1'});}

    try{
    Main.setRuleset(1, 0);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 3);
    assertions.push({Expected: '+12', Actual: initiativeElement.innerHTML, Description: '1.0 Improved Initiative *4'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Improved Initiative *4'});}

    try{
    Main.setRuleset(2,7);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 2);
    assertions.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '2.7 Improved Initiative *2'});
    } catch(e){assertions.push({Error: e, Description: '2.7 Improved Initiative *2'});}

    return TestRunner.displayResults('TestSuite.main.updateInitiative', assertions, testState);
};
TestSuite.main.updateOffense=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.updateOffense', assertions, testState);
};
TestSuite.main.calculatePowerLevelLimitations=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.calculatePowerLevelLimitations', assertions, testState);
};
TestSuite.main.calculateTotal=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.calculateTotal', assertions, testState);
};
TestSuite.main.convertDocument=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], dataToLoad, expected;

   var blankDoc = JSON.stringify(Main.save());
   function useSaveButton()
   {
      document.getElementById('save-text-button').onclick();
      return document.getElementById('code-box').value;
   }

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.version = 1;
   dataToLoad.Powers = [{"name":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant",
      "Modifiers":[{"name":"Selective"}],"rank":3}];
   Loader.sendData(dataToLoad);
   expected = JSON.parse(blankDoc);
   expected.Powers = [{"effect":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant",
      "name":"Power 1 Damage","skill":"Skill used for attack","Modifiers":[{"name":"Selective"}],"rank":3}];
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Convert a Power: errors'});
   assertions.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Description: 'Convert a Power: doc'});
   } catch(e){assertions.push({Error: e, Description: 'Convert a Power'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.version = 1;
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Convert old nothing: errors'});
   assertions.push({Expected: blankDoc, Actual: useSaveButton(), Description: 'Convert old nothing: doc'});
   dataToLoad = Loader.resetData();
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Convert new nothing: errors'});
   assertions.push({Expected: blankDoc, Actual: useSaveButton(), Description: 'Convert new nothing: doc'});
   } catch(e){assertions.push({Error: e, Description: 'Convert nothing'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.version = 1;
   dataToLoad.Powers = [{"name":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":3},
      {"name":"Damage","text":"Damage 2","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":2}];
   dataToLoad.Equipment = [{"name":"Affliction","text":"a","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":1},
      {"name":"Damage","text":"b","action":"Standard","range":"Close","duration":"Instant","Modifiers":[],"rank":1}];
   dataToLoad.Advantages = [{"name":"Equipment","rank":1}];
   Loader.sendData(dataToLoad);
   expected = JSON.parse(blankDoc);
   expected.Powers = [
      {
         "effect":"Damage","text":"Energy Aura","action":"Standard","range":"Close","duration":"Instant",
         "name":"Power 1 Damage","skill":"Skill used for attack","Modifiers":[],"rank":3
      },
      {
         "effect":"Damage","text":"Damage 2","action":"Standard","range":"Close","duration":"Instant",
         "name":"Power 2 Damage","skill":"Skill used for attack","Modifiers":[],"rank":2
      }
   ];
   expected.Equipment = [
      {
         "effect":"Affliction","text":"a","action":"Standard","range":"Close","duration":"Instant",
         "name":"Equipment 1 Affliction","skill":"Skill used for attack","Modifiers":[],"rank":1
      },
      {
         "effect":"Damage","text":"b","action":"Standard","range":"Close","duration":"Instant",
         "name":"Equipment 2 Damage","skill":"Skill used for attack","Modifiers":[],"rank":1
      }
   ];
   expected.Advantages = [{"name":"Equipment","rank":1}];
   assertions.push({Expected: [], Actual: Messages.list, Description: 'Convert 2 Powers and 2 equipments: errors'});
   assertions.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Description: 'Convert 2 Powers and 2 equipments: doc'});
   } catch(e){assertions.push({Error: e, Description: '2 each'});}

   return TestRunner.displayResults('TestSuite.main.convertDocument', assertions, testState);
};
TestSuite.main.determineCompatibilityIssues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.determineCompatibilityIssues', assertions, testState);
};
TestSuite.main.load=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], dataToLoad;

   TestRunner.changeValue('Stamina', '--');
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'amLoading false default'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'amLoading true when loading'});

   Main.clear();  //I could Loader.resetData() but I don't need to save
   Messages.list = [];
   TestRunner.changeValue('Stamina', '--');
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'amLoading reset to false'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'amLoading true again when loading'});

   //ADD TESTS. currently only tests amLoading

   return TestRunner.displayResults('TestSuite.main.loadFromString', assertions, testState);
};
TestSuite.main.loadFromString=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];

   TestRunner.changeValue('Strength', '2');
   Main.loadFromString('  \n\t');
   assertions.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Ignore blank input'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'No errors from blank input'});

   Messages.list = [];
   TestRunner.changeValue('Stamina', '--');
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'ui amLoading starts false'});

   try{
   Messages.list = [];
   Main.loadFromString('<3');
   TestRunner.failedToThrow(assertions, 'XML error code');
   }
   catch(e)
   {
      assertions.push({Expected: [{errorCode: 'MainObject.loadFromString.parsing.XML', amLoading: true}], Actual: Messages.list, Description: 'XML error code'});
   }

   Messages.list = [];
   TestRunner.changeValue('Stamina', '--');
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'loading unset amLoading'});

   try{
   Messages.list = [];
   Main.loadFromString('{');
   TestRunner.failedToThrow(assertions, 'JSON error code');
   }
   catch(e)
   {
      assertions.push({Expected: [{errorCode: 'MainObject.loadFromString.parsing.JSON', amLoading: true}], Actual: Messages.list, Description: 'JSON error code'});
   }

   return TestRunner.displayResults('TestSuite.main.loadFromString', assertions, testState);
};
TestSuite.main.makeOffenseRow=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.main.makeOffenseRow', assertions, testState);
};
