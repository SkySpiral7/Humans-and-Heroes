'use strict';
TestSuite.skillList={};
TestSuite.skillList.calculateValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   DomUtil.changeValue('Strength', '--');
   SelectUtil.changeText('skillChoices0', 'Athletics');
   assertions.push({Expected: 'Always Fail', Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Missing ability always fail'});

   DomUtil.changeValue('Strength', 0);
   assertions.push({Expected: '+1', Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Normal display'});

   Main.setRuleset(3, 10);  //v3.11+ can't lack stamina
   DomUtil.changeValue('Stamina', '--');
   assertions.push({Expected: '--', Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'Missing stamina'});
   SelectUtil.changeText('skillChoices0', 'Athletics');
   SelectUtil.changeText('skillAbility0', 'Stamina');
   assertions.push({Expected: 'Always Pass', Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Missing Stamina always pass'});

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.skillList.calculateValues', assertions, testState);
};
TestSuite.skillList.load=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.skillList.load', assertions, testState);
};
