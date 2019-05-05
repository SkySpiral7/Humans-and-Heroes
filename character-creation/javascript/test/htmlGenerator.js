'use strict';
TestSuite.HtmlGenerator={};
TestSuite.HtmlGenerator.advantageRow=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    assertions.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Equipment'), Description: actionTaken+': Advantage Row exists but doesn\'t have Equipment'});
    //TODO: this test is now less useful
    //TODO: examine what should be tested in each
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

    return TestRunner.displayResults('TestSuite.HtmlGenerator.advantageRow', assertions, testState);
};
TestSuite.HtmlGenerator.modifierRow=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.HtmlGenerator.modifierRow', assertions, testState);
};
