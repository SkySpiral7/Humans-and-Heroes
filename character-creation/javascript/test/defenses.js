'use strict';
TestSuite.defenseList={};
TestSuite.defenseList.calculateValues=function(testState={})
{
    TestRunner.clearResults(testState);  //this also sets old rules to false

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: '0', Actual: document.getElementById('Will-start').innerHTML, Description: actionTaken+': Will defense inital says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Description: actionTaken+': And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will-input').value, Description: actionTaken+': Will defense input says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getRank(), Description: actionTaken+': And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will-final').innerHTML, Description: actionTaken+': Will defense bonus says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Description: actionTaken+': And it is 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Description: actionTaken+': The defense section total cost is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Presence').getValue(), Description: actionTaken+': Presence is 0'});

   //test new rule functionality
    actionTaken='Set Presence'; TestRunner.changeValue('Presence', 2);
    testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Presence').getValue(), Description: actionTaken+': Presence was set to 2'});
    testResults.push({Expected: '2', Actual: document.getElementById('Will-start').innerHTML, Description: actionTaken+': Will defense inital says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Description: actionTaken+': And it is 2'});
    testResults.push({Expected: '2', Actual: document.getElementById('Will-final').innerHTML, Description: actionTaken+': Will defense bonus says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Description: actionTaken+': And it is 2'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Description: actionTaken+': The defense section total cost is 0'});

    actionTaken='Change Will'; TestRunner.changeValue('Will-input', 1);
    testResults.push({Expected: '2', Actual: document.getElementById('Will-start').innerHTML, Description: actionTaken+': Will defense inital says 2'});
    testResults.push({Expected: 2, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Description: actionTaken+': And it is 2'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getByName('Will').getRank(), Description: actionTaken+': Will defense input is 1'});
    //document.getElementById('Will-input').value is always valid (as long as TestRunner.changeValue works)
    testResults.push({Expected: '3', Actual: document.getElementById('Will-final').innerHTML, Description: actionTaken+': Will defense bonus says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Description: actionTaken+': And it is 3'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getTotal(), Description: actionTaken+': The defense section total cost is 1'});
    //abilitySection and defenseSection are both cleared by Main.setRuleset

   //test old rule functionality
    actionTaken='Set Old Rules'; Main.setRuleset(1, 1);
    testResults.push({Expected: '0', Actual: document.getElementById('Will-start').innerHTML, Description: actionTaken+': Will defense inital says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Description: actionTaken+': And it is 0'});
    testResults.push({Expected: '0', Actual: document.getElementById('Will-final').innerHTML, Description: actionTaken+': Will defense bonus says 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Description: actionTaken+': And it is 0'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Description: actionTaken+': The defense section total cost is 0'});
    testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Awareness').getValue(), Description: actionTaken+': Awareness is 0'});

    actionTaken='Set Awareness'; TestRunner.changeValue('Awareness', 3);
    testResults.push({Expected: 3, Actual: Main.abilitySection.getByName('Awareness').getValue(), Description: actionTaken+': Awareness was set to 3'});
    testResults.push({Expected: '3', Actual: document.getElementById('Will-start').innerHTML, Description: actionTaken+': Will defense inital says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Description: actionTaken+': And it is 3'});
    testResults.push({Expected: '3', Actual: document.getElementById('Will-final').innerHTML, Description: actionTaken+': Will defense bonus says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Description: actionTaken+': And it is 3'});
    testResults.push({Expected: 0, Actual: Main.defenseSection.getTotal(), Description: actionTaken+': The defense section total cost is 0'});

    actionTaken='Change Will'; TestRunner.changeValue('Will-input', 1);
    testResults.push({Expected: '3', Actual: document.getElementById('Will-start').innerHTML, Description: actionTaken+': Will defense inital says 3'});
    testResults.push({Expected: 3, Actual: Main.defenseSection.getByName('Will').getAbilityValue(), Description: actionTaken+': And it is 3'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getByName('Will').getRank(), Description: actionTaken+': Will defense input is 1'});
    testResults.push({Expected: '4', Actual: document.getElementById('Will-final').innerHTML, Description: actionTaken+': Will defense bonus says 4'});
    testResults.push({Expected: 4, Actual: Main.defenseSection.getByName('Will').getTotalBonus(), Description: actionTaken+': And it is 4'});
    testResults.push({Expected: 1, Actual: Main.defenseSection.getTotal(), Description: actionTaken+': The defense section total cost is 1'});
    Main.setRuleset(2, 7);

    return TestRunner.displayResults('TestSuite.defenseList.calculateValues', testResults, testState);
};
TestSuite.defenseList.load=function(testState={})
{
   TestRunner.clearResults(testState);
   var testResults=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.defenseList.load', testResults, testState);
};
TestSuite.defenseList.calculateToughness=function(testState={})
{
   TestRunner.clearResults(testState);
   var testResults=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.defenseList.calculateToughness', testResults, testState);
};
