'use strict';
TestSuite.HtmlGenerator = {};
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
