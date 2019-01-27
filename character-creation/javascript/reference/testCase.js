TestSuite.test.example=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[], dataToLoad;

   dataToLoad = Loader.resetData();
   dataToLoad.Skills = [{"name": "Perception", "rank": 2, "ability": "Awareness"}];
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'transcendence, no extra skill: load errors'});
   assertions.push({Expected: ['PowerObjectAgnostic.setRange.notExist'], Actual: Messages.errorCodes(), Description: 'Feature Range does not exist: error'});

   assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
   SelectUtil.changeText('powerChoices0', 'Feature');
   DomUtil.changeValue('equipmentRank0', 5);
   assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});

   //be sure to copy the name here:
   return TestRunner.displayResults('TestSuite.test.example', assertions, testState);
};
TestSuite.test.unmade=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   //be sure to copy the name here:
   return TestRunner.displayResults('TestSuite.test.unmade', assertions, testState);
};
