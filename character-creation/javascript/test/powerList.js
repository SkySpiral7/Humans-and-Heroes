'use strict';
TestSuite.powerList={};
TestSuite.powerList.calculateValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   function getActual()
   {
      return Main.powerSection.getProtectionRankTotal();
   }

   assertions.push({Expected: null, Actual: getActual(), Description: 'Protection default: null'});

   SelectUtil.changeText('powerChoices0', 'Protection');
   DomUtil.changeValue('powerText0', 'pro 1');  //for uniqueness
   assertions.push({Expected: 1, Actual: getActual(), Description: 'picks up protection'});

   SelectUtil.changeText('powerChoices1', 'Protection');
   DomUtil.changeValue('powerRank1', 2);
   assertions.push({Expected: 2, Actual: getActual(), Description: 'protection doesn\'t stack'});

   Main.setRuleset(1, 0);
   SelectUtil.changeText('powerChoices0', 'Protection');
   DomUtil.changeValue('powerText0', 'pro 1');  //for uniqueness
   SelectUtil.changeText('powerChoices1', 'Protection');
   DomUtil.changeValue('powerRank1', 2);
   assertions.push({Expected: 3, Actual: getActual(), Description: 'v1: protection stacks'});

   return TestRunner.displayResults('TestSuite.powerList.calculateValues', assertions, testState);
};
/**This tests the combination of power and modifier's calculations*/
TestSuite.powerList.calculateValues_modCost=function(testState={})
{
   TestRunner.clearResults(testState);
   const assertions = [];

   function getCostPerRank()
   {
      return Main.powerSection.getRow(0).getDerivedValues().costPerRank;
   }

   SelectUtil.changeText('powerChoices0', 'Nullify');
   SelectUtil.changeText('powerModifierChoices0.0', 'Limited');
   assertions.push({Expected: 2, Actual: getCostPerRank(), Description: 'Rank flaws reduce cost/rank'});

   SelectUtil.changeText('powerModifierChoices0.1', 'Area');
   DomUtil.changeValue('powerModifierRank0.1', '5');
   assertions.push({Expected: 7, Actual: getCostPerRank(), Description: 'Rank extras increase cost/rank'});

   return TestRunner.displayResults('TestSuite.powerList.calculateValues_modCost', assertions, testState);
};
TestSuite.powerList.load=function(testState={})
{
    TestRunner.clearResults(testState);

    var dataToLoad;
    var assertions=[];

    Main.setRuleset(3,3);  //TODO: need modern tests

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"Text test","action":"Free","range":"Personal","duration":"Sustained",
       "Modifiers":[{"name":"Selective"}], "rank":2});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Happy Path: Effect'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Happy Path: 1 row'});
    assertions.push({Expected: [], Actual: Messages.list, Description: 'Happy Path: no errors'});
    assertions.push({Expected: false, Actual: Main.powerSection.getRow(0).isBaseCostSettable(), Description: 'Happy Path: isBaseCostSettable'});
    assertions.push({Expected: 'Text test', Actual: Main.powerSection.getRow(0).getText(), Description: 'Happy Path: text'});
    assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Happy Path: default action'});
    assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Happy Path: default range'});
    assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Happy Path: default duration'});
    assertions.push({Expected: 'Selective', Actual: Main.powerSection.getModifierRowShort(0, 0).getName(), Description: 'Happy Path: simple modifier'});
    assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0, 1).isBlank(), Description: 'Happy Path: no others modifiers'});
    assertions.push({Expected: 2, Actual: Main.powerSection.getRow(0).getRank(), Description: 'Happy Path: rank'});
    assertions.push({Expected: 6, Actual: Main.powerSection.getTotal(), Description: 'Happy Path: Make sure update was called'});
    } catch(e){assertions.push({Error: e, Description: 'Happy Path'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Equipment.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[], "rank":1});
    dataToLoad.Advantages.push({"name":"Equipment","rank":1});  //just to make the path happy
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Flight', Actual: Main.equipmentSection.getRow(0).getEffect(), Description: 'Happy Equipment: Effect'});
    //just confirming that it loaded
    assertions.push({Expected: true, Actual: Main.equipmentSection.getRow(1).isBlank(), Description: 'Happy Equipment: 1 row'});
    } catch(e){assertions.push({Error: e, Description: 'Happy Equipment'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    dataToLoad.Powers.push({"effect":"Invalid","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Errors: Flight was loaded'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    assertions.push({Expected: ['PowerListAgnostic.load.notExist'], Actual: Messages.errorCodes(), Description: 'Errors: not found'});
    } catch(e){assertions.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    dataToLoad.Powers.push({"effect":"A God I Am","text":"","action":"Triggered","range":"Personal","duration":"Continuous","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: false, Actual: Main.canUseGodhood(), Description: 'Errors: Godhood is off'});
    assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Errors: Flight was loaded'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    assertions.push({Expected: ['PowerListAgnostic.load.godhood'], Actual: Messages.errorCodes(), Description: 'Errors: A God I Am was not allowed'});
    } catch(e){assertions.push({Error: e, Description: 'Errors'});}

    try{
    Main.setRuleset(3, 3);
    dataToLoad = Loader.resetData();
    dataToLoad.Hero.transcendence = 1;  //set godhood
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Sustained","Modifiers":[],"rank":1});
    //flight is to make sure transcendence isn't reset
    dataToLoad.Powers.push({"effect":"A God I Am","text":"","action":"Triggered","range":"Personal","duration":"Continuous","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: true, Actual: Main.canUseGodhood(), Description: 'Load Godhood: Godhood is on'});
    assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Load Godhood: Flight was loaded'});
    assertions.push({Expected: 'A God I Am', Actual: Main.powerSection.getRow(1).getEffect(), Description: 'Load Godhood: A God I Am was loaded'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(2).isBlank(), Description: 'Load Godhood: Nothing else was loaded'});
    assertions.push({Expected: [], Actual: Messages.list, Description: 'Load godhood: No errors'});
    } catch(e){assertions.push({Error: e, Description: 'Load godhood'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Attain Knowledge","cost":3,"text":"","action":"Standard","range":"Personal","duration":"Instant","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Attain Knowledge', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Cost: Effect'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Cost: 1 row'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(0).isBaseCostSettable(), Description: 'Custom Cost: isBaseCostSettable'});
    assertions.push({Expected: 3, Actual: Main.powerSection.getRow(0).getBaseCost(), Description: 'Custom Cost: getBaseCost'});
    } catch(e){assertions.push({Error: e, Description: 'Custom Cost'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Move","range":"Personal","duration":"Sustained",
       "Modifiers":[{"name":"Slower Action","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Description: Effect'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Description: 1 row'});
    assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Custom Description: getAction'});
    } catch(e){assertions.push({Error: e, Description: 'Custom Description'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Full","range":"Close","duration":"Instant",
      "Modifiers":[{"name":"Slower Action"}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Healing', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Action: Effect'});
   assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Action: 1 row'});
   assertions.push({Expected: 'Full', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Custom Action: getAction'});
   } catch(e){assertions.push({Error: e, Description: 'Custom Action'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"invalid range","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Range does not exist: power was loaded'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Range does not exist: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Range does not exist: getRange'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Range does not exist: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.setRange.notExist', 'PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'],
      Actual: Messages.errorCodes(),
      Description: 'Range does not exist: error'});
   } catch(e){assertions.push({Error: e, Description: 'Range does not exist'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Feature","text":"","action":"Free","range":"invalid range","duration":"Permanent","Modifiers":[],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Feature', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Feature Range does not exist: power was loaded'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature Range does not exist: getAction'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Feature Range does not exist: getRange'});
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature Range does not exist: getDuration'});
   assertions.push({Expected: ['PowerObjectAgnostic.setRange.notExist', 'PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone'],
      Actual: Messages.errorCodes(),
      Description: 'Feature Range does not exist: error'});
   } catch(e){assertions.push({Error: e, Description: 'Feature Range does not exist'});}

   try{
   dataToLoad = Loader.resetData();
   dataToLoad.Powers.push({"effect":"Healing","text":"","action":"Standard","range":"Ranged","duration":"Instant",
      "Modifiers":[{"name":"Increased Range","applications":1}],"rank":1});
   Loader.sendData(dataToLoad);
   assertions.push({Expected: 'Healing', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Range: Effect'});
   assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Range: 1 row'});
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Custom Range: getRange'});
   } catch(e){assertions.push({Error: e, Description: 'Custom Range'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Flight","text":"","action":"Free","range":"Personal","duration":"Concentration",
       "Modifiers":[{"name":"Decreased Duration","applications":1}],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Flight', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Custom Duration: Effect'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Custom Duration: 1 row'});
    assertions.push({Expected: 'Concentration', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Custom Duration: getDuration'});
    } catch(e){assertions.push({Error: e, Description: 'Custom Duration'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Damage","text":"","action":"Standard","range":"Close","duration":"Instant",
       "name":"Damage name","skill":"Skill used","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Damage', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Name and skill: Effect'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Name and skill: 1 row'});
    assertions.push({Expected: 'Damage name', Actual: Main.powerSection.getRow(0).getName(), Description: 'Name and skill: getName'});
    assertions.push({Expected: 'Skill used', Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Name and skill: getSkillUsed'});
    } catch(e){assertions.push({Error: e, Description: 'Name and skill'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Powers.push({"effect":"Mind Reading","text":"","action":"Standard","range":"Perception","duration":"Sustained",
       "name":"Mind Reading name","Modifiers":[],"rank":1});
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Mind Reading', Actual: Main.powerSection.getRow(0).getEffect(), Description: 'Name only: Effect'});
    assertions.push({Expected: true, Actual: Main.powerSection.getRow(1).isBlank(), Description: 'Name only: 1 row'});
    assertions.push({Expected: 'Mind Reading name', Actual: Main.powerSection.getRow(0).getName(), Description: 'Name only: getName'});
    assertions.push({Expected: undefined, Actual: Main.powerSection.getRow(0).getSkillUsed(), Description: 'Name only: getSkillUsed'});
    } catch(e){assertions.push({Error: e, Description: 'Name only'});}

    return TestRunner.displayResults('TestSuite.powerList.load', assertions, testState);
};
TestSuite.powerList.save=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.powerList.save', assertions, testState);
};
TestSuite.powerList.notifyDependent=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.powerList.notifyDependent', assertions, testState);
};
