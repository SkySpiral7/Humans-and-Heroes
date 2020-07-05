'use strict';
TestSuite.advantageRowHtml = function (testState = {})
{
   TestRunner.clearResults(testState);
   const assertions = [];
   let expected;

   function getSectionFirstRowHtml()
   {
      /*don't edit the DOM because react will die if it tries to change options that are different
      objects even though they are identical HTML.
      even though there should be only 1 child, can't do section.innerHTML because of blank row*/
      let html = document.getElementById('advantage-section').firstChild.outerHTML;
      /*this removes all options from every select to make it easy to test the html (options tested elsewhere).
      this regex avoids catastrophic backtracking because all aggregates are bound (can't overlap)*/
      html = html.replace(/(<select\b[^>]+>)(?:<option>[^<]+<\/option>)+<\/select>/g, '$1</select>');
      return html;
   }

   function getId(index)
   {
      return Main.advantageSection.indexToKey(index);
   }

   SelectUtil.changeText('equipmentChoices0', 'Feature');
   expected = '<div class="row">' +
      '<div class="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>' +
      '<div class="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost 1</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'equipment row'});
   Main.equipmentSection.clear();

   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + getId(0) + '">' +
      '</select></div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'blank row'});
   Main.advantageSection.clear();

   //TODO: how to test that it generates a list of rows?

   assertions.push({
      Expected: 'Select Advantage',
      Actual: document.getElementById('advantageChoices' + getId(0)).value,
      Description: 'initial: default value'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('advantageChoices' + getId(0), 'Equipment'),
      Description: 'initial: Equipment not in select'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('advantageChoices' + getId(0), 'Ultimate Effort'),
      Description: 'initial: has (last advantage) Ultimate Effort'
   });
   assertions.push({
      Expected: false,
      Actual: SelectUtil.containsText('advantageChoices' + getId(0), 'Beyond Mortal'),
      Description: 'initial: no (first Godhood) Beyond Mortal'
   });

   DomUtil.changeValue('transcendence', 1);
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('advantageChoices' + getId(0), 'Beyond Mortal'),
      Description: 'godhood: has (first) Beyond Mortal'
   });
   assertions.push({
      Expected: true,
      Actual: SelectUtil.containsText('advantageChoices' + getId(0), 'Your Petty Rules Don\'t Apply to Me'),
      Description: 'godhood: has (last) Your Petty Rules Don\'t Apply to Me'
   });
   DomUtil.changeValue('transcendence', 0);

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Diehard');
   assertions.push({
      Expected: 'Diehard',
      Actual: document.getElementById('advantageChoices' + getId(0)).value,
      Description: 'select set to value'
   });
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + getId(0) + '">' +
      '</select></div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'no rank or text'});

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Defensive Roll');
   ReactUtil.changeValue('advantageRank' + getId(0), '3');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + getId(0) + '">' +
      '</select></div>' +
      '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank ' +
      '<input type="text" size="1" id="advantageRank' + getId(0) + '" value="3"></label>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has rank'});

   //text is tested in 1.0 so that I can set only text

   //TODO: everywhere: should really be setting #transcendence instead of Strength for godhood. more clear, less side affect
   DomUtil.changeValue('transcendence', 1);
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Let There Be');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + getId(0) + '">' +
      '</select></div>' +
      '<div class="col-auto">=&nbsp;40</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has total'});
   Main.clear();

   ReactUtil.changeValue('advantageChoices' + getId(0), 'Sidekick');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + getId(0) + '">' +
      '</select></div>' +
      '<label class="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank ' +
      '<input type="text" size="1" id="advantageRank' + getId(0) + '" value="1"></label>' +
      '<div class="col-12 col-sm-6"><input type="text" ' +
      'id="advantageText' + getId(0) + '" value="Helper Name" style="width: 100%;"></div>' +
      '<div class="col-auto">=&nbsp;2</div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has rank, text, total'});

   Main.setRuleset(1, 0);
   ReactUtil.changeValue('advantageChoices' + getId(0), 'Favored Environment');
   ReactUtil.changeValue('advantageText' + getId(0), 'Ocean');
   expected = '<div class="row">' +
      '<div class="col-12 col-sm-6 col-lg-4 col-xl-auto">' +
      '<select id="advantageChoices' + getId(0) + '">' +
      '</select></div>' +
      '<div class="col-12 col-sm-6"><input type="text" ' +
      'id="advantageText' + getId(0) + '" value="Ocean" style="width: 100%;"></div>' +
      '</div>';
   assertions.push({Expected: expected, Actual: getSectionFirstRowHtml(), Description: 'has text'});

   return TestRunner.displayResults('TestSuite.advantageRowHtml', assertions, testState);
};