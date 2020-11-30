'use strict';
TestSuite.modifierRowHtml = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let expected;

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div></div>';
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'blank row'});
   Main.powerSection.clear();  //to regenerate powerModifierChoices0.0

   //amReadOnly selective tested below since it is 2.x only

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Slower Action</b>'+
      '</div>'+
      '<div class="col-6 col-sm-3 col-xl-auto">Cost 2</div>'+
      '</div>';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'Slower Action ReadOnly'});
   Main.powerSection.clear();

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
   assertions.push({Expected: true, Actual: Main.powerSection.getModifierRowShort(0,0).isBlank(), Description: 'Slow Feature doesn\'t auto get Slower Action'});
   Main.powerSection.clear();

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({Expected: 'Select Modifier', Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value, Description: 'power: default value'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Accurate'), Description: 'power has option Accurate'});
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   assertions.push({Expected: 'Accurate', Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value, Description: 'power: selected value'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Removable'), Description: 'power has option Removable'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Easily Removable'), Description: 'power has option Easily Removable'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Slower Action'), Description: 'power no read only option'});

   ReactUtil.changeValue('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Damage');
   assertions.push({Expected: 'Select Modifier', Actual: document.getElementById('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0)).value, Description: 'equipment: default value'});
   assertions.push({Expected: true, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Accurate'), Description: 'equipment has option Accurate'});
   ReactUtil.changeValue('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   assertions.push({Expected: 'Accurate', Actual: document.getElementById('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0)).value, Description: 'equipment: selected value'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Removable'), Description: 'equipment no Removable'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Easily Removable'), Description: 'equipment no Easily Removable'});
   assertions.push({Expected: false, Actual: SelectUtil.containsText('equipmentModifierChoices0.0', 'Slower Action'), Description: 'equipment no read only option'});
   Main.clear();

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Slower Action');
   assertions.push({Expected: true, Actual: SelectUtil.containsText('powerModifierChoices0.0', 'Slower Action'), Description: 'Feature Slower Action !read only'});
   assertions.push({Expected: 'Slower Action', Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value, Description: 'Feature Slower Action: selected value'});
   Main.powerSection.clear();

   function expectedSharedHtml(sharedName, sectionName, rowIndex, currentValue)
   {
      return Data.SharedHtml[sharedName](sectionName, rowIndex, currentValue)
      .replace(/onChange/g, 'onchange')
      .replace(/ \/>/g, '>');
   }

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
   ReactUtil.changeValue('powerName' + Main.powerSection.indexToKey(0), 'my name');
   ReactUtil.changeValue('powerSkill' + Main.powerSection.indexToKey(0), 'my skill');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">'+expectedSharedHtml('powerName', 'power', 0, 'my name') + '</div>'+
      '<div class="col-12 col-sm-6 col-lg-4">' + expectedSharedHtml('powerSkill', 'power', 0, 'my skill') + '</div>'+
      '</div>';
   assertions.push({Expected: 'Attack', Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value, Description: 'modifier is set'});
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'Attack ranged'});

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.1" onchange="Main.powerSection.getModifierRowShort(0,1).select()">'+
      '</select>'+
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">'+expectedSharedHtml('powerName', 'power', 0, 'my name') + '</div>'+
      '</div>';
   //0.0 is Increased Range
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).children[1].outerHTML, Description: 'Attack Perception'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.1

   //hasAutoRank tested above via amReadOnly: see "Slower Action ReadOnly"

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Slower Action');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '3');
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
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'Feature: ranked normally read only'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '2');
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
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'ranked'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Feature');
   ReactUtil.changeValue('powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Thingy');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
      '<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text' +
      '&nbsp;<input type="text" id="powerModifierText0.0" ' +
      'onchange="Main.powerSection.getModifierRowShort(0,0).changeText()" value="Thingy"></label>'+
      '</div>';
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'hasText'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), '10');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
   ReactUtil.changeValue('powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Thingy');
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
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'hasAutoTotal'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'System Dependent');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<select id="powerModifierChoices0.0" onchange="Main.powerSection.getModifierRowShort(0,0).select()">'+
      '</select>'+
      '</div>'+
      '<div class="col-auto">' +
      '=&nbsp;-2</div>'+
      '</div>';
   document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).innerHTML = '';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'abs(cost) > 1'});
   Main.powerSection.clear();  //regenerates powerModifierChoices0.0

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Permanent');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Increased Duration</b></div>'+
      '<div class="col-6 col-sm-3 col-xl-auto">Cost 2</div>'+
      '<div class="col-auto">' +
      '=&nbsp;0</div>'+
      '</div>';
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'rawTotal != cost*rank'});
   Main.powerSection.clear();

   Main.setRuleset(2,7);
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Selective</b>'+
      '</div></div>';
   //firstChild is Faster Action
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).children[1].outerHTML, Description: 'Selective ReadOnly'});
   Main.powerSection.clear();

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
   expected = '<div class="row">'+
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">'+
      '<b>Selective</b>'+
      '</div></div>';
   //there's no Faster Action
   assertions.push({Expected: expected, Actual: document.getElementById('powerModifierSection' + Main.powerSection.indexToKey(0)).firstChild.outerHTML, Description: 'Feature: Selective ReadOnly'});

   return TestRunner.displayResults('TestSuite.modifierRowHtml', assertions, testState);
};
