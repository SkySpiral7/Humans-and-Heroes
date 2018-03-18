'use strict';
TestSuite.abilityList={};
TestSuite.abilityList.calculateValues=function(isFirst)
{
   TestRunner.clearResults(isFirst);
   var testResults=[];

   testResults.push({Expected: '0', Actual: document.getElementById('Strength').value, Description: 'Strength says 0'});
   testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'And it is 0'});
   testResults.push({Expected: 0, Actual: Main.abilitySection.getTotal(), Description: 'ability section total = 0'});

   TestRunner.changeValue('Strength', 2);
   testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'non absent: Strength = 2'});
   testResults.push({Expected: 4, Actual: Main.abilitySection.getTotal(), Description: 'non absent: ability section total = 4'});

   TestRunner.changeValue('Awareness', '--');
   testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Awareness').isAbsent(), Description: 'absent non stamina: set'});
   testResults.push({Expected: -6, Actual: Main.abilitySection.getTotal(), Description: 'absent non stamina + Strength: ability section total = -6'});

   //3.11 doesn't allow missing Stamina. This validation is tested in TestSuite.abilityObject.set

   Main.setRuleset(1, 0);
   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: 'absent Stamina v1.0: set'});
   testResults.push({Expected: -10, Actual: Main.abilitySection.getTotal(), Description: 'absent Stamina v1.0: ability section total = -10'});

   Main.setRuleset(3, 10);
   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: 'absent Stamina v3.10: set'});
   testResults.push({Expected: 30, Actual: Main.abilitySection.getTotal(), Description: 'absent Stamina v3.10: ability section total = 30'});

   return TestRunner.displayResults('TestSuite.abilityList.calculateValues', testResults, isFirst);
};
TestSuite.abilityObject={};
TestSuite.abilityObject.set=function(isFirst)
{
   TestRunner.clearResults(isFirst);
   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   Messages.list = [];
   TestRunner.changeValue('Stamina', '3');
   TestRunner.changeValue('Stamina', '--');
   testResults.push({Expected: 3, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'absent Stamina ui: reset'});
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'absent Stamina ui: errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Strength = 1;
   dataToLoad.Abilities.Agility = '--';
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 1, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Strength = 1'});
   testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Agility').isAbsent(), Description: 'Absent Agility'});
   testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'Absent Stamina becomes 0'});
   testResults.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'Absent Stamina: Errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = 2;
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 2, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'load stamina: value'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'load stamina: no Errors'});

   Main.clear();
   Messages.list = [];
   TestRunner.changeValue('Stamina', '-7');
   testResults.push({Expected: -5, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'min Stamina: value'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'min Stamina: Errors'});

   Messages.list = [];
   TestRunner.changeValue('Stamina', 'nope');
   testResults.push({Expected: 0, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'default Stamina: value'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'default Stamina: Errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.ruleset = '3.10';
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   testResults.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: 'absent Stamina v3.10: set'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'absent Stamina v3.10: no Errors'});

   Main.clearMockMessenger();  //restore default behavior
   return TestRunner.displayResults('TestSuite.abilityObject.set', testResults, isFirst);
};
