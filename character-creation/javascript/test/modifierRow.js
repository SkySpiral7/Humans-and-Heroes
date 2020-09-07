'use strict';
TestSuite.modifierRow={};
TestSuite.modifierRow.setModifier=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];

   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Flight is Personal'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Adding Attack makes Flight Close'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Changing Attack to Limited makes Flight Personal'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack'); SelectUtil.changeText('powerModifierChoices0.0', 'Select Modifier');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Removing Attack makes Flight Personal'});

   Main.powerSection.clear();
   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'Flight has no name'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Flight has no skill'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack');
   assertions.push({Expected: 'Power 1 Flight', Actual: Main.powerSection.getRow(0).getName(), Description: 'Adding Attack makes Flight have a name'});
   assertions.push({Expected: 'Skill used for attack', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Adding Attack makes Flight have a skill'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'Changing Attack to Limited removes name'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Changing Attack to Limited removes skill'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack'); SelectUtil.changeText('powerModifierChoices0.0', 'Select Modifier');
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getName(), Description: 'Removing Attack removes name'});
   assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Removing Attack removes skill'});

   var dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Personal","duration":"Sustained",
      "Modifiers":[{"name":"Affects Others Also"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'range trumps modifiers: range'});
   assertions.push({Expected: [], Actual: Messages.list, Description: 'range trumps modifiers: error'});

   //ADD TESTS small ones for the rest

   return TestRunner.displayResults('TestSuite.modifierRow.setModifier', assertions, testState);
};
TestSuite.modifierRow.setRank=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierRow.setRank', assertions, testState);
};
TestSuite.modifierRow.calculateTotal=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.modifierRow.calculateTotal', assertions, testState);
};
TestSuite.modifierRow.setAutoRank=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    SelectUtil.changeText('powerChoices0', 'Damage');
    DomUtil.changeValue('powerRank0', 99);
    assertions.push({Expected: 99, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 99 initial total'});

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    assertions.push({Expected: -19, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 99 Removable modifier total'});
    assertions.push({Expected: 80, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 99 Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 99 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    assertions.push({Expected: -39, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 99 Easily Removable modifier total'});
    assertions.push({Expected: 60, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 99 Easily Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 99 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    assertions.push({Expected: -49, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 99 Alternate Effect modifier total'});
    assertions.push({Expected: 50, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 99 Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 99 Alternate Effect'});}

    try{
    DomUtil.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    assertions.push({Expected: -1, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 4 Easily Removable modifier total'});
    assertions.push({Expected: 3, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 4 Easily Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 4 Easily Removable'});}

    DomUtil.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    assertions.push({Expected: -20, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 100 Removable modifier total'});
    assertions.push({Expected: 80, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 100 Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 100 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    assertions.push({Expected: -40, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 100 Easily Removable modifier total'});
    assertions.push({Expected: 60, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 100 Easily Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 100 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    assertions.push({Expected: -50, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 100 Alternate Effect modifier total'});
    assertions.push({Expected: 50, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 100 Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 100 Alternate Effect'});}

    DomUtil.changeValue('powerRank0', 1);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    assertions.push({Expected: 0, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 1 Removable modifier total'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 1 Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 1 Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    assertions.push({Expected: 0, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 1 Easily Removable modifier total'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 1 Easily Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 1 Easily Removable'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    assertions.push({Expected: 0, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 1 Alternate Effect modifier total'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 1 Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 1 Alternate Effect'});}

    try{
    DomUtil.changeValue('powerRank0', 4);
    SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
    assertions.push({Expected: 0, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 4 Removable modifier total'});
    assertions.push({Expected: 4, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 4 Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 4 Removable'});}

    try{
    DomUtil.changeValue('powerRank0', 2);
    SelectUtil.changeText('powerModifierChoices0.0', 'Easily Removable');
    assertions.push({Expected: 0, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: 'Damage 2 Easily Removable modifier total'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: 'Damage 2 Easily Removable power total'});
    } catch(e){assertions.push({Error: e, Description: 'Damage 2 Easily Removable'});}

    Main.clear(); Main.setRuleset(1, 0);
    SelectUtil.changeText('powerChoices0', 'Damage');
    DomUtil.changeValue('powerRank0', 100);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    assertions.push({Expected: -98, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: '1.0 Damage 100 Dynamic Alternate Effect modifier total'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: '1.0 Damage 100 Dynamic Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Damage 100 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    assertions.push({Expected: -99, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: '1.0 Damage 100 Alternate Effect modifier total'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: '1.0 Damage 100 Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Damage 100 Alternate Effect'});}

    DomUtil.changeValue('powerRank0', 99);

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    assertions.push({Expected: -97, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: '1.0 Damage 99 Dynamic Alternate Effect modifier total'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: '1.0 Damage 99 Dynamic Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Damage 99 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    assertions.push({Expected: -98, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: '1.0 Damage 99 Alternate Effect modifier total'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: '1.0 Damage 99 Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Damage 99 Alternate Effect'});}

    DomUtil.changeValue('powerRank0', 1);

    //TODO: look at changing 1.0 alt effects into an extra
    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Dynamic Alternate Effect');
    assertions.push({Expected: 1, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: '1.0 Damage 1 Dynamic Alternate Effect modifier total'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getTotal(), Description: '1.0 Damage 1 Dynamic Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Damage 1 Dynamic Alternate Effect'});}

    try{
    SelectUtil.changeText('powerModifierChoices0.0', 'Alternate Effect');
    assertions.push({Expected: 0, Actual: Main.powerSection.getModifierRowShort(0,0).getAutoTotal(), Description: '1.0 Damage 1 Alternate Effect modifier total'});
    assertions.push({Expected: 1, Actual: Main.powerSection.getRow(0).getTotal(), Description: '1.0 Damage 1 Alternate Effect power total'});
    } catch(e){assertions.push({Error: e, Description: '1.0 Damage 1 Alternate Effect'});}

    return TestRunner.displayResults('TestSuite.modifierRow.setAutoRank', assertions, testState);
};
