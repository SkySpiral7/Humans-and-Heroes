TestSuite.test.example = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let dataToLoad;

   dataToLoad = Loader.resetData();
   dataToLoad.Skills.push({"name": "Perception", "rank": 2, "ability": "Awareness"});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.errorCodes(), Description: 'transcendence, no extra skill: load errors'});
   assertions.push({
      Expected: ['PowerObjectAgnostic.setRange.notExist'],
      Actual: Messages.errorCodes(),
      Description: 'Feature Range does not exist: error'
   });

   try
   {
      Main.setRuleset(2, 7);
      ReactUtil.changeValue('powerChoices' + Main.advantageSection.indexToKey(0), 'Feature');
      //and indexToPowerAndModifierKey(0, 0)
      SelectUtil.changeText('powerChoices0', 'Feature');
      DomUtil.changeValue('equipmentRank0', 5);
      assertions.push({
         Expected: true,
         Actual: Main.advantageSection.getRowByIndex(0).isBlank(),
         Description: 'Equipment Row is not created'
      });
   }
   catch (e)
   {assertions.push({Error: e, Description: 'description of logical group'});}

   return TestRunner.displayResults('TestSuite.test.example', assertions, testState);
};
