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
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getmaxRank(), Description: 'Lucky getmaxRank'});

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
TestSuite.advantageRow.generate=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    assertions.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Equipment'), Description: actionTaken+': Advantage Row exists but doesn\'t have Equipment'});
    //TODO: this test is now less useful
    assertions.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', 'Ultimate Effort'), Description: actionTaken+': Advantage Row has (last) Ultimate Effort'});
    assertions.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Beyond Mortal'), Description: actionTaken+': Advantage Row doesn\'t have (first Godhood) Beyond Mortal'});

    try{
    actionTaken='Set Godhood'; DomUtil.changeValue('Strength', 100);
    assertions.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', 'Beyond Mortal'), Description: actionTaken+': Advantage Row now has (first) Beyond Mortal'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', 'Your Petty Rules Don\'t Apply to Me'), Description: actionTaken+': And has (last) Your Petty Rules Don\'t Apply to Me'});
    actionTaken='Clear Godhood'; DomUtil.changeValue('Strength', 0);
    assertions.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Beyond Mortal'), Description: actionTaken+': Advantage Row Godhood removed'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Padded Equipment Row Test'; SelectUtil.changeText('advantageChoices0', 'Ultimate Effort'); SelectUtil.changeText('equipmentChoices0', 'Feature'); DomUtil.changeValue('equipmentRank0', 10); SelectUtil.changeText('advantageChoices2', Data.Advantage.names[0]);
    assertions.push({Expected: 'Equipment', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': First Advantage Row is Equipment'});
    assertions.push({Expected: 'Ultimate Effort', Actual: Main.advantageSection.getRow(1).getName(), Description: actionTaken+': Then Ultimate Effort'});
    assertions.push({Expected: Data.Advantage.names[0], Actual: Main.advantageSection.getRow(2).getName(), Description: actionTaken+': Then '+Data.Advantage.names[0]});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(3).isBlank(), Description: actionTaken+': Then blank'});

    assertions.push({Expected: null, Actual: document.getElementById('advantageChoices0'), Description: actionTaken+': Equipment select id doesn\'t exist'});
    assertions.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices1'), Description: actionTaken+': 2nd Row is a select'});
    assertions.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices2'), Description: actionTaken+': 3rd row is a select'});
    assertions.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices3'), Description: actionTaken+': 4th row is a select'});
    assertions.push({Expected: 'Equipment', Actual: document.getElementById('advantageEquipment').innerHTML, Description: actionTaken+': 2nd Row says equipment'});

    assertions.push({Expected: '2', Actual: document.getElementById('advantageEquipmentRankSpan').innerHTML, Description: actionTaken+': Equipment row is rank 2'});
    assertions.push({Expected: null, Actual: document.getElementById('advantageRank2'), Description: actionTaken+': Equipment rank input doesn\'t exist'});

    actionTaken='Cleared Equipment'; Main.equipmentSection.clear();
    assertions.push({Expected: 'Ultimate Effort', Actual: Main.advantageSection.getRow(0).getName(), Description: actionTaken+': First Advantage Row is Ultimate Effort'});
    assertions.push({Expected: Data.Advantage.names[0], Actual: Main.advantageSection.getRow(1).getName(), Description: actionTaken+': Then '+Data.Advantage.names[0]});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(2).isBlank(), Description: actionTaken+': Then blank'});

    assertions.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices0'), Description: actionTaken+': First row is a select'});
    assertions.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices1'), Description: actionTaken+': 2nd row is a select'});
    assertions.push({Expected: true, Actual: SelectUtil.isSelect('advantageChoices2'), Description: actionTaken+': 3rd row is a select'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Pre Defensive Roll'; Main.advantageSection.clear();
    assertions.push({Expected: null, Actual: document.getElementById('advantageRank0'), Description: actionTaken+': Advantage Rank doesn\'t exist'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Advantage section is blank'});

    actionTaken='Set Defensive Roll'; SelectUtil.changeText('advantageChoices0', 'Defensive Roll');
    assertions.push({Expected: '1', Actual: document.getElementById('advantageRank0').value, Description: actionTaken+': Advantage rank was created with a value of 1'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    assertions.push({Expected: null, Actual: document.getElementById('advantageRank0'), Description: actionTaken+': Advantage rank was removed'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Pre Languages'; Main.advantageSection.clear();
    assertions.push({Expected: null, Actual: document.getElementById('advantageText0'), Description: actionTaken+': Advantage text doesn\'t exist'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Advantage section is blank'});

    actionTaken='Set Languages'; SelectUtil.changeText('advantageChoices0', 'Languages');
    assertions.push({Expected: Data.Advantage['Languages'].defaultText, Actual: document.getElementById('advantageText0').value, Description: actionTaken+': Advantage text was created with default text'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    assertions.push({Expected: null, Actual: document.getElementById('advantageText0'), Description: actionTaken+': Advantage text was removed'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Pre Lucky'; Main.advantageSection.clear();
    assertions.push({Expected: null, Actual: document.getElementById('advantageRowTotal0'), Description: actionTaken+': Advantage row total doesn\'t exist'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).isBlank(), Description: actionTaken+': Advantage section is blank'});

    actionTaken='Set Lucky'; SelectUtil.changeText('advantageChoices0', 'Lucky');
    assertions.push({Expected: Data.Advantage['Lucky'].costPerRank.toString(), Actual: document.getElementById('advantageRowTotal0').innerHTML, Description: actionTaken+': Advantage row total was created with default value'});
    actionTaken='Set Diehard'; SelectUtil.changeText('advantageChoices0', 'Diehard');
    assertions.push({Expected: null, Actual: document.getElementById('advantageRowTotal0'), Description: actionTaken+': Advantage row total was removed'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.advantageRow.generate', assertions, testState);
};
TestSuite.advantageRow.setValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.advantageRow.setValues', assertions, testState);
};
