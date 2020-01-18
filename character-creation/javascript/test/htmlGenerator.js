'use strict';
TestSuite.HtmlGenerator={};
TestSuite.HtmlGenerator.advantageRow=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   SelectUtil.changeText('equipmentChoices0', 'Feature');
   var expected = '<div class="row">' +
      '<div class="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>' +
      '<div class="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost 1</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'equipment row'});
   Main.equipmentSection.clear();

   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices0" onchange="Main.advantageSection.getRow(0).select();">' +
      '</select></div>'+
      '</div>';
   document.getElementById('advantageChoices0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'blank row'});
   Main.advantageSection.clear();  //to regenerate advantageChoices0

   assertions.push({Expected: 'Select Advantage', Actual: document.getElementById('advantageChoices0').value, Description: 'initial: default value'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Equipment'), Description: 'initial: Equipment not in select'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', 'Ultimate Effort'), Description: 'initial: has (last advantage) Ultimate Effort'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('advantageChoices0', 'Beyond Mortal'), Description: 'initial: no (first Godhood) Beyond Mortal'});

   DomUtil.changeValue('Strength', 100);  //set godhood
   assertions.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', 'Beyond Mortal'), Description: 'godhood: has (first) Beyond Mortal'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('advantageChoices0', 'Your Petty Rules Don\'t Apply to Me'), Description: 'godhood: has (last) Your Petty Rules Don\'t Apply to Me'});
   DomUtil.changeValue('Strength', 0);  //clear godhood

   SelectUtil.changeText('advantageChoices0', 'Diehard');
   assertions.push({Expected: 'Diehard', Actual: document.getElementById('advantageChoices0').value, Description: 'select set to value'});
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices0" onchange="Main.advantageSection.getRow(0).select();">' +
      '</select></div>'+
      '</div>';
   document.getElementById('advantageChoices0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'no rank or text'});
   Main.advantageSection.clear();  //regenerates advantageChoices0

   SelectUtil.changeText('advantageChoices0', 'Defensive Roll');
   DomUtil.changeValue('advantageRank0', '3');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices0" onchange="Main.advantageSection.getRow(0).select();">' +
      '</select></div>'+
      '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank '+
      '<input type="text" size="1" id="advantageRank0" onchange="Main.advantageSection.getRow(0).changeRank();" value="3"></label>'+
      '</div>';
   document.getElementById('advantageChoices0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'has rank'});
   Main.advantageSection.clear();  //regenerates advantageChoices0

   //text is tested in 1.0 so that I can set only text

   DomUtil.changeValue('Strength', 100);  //set godhood
   SelectUtil.changeText('advantageChoices0', 'Let There Be');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices0" onchange="Main.advantageSection.getRow(0).select();">' +
      '</select></div>'+
      '<div class="col-auto">=&nbsp;40</div>'+
      '</div>';
   document.getElementById('advantageChoices0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'has total'});
   Main.clear();  //regenerates advantageChoices0

   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices0" onchange="Main.advantageSection.getRow(0).select();">' +
      '</select></div>'+
      '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank '+
      '<input type="text" size="1" id="advantageRank0" onchange="Main.advantageSection.getRow(0).changeRank();" value="1"></label>'+
      '<div class="col-12 col-sm-6"><input type="text" style="width: 100%" ' +
      'id="advantageText0" onchange="Main.advantageSection.getRow(0).changeText();" value="Helper Name"></div>'+
      '<div class="col-auto">=&nbsp;2</div>'+
      '</div>';
   document.getElementById('advantageChoices0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'has rank, text, total'});

   Main.setRuleset(1,0);
   SelectUtil.changeText('advantageChoices0', 'Favored Environment');
   DomUtil.changeValue('advantageText0', 'Ocean');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices0" onchange="Main.advantageSection.getRow(0).select();">' +
      '</select></div>'+
      '<div class="col-12 col-sm-6"><input type="text" style="width: 100%" ' +
      'id="advantageText0" onchange="Main.advantageSection.getRow(0).changeText();" value="Ocean"></div>'+
      '</div>';
   document.getElementById('advantageChoices0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('advantage-section').firstChild.outerHTML, Description: 'has text'});

    return TestRunner.displayResults('TestSuite.HtmlGenerator.advantageRow', assertions, testState);
};
//TODO: test html generation
TestSuite.HtmlGenerator.modifierRow=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.HtmlGenerator.modifierRow', assertions, testState);
};
TestSuite.HtmlGenerator.powerRow=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   //ADD TESTS: for power options specifically godhood
   //ADD TESTS: non-if statements
   //ADD TESTS: blank row

   try{
   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: 'SPAN', Actual: document.getElementById('powerBaseCost0').tagName, Description: 'Fixed base cost for flight'});

   SelectUtil.changeText('powerChoices0', 'Movement');
   assertions.push({Expected: 'INPUT', Actual: document.getElementById('powerBaseCost0').tagName, Description: 'input base cost for movement'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   assertions.push({Expected: 'INPUT', Actual: document.getElementById('powerBaseCost0').tagName, Description: 'input base cost for feature'});
   } catch(e){assertions.push({Error: e, Description: 'input base cost'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Flight');
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'None action: duration = permanent'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'None action: action = none'});
   assertions.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectAction0'), Description: 'None action: The user can\'t change the action'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Feature None action: duration = permanent'});
   assertions.push({Expected: 'None', Actual: Main.powerSection.getRow(0).getAction(), Description: 'Feature None action: action = none'});
   assertions.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectAction0'), Description: 'Feature None action: The user can\'t change the action'});
   } catch(e){assertions.push({Error: e, Description: 'None action'});}

   try{
   Main.setRuleset(3,3);
   SelectUtil.changeText('powerChoices0', 'Damage');  //isAttack
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows move Damage'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows free Damage'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Reaction Damage'});

   SelectUtil.changeText('powerChoices0', 'Flight');  //isMovement
   SelectUtil.changeText('powerSelectAction0', 'Standard');  //only here for onchange which isn't important
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Move Flight'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Flight'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Reaction Flight'});

   SelectUtil.changeText('powerChoices0', 'Move Object');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows move Move Object'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows free Move Object'});

   SelectUtil.changeText('powerChoices0', 'Healing');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows move Healing'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Healing'});

   SelectUtil.changeText('powerChoices0', 'Growth');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Move Growth'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Growth'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.3 action Feature duration Sustained'});
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Move Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Free Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 action allows Reaction Feature'});
   } catch(e){assertions.push({Error: e, Description: 'v3.3 action'});}

   try{
   Main.setRuleset(3,4);
   SelectUtil.changeText('powerChoices0', 'Damage');  //isAttack
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Move'), Description: 'v3.4 action prevents move Damage'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Free'), Description: 'v3.4 action prevents free Damage'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Reaction Damage'});

   SelectUtil.changeText('powerChoices0', 'Flight');  //isMovement
   SelectUtil.changeText('powerSelectAction0', 'Standard');  //only here for onchange which isn't important
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Move Flight'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Free'), Description: 'v3.4 action prevents Free Flight'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Reaction'), Description: 'v3.4 action prevents Reaction Flight'});

   SelectUtil.changeText('powerChoices0', 'Move Object');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows move Move Object'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows free Move Object'});

   SelectUtil.changeText('powerChoices0', 'Healing');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows move Healing'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectAction0', 'Free'), Description: 'v3.4 action prevents free Healing'});

   SelectUtil.changeText('powerChoices0', 'Growth');
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Move Growth'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Free Growth'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.4 action Feature duration Sustained'});
   SelectUtil.changeText('powerSelectAction0', 'Move');
   assertions.push({Expected: 'Move', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Move Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Free');
   assertions.push({Expected: 'Free', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Free Feature'});
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 action allows Reaction Feature'});
   } catch(e){assertions.push({Error: e, Description: 'v3.4 action'});}

   try{
   Main.setRuleset(3,3);
   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.3 range Feature duration Sustained'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Feature allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Personal');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Feature allows Personal range'});
   assertions.push({Expected: true, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.3 Personal Flight can change range'});

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 range Damage action Reaction'});
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Reaction Damage allows ranged range'});

   SelectUtil.changeText('powerChoices0', 'Luck Control');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.3 range Luck Control default action reaction'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Luck Control allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Luck Control allows Ranged range'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.3 range Flight default range personal'});
   assertions.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.3 range Personal Flight can\'t change range'});
   } catch(e){assertions.push({Error: e, Description: 'v3.3 range'});}

   try{
   Main.setRuleset(3,4);
   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'v3.4 range Feature duration Sustained'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Feature allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Personal');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Feature allows Personal range'});
   assertions.push({Expected: true, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.3 Personal Flight can change range'});

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectAction0', 'Reaction');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 range Damage action Reaction'});
   assertions.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.4 range Damage requires close range'});

   SelectUtil.changeText('powerChoices0', 'Luck Control');
   assertions.push({Expected: 'Reaction', Actual: Main.powerSection.getRow(0).getAction(), Description: 'v3.4 range Luck Control default action reaction'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Luck Control allows close range'});
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   assertions.push({Expected: 'Ranged', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Luck Control allows Ranged range'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'v3.4 range Flight default range personal'});
   assertions.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectRange0'), Description: 'v3.4 range Personal Flight can\'t change range'});
   } catch(e){assertions.push({Error: e, Description: 'v3.4 range'});}

   try{
   SelectUtil.changeText('powerChoices0', 'Damage');
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: Damage default duration Instant'});
   assertions.push({Expected: false, Actual: SelectUtil.isSelect('powerSelectDuration0'), Description: 'Duration: can\'t change duration'});

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: feature can change to Sustained'});
   SelectUtil.changeText('powerSelectDuration0', 'Instant');
   assertions.push({Expected: 'Instant', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: feature can change to Instant'});
   assertions.push({Expected: true, Actual: SelectUtil.isSelect('powerSelectDuration0'), Description: 'Duration: Instant feature can change back'});
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: Feature default range personal'});
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: personal feature can change to Permanent'});
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: feature change back'});
   SelectUtil.changeText('powerSelectRange0', 'Close');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: feature set close range'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Permanent'), Description: 'Duration: close feature can\'t be Permanent'});

   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({Expected: 'Personal', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: Flight default range personal'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Instant'), Description: 'Duration: flight can\'t be Instant'});
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: flight can change to Sustained'});
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   assertions.push({Expected: 'Permanent', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: flight can change to Permanent'});
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({Expected: 'Sustained', Actual: Main.powerSection.getRow(0).getDuration(), Description: 'Duration: flight change back'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Affects Others Also');
   assertions.push({Expected: 'Close', Actual: Main.powerSection.getRow(0).getRange(), Description: 'Duration: flight has close range'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Permanent'), Description: 'Duration: close flight can\'t be Permanent'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerSelectDuration0', 'Instant'), Description: 'Duration: close flight can\'t be Instant'});
   } catch(e){assertions.push({Error: e, Description: 'Duration'});}

   //ADD TESTS: Data.Power[effect].isAttack

   return TestRunner.displayResults('TestSuite.HtmlGenerator.powerRow', assertions, testState);
};
TestSuite.HtmlGenerator.skillRow=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    assertions.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Description: 'Initial: First Row is blank'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: ('Initial Has first skill: ' + Data.Skill.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: ('Initial Has last skill: ' + Data.Skill.names.last())});
    assertions.push({Expected: null, Actual: document.getElementById('skillText0'), Description: 'Initial: Text doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillRank0'), Description: 'Initial: Rank doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillAbility0'), Description: 'Initial: Ability doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillBonus0'), Description: 'Initial: Bonus doesn\'t exist'});

    try{
    SelectUtil.changeText('skillChoices0', 'Acrobatics');
    assertions.push({Expected: false, Actual: Main.skillSection.getRow(0).isBlank(), Description: 'Set Acrobatics: First Row is not blank'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: ('Set Acrobatics Has first skill: ' + Data.Skill.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: ('Set Acrobatics Has last skill: ' + Data.Skill.names.last())});
    assertions.push({Expected: 'Skill Subtype', Actual: document.getElementById('skillText0').value, Description: 'Set Acrobatics: Text exists'});
    assertions.push({Expected: '1', Actual: document.getElementById('skillRank0').value, Description: 'Set Acrobatics: Rank exists'});
    assertions.push({Expected: 'Agility', Actual: document.getElementById('skillAbility0').value, Description: 'Set Acrobatics: Ability exists'});
    assertions.push({Expected: '+1', Actual: document.getElementById('skillBonus0').innerHTML, Description: 'Set Acrobatics: Bonus exists'});

    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names[0]), Description: ('Set Acrobatics Has first ability: ' + Data.Ability.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillAbility0', Data.Ability.names.last()), Description: ('Set Acrobatics Has last ability: ' + Data.Ability.names.last())});
    } catch(e){assertions.push({Error: e, Description: 'Set Acrobatics'});}

    try{
    SelectUtil.changeText('skillChoices0', 'Select Skill');
    assertions.push({Expected: true, Actual: Main.skillSection.getRow(0).isBlank(), Description: 'Unset: First Row is blank'});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names[0]), Description: ('Unset Has first skill: ' + Data.Skill.names[0])});
    assertions.push({Expected: true, Actual: SelectUtil.containsText('skillChoices0', Data.Skill.names.last()), Description: ('Unset Has last skill: ' + Data.Skill.names.last())});
    assertions.push({Expected: null, Actual: document.getElementById('skillText0'), Description: 'Unset: Text doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillRank0'), Description: 'Unset: Rank doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillAbility0'), Description: 'Unset: Ability doesn\'t exist'});
    assertions.push({Expected: null, Actual: document.getElementById('skillBonus0'), Description: 'Unset: Bonus doesn\'t exist'});
    } catch(e){assertions.push({Error: e, Description: 'Unset'});}

    return TestRunner.displayResults('TestSuite.HtmlGenerator.skillRow', assertions, testState);
};
