'use strict';
TestSuite.modifierList = {};
TestSuite.modifierList.save = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).save().Modifiers,
      Description: 'save empty'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Accurate');
   assertions.push({
      Expected: [{name: 'Area', applications: 1, text: 'Shape'}, {name: 'Accurate', applications: 1}],
      Actual: Main.powerSection.getRowByIndex(0).save().Modifiers,
      Description: 'save list'
   });

   return TestRunner.displayResults('TestSuite.modifierList.save', assertions, testState);
};
TestSuite.modifierList.calculateGrandTotal = function (testState = {})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');

   try
   {
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);
      assertions.push({Expected: 99, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 99 initial total'});

      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({
         Expected: 50,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 99 Alternate Effect power total'
      });
      assertions.push({
         Expected: -49,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 99 Alternate Effect autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      assertions.push({
         Expected: 50,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 100 Alternate Effect power total'
      });
      assertions.push({
         Expected: -50,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 100 Alternate Effect autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 1 Alternate Effect power total'
      });
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 1 Alternate Effect autoTotal'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Alternate Effect'});}

   try
   {
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
      assertions.push({
         Expected: 60,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 99 Easily Removable power total'
      });
      assertions.push({
         Expected: -39,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 99 Easily Removable autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      assertions.push({
         Expected: 60,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 100 Easily Removable power total'
      });
      assertions.push({
         Expected: -40,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 100 Easily Removable autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 1 Easily Removable power total'
      });
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 1 Easily Removable autoTotal'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Easily Removable'});}

   try
   {
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
      assertions.push({
         Expected: 80,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 99 Removable power total'
      });
      assertions.push({
         Expected: -19,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 99 Removable autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      assertions.push({
         Expected: 80,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Damage 100 Removable power total'
      });
      assertions.push({
         Expected: -20,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 100 Removable autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 1 Removable power total'});
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Damage 1 Removable autoTotal'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Removable'});}

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   assertions.push({
      Expected: undefined,
      Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
      Description: 'autoTotal for rest'
   });

   try
   {
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
      //notice they are in the wrong order because code should ignore order
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Alternate Effect');
      assertions.push({
         Expected: 40,  //100/2 => 50/5 = 10 (no rounding). 100-50-10 = 40
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: 'Alternate Effect and Removable stack: power total'
      });
      assertions.push({
         Expected: -10,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: 'Alternate Effect and Removable stack: Removable\'s autoTotal'
      });
      assertions.push({
         Expected: -50,
         Actual: Main.powerSection.getModifierRowShort(0, 1).derivedValues.autoTotal,
         Description: 'Alternate Effect and Removable stack: Alternate Effect\'s autoTotal'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Alternate Effect and Removable stack'});}

   Main.setRuleset(1, 0);
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');

   try
   {
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Dynamic Alternate Effect');
      assertions.push({
         Expected: 2,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: '1.0 Damage 99 Dynamic Alternate Effect power total'
      });
      assertions.push({
         Expected: -97,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: '1.0 Damage 99 Dynamic Alternate Effect autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      assertions.push({
         Expected: 2,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: '1.0 Damage 100 Dynamic Alternate Effect power total'
      });
      assertions.push({
         Expected: -98,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: '1.0 Damage 100 Dynamic Alternate Effect autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);
      assertions.push({
         Expected: 2,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: '1.0 Damage 1 Dynamic Alternate Effect: flat 2 cost'
      });
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: '1.0 Damage 1 Dynamic Alternate Effect: autoTotal can be positive'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: '1.0 Damage Dynamic Alternate Effect'});}

   try
   {
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: '1.0 Damage 99 Alternate Effect power total'
      });
      assertions.push({
         Expected: -98,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: '1.0 Damage 99 Alternate Effect autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         Description: '1.0 Damage 100 Alternate Effect power total'
      });
      assertions.push({
         Expected: -99,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: '1.0 Damage 100 Alternate Effect: autoTotal'
      });

      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);
      assertions.push({
         Expected: 1,
         Actual: Main.powerSection.getRowByIndex(0).getTotal(),
         //TODO: look at changing 1.0 alt effects into an extra (like the book has)
         Description: '1.0 Damage 1 Alternate Effect: flat 1 cost'
      });
      assertions.push({
         Expected: 0,
         Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.autoTotal,
         Description: '1.0 Damage 1 Dynamic Alternate Effect: autoTotal can be 0'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: '1.0 Damage Alternate Effect'});}

   return TestRunner.displayResults('TestSuite.modifierList.calculateGrandTotal', assertions, testState);
};
TestSuite.modifierList.createByNameRank = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 'Close',
      Actual: Main.powerSection.getRowByIndex(0).getRange(),
      Description: 'Damage default range Close'
   });
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'Damage default range Close: no mods'
   });

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
   assertions.push({
      Expected: [{"name": "Increased Range", "applications": 1}],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'Create range mod if not found'
   });

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
   assertions.push({
      Expected: [{"name": "Increased Range", "applications": 2}],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'update existing range mod'
   });
   assertions.push({
      Expected: 3,
      Actual: Main.powerSection.getModifierRowShort(0, 0).derivedValues.rawTotal,
      Description: 'and updated derivedValues'
   });

   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Full');
   assertions.push({
      Expected: 'Slower Action',
      Actual: Main.powerSection.getModifierRowShort(0, 0).state.name,
      Description: 'new auto mods are sorted into place'
   });
   assertions.push({
      Expected: 'Increased Range',
      Actual: Main.powerSection.getModifierRowShort(0, 1).state.name,
      Description: 'new auto mods keep old ones'
   });

   return TestRunner.displayResults('TestSuite.modifierList.createByNameRank', assertions, testState);
};
TestSuite.modifierList.isNonPersonalModifierPresent = function (testState = {})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions = [];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({
      "effect": "Flight", "text": "", "action": "Move", "range": "Close", "duration": "Sustained",
      "Modifiers": [{"name": "Other Flat Extra"}, {"name": "Affects Others Only"}], "rank": 1
   });
   //also note that the modifier isn't first and is last for 2 possible edge cases
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'true: Affects Others Only'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({
      "effect": "Flight", "text": "", "action": "Move", "range": "Close", "duration": "Sustained",
      "Modifiers": [{"name": "Affects Others Also"}], "rank": 1
   });
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'true: Affects Others Also'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({
      "effect": "Flight", "text": "", "action": "Move", "range": "Close", "duration": "Sustained",
      "Modifiers": [{"name": "Attack"}], "rank": 1
   });
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'true: Attack'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Flight", "text": "", "action": "Move", "range": "Close", "duration": "Sustained", "rank": 1});
   Loader.sendData(dataToLoad);
   //actual error is tested by power row
   assertions.push({Expected: 1, Actual: Messages.getAll().length, Description: 'false: Modifiers undefined'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({
      "effect": "Flight", "text": "", "action": "Move", "range": "Close", "duration": "Sustained",
      "Modifiers": [], "rank": 1
   });
   Loader.sendData(dataToLoad);
   //actual error is tested by power row
   assertions.push({Expected: 1, Actual: Messages.getAll().length, Description: 'false: Modifiers []'});

   return TestRunner.displayResults('TestSuite.modifierList.isNonPersonalModifierPresent', assertions, testState);
};
TestSuite.modifierList.sanitizeStateAndGetDerivedValues = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let dataToLoad;

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage"});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'undefined Modifiers: no error'});
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'undefined Modifiers: converted to []'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Flight", "Modifiers": [{name: "invalid"}]});
   Loader.sendData(dataToLoad);
   //actual error is tested by mod row
   assertions.push({Expected: 1, Actual: Messages.getAll().length, Description: 'load invalid mod: error'});
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'load invalid mod: removed'
   });

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect": "Damage", "Modifiers": [{name: "Area"}, {name: "Area"}]});
   Loader.sendData(dataToLoad);
   assertions.push({
      Expected: ['ModifierList.sanitizeStateAndGetDerivedValues.duplicate'],
      Actual: Messages.errorCodes(),
      Description: 'duplicate: error'
   });
   assertions.push({
      Expected: [{name: "Area", rank: 1, text: 'Shape'}],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getState(),
      Description: 'duplicate: removed'
   });

   return TestRunner.displayResults('TestSuite.modifierList.sanitizeStateAndGetDerivedValues', assertions, testState);
};
TestSuite.modifierList.removeByName = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 'Close',
      Actual: Main.powerSection.getRowByIndex(0).getRange(),
      Description: 'Damage default range Close'
   });
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'Damage default range Close: no mods'
   });

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
   assertions.push({
      Expected: 1,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save().length,
      Description: 'auto create range mod'
   });

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().save(),
      Description: 'auto remove mod'
   });
   assertions.push({
      Expected: [],
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getDerivedValues().rows,
      Description: 'which updated DerivedValues'
   });

   return TestRunner.displayResults('TestSuite.modifierList.removeByName', assertions, testState);
};
TestSuite.modifierList.calculateValues = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
   assertions.push({
      Expected: {'Alternate Effect': 0},
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getDerivedValues().autoModifierNameToRowIndex,
      Description: 'Alternate Effect mapped'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Area');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '3');
   assertions.push({
      Expected: 3,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getDerivedValues().rankTotal,
      Description: 'Rank total'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '2');
   assertions.push({
      Expected: 2,
      Actual: Main.powerSection.getRowByIndex(0).getModifierList().getDerivedValues().flatTotal,
      Description: 'Flat total'
   });

   return TestRunner.displayResults('TestSuite.modifierList.calculateValues', assertions, testState);
};
TestSuite.modifierList.sortOrder = function (testState = {})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try
   {
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Free');
      //this test proves that these are in the right order: Faster Action, Increased Range, Increased Duration, else

      assertions.push({
         Expected: 'Faster Action',
         Actual: Main.powerSection.getModifierRowShort(0, 0).state.name,
         Description: 'Auto Extras: Modifier 1'
      });
      assertions.push({
         Expected: 'Increased Range',
         Actual: Main.powerSection.getModifierRowShort(0, 1).state.name,
         Description: 'Auto Extras: Modifier 2'
      });
      assertions.push({
         Expected: 'Increased Duration',
         Actual: Main.powerSection.getModifierRowShort(0, 2).state.name,
         Description: 'Auto Extras: Modifier 3'
      });
      assertions.push({
         Expected: 'Selective',
         Actual: Main.powerSection.getModifierRowShort(0, 3).state.name,
         Description: 'Auto Extras: Modifier 4'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Auto Extras'});}

   try
   {
      Main.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
      //this test proves that these are in the right order: Slower Action, Reduced Range, Decreased Duration, else

      assertions.push({
         Expected: 'Slower Action',
         Actual: Main.powerSection.getModifierRowShort(0, 0).state.name,
         Description: 'Auto Flaws: Modifier 1'
      });
      assertions.push({
         Expected: 'Reduced Range',
         Actual: Main.powerSection.getModifierRowShort(0, 1).state.name,
         Description: 'Auto Flaws: Modifier 2'
      });
      assertions.push({
         Expected: 'Decreased Duration',
         Actual: Main.powerSection.getModifierRowShort(0, 2).state.name,
         Description: 'Auto Flaws: Modifier 3'
      });
      assertions.push({
         Expected: 'Selective',
         Actual: Main.powerSection.getModifierRowShort(0, 3).state.name,
         Description: 'Auto Flaws: Modifier 4'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Auto Flaws'});}

   try
   {
      Main.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
      //this test proves that Aura comes before Reduced Range

      assertions.push({
         Expected: 'Aura',
         Actual: Main.powerSection.getModifierRowShort(0, 0).state.name,
         Description: 'Aura sort order: Aura first'
      });
      assertions.push({
         Expected: 'Reduced Range',
         Actual: Main.powerSection.getModifierRowShort(0, 1).state.name,
         Description: 'Aura sort order: then range'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Aura sort order'});}

   try
   {
      Main.setRuleset(3, 3);
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
      ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
      ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');

      assertions.push({
         Expected: 'Faster Action',
         Actual: Main.powerSection.getModifierRowShort(0, 0).state.name,
         Description: 'Selective span sorts before Range: action'
      });
      assertions.push({
         Expected: 'Selective',
         Actual: Main.powerSection.getModifierRowShort(0, 1).state.name,
         Description: 'Selective span sorts before Range: Selective'
      });
      assertions.push({
         Expected: 'Reduced Range',
         Actual: Main.powerSection.getModifierRowShort(0, 2).state.name,
         Description: 'Selective span sorts before Range: then range'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Selective span sorts before Range'});}

   try
   {
      Main.clear();
      ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Precise');
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Selective');
      ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');

      assertions.push({
         Expected: 'Decreased Duration',
         Actual: Main.powerSection.getModifierRowShort(0, 0).state.name,
         Description: 'Selective non-span retains order: Duration'
      });
      assertions.push({
         Expected: 'Precise',
         Actual: Main.powerSection.getModifierRowShort(0, 1).state.name,
         Description: 'Selective non-span retains order: then rest'
      });
      assertions.push({
         Expected: 'Selective',
         Actual: Main.powerSection.getModifierRowShort(0, 2).state.name,
         Description: 'Selective non-span retains order: Selective'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Selective non-span retains order'});}

   return TestRunner.displayResults('TestSuite.modifierList.sortOrder', assertions, testState);
};
