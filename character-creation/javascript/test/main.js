'use strict';
TestSuite.main={};
TestSuite.main.changeRuleset=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var rulesetElement = document.getElementById('ruleset');
    var latestRuleString = Main.getLatestRuleset().toString();

    DomUtil.changeValue('ruleset', latestRuleString);
    //unfortunately I can't test the default values because by test runner resets the version every test
    //it needs to do this so that a test for 1.0 doesn't mess up a test for 2.7
    //assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Default ActiveRuleset is LatestRuleset'});
    //assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Default value of element'});

    try{
    DomUtil.changeValue('ruleset', '');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Empty: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Empty: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Empty'});}

    try{
    DomUtil.changeValue('ruleset', '   ');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Blank: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Blank: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Blank'});}

    try{
    DomUtil.changeValue('ruleset', 'zasduiasdhui');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Invalid: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Invalid: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Invalid'});}

    try{
    DomUtil.changeValue('ruleset', 'v2.0');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Typo v2.0: ActiveRuleset not changed'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Typo v2.0: Element not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Typo v2.0'});}

    try{
    DomUtil.changeValue('ruleset', '0');
    assertions.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Zero: ActiveRuleset 0 -> 1.0'});
    assertions.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Zero: Element 0 -> 1.0'});
    } catch(e){assertions.push({Error: e, Description: 'Zero'});}

    try{
    DomUtil.changeValue('ruleset', '-2.0');
    assertions.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: 'Negative: ActiveRuleset -2.0 -> 1.0'});
    assertions.push({Expected: '1.0', Actual: rulesetElement.value, Description: 'Negative: Element -2.0 -> 1.0'});
    } catch(e){assertions.push({Error: e, Description: 'Negative'});}

    try{
    DomUtil.changeValue('ruleset', '999');
    assertions.push({Expected: latestRuleString, Actual: Main.getActiveRuleset().toString(), Description: 'Huge: ActiveRuleset 999 -> latest'});
    assertions.push({Expected: latestRuleString, Actual: rulesetElement.value, Description: 'Huge: Element 999 -> latest'});
    } catch(e){assertions.push({Error: e, Description: 'Huge'});}

    try{
    DomUtil.changeValue('ruleset', '2.5');
    assertions.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Normal: ActiveRuleset 2.5 -> 2.5'});
    assertions.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Normal: Element 2.5 -> 2.5'});
    } catch(e){assertions.push({Error: e, Description: 'Normal'});}

    try{
    DomUtil.changeValue('ruleset', '1.5');
    assertions.push({Expected: '1.0', Actual: Main.getActiveRuleset().toString(), Description: '1.x Minor too large: ActiveRuleset 1.5 -> 1.0'});
    assertions.push({Expected: '1.0', Actual: rulesetElement.value, Description: '1.x Minor too large: Element 1.5 -> 1.0'});
    } catch(e){assertions.push({Error: e, Description: '1.x Minor too large'});}

    try{
    DomUtil.changeValue('ruleset', '2.55');
    assertions.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: '2.x Minor too large: ActiveRuleset 2.55 -> 2.7'});
    assertions.push({Expected: '2.7', Actual: rulesetElement.value, Description: '2.x Minor too large: Element 2.55 -> 2.7'});
    } catch(e){assertions.push({Error: e, Description: '2.x Minor too large'});}

    try{
    DomUtil.changeValue('ruleset', '3.999');
    assertions.push({Expected: Main.getLatestRuleset(), Actual: Main.getActiveRuleset(), Description: '3.x Minor too large: ActiveRuleset 3.999 -> latest'});
    assertions.push({Expected: Main.getLatestRuleset().toString(), Actual: rulesetElement.value, Description: '3.x Minor too large: Element 3.999 -> latest'});
    } catch(e){assertions.push({Error: e, Description: '3.x Minor too large'});}

    try{
    DomUtil.changeValue('ruleset', '2');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'No minor: ActiveRuleset 2 -> 2.0'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'No minor: Element 2 -> 2.0'});
    } catch(e){assertions.push({Error: e, Description: 'No minor'});}

    try{
    DomUtil.changeValue('ruleset', '2.7.0184e9a');
    assertions.push({Expected: '2.7', Actual: Main.getActiveRuleset().toString(), Description: 'Ignore micro: ActiveRuleset 2.7.0184e9a -> 2.7'});
    assertions.push({Expected: '2.7', Actual: rulesetElement.value, Description: 'Ignore micro: Element 2.7.0184e9a -> 2.7'});
    } catch(e){assertions.push({Error: e, Description: 'Ignore micro'});}

    try{
    DomUtil.changeValue('ruleset', '2.invalid');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Minor defaults: ActiveRuleset 2.invalid -> 2.0'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Minor defaults: Element 2.invalid -> 2.0'});
    } catch(e){assertions.push({Error: e, Description: 'Minor defaults'});}

    try{
    DomUtil.changeValue('ruleset', 'invalid.5');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Major doesn\'t default: ActiveRuleset invalid.5 -> not changed'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Major doesn\'t default: Element invalid.5 -> not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Major doesn\'t default'});}

    try{
    DomUtil.changeValue('ruleset', '3,3');
    assertions.push({Expected: '3.0', Actual: Main.getActiveRuleset().toString(), Description: 'Typo 3,3: ActiveRuleset minor not changed'});
    assertions.push({Expected: '3.0', Actual: rulesetElement.value, Description: 'Typo 3,3: Element minor not changed'});
    } catch(e){assertions.push({Error: e, Description: 'Typo 3,3'});}

    try{
    DomUtil.changeValue('ruleset', '2.5');  //this will work if above tests pass. so don't assert
    DomUtil.changeValue('ruleset', '2.-5.2');
    assertions.push({Expected: '2.0', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, negative minor: ActiveRuleset 2.-5.2 -> 2.0'});
    assertions.push({Expected: '2.0', Actual: rulesetElement.value, Description: 'Edge case, negative minor: Element 2.-5.2 -> 2.0'});
    } catch(e){assertions.push({Error: e, Description: 'Edge case, negative minor'});}

    try{
    DomUtil.changeValue('ruleset', '2.4');
    DomUtil.changeValue('ruleset', '2.5.2.1.7.8');
    assertions.push({Expected: '2.5', Actual: Main.getActiveRuleset().toString(), Description: 'Edge case, numbers and dots: ActiveRuleset 2.5.2.1.7.8 -> 2.5'});
    assertions.push({Expected: '2.5', Actual: rulesetElement.value, Description: 'Edge case, numbers and dots: Element 2.5.2.1.7.8 -> 2.5'});
    } catch(e){assertions.push({Error: e, Description: 'Edge case, numbers and dots'});}

    try{
    DomUtil.changeValue('ruleset', '2.6');
    DomUtil.changeValue('Strength', '2');
    DomUtil.changeValue('ruleset', '2.7');
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
   var assertions = [];

   function getActual()
   {
      return Main.getProtectionTotal();
   }

   assertions.push({Expected: null, Actual: getActual(), Description: 'Protection default: null'});

   SelectUtil.changeText('equipmentChoices0', 'Protection');
   assertions.push({Expected: 1, Actual: getActual(), Description: 'uses equip when power is null'});

   Main.equipmentSection.clear();
   SelectUtil.changeText('powerChoices0', 'Protection');
   assertions.push({Expected: 1, Actual: getActual(), Description: 'uses power when equip is null'});

   SelectUtil.changeText('equipmentChoices0', 'Protection');
   assertions.push({Expected: 1, Actual: getActual(), Description: 'does not stack'});

   DomUtil.changeValue('equipmentRank0', 2);
   assertions.push({Expected: 2, Actual: getActual(), Description: 'use equip if greater'});

   DomUtil.changeValue('powerRank0', 3);
   assertions.push({Expected: 3, Actual: getActual(), Description: 'use power if greater'});

   Main.setRuleset(1, 0);
   SelectUtil.changeText('powerChoices0', 'Protection');
   SelectUtil.changeText('equipmentChoices0', 'Protection');
   DomUtil.changeValue('powerRank0', 2);
   assertions.push({Expected: 3, Actual: getActual(), Description: 'v1: protection stacks'});

   return TestRunner.displayResults('TestSuite.main.getProtectionTotal', assertions, testState);
};
TestSuite.main.update=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: 'Default PL 1'});
   assertions.push(
      {Expected: '1', Actual: document.getElementById('power-level').innerHTML, Description: 'power-level html set'});
   assertions.push({
      Expected: '15',
      Actual: document.getElementById('grand-total-max').innerHTML,
      Description: 'grand-total-max html set'
   });

   DomUtil.changeValue('Strength', -5);
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: '-10 CP = PL 1'});

   DomUtil.changeValue('Fighting', -5);
   DomUtil.changeValue('Agility', -5);
   DomUtil.changeValue('Dexterity', -5);
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: '-35 CP = PL 1'});
   Main.abilitySection.clear();

   SelectUtil.changeText('powerChoices0', 'Feature');
   DomUtil.changeValue('powerRank0', 15);
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: '15 CP = PL 1'});

   DomUtil.changeValue('powerRank0', 16);
   assertions.push({Expected: 2, Actual: Main.getDerivedValues().powerLevel, Description: '16 CP = PL 2'});

   DomUtil.changeValue('powerRank0', 1000);
   SelectUtil.changeText('advantageChoices0', 'Your Petty Rules Don\'t Apply to Me');
   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectRange0', 'Perception');
   //petty costs 50 + 40 damage = 90 CP /15 = 6 PL even though PL limit would require 10
   DomUtil.changeValue('powerRank0', 10);
   assertions.push(
      {Expected: 6, Actual: Main.getDerivedValues().powerLevel, Description: 'Petty rules has PL from CP only'});

   Main.clear();
   assertions.push({Expected: 0, Actual: Main.getTranscendence(), Description: 'Default transcendence 0'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   DomUtil.changeValue('powerRank0', 15 * 19);
   assertions.push({Expected: 0, Actual: Main.getTranscendence(), Description: 'PL 19 = transcendence 0'});

   DomUtil.changeValue('powerRank0', 15 * 20);
   assertions.push({Expected: 1, Actual: Main.getTranscendence(), Description: 'PL 20 = transcendence 1'});

   //v3.15
   Main.setRuleset(3, 15);
   assertions.push({Expected: 0, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Default PL 0'});

   DomUtil.changeValue('Strength', -5);
   assertions.push({Expected: 0, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 -10 CP = PL 0'});

   DomUtil.changeValue('Fighting', -5);
   DomUtil.changeValue('Agility', -5);
   DomUtil.changeValue('Dexterity', -5);
   assertions.push({Expected: 0, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 -35 CP = PL 0'});
   Main.abilitySection.clear();

   SelectUtil.changeText('powerChoices0', 'Feature');
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 1 CP = PL 1'});

   DomUtil.changeValue('powerRank0', 15);
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 15 CP = PL 1'});

   DomUtil.changeValue('powerRank0', 16);
   assertions.push({Expected: 2, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 16 CP = PL 2'});

   //v1.0
   Main.setRuleset(1, 0);
   assertions.push({Expected: 0, Actual: Main.getTranscendence(), Description: 'v1.0 Default transcendence 0'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   DomUtil.changeValue('powerRank0', 15 * 20);
   assertions.push(
      {Expected: 0, Actual: Main.getTranscendence(), Description: 'v1.0 PL 20 = still transcendence 0'});

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
    DomUtil.changeValue('Agility', 2);
    assertions.push({Expected: '+2', Actual: initiativeElement.innerHTML, Description: 'Set Agility 2'});
    } catch(e){assertions.push({Error: e, Description: 'Set Agility 2'});}

    try{
    DomUtil.changeValue('Agility', -3);
    assertions.push({Expected: '-3', Actual: initiativeElement.innerHTML, Description: 'Set Agility -3'});
    } catch(e){assertions.push({Error: e, Description: 'Set Agility -3'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Seize Initiative');
    assertions.push({Expected: '-3 with Seize Initiative', Actual: initiativeElement.innerHTML, Description: 'Add Seize Initiative'});
    } catch(e){assertions.push({Error: e, Description: 'Add Seize Initiative'});}

    try{
    Main.clear();
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    DomUtil.changeValue('advantageRank0', 4);
    assertions.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '3.0+ Improved Initiative *1'});
    } catch(e){assertions.push({Error: e, Description: '3.0+ Improved Initiative *1'});}

    try{
    Main.setRuleset(1, 0);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    DomUtil.changeValue('advantageRank0', 3);
    assertions.push({Expected: '+12', Actual: initiativeElement.innerHTML, Description: '1.0 Improved Initiative *4'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Improved Initiative *4'});}

    try{
    Main.setRuleset(2,7);
    SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    DomUtil.changeValue('advantageRank0', 2);
    assertions.push({Expected: '+4', Actual: initiativeElement.innerHTML, Description: '2.7 Improved Initiative *2'});
    } catch(e){assertions.push({Error: e, Description: '2.7 Improved Initiative *2'});}

    return TestRunner.displayResults('TestSuite.main.updateInitiative', assertions, testState);
};
TestSuite.main.updateOffense=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [], expected;

   expected = [{skillName: 'Unarmed', attackBonus: 0, range: 'Close', effect: 'Damage', rank: 0}];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Happy: Unarmed only by default'});

   DomUtil.changeValue('Strength', 4);
   DomUtil.changeValue('Fighting', 2);
   expected = [{skillName: 'Unarmed', attackBonus: 2, range: 'Close', effect: 'Damage', rank: 4}];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Default Unarmed uses abilities'});

   Main.clear();
   DomUtil.changeValue('Fighting', '--');
   expected = [];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Absent Fighting: no Unarmed by default'});

   SelectUtil.changeText('skillChoices0', 'Close Combat');
   DomUtil.changeValue('skillText0', 'Unarmed');
   //because Unarmed defaults to Fighting
   expected = [];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Absent Fighting with Unarmed: still no Unarmed'});

   DomUtil.changeValue('skillAbility0', 'Awareness');
   DomUtil.changeValue('Strength', 4);
   DomUtil.changeValue('Awareness', 2);
   expected = [{skillName: 'Unarmed', attackBonus: 3, range: 'Close', effect: 'Damage', rank: 4}];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'No Fgt, Awe Unarmed: has Unarmed with attack/rank'});

   DomUtil.changeValue('Strength', '--');
   expected = [];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'No Str, Awe Unarmed: no Unarmed'});

   Main.clear();
   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerName0', 'Sword 1');
   DomUtil.changeValue('powerSkill0', 'Sword');
   SelectUtil.changeText('equipmentChoices0', 'Affliction');
   DomUtil.changeValue('equipmentName0', 'Sword 2');
   DomUtil.changeValue('equipmentSkill0', 'Sword');
   DomUtil.changeValue('equipmentRank0', 2);
   DomUtil.changeValue('Fighting', 2);
   expected = [
      {skillName: 'Unarmed', attackBonus: 2, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Sword 1', attackBonus: 2, range: 'Close', effect: 'Damage', rank: 1},
      {skillName: 'Sword 2', attackBonus: 2, range: 'Close', effect: 'Affliction', rank: 2}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Happy Power, Equip, no skill: has attack/rank using ability'});

   SelectUtil.changeText('skillChoices0', 'Close Combat');
   DomUtil.changeValue('skillText0', 'Sword');
   expected = [
      {skillName: 'Unarmed', attackBonus: 2, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Sword 1', attackBonus: 3, range: 'Close', effect: 'Damage', rank: 1},
      {skillName: 'Sword 2', attackBonus: 3, range: 'Close', effect: 'Affliction', rank: 2}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Power/Equip with skill'});

   Main.clear();
   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerSelectRange0', 'Perception');
   DomUtil.changeValue('powerName0', 'Attack 1');
   expected = [
      {skillName: 'Unarmed', attackBonus: 0, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Attack 1', attackBonus: '--', range: 'Perception', effect: 'Damage', rank: 1}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Perception attack'});

   DomUtil.changeValue('powerSelectRange0', 'Ranged');
   DomUtil.changeValue('powerSkill0', 'Gun');
   DomUtil.changeValue('Dexterity', 5);
   expected = [
      {skillName: 'Unarmed', attackBonus: 0, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Attack 1', attackBonus: 5, range: 'Ranged', effect: 'Damage', rank: 1}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Ranged attack no skill'});

   SelectUtil.changeText('skillChoices0', 'Ranged Combat');
   DomUtil.changeValue('skillText0', 'Gun');
   expected = [
      {skillName: 'Unarmed', attackBonus: 0, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Attack 1', attackBonus: 6, range: 'Ranged', effect: 'Damage', rank: 1}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Ranged attack with skill'});

   Main.clear();
   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerName0', 'Sword 1');
   DomUtil.changeValue('powerModifierChoices0.0', 'Accurate');
   DomUtil.changeValue('powerModifierRank0.0', 2);
   DomUtil.changeValue('Fighting', 1);
   expected = [
      {skillName: 'Unarmed', attackBonus: 1, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Sword 1', attackBonus: 5, range: 'Close', effect: 'Damage', rank: 1}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'Accurate attack'});

   Main.setRuleset(1, 0);
   SelectUtil.changeText('advantageChoices0', 'Close Attack');
   DomUtil.changeValue('Fighting', 1);
   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerName0', 'Sword 1');
   expected = [
      {skillName: 'Unarmed', attackBonus: 2, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Sword 1', attackBonus: 2, range: 'Close', effect: 'Damage', rank: 1}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'v1.0 Close Attack advantage'});

   Main.clear();
   SelectUtil.changeText('advantageChoices0', 'Ranged Attack');
   DomUtil.changeValue('advantageRank0', 2);
   DomUtil.changeValue('Dexterity', 1);

   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerName0', 'Attack 1');
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   DomUtil.changeValue('powerSkill0', 'Gun 1');
   //TODO: bug: skill shouldn't be required here. don't know why/how it removes the row

   SelectUtil.changeText('powerChoices1', 'Affliction');
   DomUtil.changeValue('powerName1', 'Attack 2');
   SelectUtil.changeText('powerSelectRange1', 'Ranged');

   expected = [
      {skillName: 'Unarmed', attackBonus: 0, range: 'Close', effect: 'Damage', rank: 0},
      {skillName: 'Attack 1', attackBonus: 3, range: 'Ranged', effect: 'Damage', rank: 1},
      {skillName: 'Attack 2', attackBonus: 3, range: 'Ranged', effect: 'Affliction', rank: 1}
   ];
   assertions.push({Expected: expected, Actual: Main.getDerivedValues().Offense, Description: 'v1.0 Ranged Attack advantage'});

   return TestRunner.displayResults('TestSuite.main.updateOffense', assertions, testState);
};
TestSuite.main._calculatePowerLevelLimitations=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   DomUtil.changeValue('Awareness', 11);
   //Ability 11 = 22 CP /15 = PL 2
   assertions.push({Expected: 2, Actual: Main.getDerivedValues().powerLevel, Description: 'Ability 11 = PL by CP'});

   DomUtil.changeValue('Awareness', 13);
   assertions.push({Expected: 3, Actual: Main.getDerivedValues().powerLevel, Description: 'Ability 13 = PL 3'});

   Main.abilitySection.clear();
   SelectUtil.changeText('skillChoices0', 'Athletics');
   DomUtil.changeValue('skillRank0', 11);
   //Skill 11 = 5.5 CP /15 = PL 1
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().powerLevel, Description: 'Skill 11 = PL by CP'});

   DomUtil.changeValue('skillRank0', 12);
   assertions.push({Expected: 2, Actual: Main.getDerivedValues().powerLevel, Description: 'Skill 12 = PL 2'});

   Main.skillSection.clear();
   SelectUtil.changeText('skillChoices0', 'Close Combat');
   DomUtil.changeValue('skillText0', 'Unarmed');
   DomUtil.changeValue('skillRank0', 10);
   //Skill 10 = 5 CP /15 = PL 1
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'Unarmed Attack to PL'});

   DomUtil.changeValue('Strength', 2);
   //9 CP /15 = PL 1
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'PL doesn\'t Attack+Damage'});

   Main.skillSection.clear();
   assertions.push({Expected: 2, Actual: Main.getDerivedValues().powerLevel, Description: 'Unarmed Damage to PL'});

   Main.clear();
   SelectUtil.changeText('powerChoices0', 'Damage');
   //10 CP /15 = 1 PL
   DomUtil.changeValue('powerRank0', 10);
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'Power Damage to PL'});

   SelectUtil.changeText('powerSelectRange0', 'Perception');
   //40 CP /15 = 3 PL
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'Perception Damage to PL'});

   SelectUtil.changeText('powerChoices0', 'Protection');
   DomUtil.changeValue('powerRank0', 10);
   //10 CP /15 = PL 1
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'Toughness to PL'});

   //12 CP /15 = PL 1
   DomUtil.changeValue('Dodge-input', 2);
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'PL doesn\'t Dodge+Toughness'});

   Main.clear();
   //2 CP /15 = PL 1
   DomUtil.changeValue('Dodge-input', 2);
   assertions.push({Expected: 2, Actual: Main.getDerivedValues().powerLevel, Description: 'Dodge to PL'});
   DomUtil.changeValue('Dodge-input', 0);

   //4 CP /15 = PL 1
   DomUtil.changeValue('Parry-input', 4);
   assertions.push({Expected: 4, Actual: Main.getDerivedValues().powerLevel, Description: 'Parry to PL'});
   DomUtil.changeValue('Parry-input', 0);

   DomUtil.changeValue('Fortitude-input', 5);
   //5 CP /15 = PL 1
   assertions.push({Expected: 5, Actual: Main.getDerivedValues().powerLevel, Description: 'Fortitude to PL'});
   DomUtil.changeValue('Fortitude-input', 0);

   //12 CP /15 = PL 1
   DomUtil.changeValue('Will-input', 12);
   assertions.push({Expected: 12, Actual: Main.getDerivedValues().powerLevel, Description: 'Will to PL'});
   //Toughness to PL is above

   //v3.15
   Main.setRuleset(3, 15);
   SelectUtil.changeText('skillChoices0', 'Close Combat');
   DomUtil.changeValue('skillText0', 'Unarmed');
   DomUtil.changeValue('skillRank0', 10);
   //Skill 10 = 5 CP /15 = PL 1 vs attack 10 + 0 damage /2 = PL 5
   assertions.push({Expected: 5, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Unarmed Attack+0 to PL'});

   DomUtil.changeValue('Strength', 2);
   //9 CP /15 = PL 1 vs attack 10 + 2 damage /2 = PL 6
   assertions.push({Expected: 6, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Unarmed Attack+Damage to PL'});

   Main.clear();
   SelectUtil.changeText('powerChoices0', 'Damage');
   //10 CP /15 = 1 PL
   DomUtil.changeValue('powerRank0', 10);
   assertions.push({Expected: 5, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Power Damage to PL'});

   SelectUtil.changeText('powerSelectRange0', 'Perception');
   //40 CP /15 = 3 PL
   assertions.push({Expected: 10, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Perception Damage to PL'});

   Main.clear();
   SelectUtil.changeText('powerChoices0', 'Protection');
   DomUtil.changeValue('powerRank0', 10);
   //10 CP /15 = PL 1
   assertions.push({Expected: 5, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 0+Toughness to PL'});

   //12 CP /15 = PL 1
   DomUtil.changeValue('Dodge-input', 2);
   assertions.push({Expected: 6, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Dodge+Toughness to PL'});
   DomUtil.changeValue('Dodge-input', 0);

   DomUtil.changeValue('Parry-input', 4);
   assertions.push({Expected: 7, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Parry+Toughness to PL'});

   Main.clear();
   DomUtil.changeValue('Fortitude-input', 10);
   //10 CP /15 = PL 1
   assertions.push({Expected: 5, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 0+Fortitude to PL'});

   //12 CP /15 = PL 1
   DomUtil.changeValue('Will-input', 2);
   assertions.push({Expected: 6, Actual: Main.getDerivedValues().powerLevel, Description: 'v3.15 Will+Fortitude to PL'});

   return TestRunner.displayResults('TestSuite.main._calculatePowerLevelLimitations', assertions, testState);
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

   DomUtil.changeValue('Stamina', '--');
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'amLoading false default'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'amLoading true when loading'});

   Main.clear();  //I could Loader.resetData() but I don't need to save
   Messages.list = [];
   DomUtil.changeValue('Stamina', '--');
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

   DomUtil.changeValue('Strength', '2');
   Main.loadFromString('  \n\t');
   assertions.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Ignore blank input'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'No errors from blank input'});

   Messages.list = [];
   DomUtil.changeValue('Stamina', '--');
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
   DomUtil.changeValue('Stamina', '--');
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
