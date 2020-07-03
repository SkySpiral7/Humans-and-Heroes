TestSuite.test.example = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let dataToLoad;

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   dataToLoad = Loader.resetData();
   dataToLoad.Skills = [{"name": "Perception", "rank": 2, "ability": "Awareness"}];
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'transcendence, no extra skill: load errors'});
   assertions.push({
      Expected: ['PowerObjectAgnostic.setRange.notExist'],
      Actual: Messages.errorCodes(),
      Description: 'Feature Range does not exist: error'
   });

   Main.setRuleset(2, 7);
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.getRow(0)
      .isBlank(),
      Description: 'Equipment Row is not created'
   });
   ReactUtil.changeValue('powerChoices' + getId(0), 'Feature');
   SelectUtil.changeText('powerChoices0', 'Feature');
   DomUtil.changeValue('equipmentRank0', 5);
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.getRow(0)
      .isBlank(),
      Description: 'Equipment Row is not created'
   });

   return TestRunner.displayResults('TestSuite.test.example', assertions, testState);
};
TestSuite.test.unmade = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.test.unmade', assertions, testState);
};
