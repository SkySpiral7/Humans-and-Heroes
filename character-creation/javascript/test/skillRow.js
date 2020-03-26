'use strict';
TestSuite.skillRow={};
TestSuite.skillRow.setSkill=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    var firstRow = Main.skillSection.getRow(0);  //only row I care about so I made a short cut
    assertions.push({Expected: true, Actual: firstRow.isBlank(), Description: actionTaken+': First row is blank'});
    assertions.push({Expected: undefined, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has no data'});
    assertions.push({Expected: undefined, Actual: firstRow.getAbilityName(), Description: actionTaken+': ...'});
    assertions.push({Expected: undefined, Actual: firstRow.getName(), Description: actionTaken+': ...'});
    assertions.push({Expected: undefined, Actual: firstRow.getRank(), Description: actionTaken+': ...'});
    assertions.push({Expected: undefined, Actual: firstRow.getText(), Description: actionTaken+': ...'});
    assertions.push({Expected: undefined, Actual: firstRow.getTotalBonus(), Description: actionTaken+': ...'});

    try{
    actionTaken='Set Sleight of Hand'; SelectUtil.changeText('skillChoices0', 'Sleight of Hand');
    assertions.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    assertions.push({Expected: true, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has data: hasText'});
    assertions.push({Expected: 'Dexterity', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    assertions.push({Expected: 'Sleight of Hand', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    assertions.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    assertions.push({Expected: 'Skill Subtype', Actual: firstRow.getText(), Description: actionTaken+': Text'});
    assertions.push({Expected: '+1', Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});

    actionTaken='Set Some Values'; DomUtil.changeValue('skillText0', 'Text value'); DomUtil.changeValue('skillRank0', 2); SelectUtil.changeText('skillAbility0', 'Strength');
    actionTaken='Set Perception'; SelectUtil.changeText('skillChoices0', 'Perception');
    assertions.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    assertions.push({Expected: false, Actual: firstRow.doesHaveText(), Description: actionTaken+': And data: hasText'});
    assertions.push({Expected: 'Awareness', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    assertions.push({Expected: 'Perception', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    assertions.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    assertions.push({Expected: undefined, Actual: firstRow.getText(), Description: actionTaken+': Text'});
    assertions.push({Expected: '+1', Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Set Other with value'; DomUtil.changeValue('Strength', 2); SelectUtil.changeText('skillChoices0', 'Other');
    //TODO: how can I make sure all of the relationships work? I'll need to draw a map...
    assertions.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    assertions.push({Expected: true, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has data: hasText'});
    assertions.push({Expected: 'Strength', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    assertions.push({Expected: 'Other', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    assertions.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    assertions.push({Expected: 'Skill Name and Subtype', Actual: firstRow.getText(), Description: actionTaken+': Text'});
    assertions.push({Expected: '+3', Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select Skill');
    assertions.push({Expected: true, Actual: firstRow.isBlank(), Description: actionTaken+': First row is now blank'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.skillRow.setSkill', assertions, testState);
};
