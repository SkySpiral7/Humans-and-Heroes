'use strict';
TestSuite.advantageRow = {};
TestSuite.advantageRow.select = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let expected;

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'Blank'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   expected = [{name: 'Lucky', rank: 2}];
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getState().it,
      Description: 'Lucky: state'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Select Advantage');
   assertions.push({
      Expected: 0,
      Actual: Main.advantageSection.getState().it.length,
      Description: 'reset'
   });

   return TestRunner.displayResults('TestSuite.advantageRow.select', assertions, testState);
};
TestSuite.advantageRow.setAdvantage = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let expected;

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
   expected = {name: 'Lucky', rank: 1};
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Lucky: state'
   });
   expected = {
      maxRank: 3,
      hasRank: true,
      costPerRank: 5,
      total: 5,
      hasText: false
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getDerivedValues(),
      Description: 'Lucky: derivedValues'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   expected = {
      name: 'Sidekick',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Sidekick: state'
   });
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   ReactUtil.changeValue('advantageText' + getId(0), 'I help');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Minion');
   expected = {
      name: 'Minion',
      rank: 2,
      text: 'I help'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Sidekick to Minion keeps rank, text'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Minion');
   ReactUtil.changeValue('advantageRank' + getId(0), 3);
   ReactUtil.changeValue('advantageText' + getId(0), 'I can help');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   expected = {
      name: 'Sidekick',
      rank: 3,
      text: 'I can help'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Minion to Sidekick keeps rank, text'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Minion');
   ReactUtil.changeValue('advantageRank' + getId(0), 4);
   ReactUtil.changeValue('advantageText' + getId(0), 'helping');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
   expected = {
      name: 'Benefit',
      rank: 1,
      text: 'Advantage Subtype'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Minion to Benefit clears rank, text'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   ReactUtil.changeValue('advantageText' + getId(0), 'benny');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Minion');
   expected = {
      name: 'Minion',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Benefit to Minion clears rank, text'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   ReactUtil.changeValue('advantageRank' + getId(0), 4);
   ReactUtil.changeValue('advantageText' + getId(0), 'helping');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
   expected = {
      name: 'Benefit',
      rank: 1,
      text: 'Advantage Subtype'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Sidekick to Benefit clears rank, text'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   ReactUtil.changeValue('advantageText' + getId(0), 'benny');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   expected = {
      name: 'Sidekick',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Benefit to Sidekick clears rank, text'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Diehard');
   assertions.push({
      Expected: false,
      Actual: Main.advantageSection.getRowByIndex(0)
      .doesHaveRank(),
      Description: 'Diehard hasRank'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   ReactUtil.changeValue('advantageText' + getId(0), 'side');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Diehard');
   expected = {
      name: 'Diehard',
      rank: 1
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Sidekick to Diehard no text'
   });

   Main.advantageSection.clear();
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Diehard');
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   expected = {
      name: 'Sidekick',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRowByIndex(0)
      .getState(),
      Description: 'Diehard to Sidekick default text'
   });

   return TestRunner.displayResults('TestSuite.advantageRow.setAdvantage', assertions, testState);
};
TestSuite.advantageRow.setRank = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let dataToLoad, expected;

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
      ReactUtil.changeValue('advantageRank' + getId(0), '123456');

      assertions.push({
         Expected: 'Benefit',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Load Benefit: the advantage'
      });
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.getRowByIndex(0)
         .doesHaveRank(),
         Description: 'Load Benefit: doesHaveRank'
      });
      assertions.push({
         Expected: 123456,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'Load Benefit: rank set'
      });
      assertions.push({
         Expected: 123456,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getTotal(),
         Description: 'Benefit total cost'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Benefit'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Seize Initiative', rank: 5});
      Loader.sendData(dataToLoad);

      expected = [{"name": "Seize Initiative", "rank": 1}];  //state uses rank 1 (save doesn't)
      assertions.push({
         Expected: expected,
         Actual: Main.advantageSection.getState().it,
         Description: 'Load Seize Initiative: no rank'
      });
      assertions.push({
         Expected: false,
         Actual: Main.advantageSection.getRowByIndex(0)
         .doesHaveRank(),
         Description: 'Load Seize Initiative: doesHaveRank'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Load Seize Initiative'});}

   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
      assertions.push({
         Expected: 'Lucky',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getName(),
         Description: 'Change to Lucky'
      });
      assertions.push({
         Expected: 3,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getMaxRank(),
         Description: 'Lucky getMaxRank'
      });

      ReactUtil.changeValue('advantageRank' + getId(0), 5);
      assertions.push({
         Expected: 3,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'Lucky max rank enforced'
      });

      ReactUtil.changeValue('advantageRank' + getId(0), -5);
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'Lucky min rank enforced'
      });

      ReactUtil.changeValue('advantageRank' + getId(0), 2);
      ReactUtil.changeValue('advantageRank' + getId(0), 'invalid');
      assertions.push({
         Expected: 1,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getRank(),
         Description: 'Lucky rank defaults to 1'  //and not previous value of 2
      });

      ReactUtil.changeValue('advantageRank' + getId(0), 2);
      assertions.push({
         Expected: 5,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getCostPerRank(),
         Description: 'Lucky getCostPerRank'
      });
      assertions.push({
         Expected: 10,
         Actual: Main.advantageSection.getRowByIndex(0)
         .getTotal(),
         Description: 'Lucky total cost'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Lucky'});}

   return TestRunner.displayResults('TestSuite.advantageRow.setRank', assertions, testState);
};
TestSuite.advantageRow.setText = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let dataToLoad, expected;

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   try
   {
      ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
      ReactUtil.changeValue('advantageText' + getId(0), '\tchanged text: trimmed \n');
      assertions.push({
         Expected: 'changed text: trimmed',
         Actual: Main.advantageSection.getRowByIndex(0)
         .getText(),
         Description: 'Change Benefit text'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Change Benefit text'});}

   try
   {
      dataToLoad = Loader.resetData();
      dataToLoad.Advantages.push({name: 'Lucky', text: 'can\'t have text'});
      Loader.sendData(dataToLoad);

      expected = [{"name": "Lucky", "rank": 1}];
      assertions.push({Expected: expected, Actual: Main.advantageSection.getState().it, Description: 'Load Lucky: no text'});
   }
   catch (e)
   {assertions.push({Error: e, Description: 'Load Lucky'});}

   return TestRunner.displayResults('TestSuite.advantageRow.setText', assertions, testState);
};
TestSuite.advantageRow.getUniqueName = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Minion');
   ReactUtil.changeValue('advantageText' + getId(0), 'my name');
   assertions.push({
      Expected: 'Helper: my name',
      Actual: Main.advantageSection.getRowByIndex(0)
      .getUniqueName(),
      Description: 'getUniqueName Minion'
   });
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   //text stays
   assertions.push({
      Expected: 'Helper: my name',
      Actual: Main.advantageSection.getRowByIndex(0)
      .getUniqueName(),
      Description: 'getUniqueName Sidekick'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
   ReactUtil.changeValue('advantageText' + getId(0), 'my stuff');
   assertions.push({
      Expected: 'Benefit: my stuff',
      Actual: Main.advantageSection.getRowByIndex(0)
      .getUniqueName(),
      Description: 'getUniqueName hasText'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
   assertions.push({
      Expected: 'Lucky',
      Actual: Main.advantageSection.getRowByIndex(0)
      .getUniqueName(),
      Description: 'getUniqueName !hasText'
   });

   return TestRunner.displayResults('TestSuite.advantageRow.getUniqueName', assertions, testState);
};
TestSuite.advantageRow.save = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Benefit');
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   ReactUtil.changeValue('advantageText' + getId(0), 'my text');
   assertions.push({
      Expected: {name: 'Benefit', text: 'my text', rank: 2},
      Actual: Main.advantageSection.getRowByIndex(0)
      .save(),
      Description: 'text, rank'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Lucky');
   ReactUtil.changeValue('advantageRank' + getId(0), 2);
   assertions.push({
      Expected: {name: 'Lucky', rank: 2},
      Actual: Main.advantageSection.getRowByIndex(0)
      .save(),
      Description: '!text'
   });

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Skill Mastery');
   ReactUtil.changeValue('advantageText' + getId(0), 'skillz');
   assertions.push({
      Expected: {name: 'Skill Mastery', text: 'skillz'},
      Actual: Main.advantageSection.getRowByIndex(0)
      .save(),
      Description: '!rank'
   });

   return TestRunner.displayResults('TestSuite.advantageRow.save', assertions, testState);
};
