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
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
    ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 2), 'Precise');
    Main.powerSection.getRowByIndex(0).getModifierList()._testSortStability();
    //this test proves that the sort order forces stability

    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Stability: Modifier 1'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Stability: Modifier 2'});
    assertions.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,2).state.name, Description: 'Stability: Modifier 3'});
    } catch(e){assertions.push({Error: e, Description: 'Stability'});}

    try{
    Main.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
    ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Continuous');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Free');
    //this test proves that these are in the right order: Faster Action, Increased Range, Increased Duration, else

    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Auto Extras: Modifier 1'});
    assertions.push({Expected: 'Increased Range', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Auto Extras: Modifier 2'});
    assertions.push({Expected: 'Increased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).state.name, Description: 'Auto Extras: Modifier 3'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).state.name, Description: 'Auto Extras: Modifier 4'});
    } catch(e){assertions.push({Error: e, Description: 'Auto Extras'});}

    try{
    Main.clear();
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
    ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Selective');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
    //this test proves that these are in the right order: Slower Action, Reduced Range, Decreased Duration, else

    assertions.push({Expected: 'Slower Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Auto Flaws: Modifier 1'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Auto Flaws: Modifier 2'});
    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,2).state.name, Description: 'Auto Flaws: Modifier 3'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,3).state.name, Description: 'Auto Flaws: Modifier 4'});
    } catch(e){assertions.push({Error: e, Description: 'Auto Flaws'});}

    try{
    Main.clear(); Main.setRuleset(3,4);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    //this test proves that Aura comes before Reduced Range

    assertions.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Aura sort order: Aura first'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Aura sort order: then range'});
    } catch(e){assertions.push({Error: e, Description: 'Aura sort order'});}

    try{
    Main.clear(); Main.setRuleset(3,3);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');

    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Selective span sorts before Range: action'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Selective span sorts before Range: Selective'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,2).state.name, Description: 'Selective span sorts before Range: then range'});
    } catch(e){assertions.push({Error: e, Description: 'Selective span sorts before Range'});}

    try{
    Main.clear(); Main.setRuleset(3,3);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
    ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Precise');
    ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Selective');
    ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Concentration');

    assertions.push({Expected: 'Decreased Duration', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Selective non-span retains order: Duration'});
    assertions.push({Expected: 'Precise', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Selective non-span retains order: then rest'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,2).state.name, Description: 'Selective non-span retains order: Selective'});
    } catch(e){assertions.push({Error: e, Description: 'Selective non-span retains order'});}

    return TestRunner.displayResults('TestSuite.modifierList.sortOrder', assertions, testState);
};
