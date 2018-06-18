'use strict';
TestSuite.modifierRow={};
TestSuite.modifierRow.setModifier=function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults=[];

   SelectUtil.changeText('powerChoices0', 'Flight');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Flight is Personal'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack');
   testResults.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Adding Attack makes Flight Close'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Changing Attack to Limited makes Flight Personal'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack'); SelectUtil.changeText('powerModifierChoices0.0', 'Select One');
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Removing Attack makes Flight Personal'});

   Main.powerSection.clear();
   SelectUtil.changeText('powerChoices0', 'Flight');
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'Flight has no name'});
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Flight has no skill'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack');
   testResults.push({Expected: 'Power 1 Flight', Actual: Main.powerSection.getRow(0).getName(), Description: 'Adding Attack makes Flight have a name'});
   testResults.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Adding Attack makes Flight have a skill'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'Changing Attack to Limited removes name'});
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Changing Attack to Limited removes skill'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack'); SelectUtil.changeText('powerModifierChoices0.0', 'Select One');
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'Removing Attack removes name'});
   testResults.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Removing Attack removes skill'});

   var dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Personal","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Also"}],"rank":1});
   Loader.sendData(dataToLoad);
   testResults.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'range trumps modifiers: range'});
   testResults.push({Expected: [], Actual: Messages.list, Description: 'range trumps modifiers: error'});

   //ADD TESTS small ones for the rest

   return TestRunner.displayResults('TestSuite.modifierRow.setModifier', testResults, testState);
};
TestSuite.modifierRow.setRank=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierRow.setRank', testResults, testState);
};
TestSuite.modifierRow.calculateTotal=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
       //old modifier tests: *) changing from sustained to permanent is free *) changing from permanent to sustained is free
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierRow.calculateTotal', testResults, testState);
};
TestSuite.modifierRow.generate=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierRow.generate', testResults, testState);
};
TestSuite.modifierRow.setAutoRank=function(testState={})
{
    TestRunner.clearResults(testState);

    var testResults=[];
    //can't save var to powerRowTotal0 and powerModifierRowTotal0.0 because they keep getting recreated

    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 99);
    testResults.push({Expected: '99', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 initial total'});
    //TODO: tests (except generate and setAll) should not check the DOM

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '-19', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 99 Removable modifier total'});
    testResults.push({Expected: '80', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 99 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-39', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 99 Easily Removable modifier total'});
    testResults.push({Expected: '60', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 99 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-49', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 99 Alternate Effect modifier total'});
    testResults.push({Expected: '50', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 99 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 99 Alternate Effect'});}

    try{
    TestRunner.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-1', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 4 Easily Removable modifier total'});
    testResults.push({Expected: '3', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 4 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 4 Easily Removable'});}

    TestRunner.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '-20', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 100 Removable modifier total'});
    testResults.push({Expected: '80', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 100 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 100 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '-40', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 100 Easily Removable modifier total'});
    testResults.push({Expected: '60', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 100 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 100 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-50', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 100 Alternate Effect modifier total'});
    testResults.push({Expected: '50', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 100 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 100 Alternate Effect'});}

    TestRunner.changeValue('powerRank0', 1);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 1 Removable modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 1 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 1 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 1 Easily Removable modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 1 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 1 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 1 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 1 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 1 Alternate Effect'});}

    try{
    TestRunner.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 4 Removable modifier total'});
    testResults.push({Expected: '4', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 4 Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 4 Removable'});}

    try{
    TestRunner.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: 'Damage 2 Easily Removable modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: 'Damage 2 Easily Removable power total'});
    } catch(e){testResults.push({Error: e, Description: 'Damage 2 Easily Removable'});}

    Main.clear(); Main.setRuleset(1, 1);
    SelectUtil.changeText('powerChoices0', 'Damage');
    TestRunner.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '-98', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 100 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 100 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 100 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-99', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 100 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 100 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 100 Alternate Effect'});}

    TestRunner.changeValue('powerRank0', 99);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '-97', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 99 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 99 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 99 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '-98', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 99 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 99 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 99 Alternate Effect'});}

    TestRunner.changeValue('powerRank0', 1);

    //TODO: look at changing 1.0 alt effects into an extra
    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    testResults.push({Expected: '1', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 1 Dynamic Alternate Effect modifier total'});
    testResults.push({Expected: '2', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 1 Dynamic Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 1 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    testResults.push({Expected: '0', Actual: document.getElementById('powerModifierRowTotal0.0').innerHTML, Description: '1.1 Damage 1 Alternate Effect modifier total'});
    testResults.push({Expected: '1', Actual: document.getElementById('powerRowTotal0').innerHTML, Description: '1.1 Damage 1 Alternate Effect power total'});
    } catch(e){testResults.push({Error: e, Description: '1.1 Damage 1 Alternate Effect'});}

    return TestRunner.displayResults('TestSuite.modifierRow.setAutoRank', testResults, testState);
};
TestSuite.modifierRow.setValues=function(testState={})
{
    return {name: 'unmade', assertions: []};  //remove this when actual tests exist. ADD TESTS
    TestRunner.clearResults(testState);

    var testResults=[];
    var actionTaken='Initial';
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    try{
    actionTaken='Set Concentration'; SelectUtil.changeText('powerChoices0', 'Feature'); TestRunner.changeValue('equipmentRank0', 5);
    testResults.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    } catch(e){testResults.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.modifierRow.setValues', testResults, testState);
};
