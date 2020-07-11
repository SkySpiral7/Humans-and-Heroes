'use strict';
TestSuite.HtmlGenerator = {};
TestSuite.HtmlGenerator.powerRow = function (testState={})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let expected;

   assertions.push({
      Expected: 'Select Power',
      Actual: document.getElementById('powerChoices0').value,
      Description: 'power: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerChoices0', 'Flight'),
      Description: 'power has option Flight'
   });
   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({
      Expected: 'Flight',
      Actual: document.getElementById('powerChoices0').value,
      Description: 'power: selected value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('powerChoices0', 'A God I Am'),
      Description: 'power: godhood false: no option'
   });
   DomUtil.changeValue('transcendence', 1);
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerChoices0', 'A God I Am'),
      Description: 'power: godhood true: has option'
   });
   Main.clear();

   assertions.push({
      Expected: 'Select Power',
      Actual: document.getElementById('equipmentChoices0').value,
      Description: 'equipment: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('equipmentChoices0', 'Flight'),
      Description: 'equipment has option Flight'
   });
   SelectUtil.changeText('equipmentChoices0', 'Flight');
   assertions.push({
      Expected: 'Flight',
      Actual: document.getElementById('equipmentChoices0').value,
      Description: 'equipment: selected value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentChoices0', 'A God I Am'),
      Description: 'equipment: godhood false: no option'
   });
   DomUtil.changeValue('Strength', 100);
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentChoices0', 'A God I Am'),
      Description: 'equipment: godhood true: still no option'
   });
   Main.clear();

   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '</div></div>';
   document.getElementById('powerChoices0').innerHTML = '';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'blank row'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   SelectUtil.changeText('powerChoices0', 'Attain Knowledge');
   DomUtil.changeValue('powerText0', 'my text');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<label class="col">Base Cost per Rank: ' +
      '<input type="text" size="1" id="powerBaseCost0" onchange="Main.powerSection.getRow(0).changeBaseCost();" value="2">' +
      '</label>' +
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value="my text"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action' +
      '<select id="powerSelectAction0" onchange="Main.powerSection.getRow(0).selectAction();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange0" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration0" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 2</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectAction0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'Attain Knowledge: canSetBaseCost, select action, range span, duration span, !isAttack'
   });
   assertions.push({
      Expected: '<hr>',
      Actual: document.getElementById('power-section').children[1].outerHTML,
      Description: 'Attain Knowledge: hr'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   SelectUtil.changeText('powerChoices0', 'Flight');
   assertions.push({
      Expected: 'Move',
      Actual: document.getElementById('powerSelectAction0').value,
      Description: 'action: selected value'
   });
   SelectUtil.changeText('powerSelectAction0', 'Full');
   assertions.push({
      Expected: 'Full',
      Actual: document.getElementById('powerSelectAction0').value,
      Description: 'action: has list of values that can be selected'
   });
   Main.powerSection.clear();

   SelectUtil.changeText('powerChoices0', 'Create');
   DomUtil.changeValue('powerText0', '');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost0" style="display: inline-block; width: 50px; text-align: center;">2</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value=""></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action' +
      '<select id="powerSelectAction0" onchange="Main.powerSection.getRow(0).selectAction();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Range' +
      '<select id="powerSelectRange0" onchange="Main.powerSection.getRow(0).selectRange();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Duration' +
      '<select id="powerSelectDuration0" onchange="Main.powerSection.getRow(0).selectDuration();">' +
      '</select></label>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 2</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectAction0').innerHTML = '';
   document.getElementById('powerSelectRange0').innerHTML = '';
   document.getElementById('powerSelectDuration0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'Create: !canSetBaseCost, select range, select duration'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   SelectUtil.changeText('powerChoices0', 'Damage');
   assertions.push({
      Expected: 'Close',
      Actual: document.getElementById('powerSelectRange0').value,
      Description: 'range: selected value'
   });
   SelectUtil.changeText('powerSelectRange0', 'Ranged');
   assertions.push({
      Expected: 'Ranged',
      Actual: document.getElementById('powerSelectRange0').value,
      Description: 'range: has list of values that can be selected'
   });
   Main.powerSection.clear();

   SelectUtil.changeText('powerChoices0', 'Protection');
   assertions.push({
      Expected: 'Permanent',
      Actual: document.getElementById('powerSelectDuration0').value,
      Description: 'duration: selected value'
   });
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   assertions.push({
      Expected: 'Sustained',
      Actual: document.getElementById('powerSelectDuration0').value,
      Description: 'duration: has list of values that can be selected'
   });
   Main.powerSection.clear();

   SelectUtil.changeText('powerChoices0', 'Immortality');
   DomUtil.changeValue('powerText0', '');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost0" style="display: inline-block; width: 50px; text-align: center;">5</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value=""></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Action <span id="powerSelectAction0" style="display: inline-block; width: 85px; text-align: center;"><b>None</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange0" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Duration' +
      '<select id="powerSelectDuration0" onchange="Main.powerSection.getRow(0).selectDuration();">' +
      '</select></label>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 5</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 5</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectDuration0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'Immortality: action span'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   function expectedSharedHtml(sharedName, sectionName, rowIndex, currentValue)
   {
      return Data.SharedHtml[sharedName](sectionName, rowIndex, currentValue)
      .replace(/onChange/g, 'onchange')
      .replace(/ \/>/g, '>');
   }

   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerText0', '');
   DomUtil.changeValue('powerName0', 'my name 2');
   DomUtil.changeValue('powerSkill0', 'my skill 2');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost0" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value=""></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action' +
      '<select id="powerSelectAction0" onchange="Main.powerSection.getRow(0).selectAction();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Range' +
      '<select id="powerSelectRange0" onchange="Main.powerSection.getRow(0).selectRange();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration0" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div class="row justify-content-end justify-content-xl-center">' +
      '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
      expectedSharedHtml('powerName', 'power', 0, 'my name 2') +
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
      expectedSharedHtml('powerSkill', 'power', 0, 'my skill 2') +
      '</div>' +
      '</div>' +
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 1</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 1</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectAction0').innerHTML = '';
   document.getElementById('powerSelectRange0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'Damage: isAttack non-perception'
   });
   Main.powerSection.clear();  //to regenerate the selects

   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerText0', '');
   SelectUtil.changeText('powerSelectRange0', 'Perception');
   DomUtil.changeValue('powerName0', 'my name 3');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost0" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value=""></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action' +
      '<select id="powerSelectAction0" onchange="Main.powerSection.getRow(0).selectAction();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Range' +
      '<select id="powerSelectRange0" onchange="Main.powerSection.getRow(0).selectRange();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration0" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div class="row justify-content-end justify-content-xl-center">' +
      '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
      expectedSharedHtml('powerName', 'power', 0, 'my name 3') +
      '</div>' +
      '</div>' +
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="1"></label>' +
      //Increased Range to Perception is +3
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 4</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 4</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectAction0').innerHTML = '';
   document.getElementById('powerSelectRange0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'Damage: perception'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   SelectUtil.changeText('powerChoices0', 'Leaping');
   DomUtil.changeValue('powerText0', '');
   SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
   DomUtil.changeValue('powerRank0', '4');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost0" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value=""></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action' +
      '<select id="powerSelectAction0" onchange="Main.powerSection.getRow(0).selectAction();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange0" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration0" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="4"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: (1/2)</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectAction0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'costPerRank 0 displays 1/2'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   SelectUtil.changeText('powerChoices0', 'Leaping');
   DomUtil.changeValue('powerText0', '');
   SelectUtil.changeText('powerModifierChoices0.0', 'Other Rank Flaw');
   DomUtil.changeValue('powerModifierRank0.0', '3');
   DomUtil.changeValue('powerRank0', '8');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices0" onchange="Main.powerSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost0" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" style="width: 100%" id="powerText0" onchange="Main.powerSection.getRow(0).changeText();"' +
      ' value=""></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action' +
      '<select id="powerSelectAction0" onchange="Main.powerSection.getRow(0).selectAction();">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange0" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration0" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection0">modifiers</div>' +  //set below
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank0" onchange="Main.powerSection.getRow(0).changeRank();" value="8"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: (1/4)</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   document.getElementById('powerChoices0').innerHTML = '';
   document.getElementById('powerSelectAction0').innerHTML = '';
   document.getElementById('powerModifierSection0').innerHTML = 'modifiers';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('power-section').firstChild.outerHTML,
      Description: 'costPerRank -2 displays 1/4'
   });
   Main.powerSection.clear();  //to regenerate powerChoices0

   return TestRunner.displayResults('TestSuite.HtmlGenerator.powerRow', assertions, testState);
};
TestSuite.HtmlGenerator.skillRow = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let expected;

   assertions.push({
      Expected: 'Select Skill',
      Actual: document.getElementById('skillChoices0').value,
      Description: 'skill: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('skillChoices0', 'Knowledge'),
      Description: 'skill has option Knowledge'
   });
   SelectUtil.changeText('skillChoices0', 'Knowledge');
   assertions.push({
      Expected: 'Knowledge',
      Actual: document.getElementById('skillChoices0').value,
      Description: 'skill: selected value'
   });
   Main.skillSection.clear();

   SelectUtil.changeText('skillChoices0', 'Athletics');
   assertions.push({
      Expected: 'Strength',
      Actual: document.getElementById('skillAbility0').value,
      Description: 'ability: default value'
   });
   SelectUtil.changeText('skillAbility0', 'Awareness');
   assertions.push({
      Expected: 'Awareness',
      Actual: document.getElementById('skillAbility0').value,
      Description: 'ability: selected value'
   });
   Main.skillSection.clear();

   expected = '<div class="row">' +
      '<div class="col-12 col-sm-4 col-lg-3 col-xl-auto">' +
      '<select id="skillChoices0" onchange="Main.skillSection.getRow(0).select();">' +
      '</select></div>' +
      '</div>';
   document.getElementById('skillChoices0').innerHTML = '';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('skill-section').firstChild.outerHTML,
      Description: 'blank row'
   });
   Main.skillSection.clear();  //to regenerate skillChoices0

   SelectUtil.changeText('skillChoices0', 'Knowledge');
   DomUtil.changeValue('skillText0', 'my text');
   DomUtil.changeValue('skillRank0', '3');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-4 col-lg-3 col-xl-auto">' +
      '<select id="skillChoices0" onchange="Main.skillSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col-12 col-sm-8 col-md-5">' +
      '<input type="text" style="width: 100%" id="skillText0" onchange="Main.skillSection.getRow(0).changeText();" value="my text">' +
      '</div>' +  //text
      '<div class="col-12 col-md-3 col-lg-4 col-xl-auto">' +
      '<label>Ranks <input type="text" size="1" id="skillRank0" onchange="Main.skillSection.getRow(0).changeRank();" value="3"></label>' +
      '+&nbsp;<select id="skillAbility0" onchange="Main.skillSection.getRow(0).selectAbility();">' +
      '</select>' +
      '(+3)' +
      '</div>' +
      '</div>';
   document.getElementById('skillChoices0').innerHTML = '';
   document.getElementById('skillAbility0').innerHTML = '';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('skill-section').firstChild.outerHTML,
      Description: 'hasText'
   });
   Main.skillSection.clear();  //to regenerate skillChoices0

   SelectUtil.changeText('skillChoices0', 'Perception');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-4 col-lg-3 col-xl-auto">' +
      '<select id="skillChoices0" onchange="Main.skillSection.getRow(0).select();">' +
      '</select></div>' +
      '<div class="col-12 col-sm-8 col-xl-auto">' +
      '<label>Ranks <input type="text" size="1" id="skillRank0" onchange="Main.skillSection.getRow(0).changeRank();" value="1"></label>' +
      '+&nbsp;<select id="skillAbility0" onchange="Main.skillSection.getRow(0).selectAbility();">' +
      '</select>' +
      '(+1)' +
      '</div>' +
      '</div>';
   document.getElementById('skillChoices0').innerHTML = '';
   document.getElementById('skillAbility0').innerHTML = '';
   assertions.push({
      Expected: expected,
      Actual: document.getElementById('skill-section').firstChild.outerHTML,
      Description: '!hasText'
   });
   Main.skillSection.clear();  //to regenerate skillChoices0

   return TestRunner.displayResults('TestSuite.HtmlGenerator.skillRow', assertions, testState);
};
