'use strict';
TestSuite.advantageRow={};
TestSuite.advantageRow.setAdvantage=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.advantageRow.setAdvantage', assertions, testState);
};
TestSuite.advantageRow.setRank=function(testState={})
{
    TestRunner.clearResults(testState);

    var dataToLoad;
    var assertions=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', rank: 123456});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Benefit: no other rows'});
    assertions.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Benefit: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Load Benefit: doesHaveRank'});
    assertions.push({Expected: 123456, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Load Benefit: rank set'});
    } catch(e){assertions.push({Error: e, Description: 'Load Benefit'});}

    try{
    DomUtil.changeValue('advantageRank0', 5);
    assertions.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Change Benefit rank'});
    } catch(e){assertions.push({Error: e, Description: 'Change Benefit rank'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative', rank: 5});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Seize Initiative: no other rows'});
    assertions.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Seize Initiative: the advantage'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Load Seize Initiative: doesHaveRank'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Load Seize Initiative: Rank ignored'});
    //if you have the advantage then it is rank 1 not undefined
    } catch(e){assertions.push({Error: e, Description: 'Load Seize Initiative'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Lucky');
    assertions.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Change to Lucky'});
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getMaxRank(), Description: 'Lucky getMaxRank'});

    DomUtil.changeValue('advantageRank0', 5);
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky max rank enforced'});

    DomUtil.changeValue('advantageRank0', -5);
    assertions.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky min rank enforced'});

    DomUtil.changeValue('advantageRank0', 2);
    DomUtil.changeValue('advantageRank0', 'invalid');
    assertions.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky rank defaults to 1'});

    DomUtil.changeValue('advantageRank0', 2);
    assertions.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getCostPerRank(), Description: 'Lucky getCostPerRank'});
    assertions.push({Expected: 10, Actual: Main.advantageSection.getRow(0).getTotal(), Description: 'Lucky total cost'});
    } catch(e){assertions.push({Error: e, Description: 'Lucky'});}

    return TestRunner.displayResults('TestSuite.advantageRow.setRank', assertions, testState);
};
TestSuite.advantageRow.setText=function(testState={})
{
    TestRunner.clearResults(testState);

    var dataToLoad;
    var assertions=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', text: '\thas text: also trimmed  \n'});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Benefit: no other rows'});
    assertions.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Benefit: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Load Benefit: doesHaveText'});
    assertions.push({Expected: 'has text: also trimmed', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Load Benefit: text set'});
    } catch(e){assertions.push({Error: e, Description: 'Load Benefit'});}

    try{
    DomUtil.changeValue('advantageText0', '\tchanged text: trimmed \n');
    assertions.push({Expected: 'changed text: trimmed', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Change Benefit text'});
    } catch(e){assertions.push({Error: e, Description: 'Change Benefit text'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Lucky', text: 'can\'t have text'});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Lucky: no other rows'});
    assertions.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Lucky: the advantage'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Load Lucky: doesHaveText'});
    assertions.push({Expected: undefined, Actual: Main.advantageSection.getRow(0).getText(), Description: 'Load Lucky: Text not set'});
    } catch(e){assertions.push({Error: e, Description: 'Load Lucky'});}

    return TestRunner.displayResults('TestSuite.advantageRow.setText', assertions, testState);
};
TestSuite.advantageRow.setValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.advantageRow.setValues', assertions, testState);
};
