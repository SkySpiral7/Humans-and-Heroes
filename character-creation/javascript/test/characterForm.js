'use strict';
TestSuite.characterForm = {};
TestSuite.characterForm.adjustLink = async function (testState={})
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

   form = {elements: {option0: {value: 2}, checkbox0: {checked: true}, string0: {value: 'j i'}}};
   link = {href: 'current'};
   testableAdjustLink(form, link, 'original?a=1');
   assertions.push(
      {
         Expected: {elements: {option0: {value: 2}, checkbox0: {checked: true}, string0: {value: 'j i'}}},
         Actual: form,
         Description: '1 each form: form not changed'
      });
   assertions.push(
      {
         Expected: {href: 'original?a=1&options=2&checkboxes=1&strings=%22j%20i%22'},
         Actual: link,
         Description: '1 each form: link changed'
      });

   function parseHtml(htmlString)
   {
      return document.createRange()
      .createContextualFragment(htmlString).firstChild;
   }

   form = parseHtml('<form>' +
      '<input type="radio" name="option0" value="1"/>' +
      '<input type="radio" name="option0" checked value="2"/>' +
      '<input type="checkbox" name="checkbox0" checked />' +
      '<input type="text" name="string0" value="j i"/>' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   //real href needs a full path to avoid being changed to one
   testableAdjustLink(form, link, 'http://a/?b=1');
   assertions.push(
      {
         Expected: 'http://a/?b=1&options=2&checkboxes=1&strings=%22j%20i%22',
         Actual: link.href,
         Description: '1 each real form: link changed'
      });

   form = parseHtml('<form>' +
      '<input type="radio" name="option0" value="7"/>' +
      '<input type="radio" name="option0" checked value="2"/>' +
      '<input type="radio" name="option1" value="7"/>' +
      '<input type="radio" name="option1" checked value="5"/>' +
      '<input type="radio" name="option2" checked value="1"/>' +
      '<input type="radio" name="option2" value="7"/>' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   testableAdjustLink(form, link, 'http://a/?b=1');
   assertions.push(
      {
         Expected: 'http://a/?b=1&options=2.5.1',
         Actual: link.href,
         Description: 'multiple options'
      });

   form = parseHtml('<form>' +
      '<input type="checkbox1" name="checkbox0" checked />' +
      '<input type="checkbox1" name="checkbox1" />' +
      '<input type="checkbox1" name="checkbox2" />' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   testableAdjustLink(form, link, 'http://a/?b=1');
   assertions.push(
      {
         Expected: 'http://a/?b=1&checkboxes=100',
         Actual: link.href,
         Description: 'multiple checkboxes'
      });

   form = parseHtml('<form>' +
      '<input type="text" name="string0" value="j i"/>' +
      //raw: "."
      '<input type="text" name="string1" value="&quot;.&quot;"/>' +
      //raw: \"
      '<input type="text" name="string2" value="\\&quot;"/>' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   testableAdjustLink(form, link, 'http://a/?b=1');
   assertions.push(
      {
         //decoded (note the stringify): http://a/?b=1&strings="j i","\".\"","\\\""
         Expected: 'http://a/?b=1&strings=%22j%20i%22%2C%22%5C%22.%5C%22%22%2C%22%5C%5C%5C%22%22',
         Actual: link.href,
         Description: 'multiple strings'
      });

   return TestRunner.displayResults('TestSuite.characterForm.adjustLink', assertions, testState);
};
