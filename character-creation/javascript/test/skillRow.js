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
    assertions.push({Expected: 1, Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});

    actionTaken='Set Some Values'; TestRunner.changeValue('skillText0', 'Text value'); TestRunner.changeValue('skillRank0', 2); SelectUtil.changeText('skillAbility0', 'Strength');
    actionTaken='Set Perception'; SelectUtil.changeText('skillChoices0', 'Perception');
    assertions.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    assertions.push({Expected: false, Actual: firstRow.doesHaveText(), Description: actionTaken+': And data: hasText'});
    assertions.push({Expected: 'Awareness', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    assertions.push({Expected: 'Perception', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    assertions.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    assertions.push({Expected: undefined, Actual: firstRow.getText(), Description: actionTaken+': Text'});
    assertions.push({Expected: 1, Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Set Other with value'; TestRunner.changeValue('Strength', 2); SelectUtil.changeText('skillChoices0', 'Other');
    //TODO: how can I make sure all of the relationships work? I'll need to draw a map...
    assertions.push({Expected: false, Actual: firstRow.isBlank(), Description: actionTaken+': First row is not blank'});
    assertions.push({Expected: true, Actual: firstRow.doesHaveText(), Description: actionTaken+': And has data: hasText'});
    assertions.push({Expected: 'Strength', Actual: firstRow.getAbilityName(), Description: actionTaken+': AbilityName'});
    assertions.push({Expected: 'Other', Actual: firstRow.getName(), Description: actionTaken+': Name'});
    assertions.push({Expected: 1, Actual: firstRow.getRank(), Description: actionTaken+': Rank'});
    assertions.push({Expected: 'Skill Name and Subtype', Actual: firstRow.getText(), Description: actionTaken+': Text'});
    assertions.push({Expected: 3, Actual: firstRow.getTotalBonus(), Description: actionTaken+': TotalBonus'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    assertions.push({Expected: true, Actual: firstRow.isBlank(), Description: actionTaken+': First row is now blank'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.skillRow.setSkill', assertions, testState);
};
TestSuite.skillRow.generate=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    assertions.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Description: actionTaken+': First Row is blank'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: actionTaken+('Has first skill: ' + Data.Skill.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: actionTaken+('Has last skill: ' + Data.Skill.names.last())});
    assertions.push({Expected: null, Actual: document.getElementById('skillText0'), Description: actionTaken+': Text doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillRank0'), Description: actionTaken+': Rank doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillAbility0'), Description: actionTaken+': Ability doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Description: actionTaken+': Bonus doesn\'t exist'});

    try{
    actionTaken='Set Acrobatics'; SelectUtil.changeText('skillChoices0', 'Acrobatics');
    assertions.push({Expected: false, Actual: Main.skillSection.getRow(0).isBlank(), Description: actionTaken+': First Row is not blank'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: actionTaken+('Has first skill: ' + Data.Skill.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: actionTaken+('Has last skill: ' + Data.Skill.names.last())});
    assertions.push({Expected: 'Skill Subtype', Actual: document.getElementById('skillText0').value, Description: actionTaken+': Text exists'});
    assertions.push({Expected: '1', Actual: document.getElementById('skillRank0').value, Description: actionTaken+': Rank exists'});
    assertions.push({Expected: 'Agility', Actual: document.getElementById('skillAbility0').value, Description: actionTaken+': Ability exists'});
    assertions.push({Expected: '1', Actual: document.getElementById('skill bonus 0').innerHTML, Description: actionTaken+': Bonus exists'});

    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names[0]), Description: actionTaken+('Has first ability: ' + Data.Ability.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names.last()), Description: actionTaken+('Has last ability: ' + Data.Ability.names.last())});

    actionTaken='Unset'; SelectUtil.changeText('skillChoices0', 'Select One');
    assertions.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Description: actionTaken+': First Row is blank'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: actionTaken+('Has first skill: ' + Data.Skill.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: actionTaken+('Has last skill: ' + Data.Skill.names.last())});
    assertions.push({Expected: null, Actual: document.getElementById('skillText0'), Description: actionTaken+': Text doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillRank0'), Description: actionTaken+': Rank doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillAbility0'), Description: actionTaken+': Ability doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skill bonus 0'), Description: actionTaken+': Bonus doesn\'t exist'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.skillRow.generate', assertions, testState);
};
TestSuite.skillRow.setValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.skillRow.setValues', assertions, testState);
};
