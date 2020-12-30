'use strict';
TestSuite.powerList = {};
TestSuite.powerList.clear = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(1), 'Flight');
      Main.powerSection.clear();
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getState().it.length,
         Description: 'clear removes normal'
      });

      Main.powerSection.clear();
      //and doesn't throw when no rows exist
   }
   catch (e)
   {
      assertions.push({Error: e, Description: 'clear removes normal'});
   }

   return TestRunner.displayResults('TestSuite.powerList.clear', assertions, testState);
};
TestSuite.powerList.load = function (testState = {})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions = [];

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({"effect": "not a thing"});
      dataToLoad.Powers.push({"effect": "Flight"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRowByIndex(0).getEffect(), Description: 'can load basic power'});
      assertions.push({Expected: 1, Actual: Main.powerSection.getState().it.length, Description: 'ignored invalid power'});
      //don't assert the error message since that's covered by power row. this is just testing it checks for return undefined
   }
   catch (e)
   {assertions.push({Error: e, Description: 'loading power'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Equipment.push({"effect": "not a thing"});
      dataToLoad.Equipment.push({"effect": "Flight"});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Flight',
         Actual: Main.equipmentSection.getRowByIndex(0).getEffect(),
         Description: 'can load basic equipment'
      });
      assertions.push({Expected: 1, Actual: Main.equipmentSection.getState().it.length, Description: 'ignored invalid equipment'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'loading equipment'});}

   return TestRunner.displayResults('TestSuite.powerList.load', assertions, testState);
};
TestSuite.powerList.save = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   assertions.push({
      Expected: [],
      Actual: Main.powerSection.save(),
      Description: 'save empty'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(1), 'Flight');
   const actual = Main.powerSection.save();
   assertions.push({
      Expected: 'Damage',
      Actual: actual[0].effect,
      Description: 'saved first'
   });
   assertions.push({
      Expected: 'Flight',
      Actual: actual[1].effect,
      Description: 'saved list'
   });
   assertions.push({
      Expected: 2,
      Actual: actual.length,
      Description: 'no other'
   });

   return TestRunner.displayResults('TestSuite.powerList.save', assertions, testState);
};
TestSuite.powerList.setMainState = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   assertions.push({Expected: false, Actual: Main.powerSection.getState().main.godhood, Description: 'before'});
   DomUtil.changeValue('Strength', 20);
   assertions.push({Expected: true, Actual: Main.powerSection.getState().main.godhood, Description: 'after'});

   return TestRunner.displayResults('TestSuite.powerList.setMainState', assertions, testState);
};
TestSuite.powerList.updateEffectByKey = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getState().it.length,
      Description: 'add'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getState().it.length,
      //TODO: should I test the reuse of keys?
      Description: 'update/replace'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Select Power');
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getState().it.length,
      Description: 'remove'
   });

   return TestRunner.displayResults('TestSuite.powerList.updateEffectByKey', assertions, testState);
};
TestSuite.powerList.updatePropertyByKey = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), 'my text');
      assertions.push({
         Expected: 'my text',
         Actual: Main.powerSection.getState().it[0].text,
         Description: 'happy path: text'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'happy path'});}

   try
   {
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
      assertions.push({
         Expected: 'Move',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'flight default action is not none'
      });
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Permanent');
      assertions.push({
         Expected: 'None',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'change to Permanent: changes action to none'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'change to Permanent: no error'});

      Messages.clear();
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
      assertions.push({
         Expected: 'Move',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'change from Permanent: sets default action'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'change from Permanent: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'non permanent default'});}

   try
   {
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Immunity');
      assertions.push({
         Expected: 'None',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'Immunity default action is none'
      });

      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
      assertions.push({
         Expected: 'Free',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'change from Permanent: uses free action instead of default none'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Immunity change from Permanent: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'permanent default'});}

   try
   {
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: 'Close',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Damage Aura: sets close range'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Damage Aura: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Damage Aura'});}

   try
   {
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Feature reaction: same range'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Feature reaction: no error'});

      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Luck Control');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Luck Control reaction: same range'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Luck Control reaction: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'reaction same range'});}

   try
   {
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Standard');
      assertions.push({
         Expected: 'Close',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Removing Aura: leaves range as close'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Removing Aura: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Removing Aura'});}

   //testing the mod key list length is covered by the above (and there's nothing to assert except keys)

   try
   {
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      assertions.push({
         Expected: 'Free',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'Feature non personal: new action'
      });
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Feature non personal: same range'
      });
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'Feature non personal: new duration'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Feature non personal: no error'});

      Messages.clear();
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Personal');
      assertions.push({
         Expected: 'Free',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'Feature to personal: same action'
      });
      assertions.push({
         Expected: 'Personal',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Feature to personal: same range'
      });
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'Feature to personal: same duration'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Feature to personal: no error'});

      Messages.clear();
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      assertions.push({
         Expected: 'Free',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'Feature from personal non-perm: same action'
      });
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Feature from personal non-perm: same range'
      });
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'Feature from personal non-perm: same duration'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Feature from personal non-perm: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Feature personal'});}

   try
   {
      Main.setRuleset(3, 3);
      Messages.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'v3.3 Damage reaction: same range'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'v3.3 Damage reaction: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'v3.3 Damage reaction'});}

   return TestRunner.displayResults('TestSuite.powerList.updatePropertyByKey', assertions, testState);
};
TestSuite.powerList.updateModifierNameByRow = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
      assertions.push({
         Expected: 'Accurate',
         Actual: Main.powerSection.getState().it[0].Modifiers[0].name,
         Description: 'happy path: add mod'
      });

      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Limited');
      assertions.push({
         Expected: 'Limited',
         Actual: Main.powerSection.getState().it[0].Modifiers[0].name,
         Description: 'happy path: change mod'
      });

      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Select Modifier');
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getState().it[0].Modifiers.length,
         Description: 'happy path: remove mod'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'happy path'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Permanent');
      //mod 0 is increased duration
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Attack');
      //removes increased duration so mod 0 is now attack
      assertions.push({
         Expected: 'Close',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'flight attack changes range'
      });
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'flight attack changes duration'
      });
      assertions.push({
         Expected: 'Move',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'flight attack changes action'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'flight attack: no errors'});

      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      //mod 0 is now increased range
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Affects Others Only');
      assertions.push({
         Expected: 'Ranged',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'changing non personal mod doesn\'t touch things'
      });

      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
      //mod 0-2 are auto
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 3), 'Select Modifier');
      //this also shows that it can handle changing to blank mod row correctly
      assertions.push({
         Expected: 'Personal',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'removing mod changes to personal'
      });
      assertions.push({
         Expected: 'Concentration',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'removing mod: same duration'
      });
      assertions.push({
         Expected: 'Slow',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'removing mod: same action'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'flight removing attack: no errors'});

      //mod 0-1 are still auto but the auto range was removed
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 2), 'Attack');
      assertions.push({
         Expected: 'Close',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'flight attack still changes range'
      });
      assertions.push({
         Expected: 'Slow',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'flight attack still same action'
      });
      assertions.push({
         Expected: 'Concentration',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'flight attack still same duration'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'flight attack 2: no errors'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'non personal default non permanent'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Immunity');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
      assertions.push({
         Expected: 'Close',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Immunity attack: changes range'
      });
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'Immunity attack: changes duration'
      });
      assertions.push({
         Expected: 'Free',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'Immunity attack: changes action'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Immunity attack: no errors'});

      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Move');
      //mod 0 is decreased action
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Limited');
      assertions.push({
         Expected: 'Personal',
         Actual: Main.powerSection.getState().it[0].range,
         Description: 'Immunity removing mod changes to personal'
      });
      assertions.push({
         Expected: 'Move',
         Actual: Main.powerSection.getState().it[0].action,
         Description: 'Immunity removing mod: same action'
      });
      assertions.push({
         Expected: 'Sustained',
         Actual: Main.powerSection.getState().it[0].duration,
         Description: 'Immunity removing mod: same duration'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'Immunity removing attack: no errors'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'non personal default permanent'});}

   return TestRunner.displayResults('TestSuite.powerList.updateModifierNameByRow', assertions, testState);
};
TestSuite.powerList.updateModifierPropertyByKey = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
      ReactUtil.changeValue('powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Cube');
      assertions.push({
         Expected: 'Cube',
         Actual: Main.powerSection.getState().it[0].Modifiers[0].text,
         Description: 'happy path: text'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'happy path'});}

   return TestRunner.displayResults('TestSuite.powerList.updateModifierPropertyByKey', assertions, testState);
};
TestSuite.powerList.calculateValues = function (testState = {})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   assertions.push({Expected: undefined, Actual: Main.powerSection.getProtectionRankTotal(), Description: 'Protection default: undefined'});

   try
   {
      DomUtil.changeValue('transcendence', 1);
      assertions.push({Expected: false, Actual: Main.getEveryVar().powerGodhood, Description: 'powerGodhood starts false'});
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'A God I Am');
      assertions.push({Expected: true, Actual: Main.getEveryVar().powerGodhood, Description: 'sets powerGodhood to true'});
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
      assertions.push({Expected: false, Actual: Main.getEveryVar().powerGodhood, Description: 'sets powerGodhood to false'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'powerGodhood'});}

   Main.clear();
   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Protection');
      assertions.push({Expected: 1, Actual: Main.powerSection.getProtectionRankTotal(), Description: 'picks up protection'});

      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(1), 'Protection');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(1), 2);
      assertions.push({Expected: 2, Actual: Main.powerSection.getProtectionRankTotal(), Description: 'protection doesn\'t stack'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'protection ranks'});}

   Main.powerSection.clear();
   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerSkill' + Main.powerSection.indexToKey(0), 'swords');
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getAttackEffectRanks().get('swords'),
         Description: 'skill map: attack power'
      });

      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(1), 'Flight');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(1, 0), 'Attack');
      ReactUtil.changeValue('powerSkill' + Main.powerSection.indexToKey(1), 'guns');
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getAttackEffectRanks().get('guns'),
         Description: 'skill map: attack mod'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'skill map'});}

   Main.powerSection.clear();
   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(1), 'Nullify');
      assertions.push({Expected: 4, Actual: Main.powerSection.getTotal(), Description: 'total'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'total'});}

   Main.setRuleset(1, 0);
   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Protection');
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(1), 'Protection');
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(1), 2);
      assertions.push({Expected: 3, Actual: Main.powerSection.getProtectionRankTotal(), Description: 'v1: protection stacks'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'v1: protection'});}

   return TestRunner.displayResults('TestSuite.powerList.calculateValues', assertions, testState);
};
TestSuite.powerList.notifyDependent = function (testState = {})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'power doesn\'t call calculateEquipmentRank'
   });
   ReactUtil.changeValue('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 1,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'equipment calls calculateEquipmentRank'
   });

   return TestRunner.displayResults('TestSuite.powerList.notifyDependent', assertions, testState);
};
TestSuite.powerList.saveRowToState = function (testState = {})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions = [];

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Powers.push({"effect": "Attain Knowledge", cost: 5});
      dataToLoad.Powers.push({"effect": "Damage", skill: 'swords', "Modifiers": [{name: 'Area', applications: 2}]});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 2, Actual: Main.powerSection.getState().it.length, Description: 'loaded powers'});
      assertions.push({
         Expected: 'Attain Knowledge',
         Actual: Main.powerSection.getRowByIndex(0).getEffect(),
         Description: 'Attain Knowledge: effect'
      });
      assertions.push({
         Expected: 5,
         Actual: Main.powerSection.getRowByIndex(0).getState().baseCost,
         Description: 'Attain Knowledge: converted baseCost'
      });
      assertions.push({
         Expected: 'Damage',
         Actual: Main.powerSection.getRowByIndex(1).getEffect(),
         Description: 'Damage: effect'
      });
      assertions.push({
         Expected: 'swords',
         Actual: Main.powerSection.getRowByIndex(1).getState().skillUsed,
         Description: 'Damage: converted skill'
      });
      assertions.push({
         Expected: 2,
         Actual: Main.powerSection.getRowByIndex(1).getState().Modifiers[0].rank,
         Description: 'Damage mod: converted rank'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'no mods'});}

   return TestRunner.displayResults('TestSuite.powerList.saveRowToState', assertions, testState);
};
