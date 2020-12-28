'use strict';
TestSuite.modifierRowHtml = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let expected;

   function getSectionRowHtml(sectionName, childIndex)
   {
      /*don't edit the actual DOM because react will die if it tries to change options that are different
      objects even though they are identical HTML.
      even though there should be only 1 child, can't do section.innerHTML because of blank row*/
      const sectionHolder = document.createElement('div');
      const powerKey = Main[sectionName + 'Section'].indexToKey(0);
      //important: this creates a copy of the elements so that the original is not mutated
      sectionHolder.innerHTML = document.getElementById(sectionName + 'ModifierSection' + powerKey).children[childIndex].outerHTML;

      const allSelects = sectionHolder.getElementsByTagName('select');
      //HTMLCollection can be treated as an array
      for (let i = 0; i < allSelects.length; i++)
      {
         //this removes all options from every select to make it easy to test the html (options tested by containsText).
         allSelects[i].innerHTML = '';
      }

      return sectionHolder.innerHTML;
   }

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div></div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'blank row'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack'),
      Description: 'personal power: non personal option'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Affects Others Only'),
      Description: 'personal attack: can undo or change non personal mod'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1), 'Affects Others Only'),
      Description: 'personal attack: other mod not an option'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack'),
      Description: 'not personal: non personal not an option'
   });

   //amReadOnly selective tested below since it is 2.x only

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<b>Slower Action</b>' +
      '</div>' +
      '<div class="col-6 col-sm-3 col-xl-auto">Rank 2</div>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'Slower Action ReadOnly'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Slow');
   assertions.push({
      Expected: 0,
      Actual: Main.powerSection.getState().it[0].Modifiers.length,
      Description: 'Slow Feature doesn\'t auto get Slower Action'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 'Select Modifier',
      Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value,
      Description: 'power: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate'),
      Description: 'power has option Accurate'
   });
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   assertions.push({
      Expected: 'Accurate',
      Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value,
      Description: 'power: selected value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable'),
      Description: 'power has option Removable'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Easily Removable'),
      Description: 'power has option Easily Removable'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Slower Action'),
      Description: 'power no read only option'
   });

   ReactUtil.changeValue('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 'Select Modifier',
      Actual: document.getElementById('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0)).value,
      Description: 'equipment: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0), 'Accurate'),
      Description: 'equipment has option Accurate'
   });
   ReactUtil.changeValue('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   assertions.push({
      Expected: 'Accurate',
      Actual: document.getElementById('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0)).value,
      Description: 'equipment: selected value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0), 'Removable'),
      Description: 'equipment no Removable'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0),
         'Easily Removable'),
      Description: 'equipment no Easily Removable'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentModifierChoices' + Main.equipmentSection.indexToPowerAndModifierKey(0, 0), 'Slower Action'),
      Description: 'equipment no read only option'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Slower Action');
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Slower Action'),
      Description: 'Feature Slower Action !read only'
   });
   assertions.push({
      Expected: 'Slower Action',
      Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value,
      Description: 'Feature Slower Action: selected value'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Attack');
   ReactUtil.changeValue('powerName' + Main.powerSection.indexToKey(0), 'my name');
   ReactUtil.changeValue('powerSkill' + Main.powerSection.indexToKey(0), 'my skill');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">' +
      '<label class="fill-remaining">Name&nbsp;<input type="text" id="powerName' + Main.powerSection.indexToKey(0) +
      '" value="my name"></label>' +
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">' +
      '<label class="fill-remaining">Skill&nbsp;<input type="text" id="powerSkill' + Main.powerSection.indexToKey(0) +
      '" value="my skill"></label>' +
      '</div>' +
      '</div>';
   assertions.push({
      Expected: 'Attack',
      Actual: document.getElementById('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0)).value,
      Description: 'modifier is set'
   });
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'Attack ranged'
   });

   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 1) + '">' +
      '</select>' +
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-4">' +
      '<label class="fill-remaining">Name&nbsp;<input type="text" id="powerName' + Main.powerSection.indexToKey(0) +
      '" value="my name"></label>' +
      '</div>' +
      '</div>';
   //0.0 is Increased Range
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 1),
      Description: 'Attack Perception'
   });

   //hasAutoRank tested above via amReadOnly: see "Slower Action ReadOnly"

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Slower Action');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '3');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div>' +
      '<label class="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto">Applications ' +
      '<input type="text" size="1" id="powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '" value="3">' +
      '</label>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'Feature: ranked normally read only'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Accurate');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '2');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div>' +
      '<label class="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto">Applications ' +
      '<input type="text" size="1" id="powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '" value="2">' +
      '</label>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'ranked'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Feature');
   ReactUtil.changeValue('powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Thingy');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div>' +
      '<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text&nbsp;' +
      '<input type="text" id="powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '" value="Thingy"></label>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'hasText'
   });

   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), '10');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Removable');
   ReactUtil.changeValue('powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Thingy');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div>' +
      '<label class="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining">Text&nbsp;' +
      '<input type="text" id="powerModifierText' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '" value="Thingy"></label>' +
      '<div class="col-auto" style="white-space: nowrap;">= -2</div>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'hasAutoTotal'
   });

   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'System Dependent');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<select id="powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0) + '">' +
      '</select>' +
      '</div>' +
      '<div class="col-auto" style="white-space: nowrap;">= -2</div>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'abs(cost) > 1'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Permanent');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<b>Increased Duration</b></div>' +
      '<div class="col-6 col-sm-3 col-xl-auto">Rank 2</div>' +
      '<div class="col-auto" style="white-space: nowrap;">= 0</div>' +
      '</div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'rawTotal != cost*rank'
   });

   Main.setRuleset(2, 7);
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<b>Selective</b>' +
      '</div></div>';
   //firstChild is Faster Action
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 1),
      Description: 'Selective ReadOnly'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Feature');
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Triggered');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-5 col-lg-4 col-xl-auto">' +
      '<b>Selective</b>' +
      '</div></div>';
   //there's no Faster Action
   assertions.push({
      Expected: expected,
      Actual: getSectionRowHtml('power', 0),
      Description: 'Feature: Selective ReadOnly'
   });

   return TestRunner.displayResults('TestSuite.modifierRowHtml', assertions, testState);
};
