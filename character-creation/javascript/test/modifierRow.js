'use strict';
TestSuite.modifierRow = {};
TestSuite.modifierRow.getUniqueName = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Affects Others Also');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Affects Others Only');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Affects Others duplicate'
   });
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Attack');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Attack duplicate'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Affects Objects Also');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Affects Objects Only');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Affects Objects duplicate'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Resistance (Free)');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Alternate Resistance (Cost)');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Alternate Resistance duplicate'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Removable');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Removable duplicate'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Inaccurate');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Accurate');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Accurate duplicate'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Extended Range');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Diminished Range');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Diminished Range duplicate'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Area');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'other duplicate'
   });

   Main.setRuleset(1, 0);
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Dynamic Alternate Effect');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Alternate Effect');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: '1.0 Alternate Effect duplicate'
   });

   return TestRunner.displayResults('TestSuite.modifierRow.getUniqueName', assertions, testState);
};
TestSuite.modifierRow.sanitizeStateAndGetDerivedValues = function (testState = {})
{
   TestRunner.clearResults(testState);

   var assertions = [], dataToLoad;

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Flight", "Modifiers": [{"name": "invalid name"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'invalid mod: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.notExist'],
      Actual: Messages.errorCodes(),
      Description: 'invalid mod: error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Equipment.push({"effect": "Flight", "Modifiers": [{"name": "Removable"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.equipmentSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'removableEquipment: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.removableEquipment'],
      Actual: Messages.errorCodes(),
      Description: 'removableEquipment: error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Equipment.push({"effect": "Flight", "Modifiers": [{"name": "Easily Removable"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.equipmentSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'Easily removableEquipment: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.removableEquipment'],
      Actual: Messages.errorCodes(),
      Description: 'Easily removableEquipment: error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Flight", "range": "Personal", "Modifiers": [{"name": "Attack"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'non personal mod but range personal: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.nonPersonal'],
      Actual: Messages.errorCodes(),
      Description: 'non personal mod but range personal: error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "range": "Close", "Modifiers": [{"name": "Affects Others Only"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState().length,
      Description: 'non personal mod but can\'t make personal: removed'
   });
   assertions.push({
      Expected: ['ModifierObject.sanitizeStateAndGetDerivedValues.nonPersonal'],
      Actual: Messages.errorCodes(),
      Description: 'non personal mod but can\'t make personal: error'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
   assertions.push({
      Expected: false,
      Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.hasRank,
      Description: 'Selective !hasRank'
   });
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
   assertions.push({
      Expected: true,
      Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.hasRank,
      Description: 'Area hasRank'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{"name": "Fragile", applications: 2}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 2,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.rank,
      Description: 'load fragile ranks: rank'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load fragile ranks: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{"name": "Fragile", applications: 'invalid'}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.rank,
      Description: 'load fragile invalid: rank'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load fragile invalid: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{"name": "Fragile", applications: -5}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.rank,
      Description: 'load fragile min: rank'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load fragile min: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{"name": "Limited", applications: 'nothing'}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.rank,
      Description: 'load other invalid: rank'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load other invalid: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{"name": "Limited", applications: -5}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.rank,
      Description: 'load other min: rank'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load other min: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{"name": "Selective", applications: 10}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.rank,
      Description: 'load !hasRank: rank'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load !hasRank: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({effect: "Damage", Modifiers: [{name: "Removable"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: Data.Modifier.Removable.defaultText,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.text,
      Description: 'load defaultText: text'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load defaultText: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({effect: "Damage", Modifiers: [{name: "Removable", text: 'undefined'}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      //not a real scenario but allowed
      Expected: 'undefined',
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.text,
      Description: 'load text: text'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load text: no error'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({effect: "Damage", Modifiers: [{name: "Selective", text: 'something'}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: undefined,
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.text,
      Description: 'load !hasText: text'
   });
   assertions.push({
      Expected: [],
      Actual: Messages.errorCodes(),
      Description: 'load !hasText: no error'
   });

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
      assertions.push({
         Expected: -1,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Decreased Duration: normal -1 cost'
      });
      assertions.push({
         Expected: [{name: 'Decreased Duration', applications: 1}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Decreased Duration: mod'
      });

      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Increased Duration: normal cost'
      });
      assertions.push({
         Expected: [{name: 'Increased Duration', applications: 1}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Increased Duration: mod'
      });

      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Permanent');
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Increased Duration: sustained to Permanent cost'
      });
      assertions.push({
         Expected: [{name: 'Increased Duration', applications: 2}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Increased Duration: sustained to Permanent mod'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'in/de crease duration: default sustained'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Immunity');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Decreased Duration: permanent to sustained is 0'
      });
      assertions.push({
         Expected: [{name: 'Decreased Duration', applications: 2}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Decreased Duration: permanent to sustained mod'
      });

      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Decreased Duration: permanent to Continuous cost 1'
      });
      assertions.push({
         Expected: [{name: 'Decreased Duration', applications: 1}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Decreased Duration: permanent to Continuous mod'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'in/de crease duration: default Permanent'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Mind Reading');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
      assertions.push({
         Expected: -2,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Perception to ranged: cost'
      });
      assertions.push({
         Expected: [{name: 'Reduced Range', applications: 1}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Perception to ranged: mod'
      });

      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
      assertions.push({
         Expected: -3,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'Perception to Close: cost'
      });
      assertions.push({
         Expected: [{name: 'Reduced Range', applications: 2}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'Perception to Close: mod'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: '-Range: default Perception'});}

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
      assertions.push({
         Expected: 2,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'ranged to Perception: cost'
      });
      assertions.push({
         Expected: [{name: 'Increased Range', applications: 1}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'ranged to Perception: mod'
      });

      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
      assertions.push({
         Expected: -1,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
         Description: 'ranged to Close: cost'
      });
      assertions.push({
         Expected: [{name: 'Reduced Range', applications: 1}],
         Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
         Description: 'ranged to Close: mod'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: '+Range: default Ranged'});}

   return TestRunner.displayResults('TestSuite.modifierRow.sanitizeStateAndGetDerivedValues', assertions, testState);
};
TestSuite.modifierRow.toSave = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 2);
   ReactUtil.changeValue('powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'cube');
   assertions.push({
      Expected: {name: 'Area', applications: 2, text: 'cube'},
      Actual: Main.save().Powers[0].Modifiers[0],
      Description: 'hasRank hasText'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
   assertions.push({
      Expected: {name: 'Selective'},
      Actual: Main.save().Powers[0].Modifiers[0],
      Description: '!hasRank !hasText'
   });

   return TestRunner.displayResults('TestSuite.modifierRow.toSave', assertions, testState);
};
