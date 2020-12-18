'use strict';
TestSuite.modifierRow={};
TestSuite.modifierRow.sanitizeStateAndGetDerivedValues=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], dataToLoad;

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({
      "effect": "Flight", "text": "", "action": "Move", "range": "Personal", "duration": "Sustained",
      "Modifiers": [{"name": "invalid name"}], "rank": 1
   });
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getRowByIndex(0)
      .getModifierList()
      .getState().length,
      Description: 'invalid mod: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.notExist'],
      Actual: Messages.errorCodes(),
      Description: 'invalid mod: error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Equipment.push({
      "effect": "Flight", "text": "", "action": "Move", "range": "Personal", "duration": "Sustained",
      "Modifiers": [{"name": "Removable"}], "rank": 1
   });
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.equipmentSection.getRowByIndex(0)
      .getModifierList()
      .getState().length,
      Description: 'removableEquipment: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.removableEquipment'],
      Actual: Messages.errorCodes(),
      Description: 'removableEquipment: error'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Flight is Personal'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Adding Attack makes Flight Close'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Limited');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Changing Attack to Limited makes Flight Personal'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Select Modifier');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'Removing Attack makes Flight Personal'});

   Main.powerSection.clear();
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getName(), Description: 'Flight has no name'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(), Description: 'Flight has no skill'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
   assertions.push({Expected: 'Power 1 Flight', Actual: Main.powerSection.getRowByIndex(0).getName(), Description: 'Adding Attack makes Flight have a name'});
   assertions.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(), Description: 'Adding Attack makes Flight have a skill'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Limited');
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getName(), Description: 'Changing Attack to Limited removes name'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(), Description: 'Changing Attack to Limited removes skill'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack'); ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Select Modifier');
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getName(), Description: 'Removing Attack removes name'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRowByIndex(0).getSkillUsed(), Description: 'Removing Attack removes skill'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Personal","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Also"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRowByIndex(0).getRange(), Description: 'range trumps modifiers: range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'range trumps modifiers: error'});

   //ADD TESTS small ones for the rest

   return TestRunner.displayResults('TestSuite.modifierRow.sanitizeStateAndGetDerivedValues', assertions, testState);
};
