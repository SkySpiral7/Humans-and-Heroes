'use strict';
TestSuite.main={};
TestSuite.main.changeRuleset=function(testState={})
{
    TestRunner.clearResults(testState);

    var testResults=[];
    var rulesetElement = document.getElementById('ruleset');
    var latestRuleString = Main.getLatestRuleset().toString();

    TestRunner.changeValue('ruleset', latestRuleString);
    //unfortunately I can't test the default values because by test runner resets the version every test
    //it needs to do this so that a test for 1.0 doesn't mess up a test for 2.7
    //testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Default ActiveRuleset is LatestRuleset'});
    //testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Default value of element'});

    try{
    TestRunner.changeValue('ruleset', '');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Empty: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Empty: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Empty'});}

    try{
    TestRunner.changeValue('ruleset', '   ');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Blank: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Blank: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Blank'});}

    try{
    TestRunner.changeValue('ruleset', 'zasduiasdhui');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Invalid: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Invalid: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Invalid'});}

    try{
    TestRunner.changeValue('ruleset', 'v2.0');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Typo v2.0: ActiveRuleset not changed'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Typo v2.0: Element not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Typo v2.0'});}

    try{
    TestRunner.changeValue('ruleset', '0');
    testResults.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Zero: ActiveRuleset 0 -> 1.0'});
    testResults.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Zero: Element 0 -> 1.0'});
    } catch(e){testResults.push({Error: e, Description: 'Zero'});}

    try{
    TestRunner.changeValue('ruleset', '-2.0');
    testResults.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Negative: ActiveRuleset -2.0 -> 1.0'});
    testResults.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Negative: Element -2.0 -> 1.0'});
    } catch(e){testResults.push({Error: e, Description: 'Negative'});}

    try{
    TestRunner.changeValue('ruleset', '999');
    testResults.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Huge: ActiveRuleset 999 -> latest'});
    testResults.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Huge: Element 999 -> latest'});
    } catch(e){testResults.push({Error: e, Description: 'Huge'});}

    try{
    TestRunner.changeValue('ruleset', '2.5');
    testResults.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Normal: ActiveRuleset 2.5 -> 2.5'});
    testResults.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Normal: Element 2.5 -> 2.5'});
    } catch(e){testResults.push({Error: e, Description: 'Normal'});}

    try{
    TestRunner.changeValue('ruleset', '1.5');
    testResults.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: '1.x Minor too large: ActiveRuleset 1.5 -> 1.0'});
    testResults.push({Expected: '1.0', Actual: rulesetElement.value, Description: '1.x Minor too large: Element 1.5 -> 1.0'});
    } catch(e){testResults.push({Error: e, Description: '1.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '2.55');
    testResults.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: '2.x Minor too large: ActiveRuleset 2.55 -> 2.7'});
    testResults.push({Expected: '2.7', Actual: rulesetElement.value, Description: '2.x Minor too large: Element 2.55 -> 2.7'});
    } catch(e){testResults.push({Error: e, Description: '2.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '3.999');
    testResults.push({Expected: Main.getLatestRuleset(), Actual: Main.getActiveRuleset(), Description: '3.x Minor too large: ActiveRuleset 3.999 -> latest'});
    testResults.push({Expected: Main.getLatestRuleset().toString(), Actual: rulesetElement.value, Description: '3.x Minor too large: Element 3.999 -> latest'});
    } catch(e){testResults.push({Error: e, Description: '3.x Minor too large'});}

    try{
    TestRunner.changeValue('ruleset', '2');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'No minor: ActiveRuleset 2 -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'No minor: Element 2 -> 2.0'});
    } catch(e){testResults.push({Error: e, Description: 'No minor'});}

    try{
    TestRunner.changeValue('ruleset', '2.7.0184e9a');
    testResults.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: 'Ignore micro: ActiveRuleset 2.7.0184e9a -> 2.7'});
    testResults.push({Expected: '2.7', Actual: rulesetElement.value, Description: 'Ignore micro: Element 2.7.0184e9a -> 2.7'});
    } catch(e){testResults.push({Error: e, Description: 'Ignore micro'});}

    try{
    TestRunner.changeValue('ruleset', '2.invalid');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Minor defaults: ActiveRuleset 2.invalid -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Minor defaults: Element 2.invalid -> 2.0'});
    } catch(e){testResults.push({Error: e, Description: 'Minor defaults'});}

    try{
    TestRunner.changeValue('ruleset', 'invalid.5');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Major doesn\'t default: ActiveRuleset invalid.5 -> not changed'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Major doesn\'t default: Element invalid.5 -> not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Major doesn\'t default'});}

    try{
    TestRunner.changeValue('ruleset', '3,3');
    testResults.push({Expected: '3.0', Actual: Main.getActiveRuleset().toString(), Description: 'Typo 3,3: ActiveRuleset minor not changed'});
    testResults.push({Expected: '3.0', Actual: rulesetElement.value, Description: 'Typo 3,3: Element minor not changed'});
    } catch(e){testResults.push({Error: e, Description: 'Typo 3,3'});}

    try{
    TestRunner.changeValue('ruleset', '2.5');  //this will work if above tests pass. so don't assert
    TestRunner.changeValue('ruleset', '2.-5.2');
    testResults.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, negative minor: ActiveRuleset 2.-5.2 -> 2.0'});
    testResults.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Edge case, negative minor: Element 2.-5.2 -> 2.0'});
    } catch(e){testResults.push({Error: e, Description: 'Edge case, negative minor'});}

    try{
    TestRunner.changeValue('ruleset', '2.4');
    TestRunner.changeValue('ruleset', '2.5.2.1.7.8');
    testResults.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, numbers and dots: ActiveRuleset 2.5.2.1.7.8 -> 2.5'});
    testResults.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Edge case, numbers and dots: Element 2.5.2.1.7.8 -> 2.5'});
    } catch(e){testResults.push({Error: e, Description: 'Edge case, numbers and dots'});}

    try{
    TestRunner.changeValue('ruleset', '2.6');
    TestRunner.changeValue('Strength', '2');
    TestRunner.changeValue('ruleset', '2.7');
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Maintains document on version change'});
    } catch(e){testResults.push({Error: e, Description: 'Maintains document on version change'});}

    return TestRunner.displayResults('TestSuite.main.changeRuleset', testResults, testState);
};
TestSuite.main.changeTranscendence=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.changeTranscendence', testResults, testState);
};
TestSuite.main.clear=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.clear', testResults, testState);
};
TestSuite.main.loadFile=function(testState={})
{
    TestRunner.clearResults(testState);

    var testResults=[];
    try{
    document.getElementById('file-chooser').value = '';  //clear the input
    SelectUtil.changeText('powerChoices0', 'Damage');
    Main.loadFile();
    testResults.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Loading no file does nothing'});
    } catch(e){testResults.push({Error: e, Description: 'Loading no file does nothing'});}

    //this test is complete since I can't set the file chooser to anything else

    return TestRunner.displayResults('TestSuite.main.loadFile', testResults, testState);
};
TestSuite.main.loadImageFromFile=function(testState={})
{
    TestRunner.clearResults(testState);

    var testResults=[];
    try{
    document.getElementById('img-file-chooser').value = '';  //clear the input
    document.getElementById('character-image').src = '../images/Construct.jpg';
    var expected = document.getElementById('character-image').src;  //will be converted to absolute path
    Main.loadImageFromFile();
    testResults.push({Expected: expected, Actual: document.getElementById('character-image').src, Description: 'Loading no file does nothing'});
    } catch(e){testResults.push({Error: e, Description: 'Loading no file does nothing'});}

    //this test is complete since I can't set the file chooser to anything else

    return TestRunner.displayResults('TestSuite.main.loadImageFromFile', testResults, testState);
};
TestSuite.main.getProtectionTotal=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.getProtectionTotal', testResults, testState);

    //be sure to call Main.setRuleset(1, 1); inside tests and:
    //return TestRunner.displayResults('TestSuite.powerRow.setDuration. Rules: '+Main.getActiveRuleset(), testResults, testState);
};
TestSuite.main.update=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.update', testResults, testState);
};
TestSuite.main.updateInitiative=function(testState={})
{
    TestRunner.clearResults(testState);

    var testResults=[];
    var initiativeElement = document.getElementById('initiative');

    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Agility').getValue(), Description: 'Initial Agility'});
    testResults.push({Expected: '+0', Actual: initiativeElement.innerHTML, Description: 'Initial Initiative'});

    try{
    TestRunner.changeValue('Agility', 2);
    testResults.push({Expected: '+2', Actual: initiativeElement.innerHTML, Description: 'Set Agility 2'});
    } catch(e){testResults.push({Error: e, Description: 'Set Agility 2'});}

    try{
    TestRunner.changeValue('Agility', -3);
    testResults.push({Expected: '-3', Actual: initiativeElement.innerHTML, Description: 'Set Agility -3'});
    } catch(e){testResults.push({Error: e, Description: 'Set Agility -3'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Seize Initiative');
    testResults.push({Expected: '-3 with Seize Initiative', Actual: initiativeElement.innerHTML, Description: 'Add Seize Initiative'});
    } catch(e){testResults.push({Error: e, Description: 'Add Seize Initiative'});}

    try{
    Main.clear(); Main.setRuleset(2,7);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 2);
    testResults.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '2.7 Improved Initiative 2'});
    } catch(e){testResults.push({Error: e, Description: '2.7 Improved Initiative 2'});}

    try{
    Main.setRuleset(1, 1);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 3);
    testResults.push({Expected: '+12', Actual: initiativeElement.innerHTML, Description: '1.1 Improved Initiative 3'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Improved Initiative 3'});}

    try{
    Main.setRuleset(3, 0);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    TestRunner.changeValue('advantageRank0', 4);
    testResults.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '3.0 Improved Initiative 4'});
    } catch(e){testResults.push({Error: e, Description: '3.0 Improved Initiative 4'});}

    return TestRunner.displayResults('TestSuite.main.updateInitiative', testResults, testState);
};
TestSuite.main.updateOffense=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.updateOffense', testResults, testState);
};
TestSuite.main.calculatePowerLevelLimitations=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.calculatePowerLevelLimitations', testResults, testState);
};
TestSuite.main.calculateTotal=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.calculateTotal', testResults, testState);
};
TestSuite.main.convertDocument=function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults=[], dataToLoad, expected;

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
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Convert a Power: errors'});
   testResults.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Description: 'Convert a Power: doc'});
   } catch(e){testResults.push({Error: e, Description: 'Convert a Power'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.version = 1;
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Convert old nothing: errors'});
   testResults.push({Expected: blankDoc, Actual: useSaveButton(), Description: 'Convert old nothing: doc'});
   dataToLoad = Loader.resetData();
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Convert new nothing: errors'});
   testResults.push({Expected: blankDoc, Actual: useSaveButton(), Description: 'Convert new nothing: doc'});
   } catch(e){testResults.push({Error: e, Description: 'Convert nothing'});}

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
   testResults.push({Expected: [], Actual: Messages.list, Description: 'Convert 2 Powers and 2 equipments: errors'});
   testResults.push({Expected: JSON.stringify(expected), Actual: useSaveButton(), Description: 'Convert 2 Powers and 2 equipments: doc'});
   } catch(e){testResults.push({Error: e, Description: '2 each'});}

   return TestRunner.displayResults('TestSuite.main.convertDocument', testResults, testState);
};
TestSuite.main.determineCompatibilityIssues=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.determineCompatibilityIssues', testResults, testState);
};
TestSuite.main.load=function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults=[], dataToLoad;

   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'amLoading false default'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'amLoading true when loading'});

   Main.clear();  //I could Loader.resetData() but I don't need to save
   Messages.list = [];
   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'amLoading reset to false'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'amLoading true again when loading'});

   //ADD TESTS. currently only tests amLoading

   return TestRunner.displayResults('TestSuite.main.loadFromString', testResults, testState);
};
TestSuite.main.loadFromString=function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults=[];

   TestRunner.changeValue('Strength', '2');
   Main.loadFromString('  \n\t');
   testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Ignore blank input'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'No errors from blank input'});

   Messages.list = [];
   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'ui amLoading starts false'});

   try{
   Messages.list = [];
   Main.loadFromString('<3');
   TestRunner.failedToThrow(testResults, 'XML error code');
   }
   catch(e)
   {
      testResults.push({Expected: [{errorCode: 'MainObject.loadFromString.parsing.XML', amLoading: true}], Actual: Messages.list, Description: 'XML error code'});
   }

   Messages.list = [];
   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'loading unset amLoading'});

   try{
   Messages.list = [];
   Main.loadFromString('{');
   TestRunner.failedToThrow(testResults, 'JSON error code');
   }
   catch(e)
   {
      testResults.push({Expected: [{errorCode: 'MainObject.loadFromString.parsing.JSON', amLoading: true}], Actual: Messages.list, Description: 'JSON error code'});
   }

   return TestRunner.displayResults('TestSuite.main.loadFromString', testResults, testState);
};
TestSuite.main.makeOffenseRow=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.main.makeOffenseRow', testResults, testState);
};
