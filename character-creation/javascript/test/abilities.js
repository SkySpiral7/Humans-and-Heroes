'use strict';
TestSuite.abilityList={};
TestSuite.abilityList.calculateValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   assertions.push({Expected: '0', Actual: document.getElementById('Strength').value, Description: 'Strength says 0'});
   assertions.push({Expected: 0, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'And it is 0'});
   assertions.push({Expected: 0, Actual: Main.abilitySection.getTotal(), Description: 'ability section total = 0'});

   DomUtil.changeValue('Strength', 2);
   assertions.push({Expected: 2, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'non absent: Strength = 2'});
   assertions.push({Expected: 4, Actual: Main.abilitySection.getTotal(), Description: 'non absent: ability section total = 4'});

   DomUtil.changeValue('Awareness', '--');
   assertions.push({Expected: true, Actual: Main.abilitySection.getByName('Awareness').isAbsent(), Description: 'absent non stamina: set'});
   assertions.push({Expected: -6, Actual: Main.abilitySection.getTotal(), Description: 'absent non stamina + Strength: ability section total = -6'});

   //3.11 doesn't allow missing Stamina. This validation is tested in TestSuite.abilityObject.set

   Main.setRuleset(1, 0);
   DomUtil.changeValue('Stamina', '--');
   assertions.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: 'absent Stamina v1.0: set'});
   assertions.push({Expected: -10, Actual: Main.abilitySection.getTotal(), Description: 'absent Stamina v1.0: ability section total = -10'});

   Main.setRuleset(3, 10);
   DomUtil.changeValue('Stamina', '--');
   assertions.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: 'absent Stamina v3.10: set'});
   assertions.push({Expected: 30, Actual: Main.abilitySection.getTotal(), Description: 'absent Stamina v3.10: ability section total = 30'});

   return TestRunner.displayResults('TestSuite.abilityList.calculateValues', assertions, testState);
};
TestSuite.abilityObject={};
TestSuite.abilityObject.set=function(testState={})
{
   TestRunner.clearResults(testState);
   var dataToLoad;
   var assertions=[];

   DomUtil.changeValue('Stamina', '3');
   DomUtil.changeValue('Stamina', '--');
   assertions.push({Expected: 3, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'absent Stamina ui: reset'});
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: false}], Actual: Messages.list, Description: 'absent Stamina ui: errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Strength = 1;
   dataToLoad.Abilities.Agility = '--';
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 1, Actual: Main.abilitySection.getByName('Strength').getValue(), Description: 'Strength = 1'});
   assertions.push({Expected: true, Actual: Main.abilitySection.getByName('Agility').isAbsent(), Description: 'Absent Agility'});
   assertions.push({Expected: 0, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'Absent Stamina becomes 0'});
   assertions.push({Expected: [{errorCode: 'AbilityObject.set.noStamina', amLoading: true}], Actual: Messages.list, Description: 'Absent Stamina: Errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.Abilities.Stamina = 2;
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 2, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'load stamina: value'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'load stamina: no Errors'});

   Main.clear();
   Messages.list = [];
   DomUtil.changeValue('Stamina', '-7');
   assertions.push({Expected: -5, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'min Stamina: value'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'min Stamina: Errors'});

   Messages.list = [];
   DomUtil.changeValue('Stamina', 'nope');
   assertions.push({Expected: 0, Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'default Stamina: value'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'default Stamina: Errors'});

   dataToLoad = Loader.resetData();
   dataToLoad.ruleset = '3.10';
   dataToLoad.Abilities.Stamina = '--';
   Loader.sendData(dataToLoad);
   assertions.push({Expected: true, Actual: Main.abilitySection.getByName('Stamina').isAbsent(), Description: 'absent Stamina v3.10: set'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'absent Stamina v3.10: no Errors'});

   return TestRunner.displayResults('TestSuite.abilityObject.set', assertions, testState);
};
