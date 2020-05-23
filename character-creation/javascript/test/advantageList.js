'use strict';
TestSuite.advantageList = {};
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
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it[0].rank, Description: 'Damage Rank 5: Equipment rank still 1'});

      DomUtil.changeValue('equipmentRank0', 6);
      assertions.push({
         Expected: 10,
         Actual: Main.advantageSection.getEquipmentMaxTotal(),
         Description: 'Damage Rank 6: Equipment Max Total is now 10'
      });
      assertions.push({Expected: 2, Actual: Main.advantageSection.getState().it[0].rank, Description: 'Damage Rank 6: Equipment rank now 2'});
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
   let actionTaken = 'Initial';
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: actionTaken + ': There are no Advantage Rows'
   });
   assertions.push({
      Expected: false,
      Actual: Main.advantageSection.hasGodhoodAdvantages(),
      Description: actionTaken + ': Advantage section has no godhood'
   });
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.isUsingPettyRules(),
      Description: actionTaken + ': And petty rules apply'
   });
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.getRankMap()
      .isEmpty(),
      Description: actionTaken + ': RankMap is empty'
   });
   assertions.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken + ': Advantage total is 0'});

   //test non petty godhood
   try
   {
      actionTaken = 'Set Godhood';
      DomUtil.changeValue('Strength', 30);
      assertions.push({Expected: true, Actual: Main.canUseGodhood(), Description: actionTaken + ': Godhood is usable'});
      actionTaken = 'Set Beyond Mortal';
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Beyond Mortal');
      assertions.push({
         Expected: 'Beyond Mortal',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: actionTaken + ': Beyond Mortal is set'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: actionTaken + ': Advantage section has godhood'
      });
      assertions.push(
         {Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken + ': But petty rules still apply'});
   }
   catch (e)
   {assertions.push({Error: e, Description: actionTaken});}

   //test petty godhood
   try
   {
      actionTaken = 'Set Petty Rules';
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Your Petty Rules Don\'t Apply to Me');
      assertions.push({
         Expected: 'Your Petty Rules Don\'t Apply to Me',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: actionTaken + ': Your Petty Rules Don\'t Apply to Me is set'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: actionTaken + ': Advantage section has godhood'
      });
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.isUsingPettyRules(),
         Description: actionTaken + ': And petty rules don\'t apply'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: actionTaken});}

   //test rank map
   try
   {
      actionTaken = 'Set Improved Initiative';
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Improved Initiative');
      assertions.push({
         Expected: 'Improved Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: actionTaken + ': Improved Initiative is set'
      });
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.hasGodhoodAdvantages(),
         Description: actionTaken + ': Advantage section has no godhood'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.isUsingPettyRules(),
         Description: actionTaken + ': And petty rules do apply'
      });
      actionTaken = 'Set rank to 2';
      ReactUtil.changeValue('advantageRank' + getId(0), 2);
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.getRankMap()
         .containsKey('Improved Initiative'),
         Description: actionTaken + ': RankMap has Improved Initiative'
      });
      assertions.push({
         Expected: 2,
         Actual: Main.advantageSection.getRankMap()
         .get('Improved Initiative'),
         Description: actionTaken + ': with rank of 2'
      });
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.getRankMap()
         .containsKey('Defensive Roll'),
         Description: actionTaken + ': RankMap doesn\'t have Defensive Roll'
      });
      assertions.push({
         Expected: 0,
         Actual: Main.advantageSection.getRankMap()
         .get('Defensive Roll'),
         Description: actionTaken + ': with default rank of 0'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: actionTaken});}

   //test total
   try
   {
      actionTaken = 'Set Lucky 2';
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
      ReactUtil.changeValue('advantageRank' + getId(0), 2);
      assertions.push({
         Expected: 'Lucky',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: actionTaken + ': Lucky is set'
      });
      assertions.push({
         Expected: 2,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: actionTaken + ': with rank of 2'
      });
      actionTaken = 'Set Defensive Roll 3';
      ReactUtil.changeValue('advantageChoices' + getId(1), 'Defensive Roll');
      ReactUtil.changeValue('advantageRank' + getId(1), 3);
      assertions.push({
         Expected: 'Defensive Roll',
         Actual: Main.advantageSection.getRowByIndex(1)
         .getName(),
         Description: actionTaken + ': Defensive Roll is set'
      });
      assertions.push({
         Expected: 3,
         Actual: Main.advantageSection.getRowByIndex(1)
         .getRank(),
         Description: actionTaken + ': with rank of 3'
      });
      assertions.push({Expected: 13, Actual: Main.advantageSection.getTotal(), Description: actionTaken + ': Advantage total is 13'});
   }
   catch (e)
   {assertions.push({Error: e, Description: actionTaken});}

   return TestRunner.displayResults('TestSuite.advantageList.calculateValues', assertions, testState);
};
TestSuite.advantageList.load = function (testState = {})
{
   TestRunner.clearResults(testState);

   let dataToLoad;
   const assertions = [];

   try
   {
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
      dataToLoad.Advantages.push({name: 'Seize Initiative'});
      dataToLoad.Advantages.push({name: 'Die hard'});  //not found. real name is Diehard
      Loader.sendData(dataToLoad);
      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Errors: Seize Initiative was loaded'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'Errors: Nothing else was loaded'});
      assertions.push({
         Expected: ['AdvantageList.load.notExist'],
         Actual: Messages.errorCodes(),
         Description: 'Errors: Die hard was not found'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: 'Errors: Make sure update was called'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Errors'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Seize Initiative'});
      dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
      Loader.sendData(dataToLoad);
      assertions.push({Expected: false, Actual: Main.canUseGodhood(), Description: 'Errors: Godhood is off'});
      assertions.push({
         Expected: 'Seize Initiative',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Errors: Seize Initiative was loaded'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'Errors: Nothing else was loaded'});
      assertions.push({
         Expected: ['AdvantageList.load.godhood'],
         Actual: Messages.errorCodes(),
         Description: 'Errors: Beyond Mortal was not allowed'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: 'Errors: Make sure update was called'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Errors'});}

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
      dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'text'});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 'Ultimate Effort',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Text: the advantage'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'Text: nothing else'});
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
      dataToLoad.Advantages.push({name: 'Defensive Roll', rank: 3});
      Loader.sendData(dataToLoad);

      assertions.push({
         Expected: 'Defensive Roll',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Rank: the advantage'
      });
      assertions.push({Expected: 1, Actual: Main.advantageSection.getState().it.length, Description: 'Rank: nothing else'});
      assertions.push({
         Expected: 3,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'Rank: getRank'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Rank'});}

   return TestRunner.displayResults('TestSuite.advantageList.load', assertions, testState);
};
