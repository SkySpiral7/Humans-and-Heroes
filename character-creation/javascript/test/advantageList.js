'use strict';
TestSuite.advantageList={};
TestSuite.advantageList.calculateEquipmentRank=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is not created'});
    assertions.push({Expected: 0, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is still 0'});
    assertions.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is still 0'});

    try{
    actionTaken='Damage Added';
    SelectUtil.changeText('equipmentChoices0', 'Damage');  //use Damage because it has a base cost of 1
    assertions.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Equipment Row is created'});
    assertions.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is now the minimum'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is now 1'});

    actionTaken='Damage Rank 5'; DomUtil.changeValue('equipmentRank0', 5);
    assertions.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is the maximum of 5'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is still 1'});
    actionTaken='Damage Rank 6'; DomUtil.changeValue('equipmentRank0', 6);
    assertions.push({Expected: 10, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is now 10'});
    assertions.push({Expected: 2, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is now 2'});
    actionTaken='Damage Rank 5'; DomUtil.changeValue('equipmentRank0', 5);
    assertions.push({Expected: 5, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is back to the maximum of 5'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is back to 1'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    actionTaken='Damage Removed';
    Main.equipmentSection.clear();  //no need for a catch here: if this fails everything will fail
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Equipment Row is removed'});
    assertions.push({Expected: 0, Actual: Main.advantageSection.getEquipmentMaxTotal(), Description: actionTaken+': Equipment Max Total is now 0'});
    assertions.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage Total is now 0'});

    return TestRunner.displayResults('TestSuite.advantageList.calculateEquipmentRank', assertions, testState);
};
TestSuite.advantageList.calculateValues=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': There are no Advantage Rows'});
    assertions.push({Expected: false, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has no godhood'});
    assertions.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': And petty rules apply'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRankMap().isEmpty(), Description: actionTaken+': RankMap is empty'});
    assertions.push({Expected: 0, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage total is 0'});

   //test non petty godhood
    try{
    actionTaken='Set Godhood'; DomUtil.changeValue('Strength', 30);
    assertions.push({Expected: true, Actual: Main.canUseGodhood(), Description: actionTaken+': Godhood is usable'});
    actionTaken='Set Beyond Mortal'; SelectUtil.changeText('advantageChoices0', 'Beyond Mortal');
    assertions.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Beyond Mortal is set'});
    assertions.push({Expected: true, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has godhood'});
    assertions.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': But petty rules still apply'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

   //test petty godhood
    try{
    actionTaken='Set Petty Rules'; SelectUtil.changeText('advantageChoices0', 'Your Petty Rules Don\'t Apply to Me');
    assertions.push({Expected: 'Your Petty Rules Don\'t Apply to Me', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Your Petty Rules Don\'t Apply to Me is set'});
    assertions.push({Expected: true, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has godhood'});
    assertions.push({Expected: false, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': And petty rules don\'t apply'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

   //test rank map
    try{
    actionTaken='Set Improved Initiative'; SelectUtil.changeText('advantageChoices0', 'Improved Initiative');
    assertions.push({Expected: 'Improved Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Improved Initiative is set'});
    assertions.push({Expected: false, Actual: Main.advantageSection.hasGodhoodAdvantages(), Description: actionTaken+': Advantage section has no godhood'});
    assertions.push({Expected: true, Actual: Main.advantageSection.isUsingPettyRules(), Description: actionTaken+': And petty rules do apply'});
    actionTaken='Set rank to 2'; DomUtil.changeValue('advantageRank0', 2);
    assertions.push({Expected: true, Actual: Main.advantageSection.getRankMap().containsKey('Improved Initiative'), Description: actionTaken+': RankMap has Improved Initiative'});
    assertions.push({Expected: 2, Actual: Main.advantageSection.getRankMap().get('Improved Initiative'), Description: actionTaken+': with rank of 2'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRankMap().containsKey('Defensive Roll'), Description: actionTaken+': RankMap doesn\'t have Defensive Roll'});
    assertions.push({Expected: 0, Actual: Main.advantageSection.getRankMap().get('Defensive Roll'), Description: actionTaken+': with default rank of 0'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

   //test total
    try{
    actionTaken='Set Lucky 2'; SelectUtil.changeText('advantageChoices0', 'Lucky'); DomUtil.changeValue('advantageRank0', 2);
    assertions.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': Lucky is set'});
    assertions.push({Expected: 2, Actual: Main.advantageSection.getRow(0).getRank(), Description: actionTaken+': with rank of 2'});
    actionTaken='Set Defensive Roll 3'; SelectUtil.changeText('advantageChoices1', 'Defensive Roll'); DomUtil.changeValue('advantageRank1', 3);
    assertions.push({Expected: 'Defensive Roll', Actual: Main.advantageSection.getRow(1).getName(), Description: actionTaken+': Defensive Roll is set'});
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(1).getRank(), Description: actionTaken+': with rank of 3'});
    assertions.push({Expected: 13, Actual: Main.advantageSection.getTotal(), Description: actionTaken+': Advantage total is 13'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.advantageList.calculateValues', assertions, testState);
};
TestSuite.advantageList.load=function(testState={})
{
    TestRunner.clearResults(testState);

    var dataToLoad;
    var assertions=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Happy Path: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Happy Path: nothing else'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Happy Path: has rank'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Happy Path: has text'});
    } catch(e){assertions.push({Error: e, Description: 'Happy Path'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    dataToLoad.Advantages.push({name: 'Die hard'});  //not found. real name is Diehard
    Loader.sendData(dataToLoad);
    assertions.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Errors: Seize Initiative was loaded'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    assertions.push({Expected: ['AdvantageList.load.notExist'], Actual: Messages.errorCodes(), Description: 'Errors: Die hard was not found'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: 'Errors: Make sure update was called'});
    } catch(e){assertions.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative'});
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    Loader.sendData(dataToLoad);
    assertions.push({Expected: false, Actual: Main.canUseGodhood(), Description: 'Errors: Godhood is off'});
    assertions.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Errors: Seize Initiative was loaded'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Errors: Nothing else was loaded'});
    assertions.push({Expected: ['AdvantageList.load.godhood'], Actual: Messages.errorCodes(), Description: 'Errors: Beyond Mortal was not allowed'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getTotal(), Description: 'Errors: Make sure update was called'});
    } catch(e){assertions.push({Error: e, Description: 'Errors'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Hero.transcendence = 1;  //set godhood
    dataToLoad.Advantages.push({name: 'Seize Initiative'});  //normal to make sure transcendence isn't reset
    dataToLoad.Advantages.push({name: 'Beyond Mortal'});  //godhood
    Loader.sendData(dataToLoad);
    assertions.push({Expected: true, Actual: Main.canUseGodhood(), Description: 'Load godhood: Godhood is on'});
    assertions.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load godhood: Seize Initiative was loaded'});
    assertions.push({Expected: 'Beyond Mortal', Actual: Main.advantageSection.getRow(1).getName(), Description: 'Load godhood: Beyond Mortal was loaded'});
    assertions.push({Expected: [], Actual: Messages.list, Description: 'Load godhood: no errors'});
    } catch(e){assertions.push({Error: e, Description: 'Load godhood'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Ultimate Effort', text: 'text'});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: 'Ultimate Effort', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Text: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Text: nothing else'});
    assertions.push({Expected: 'text', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Text: getText'});
    } catch(e){assertions.push({Error: e, Description: 'Text'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Defensive Roll', rank: 3});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: 'Defensive Roll', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Rank: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Rank: nothing else'});
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Rank: getRank'});
    } catch(e){assertions.push({Error: e, Description: 'Rank'});}

    return TestRunner.displayResults('TestSuite.advantageList.load', assertions, testState);
};
TestSuite.advantageList.sortOrder=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];

    try{
    SelectUtil.changeText('advantageChoices0', 'Connected');
    SelectUtil.changeText('equipmentChoices0', 'Damage');
    SelectUtil.changeText('advantageChoices2', 'Benefit');
    Main.advantageSection._testSortStability();
    //this test proves that the sort order forces stability and that equipment comes first

    assertions.push({Expected: 'Damage', Actual: Main.equipmentSection.getRow(0).getEffect(), Description: 'equipment section row'});
    assertions.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Advantage 1'});
    assertions.push({Expected: 'Connected', Actual: Main.advantageSection.getRow(1).getName(), Description: 'Advantage 2'});
    assertions.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(2).getName(), Description: 'Advantage 3'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(3).isBlank(), Description: 'No more Advantages'});
    } catch(e){assertions.push({Error: e, Description: 'sortOrder'});}

    return TestRunner.displayResults('TestSuite.advantageList.sortOrder', assertions, testState);
};
