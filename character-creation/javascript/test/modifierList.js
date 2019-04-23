'use strict';
TestSuite.modifierList={};
TestSuite.modifierList.calculateGrandTotal=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierList.calculateGrandTotal', assertions, testState);
};
TestSuite.modifierList.calculateValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierList.calculateValues', assertions, testState);
};
TestSuite.modifierList.createByNameRank=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierList.createByNameRank', assertions, testState);
};
TestSuite.modifierList.getUniqueName=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierList.getUniqueName', assertions, testState);
};
TestSuite.modifierList.isNonPersonalModifierPresent=function(testState={})
{
   TestRunner.clearResults(testState);

   var dataToLoad;
   var assertions=[];

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Other Flat Extra"},{"name":"Affects Others Only"}],"rank":1});
   //also note that the modifier isn't first and is last for 2 possible edge cases
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'true: Affects Others Only'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Also"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'true: Affects Others Also'});

   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Close","duration":"Sustained",
      "Modifiers":[{"name":"Attack"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: [], Actual: Messages.list, Description: 'true: Attack'});

   return TestRunner.displayResults('TestSuite.powerRow.validatePersonalRange', assertions, testState);
};
TestSuite.modifierList.load=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierList.load', assertions, testState);
};
TestSuite.modifierList.sanitizeRows=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierList.sanitizeRows', assertions, testState);
};
TestSuite.modifierList.sortOrder=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerModifierChoices0.2', 'Precise');
    Main.powerSection.getRow(0).getModifierList()._testSortStability();
    //this test proves that the sort order forces stability

    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Stability: Modifier 1'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Stability: Modifier 2'});
    assertions.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Stability: Modifier 3'});
    } catch(e){assertions.push({Error: e, Description: 'Stability'});}

    try{
    Main.clear();
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Perception');
    SelectUtil.changeText('powerSelectDuration0', 'Continuous');
    SelectUtil.changeText('powerSelectAction0', 'Free');
    //this test proves that these are in the right order: Faster Action, Increased Range, Increased Duration, else

    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Auto Extras: Modifier 1'});
    assertions.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Auto Extras: Modifier 2'});
    assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Auto Extras: Modifier 3'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Auto Extras: Modifier 4'});
    } catch(e){assertions.push({Error: e, Description: 'Auto Extras'});}

    try{
    Main.clear();
    SelectUtil.changeText('powerChoices0', 'Create');
    SelectUtil.changeText('powerModifierChoices0.0', 'Selective');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');
    SelectUtil.changeText('powerSelectAction0', 'Slow');
    //this test proves that these are in the right order: Slower Action, Reduced Range, Decreased Duration, else

    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Auto Flaws: Modifier 1'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Auto Flaws: Modifier 2'});
    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Auto Flaws: Modifier 3'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).getName(), Description: 'Auto Flaws: Modifier 4'});
    } catch(e){assertions.push({Error: e, Description: 'Auto Flaws'});}

    try{
    Main.clear(); Main.setRuleset(3,4);
    SelectUtil.changeText('powerChoices0', 'Nullify');
    SelectUtil.changeText('powerSelectAction0', 'Reaction');
    //this test proves that Aura comes before Reduced Range

    assertions.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Aura sort order: Aura first'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Aura sort order: then range'});
    } catch(e){assertions.push({Error: e, Description: 'Aura sort order'});}

    try{
    Main.clear(); Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Nullify');
    SelectUtil.changeText('powerSelectRange0', 'Close');
    SelectUtil.changeText('powerSelectAction0', 'Triggered');

    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Selective span sorts before Range: action'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Selective span sorts before Range: Selective'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Selective span sorts before Range: then range'});
    } catch(e){assertions.push({Error: e, Description: 'Selective span sorts before Range'});}

    try{
    Main.clear(); Main.setRuleset(3,3);
    SelectUtil.changeText('powerChoices0', 'Flight');
    SelectUtil.changeText('powerModifierChoices0.0', 'Precise');
    SelectUtil.changeText('powerModifierChoices0.1', 'Selective');
    SelectUtil.changeText('powerSelectDuration0', 'Concentration');

    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).getName(), Description: 'Selective non-span retains order: Duration'});
    assertions.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,1).getName(), Description: 'Selective non-span retains order: then rest'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,2).getName(), Description: 'Selective non-span retains order: Selective'});
    } catch(e){assertions.push({Error: e, Description: 'Selective non-span retains order'});}

    return TestRunner.displayResults('TestSuite.modifierList.sortOrder', assertions, testState);
};
