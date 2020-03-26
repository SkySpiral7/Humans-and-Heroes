'use strict';
TestSuite.HtmlGenerator={};
TestSuite.HtmlGenerator.advantageRow=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[], expected;

   SelectUtil.changeText('equipmentChoices0', 'Feature');
   expected = '<div class="row">' +
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

   //TODO: how to test that it generates a list of rows?

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
TestSuite.HtmlGenerator.modifierRow=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[], expected;

   SelectUtil.changeText('powerChoices0', 'Damage');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div></div>';
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'blank row'});
   Main.powerSection.clear();  //to regenerate powerModifierChoices0.0

   //amReadOnly selective tested below since it is 2.x only

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectAction0', 'Slow');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Slower Action</b>'+
      '</div>'+
      '<div class="col-6 col-sm-3 col-xl-auto">Cost 2</div>'+
      '</div>';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'Slower Action ReadOnly'});
   Main.powerSection.clear();

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   SelectUtil.changeText('powerSelectAction0', 'Slow');
   assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0,0).isBlank(), Description: 'Slow Feature doesn\'t auto get Slower Action'});
   Main.powerSection.clear();

   SelectUtil.changeText('powerChoices0', 'Damage');
   assertions.push({Expected: 'Select Modifier', Actual: document.getElementById('powerModifierChoices0.0').value, Description: 'power: default value'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Accurate'), Description: 'power has option Accurate'});
   SelectUtil.changeText('powerModifierChoices0.0', 'Accurate');
   assertions.push({Expected: 'Accurate', Actual: document.getElementById('powerModifierChoices0.0').value, Description: 'power: selected value'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Removable'), Description: 'power has option Removable'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Easily Removable'), Description: 'power has option Easily Removable'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Slower Action'), Description: 'power no read only option'});

   SelectUtil.changeText('equipmentChoices0', 'Damage');
   assertions.push({Expected: 'Select Modifier', Actual: document.getElementById('equipmentModifierChoices0.0').value, Description: 'equipment: default value'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Accurate'), Description: 'equipment has option Accurate'});
   SelectUtil.changeText('equipmentModifierChoices0.0', 'Accurate');
   assertions.push({Expected: 'Accurate', Actual: document.getElementById('equipmentModifierChoices0.0').value, Description: 'equipment: selected value'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Removable'), Description: 'equipment no Removable'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Easily Removable'), Description: 'equipment no Easily Removable'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Slower Action'), Description: 'equipment no read only option'});
   Main.clear();

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerModifierChoices0.0', 'Slower Action');
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Slower Action'), Description: 'Feature Slower Action !read only'});
   assertions.push({Expected: 'Slower Action', Actual: document.getElementById('powerModifierChoices0.0').value, Description: 'Feature Slower Action: selected value'});
   Main.powerSection.clear();

   function expectedSharedHtml(sharedName, sectionName, rowIndex, currentValue)
   {
      return Data.SharedHtml[sharedName](sectionName, rowIndex, currentValue)
      .replace(/onChange/g, 'onchange')
      .replace(/ \/>/g, '>');
   }

   SelectUtil.changeText('powerChoices0', 'Flight');
   SelectUtil.changeText('powerModifierChoices0.0', 'Attack');
   DomUtil.changeValue('powerName0', 'my name');
   DomUtil.changeValue('powerSkill0', 'my skill');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">'+expectedSharedHtml('powerName', 'power', 0, 'my name') + '</div>'+
      '<div class="col-12 col-sm-6 col-lg-4">' + expectedSharedHtml('powerSkill', 'power', 0, 'my skill') + '</div>'+
      '</div>';
   assertions.push({Expected: 'Attack', Actual: document.getElementById('powerModifierChoices0.0').value, Description: 'modifier is set'});
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'Attack ranged'});

   SelectUtil.changeText('powerSelectRange0', 'Perception');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.1" onchange="Main.powerSection.getModifierRowShort(0,1).select()">'+
      '</select>'+
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">'+expectedSharedHtml('powerName', 'power', 0, 'my name') + '</div>'+
      '</div>';
   //0.0 is Increased Range
   document.getElementById('powerModifierChoices0.1').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').children[1].outerHTML, Description: 'Attack Perception'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.1

   //hasAutoRank tested above via amReadOnly: see "Slower Action ReadOnly"

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerModifierChoices0.0', 'Slower Action');
   DomUtil.changeValue('powerModifierRank0.0', '3');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
      '<label class="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto">Applications '+
      '<input type="text" size="1" id="powerModifierRank0.0" ' +
      'onchange="Main.powerSection.getModifierRowShort(0,0).changeRank()" value="3">'+
      '</label>'+
      '</div>';
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'Feature: ranked normally read only'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerModifierChoices0.0', 'Accurate');
   DomUtil.changeValue('powerModifierRank0.0', '2');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
   '<label class="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto">Applications '+
   '<input type="text" size="1" id="powerModifierRank0.0" ' +
   'onchange="Main.powerSection.getModifierRowShort(0,0).changeRank()" value="2">'+
   '</label>'+
      '</div>';
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'ranked'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerModifierChoices0.0', 'Feature');
   DomUtil.changeValue('powerModifierText0.0', 'Thingy');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
      '<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text' +
      '&nbsp;<input type="text" id="powerModifierText0.0" ' +
      'onchange="Main.powerSection.getModifierRowShort(0,0).changeText()" value="Thingy"></label>'+
      '</div>';
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'hasText'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   SelectUtil.changeText('powerChoices0', 'Damage');
   DomUtil.changeValue('powerRank0', '10');
   SelectUtil.changeText('powerModifierChoices0.0', 'Removable');
   DomUtil.changeValue('powerModifierText0.0', 'Thingy');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
      '<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text' +
      '&nbsp;<input type="text" id="powerModifierText0.0" ' +
      'onchange="Main.powerSection.getModifierRowShort(0,0).changeText()" value="Thingy"></label>'+
      '<div class="col-auto">' +
      '=&nbsp;-2</div>'+
      '</div>';
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'hasAutoTotal'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerModifierChoices0.0', 'System Dependent');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
      '<div class="col-auto">' +
      '=&nbsp;-2</div>'+
      '</div>';
   document.getElementById('powerModifierChoices0.0').innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'abs(cost) > 1'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   SelectUtil.changeText('powerChoices0', 'Flight');
   SelectUtil.changeText('powerSelectDuration0', 'Permanent');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Increased Duration</b></div>'+
      '<div class="col-6 col-sm-3 col-xl-auto">Cost 2</div>'+
      '<div class="col-auto">' +
      '=&nbsp;0</div>'+
      '</div>';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'rawTotal != cost*rank'});
   Main.powerSection.clear();

   Main.setRuleset(2,7);
   SelectUtil.changeText('powerChoices0', 'Damage');
   SelectUtil.changeText('powerSelectAction0', 'Triggered');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Selective</b>'+
      '</div></div>';
   //firstChild is Faster Action
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').children[1].outerHTML, Description: 'Selective ReadOnly'});
   Main.powerSection.clear();

   SelectUtil.changeText('powerChoices0', 'Feature');
   SelectUtil.changeText('powerSelectDuration0', 'Sustained');
   SelectUtil.changeText('powerSelectAction0', 'Triggered');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Selective</b>'+
      '</div></div>';
   //there's no Faster Action
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection0').firstChild.outerHTML, Description: 'Feature: Selective ReadOnly'});

   return TestRunner.displayResults('TestSuite.HtmlGenerator.modifierRow', assertions, testState);
};
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
   DomUtil.changeValue('Strength', 100);
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
      '<div>modifiers</div>' +  //set below
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
   document.getElementById('powerModifierSection0').outerHTML = '<div>modifiers</div>';
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
