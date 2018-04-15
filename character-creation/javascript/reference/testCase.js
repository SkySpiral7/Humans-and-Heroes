TestSuite.test.stringDiffDisplay=function(isFirst)
{
   return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
   TestRunner.clearResults(isFirst);

   var testResults=[], dataToLoad;

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Skills = [{"name": "Perception", "rank": 2, "ability": "Awareness"}];
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [], Actual: Messages.list, Description: 'transcendence, no extra skill: load errors'});
   testResults.push({Expected: ['PowerObjectAgnostic.setRange.notExist'], Actual: Messages.errorCodes(), Description: 'Feature Range does not exist: error'});

   testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});
   SelectUtil.changeText('powerChoices0', 'Feature');
   TestRunner.changeValue('equipmentRank0', 5);
   testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: 'Equipment Row is not created'});

   //be sure to copy the name here:
   return TestRunner.displayResults('TestSuite.test.stringDiffDisplay', testResults, isFirst);
};
