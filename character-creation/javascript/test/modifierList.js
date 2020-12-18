'use strict';
TestSuite.modifierList={};
TestSuite.modifierList.calculateGrandTotal=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);
   assertions.push({Expected: 99, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 99 initial total'});

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
      assertions.push({Expected: 80, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 99 Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 99 Removable'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
      assertions.push({Expected: 60, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 99 Easily Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 99 Easily Removable'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({Expected: 50, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 99 Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 99 Alternate Effect'});}

   try{
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 4);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
      assertions.push({Expected: 3, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 4 Easily Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 4 Easily Removable'});}

   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
      assertions.push({Expected: 80, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 100 Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 100 Removable'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
      assertions.push({Expected: 60, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 100 Easily Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 100 Easily Removable'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({Expected: 50, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 100 Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 100 Alternate Effect'});}

   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 1 Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 1 Removable'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 1 Easily Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 1 Easily Removable'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 1 Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 1 Alternate Effect'});}

   try{
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 4);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
      assertions.push({Expected: 4, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 4 Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 4 Removable'});}

   try{
      ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 2);
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable');
      assertions.push({Expected: 2, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: 'Damage 2 Easily Removable power total'});
   } catch(e){assertions.push({Error: e, Description: 'Damage 2 Easily Removable'});}

   Main.clear(); Main.setRuleset(1, 0);
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 100);

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Dynamic Alternate Effect');
      assertions.push({Expected: 2, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '1.0 Damage 100 Dynamic Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: '1.0 Damage 100 Dynamic Alternate Effect'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '1.0 Damage 100 Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: '1.0 Damage 100 Alternate Effect'});}

   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 99);

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Dynamic Alternate Effect');
      assertions.push({Expected: 2, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '1.0 Damage 99 Dynamic Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: '1.0 Damage 99 Dynamic Alternate Effect'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '1.0 Damage 99 Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: '1.0 Damage 99 Alternate Effect'});}

   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), 1);

   //TODO: look at changing 1.0 alt effects into an extra
   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Dynamic Alternate Effect');
      assertions.push({Expected: 2, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '1.0 Damage 1 Dynamic Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: '1.0 Damage 1 Dynamic Alternate Effect'});}

   try{
      ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Alternate Effect');
      assertions.push({Expected: 1, Actual: Main.powerSection.getRowByIndex(0).getTotal(), Description: '1.0 Damage 1 Alternate Effect power total'});
   } catch(e){assertions.push({Error: e, Description: '1.0 Damage 1 Alternate Effect'});}

   return TestRunner.displayResults('TestSuite.modifierList.calculateGrandTotal', assertions, testState);
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
TestSuite.modifierList.sortOrder=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

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
    Main.setRuleset(3,4);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Reaction');
    //this test proves that Aura comes before Reduced Range

    assertions.push({Expected: 'Aura', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Aura sort order: Aura first'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Aura sort order: then range'});
    } catch(e){assertions.push({Error: e, Description: 'Aura sort order'});}

    try{
    Main.setRuleset(3,3);
    ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Nullify');
    ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Close');
    ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');

    assertions.push({Expected: 'Faster Action', Actual: Main.powerSection.getModifierRowShort(0,0).state.name, Description: 'Selective span sorts before Range: action'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0,1).state.name, Description: 'Selective span sorts before Range: Selective'});
    assertions.push({Expected: 'Reduced Range', Actual: Main.powerSection.getModifierRowShort(0,2).state.name, Description: 'Selective span sorts before Range: then range'});
    } catch(e){assertions.push({Error: e, Description: 'Selective span sorts before Range'});}

    try{
    Main.clear();
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
