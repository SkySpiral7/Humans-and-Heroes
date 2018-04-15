'use strict';
TestSuite.modifierList={};
TestSuite.modifierList.calculateGrandTotal=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.calculateGrandTotal', testResults, isFirst);
};
TestSuite.modifierList.calculateValues=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.calculateValues', testResults, isFirst);
};
TestSuite.modifierList.createByNameRank=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.createByNameRank', testResults, isFirst);
};
TestSuite.modifierList.getUniqueName=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.getUniqueName', testResults, isFirst);
};
TestSuite.modifierList.isNonPersonalModifierPresent=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var dataToLoad;
   var testResults=[];

   Main.setMockMessenger(Messages.errorCapture);

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Other Flat Extra"},{"name":"Affects Others Only"}],"rank":1});
   //also note that the modifier isn't first and is last for 2 possible edge cases
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [], Actual: Messages.list, Description: 'true: Affects Others Only'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Also"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [], Actual: Messages.list, Description: 'true: Affects Others Also'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Attack"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: [], Actual: Messages.list, Description: 'true: Attack'});

   return TestRunner.displayResults('TestSuite.powerRow.validatePersonalRange', testResults, isFirst);
};
TestSuite.modifierList.load=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.load', testResults, isFirst);
};
TestSuite.modifierList.sanitizeRows=function(isFirst)
{
    return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(isFirst);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierList.sanitizeRows', testResults, isFirst);
};
TestSuite.modifierList.sortOrder=function(isFirst)
{
    TestRunner.clearResults(isFirst);

    var testResults=[];

    try{
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerModifierChoices0.2', 'Precise');
    Main.powerSection.getRow(0).getModifierList().testSortStability();
    //this test proves that the sort order forces stability

    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Stability: Modifier 1'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Stability: Modifier 2'});
    testResults.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Stability: Modifier 3'});
    } catch(e){testResults.push({Error: e, Description: 'Stability'});}

    try{
    Main.clear();
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Perception');
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    SelectUtil.changeText('powerSelectAction0', 'Free');
    //this test proves that these are in the right order: Faster Action, Increased Range, Increased Duration, else

    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Auto Extras: Modifier 1'});
    testResults.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Auto Extras: Modifier 2'});
    testResults.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Auto Extras: Modifier 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Auto Extras: Modifier 4'});
    } catch(e){testResults.push({Error: e, Description: 'Auto Extras'});}

    try{
    Main.clear();
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    //this test proves that these are in the right order: Slower Action, Reduced Range, Decreased Duration, else

    testResults.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Auto Flaws: Modifier 1'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Auto Flaws: Modifier 2'});
    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Auto Flaws: Modifier 3'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Auto Flaws: Modifier 4'});
    } catch(e){testResults.push({Error: e, Description: 'Auto Flaws'});}

    try{
    Main.clear(); Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Nullify');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    //this test proves that Aura comes before Reduced Range

    testResults.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Aura sort order: Aura first'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Aura sort order: then range'});
    } catch(e){testResults.push({Error: e, Description: 'Aura sort order'});}

    try{
    Main.clear(); Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Nullify');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Triggered');

    testResults.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Selective span sorts before Range: action'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Selective span sorts before Range: Selective'});
    testResults.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Selective span sorts before Range: then range'});
    } catch(e){testResults.push({Error: e, Description: 'Selective span sorts before Range'});}

    try{
    Main.clear(); Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Flight');
    SelectUtil.changeText('powerModifierChoices0.0', 'Precise');
    SelectUtil.changeText('powerModifierChoices0.1', 'Selective');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');

    testResults.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Selective non-span retains order: Duration'});
    testResults.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Selective non-span retains order: then rest'});
    testResults.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Selective non-span retains order: Selective'});
    } catch(e){testResults.push({Error: e, Description: 'Selective non-span retains order'});}

    return TestRunner.displayResults('TestSuite.modifierList.sortOrder', testResults, isFirst);
};
