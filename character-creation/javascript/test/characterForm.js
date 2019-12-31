'use strict';
TestSuite.characterForm = {};
TestSuite.characterForm.adjustLink = function (testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [], form, link, returnValue;

   //don't create elements so I can tell that the object wasn't changed
   form = {elements: {}};
   link = {href: 'current'};
   returnValue = testableAdjustLink(form, link, 'original');
   assertions.push(
      {
         Expected: {elements: {}},
         Actual: form,
         Description: 'empty form: form not changed'
      });
   assertions.push(
      {
         Expected: {href: 'original'},
         Actual: link,
         Description: 'empty form with href: link reverted'
      });
   assertions.push(
      {
         Expected: 'original',
         Actual: returnValue,
         Description: 'empty form with href: returned same href'
      });

   form = {elements: {}};
   link = {href: 'current'};
   returnValue = testableAdjustLink(form, link, undefined);
   assertions.push(
      {
         Expected: {href: 'current'},
         Actual: link,
         Description: 'empty form no href: link not changed'
      });
   assertions.push(
      {
         Expected: 'current',
         Actual: returnValue,
         Description: 'empty form no href: returned link href'
      });

   //TODO: create elements for below for more realistic testing
   form = {elements: {option0: {value: 2}, checkbox0: {checked: true}, name0: {value: 'j i'}}};
   link = {href: 'current'};
   testableAdjustLink(form, link, 'original?a=1');
   assertions.push(
      {
         Expected: {elements: {option0: {value: 2}, checkbox0: {checked: true}, name0: {value: 'j i'}}},
         Actual: form,
         Description: '1 each form: form not changed'
      });
   assertions.push(
      {
         Expected: {href: 'original?a=1&options=2&checkboxes=1&names=%22j%20i%22'},
         Actual: link,
         Description: '1 each form: link changed'
      });

   form = {elements: {option0: {value: 2}, option1: {value: 5}, option2: {value: 1}}};
   link = {href: 'current'};
   testableAdjustLink(form, link, 'o?a=1');
   assertions.push(
      {
         Expected: {href: 'o?a=1&options=2.5.1'},
         Actual: link,
         Description: 'multiple options'
      });

   form = {elements: {checkbox0: {checked: true}, checkbox1: {checked: false}, checkbox2: {checked: false}}};
   link = {href: 'current'};
   testableAdjustLink(form, link, 'o?a=1');
   assertions.push(
      {
         Expected: {href: 'o?a=1&checkboxes=100'},
         Actual: link,
         Description: 'multiple checkboxes'
      });

   form = {elements: {name0: {value: 'j i'}, name1: {value: '"."'}, name2: {value: '\\"'}}};
   link = {href: 'current'};
   testableAdjustLink(form, link, 'o?a=1');
   assertions.push(
      {
         //decoded (note the stringify): o?a=1&names="j i","\".\"","\\\""
         Expected: {href: 'o?a=1&names=%22j%20i%22%2C%22%5C%22.%5C%22%22%2C%22%5C%5C%5C%22%22'},
         Actual: link,
         Description: 'multiple names'
      });

   return TestRunner.displayResults('TestSuite.characterForm.adjustLink', assertions, testState);
};
