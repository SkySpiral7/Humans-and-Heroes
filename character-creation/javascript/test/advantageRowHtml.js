'use strict';
TestSuite.advantageRowHtml = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let expected;

   function getSectionFirstRowHtml()
   {
      /*don't edit the actual DOM because react will die if it tries to change options that are different
      objects even though they are identical HTML.
      even though there should be only 1 child, can't do section.innerHTML because of blank row*/
      const sectionHolder = document.createElement('div');
      //important: this creates a copy of the elements so that the original is not mutated
      sectionHolder.innerHTML = document.getElementById('advantage-section').firstChild.outerHTML;

      const allSelects = sectionHolder.getElementsByTagName('select');
      //HTMLCollection can be treated as an array
      for (let i = 0; i < allSelects.length; i++)
      {
         //this removes all options from every select to make it easy to test the html (options tested by containsText).
         allSelects[i].innerHTML = '';
      }

      return sectionHolder.innerHTML;
   }

   ReactUtil.changeValue('equipmentChoices' + Main.equipmentSection.indexToKey(0), 'Feature');
   expected = '<div class="row">' +
      '<div class="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>' +
      '<div class="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost 1</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'equipment row'});
   Main.equipmentSection.clear();

   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + Main.advantageSection.indexToKey(0) + '">' +
      '</select></div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'blank row'});
   Main.advantageSection.clear();

   //TODO: how to test that it generates a list of rows?

   assertions.push({
      Expected: 'Select Advantage',
      Actual: document.getElementById('advantageChoices' + Main.advantageSection.indexToKey(0)).value,
      Description: 'initial: default value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('advantageChoices' + Main.advantageSection.indexToKey(0), 'Equipment'),
      Description: 'initial: Equipment not in select'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('advantageChoices' + Main.advantageSection.indexToKey(0), 'Ultimate Effort'),
      Description: 'initial: has (last advantage) Ultimate Effort'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('advantageChoices' + Main.advantageSection.indexToKey(0), 'Beyond Mortal'),
      Description: 'initial: no (first Godhood) Beyond Mortal'
   });

   DomUtil.changeValue('transcendence', 1);
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('advantageChoices' + Main.advantageSection.indexToKey(0), 'Beyond Mortal'),
      Description: 'godhood: has (first) Beyond Mortal'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('advantageChoices' + Main.advantageSection.indexToKey(0), 'Your Petty Rules Don\'t Apply to Me'),
      Description: 'godhood: has (last) Your Petty Rules Don\'t Apply to Me'
   });
   DomUtil.changeValue('transcendence', 0);

   ReactUtil.changeValue('advantageChoices' + Main.advantageSection.indexToKey(0), 'Diehard');
   assertions.push({
      Expected: 'Diehard',
      Actual: document.getElementById('advantageChoices' + Main.advantageSection.indexToKey(0)).value,
      Description: 'select set to value'
   });
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + Main.advantageSection.indexToKey(0) + '">' +
      '</select></div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'no rank or text'});

   ReactUtil.changeValue('advantageChoices' + Main.advantageSection.indexToKey(0), 'Defensive Roll');
   ReactUtil.changeValue('advantageRank' + Main.advantageSection.indexToKey(0), '3');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + Main.advantageSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank ' +
      '<input type="text" size="1" id="advantageRank' + Main.advantageSection.indexToKey(0) + '" value="3"></label>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has rank'});

   //text is tested in 1.0 so that I can set only text

   //TODO: everywhere: should really be setting #transcendence instead of Strength for godhood. more clear, less side affect
   DomUtil.changeValue('transcendence', 1);
   ReactUtil.changeValue('advantageChoices' + Main.advantageSection.indexToKey(0), 'Let There Be');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + Main.advantageSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col-auto">=&nbsp;40</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has total'});
   Main.clear();

   ReactUtil.changeValue('advantageChoices' + Main.advantageSection.indexToKey(0), 'Sidekick');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + Main.advantageSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank ' +
      '<input type="text" size="1" id="advantageRank' + Main.advantageSection.indexToKey(0) + '" value="1"></label>' +
      '<div class="col-12 col-sm-6"><input type="text" ' +
      'id="advantageText' + Main.advantageSection.indexToKey(0) + '" value="Helper Name" style="width: 100%;"></div>' +
      '<div class="col-auto">=&nbsp;2</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has rank, text, total'});

   Main.setRuleset(1, 0);
   ReactUtil.changeValue('advantageChoices' + Main.advantageSection.indexToKey(0), 'Favored Environment');
   ReactUtil.changeValue('advantageText' + Main.advantageSection.indexToKey(0), 'Ocean');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + Main.advantageSection.indexToKey(0) + '">' +
      '</select></div>' +
      '<div class="col-12 col-sm-6"><input type="text" ' +
      'id="advantageText' + Main.advantageSection.indexToKey(0) + '" value="Ocean" style="width: 100%;"></div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has text'});

   return TestRunner.displayResults('TestSuite.advantageRowHtml', assertions, testState);
};
