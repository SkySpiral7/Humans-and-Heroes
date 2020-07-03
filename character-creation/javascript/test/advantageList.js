'use strict';
TestSuite.advantageList = {};
TestSuite.advantageList.addRow = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getState().it.length,
         Description: 'removes Duplicate'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'removes Duplicate'});}

   return TestRunner.displayResults('TestSuite.advantageList.addRow', assertions, testState);
};
TestSuite.advantageList.calculateEquipmentRank = function (testState = {})
{
   /*if (undefined === testState) testState = {};  //TODO: have tests support IE 11?
   IE 11 has strict, let, const but not ... spread, => arrow, and default parameters
   also promise https://stackoverflow.com/questions/36016327/how-to-make-promises-work-in-ie11
   might have to transpile tests in babel
   maybe I need https://create-react-app.dev/docs/supported-browsers-features/
   or at least polyfill: https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
   */
   TestRunner.clearResults(testState);
   /*TODO: better? test runner API:
   fewer args but has more functionality. now requires DSL instead of []
   TestSuite.advantageList.calculateEquipmentRank = function (testState)
   {
   testState = TestRunner.init(testState);

   testState.assert({});  //immediately convert to results. this allows very short lived equals
   testState.assertAll([{}, {}]);
   testState.failedToThrow('because it should');
   testState.error(e, 'input is copied over on change');

   return testState.determineResultsFor('TestSuite.abilityList.calculateValues');
   }*/

   const assertions = [];
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'Equipment Row does not exist'
   });
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getEquipmentMaxTotal(),
      Description: 'Equipment Max Total is 0'
   });

   try
   {
      SelectUtil.changeText('equipmentChoices0', 'Damage');  //use Damage because it has a base cost of 1
      assertions.push({
         Expected: 'Equipment',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Damage Added: Equipment Row is created'
      });
      assertions.push({
         Expected: 5,
         Actual: Main.advantageSection.getEquipmentMaxTotal(),
         Description: 'Damage Added: Equipment Max Total is now the minimum'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it[0].rank, Description: 'Damage Added: Equipment rank is 1'});

      DomUtil.changeValue('equipmentRank0', 5);
      assertions.push({
         Expected: 5,
         Actual: Main.advantageSection.getEquipmentMaxTotal(),
         Description: 'Damage Rank 5: Equipment Max Total still 5'
      });
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getState().it[0].rank,
         Description: 'Damage Rank 5: Equipment rank still 1'
      });

      DomUtil.changeValue('equipmentRank0', 6);
      assertions.push({
         Expected: 10,
         Actual: Main.advantageSection.getEquipmentMaxTotal(),
         Description: 'Damage Rank 6: Equipment Max Total is now 10'
      });
      assertions.push({
         Expected: 2,
         Actual: Main.advantageSection.getState().it[0].rank,
         Description: 'Damage Rank 6: Equipment rank now 2'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Add Damage'});}

   Main.equipmentSection.clear();
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'Damage Removed: Equipment Row is removed'
   });
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getEquipmentMaxTotal(),
      Description: 'Damage Removed: Equipment Max Total is now 0'
   });
   assertions.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: 'Damage Removed: Advantage Total is now 0'});

   return TestRunner.displayResults('TestSuite.advantageList.calculateEquipmentRank', assertions, testState);
};
TestSuite.advantageList.calculateValues = function (testState = {})
{
   TestRunner.clearResults(testState);

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   const assertions = [];
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'no Advantages'
   });
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.getRankMap()
      .isEmpty(),
      Description: 'RankMap is empty'
   });
   assertions.push({
      Expected: false,
      Actual: Main.advantageSection.hasGodhoodAdvantages(),
      Description: 'Advantage section has no godhood'
   });
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.isUsingPettyRules(),
      Description: 'petty rules apply'
   });
   assertions.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: 'Advantage total is 0'});

   try
   {
      //Set Godhood
      DomUtil.changeValue('Strength', 30);
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: 'has godhood not based on main'
      });
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Beyond Mortal');
      assertions.push({
         Expected: 'Beyond Mortal',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Beyond Mortal is set'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: 'Advantage section has godhood'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.isUsingPettyRules(),
         Description: 'But petty rules still apply'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'non petty godhood'});}
   Main.clear();

   try
   {
      //Set Godhood
      DomUtil.changeValue('Strength', 30);
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Your Petty Rules Don\'t Apply to Me');
      assertions.push({
         Expected: 'Your Petty Rules Don\'t Apply to Me',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Petty Rules ad is set'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: 'Advantage section has godhood'
      });
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.isUsingPettyRules(),
         Description: 'And petty rules don\'t apply'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'petty godhood'});}
   Main.clear();

   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Improved Initiative');
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: 'Advantage section has no godhood'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.isUsingPettyRules(),
         Description: 'And petty rules do apply'
      });
      ReactUtil.changeValue('advantageRank' + getId(0), 2);
      assertions.push({
         Expected: 2,
         Actual: Main.advantageSection.getRankFromMap('Improved Initiative'),
         Description: 'RankMap has Improved Initiative rank 2'
      });
      assertions.push({
         Expected: 0,
         Actual: Main.advantageSection.getRankFromMap('Defensive Roll'),
         Description: 'Defensive Roll default rank of 0'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'rank map'});}

   Main.advantageSection.clear();
   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
      ReactUtil.changeValue('advantageRank' + getId(0), 2);
      assertions.push({Expected: 10, Actual: Main.advantageSection.getTotal(), Description: 'lucky subtotal 5*2=10'});
      ReactUtil.changeValue('advantageChoices' + getId(1), 'Defensive Roll');
      ReactUtil.changeValue('advantageRank' + getId(1), 3);
      assertions.push({Expected: 13, Actual: Main.advantageSection.getTotal(), Description: 'Advantage total is 13'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'total'});}

   //Improved Critical is the only one where unique name matters so have to test on v1.0
   Main.setRuleset(1, 0);
   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Improved Critical');
      ReactUtil.changeValue('advantageText' + getId(0), 'xxyba');
      ReactUtil.changeValue('advantageChoices' + getId(1), 'Improved Critical');
      ReactUtil.changeValue('advantageText' + getId(1), 'sword');
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getRankFromMap('Improved Critical: xxyba'),
         Description: 'RankMap has crit 1'
      });
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getRankFromMap('Improved Critical: sword'),
         Description: 'RankMap unique name'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'rank map getUniqueName'});}

   return TestRunner.displayResults('TestSuite.advantageList.calculateValues', assertions, testState);
};
TestSuite.advantageList.clear = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   try
   {
      DomUtil.changeValue('equipmentChoices0', 'Damage');
      Main.advantageSection.clear();
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getState().it.length,
         Description: 'clear doesn\'t remove equipment'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'clear doesn\'t remove equipment'});}

   return TestRunner.displayResults('TestSuite.advantageList.clear', assertions, testState);
};
TestSuite.advantageList.hasSeizeInitiative = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   assertions.push({Expected: false, Actual: Main.getDerivedValues().hasSeizeInitiative, Description: '!hasSeizeInitiative'});
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Seize Initiative');
   assertions.push({Expected: true, Actual: Main.getDerivedValues().hasSeizeInitiative, Description: 'hasSeizeInitiative'});

   return TestRunner.displayResults('TestSuite.advantageList.hasSeizeInitiative', assertions, testState);
};
TestSuite.advantageList.load = function (testState = {})
{
   TestRunner.clearResults(testState);

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   let dataToLoad;
   const assertions = [];

   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
      DomUtil.changeValue('equipmentChoices0', 'Damage');
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Seize Initiative'});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Happy Path: the advantage'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'Happy Path: nothing else'});
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.getRowByIndex(0)
         .doesHaveRank(),
         Description: 'Happy Path: has rank'
      });
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.getRowByIndex(0)
         .doesHaveText(),
         Description: 'Happy Path: has text'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Happy Path'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Equipment = [
         {
            "effect": "Damage",
            "text": "a",
            "action": "Standard",
            "range": "Close",
            "duration": "Instant",
            "Modifiers": [],
            "rank": 1
         }];
      dataToLoad.Advantages.push({name: 'Seize Initiative'});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 1,
         Actual: Main.equipmentSection.getTotal(),
         Description: 'equipmentSection total'
      });
      assertions.push({
         Expected: 'Equipment',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Keeps (or regenerates) Equipment'
      });
      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(1)
         .getName(),
         Description: 'and loads the rest'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Keeps Equipment'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Seize Initiative'});
      dataToLoad.Advantages.push({name: 'not found'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'notExist: Seize Initiative was loaded'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'notExist: Nothing else was loaded'});
      assertions.push({
         Expected: ['AdvantageList.load.notExist'],
         Actual: Messages.errorCodes(),
         Description: 'notExist: not found'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'notExist'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Seize Initiative'});
      dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
      Loader.sendData(dataToLoad);
      assertions.push({Expected: false, Actual: Main.canUseGodhood(), Description: 'godhood error: Godhood is off'});
      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'godhood error: Seize Initiative was loaded'
      });
      assertions.push(
         {Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'godhood error: Nothing else was loaded'});
      assertions.push({
         Expected: ['AdvantageList.load.godhood'],
         Actual: Messages.errorCodes(),
         Description: 'godhood error: Beyond Mortal was not allowed'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'godhood error'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Hero.transcendence = 1;  //set godhood
      dataToLoad.Advantages.push({name: 'Seize Initiative'});  //normal to make sure transcendence isn't reset
      dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
      Loader.sendData(dataToLoad);
      assertions.push({Expected: true, Actual: Main.canUseGodhood(), Description: 'Load godhood: Godhood is on'});
      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Load godhood: Seize Initiative was loaded'
      });
      assertions.push({
         Expected: 'Beyond Mortal',
         Actual: Main.advantageSection.getRowByIndex(1)
         .getName(),
         Description: 'Load godhood: Beyond Mortal was loaded'
      });
      assertions.push({Expected: [], Actual: Messages.list, Description: 'Load godhood: no errors'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Load godhood'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Equipment'});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 0, Actual: Main.advantageSection.getState().it.length, Description: 'ignores Equipment ad: no load'});
      assertions.push({Expected: [], Actual: Messages.list, Description: 'ignores Equipment ad: no error'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'ignores Equipment ad'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'a'});
      dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'a'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Ultimate Effort',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'duplicate error: loads original'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'duplicate error: and nothing else'});
      assertions.push({
         Expected: ['AdvantageList.load.duplicate'],
         Actual: Messages.errorCodes(),
         Description: 'duplicate error: error code'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'duplicate error'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'a'});
      dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'b'});
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Ultimate Effort',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'not duplicate: loads original'
      });
      assertions.push({
         Expected: 'Ultimate Effort',
         Actual: Main.advantageSection.getRowByIndex(1)
         .getName(),
         Description: 'not duplicate: loads other'
      });
      assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'not duplicate: uses unique name'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'not duplicate'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'text'});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 'Ultimate Effort',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Text: the advantage'
      });
      assertions.push({
         Expected: 'text',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getText(),
         Description: 'Text: getText'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Text'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Languages'});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: Data.Advantage.Languages.defaultText,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getText(),
         Description: 'uses default text'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'uses default text'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Defensive Roll', rank: 3});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 'Defensive Roll',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Rank: the advantage'
      });
      assertions.push({
         Expected: 3,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'Rank: getRank'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Rank'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Defensive Roll'});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'defaults to rank 1'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'defaults to rank 1'});}

   return TestRunner.displayResults('TestSuite.advantageList.load', assertions, testState);
};
TestSuite.advantageList.notifyDependent = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   assertions.push({Expected: 0, Actual: Main.getDerivedValues().Initiative, Description: 'Before Improved Initiative'});
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Improved Initiative');
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().Initiative, Description: 'calls updateInitiative'});

   Main.clear();
   assertions.push({Expected: 0, Actual: Main.getDerivedValues().characterPointsSpent, Description: 'Before: total'});
   assertions.push({Expected: 0, Actual: Main.defenseSection.getDerivedValues().Toughness.totalBonus, Description: 'Before Defensive Roll'});
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Defensive Roll');
   assertions.push({Expected: 1, Actual: Main.defenseSection.getDerivedValues().Toughness.totalBonus, Description: 'calls defenseSection.calculateValues'});
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().characterPointsSpent, Description: 'calls Main.update'});

   Main.setRuleset(1, 0);
   assertions.push({Expected: 0, Actual: Main.getDerivedValues().Offense[0].attackBonus, Description: 'Before Close Attack'});
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Close Attack');
   assertions.push({Expected: 1, Actual: Main.getDerivedValues().Offense[0].attackBonus, Description: 'calls updateOffense'});

   return TestRunner.displayResults('TestSuite.advantageList.notifyDependent', assertions, testState);
};
