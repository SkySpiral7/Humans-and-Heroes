'use strict';
TestSuite.powerRowHtml = function (testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let expected;

   function getSectionFirstRowHtml(sectionName)
   {
      /*don't edit the actual DOM because react will die if it tries to change options that are different
      objects even though they are identical HTML.
      even though there should be only 1 child, can't do section.innerHTML because of blank row*/
      const sectionHolder = document.createElement('div');
      //important: this creates a copy of the elements so that the original is not touched
      sectionHolder.innerHTML = document.getElementById(sectionName + '-section').firstChild.outerHTML;

      const allSelects = sectionHolder.getElementsByTagName('select');
      //HTMLCollection can be treated as an array
      for (let i = 0; i < allSelects.length; i++)
      {
         //this removes all options from every select to make it easy to test the html (options tested by containsText).
         allSelects[i].innerHTML = '';
      }
      const modifierDiv = sectionHolder.querySelector('[id^=\'' + sectionName + 'ModifierSection\']');
      //blank row has no modifiers
      if (null !== modifierDiv)
      {
         //not the empty string to avoid having an empty div
         modifierDiv.innerHTML = 'modifiers';
      }

      return sectionHolder.innerHTML;
   }

   assertions.push({
      Expected: 'Select Power',
      Actual: document.getElementById('powerChoices' + Main.powerSection.indexToKey(0)).value,
      Description: 'power: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerChoices' + Main.powerSection.indexToKey(0), 'Flight'),
      Description: 'power has option Flight'
   });
   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   assertions.push({
      Expected: 'Flight',
      Actual: document.getElementById('powerChoices' + Main.powerSection.indexToKey(0)).value,
      Description: 'power: selected value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('powerChoices' + Main.powerSection.indexToKey(0), 'A God I Am'),
      Description: 'power: godhood false: no option'
   });
   DomUtil.changeValue('transcendence', 1);
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('powerChoices' + Main.powerSection.indexToKey(0), 'A God I Am'),
      Description: 'power: godhood true: has option'
   });
   Main.clear();

   assertions.push({
      Expected: 'Select Power',
      Actual: document.getElementById('equipmentChoices' + Main.equipmentSection.indexToKey(0)).value,
      Description: 'equipment: default value'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Flight'),
      Description: 'equipment has option Flight'
   });
   ReactUtil.changeValue('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Flight');
   assertions.push({
      Expected: 'Flight',
      Actual: document.getElementById('equipmentChoices' + Main.equipmentSection.indexToKey(0)).value,
      Description: 'equipment: selected value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'A God I Am'),
      Description: 'equipment: godhood false: no option'
   });
   DomUtil.changeValue('transcendence', 1);
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'A God I Am'),
      Description: 'equipment: godhood true: still no option'
   });
   Main.clear();

   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '</div></div>';
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'blank row'
   });
   assertions.push({
      Expected: 1,
      Actual: document.getElementById('power-section').children.length,
      Description: 'blank has no hr'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Attain Knowledge');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), 'my text');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<label class="col">Base Cost per Rank: ' +
      '<input type="text" size="1" id="powerBaseCost' + Main.powerSection.indexToKey(0) + '" value="2">' +
      '</label>' +
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="my text" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      //TODO: why is name/skill nonbreaking but ARD isn't?
      '<label>Action ' +
      '<select id="powerSelectAction' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 2</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'Attain Knowledge: canSetBaseCost, select action, range span, duration span, !isAttack'
   });
   assertions.push({
      Expected: '<hr>',
      Actual: document.getElementById('power-section').children[1].outerHTML,
      Description: 'Attain Knowledge: hr'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Flight');
   assertions.push({
      Expected: 'Move',
      Actual: document.getElementById('powerSelectAction' + Main.powerSection.indexToKey(0)).value,
      Description: 'action: selected value'
   });
   ReactUtil.changeValue('powerSelectAction' + Main.powerSection.indexToKey(0), 'Full');
   assertions.push({
      Expected: 'Full',
      Actual: document.getElementById('powerSelectAction' + Main.powerSection.indexToKey(0)).value,
      Description: 'action: has list of values that can be selected'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Create');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), '');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 50px; text-align: center;">2</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action ' +
      '<select id="powerSelectAction' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Range ' +
      '<select id="powerSelectRange' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Duration ' +
      '<select id="powerSelectDuration' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 2</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'Create: !canSetBaseCost, select range, select duration'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   assertions.push({
      Expected: 'Close',
      Actual: document.getElementById('powerSelectRange' + Main.powerSection.indexToKey(0)).value,
      Description: 'range: selected value'
   });
   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Ranged');
   assertions.push({
      Expected: 'Ranged',
      Actual: document.getElementById('powerSelectRange' + Main.powerSection.indexToKey(0)).value,
      Description: 'range: has list of values that can be selected'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Protection');
   assertions.push({
      Expected: 'Permanent',
      Actual: document.getElementById('powerSelectDuration' + Main.powerSection.indexToKey(0)).value,
      Description: 'duration: selected value'
   });
   ReactUtil.changeValue('powerSelectDuration' + Main.powerSection.indexToKey(0), 'Sustained');
   assertions.push({
      Expected: 'Sustained',
      Actual: document.getElementById('powerSelectDuration' + Main.powerSection.indexToKey(0)).value,
      Description: 'duration: has list of values that can be selected'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Immortality');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), '');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 50px; text-align: center;">5</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Action <span id="powerSelectAction' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 85px; text-align: center;"><b>None</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Duration ' +
      '<select id="powerSelectDuration' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 5</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 5</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'Immortality: action span'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), '');
   ReactUtil.changeValue('powerName' + Main.powerSection.indexToKey(0), 'my name 2');
   ReactUtil.changeValue('powerSkill' + Main.powerSection.indexToKey(0), 'my skill 2');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action ' +
      '<select id="powerSelectAction' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Range ' +
      '<select id="powerSelectRange' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div class="row justify-content-end justify-content-xl-center">' +
      '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
      '<label class="fill-remaining">Name&nbsp;<input type="text" id="powerName' + Main.powerSection.indexToKey(0) +
      '" value="my name 2"></label>' +
      '</div>' +
      '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
      '<label class="fill-remaining">Skill&nbsp;<input type="text" id="powerSkill' + Main.powerSection.indexToKey(0) +
      '" value="my skill 2"></label>' +
      '</div>' +
      '</div>' +
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="1"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 1</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 1</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'Damage: isAttack non-perception'
   });
   Main.powerSection.clear();

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Damage');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), '');
   ReactUtil.changeValue('powerSelectRange' + Main.powerSection.indexToKey(0), 'Perception');
   ReactUtil.changeValue('powerName' + Main.powerSection.indexToKey(0), 'my name 3');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action ' +
      '<select id="powerSelectAction' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Range ' +
      '<select id="powerSelectRange' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div class="row justify-content-end justify-content-xl-center">' +
      '<div class="col-12 col-sm-6 col-lg-5 col-xl-4">' +
      '<label class="fill-remaining">Name&nbsp;<input type="text" id="powerName' + Main.powerSection.indexToKey(0) +
      '" value="my name 3"></label>' +
      '</div>' +
      '</div>' +
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="1"></label>' +
      //Increased Range to Perception is +3
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: 4</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 4</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'Damage: perception'
   });

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Leaping');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), '');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Other Rank Flaw');
   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), '4');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action ' +
      '<select id="powerSelectAction' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="4"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: (1/2)</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'costPerRank 0 displays 1/2'
   });
   Main.powerSection.clear();

   ReactUtil.changeValue('powerChoices' + Main.powerSection.indexToKey(0), 'Leaping');
   ReactUtil.changeValue('powerText' + Main.powerSection.indexToKey(0), '');
   ReactUtil.changeValue('powerModifierChoices' + Main.powerSection.indexToPowerAndModifierKey(0, 0), 'Other Rank Flaw');
   ReactUtil.changeValue('powerModifierRank' + Main.powerSection.indexToPowerAndModifierKey(0, 0), '3');
   ReactUtil.changeValue('powerRank' + Main.powerSection.indexToKey(0), '8');
   expected = '<div class="container-fluid"><div class="row">' +
      '<div class="col-12 col-sm-6 col-xl-auto"><select id="powerChoices' + Main.powerSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col">Base Cost per Rank: ' +
      '<span id="powerBaseCost' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 50px; text-align: center;">1</span>' +
      '</div>' +  //end base cost col
      '</div>' +  //end power/cost row
      '<div class="row"><input type="text" id="powerText' + Main.powerSection.indexToKey(0) + '"' +
      ' value="" style="width: 100%;"></div>' +
      '<div class="row justify-content-center">' +  //action, range, duration row
      '<div class="col-12 col-sm-4 col-lg-3">' +
      '<label>Action ' +
      '<select id="powerSelectAction' + Main.powerSection.indexToKey(0) + '">' +
      '</select></label>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Range <span id="powerSelectRange' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 90px; text-align: center;"><b>Personal</b></span>' +
      '</div>' +
      '<div class="col-12 col-sm-4 col-lg-3">' +
      'Duration <span id="powerSelectDuration' + Main.powerSection.indexToKey(0) +
      '" style="display: inline-block; width: 80px; text-align: center;"><b>Instant</b></span>' +
      '</div>' +
      '</div>' +  //end action, range, duration row
      '<div id="powerModifierSection' + Main.powerSection.indexToKey(0) + '">modifiers</div>' +  //set to this
      '<div class="row">' +
      '<label class="col-12 col-sm-6 col-md-4 col-xl-auto">Ranks: ' +
      '<input type="text" size="1" id="powerRank' + Main.powerSection.indexToKey(0) + '" value="8"></label>' +
      '<div class="col-12 col-sm-6 col-md-4 col-xl-auto">Total Cost Per Rank: (1/4)</div>' +
      '<div class="col-12 col-md-4 col-xl-auto">Total Flat Modifier Cost: 0</div>' +
      '</div>' +  //end row of costs
      '<div class="row"><div class="col">Grand total for Power: 2</div>' +
      '</div>' +
      '</div>';  //<hr> is next child
   assertions.push({
      Expected: expected,
      Actual: getSectionFirstRowHtml('power'),
      Description: 'costPerRank -2 displays 1/4'
   });

   return TestRunner.displayResults('TestSuite.powerRowHtml', assertions, testState);
};
