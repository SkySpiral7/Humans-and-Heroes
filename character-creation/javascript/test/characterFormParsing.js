'use strict';
TestSuite.characterFormParsing = {};
TestSuite.characterFormParsing.parseQueryParameters = function (testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [], input;

   input = '';
   assertions.push(
      {
         Expected: {options: [], checkboxes: [], names: []},
         Actual: parseQueryParameters(input),
         Description: 'no query params => default values'
      });

   input = '?a';
   assertions.push(
      {
         Expected: {a: undefined, options: [], checkboxes: [], names: []},
         Actual: parseQueryParameters(input),
         Description: 'query params without value => key without value'
      });

   input = '?ab=Crime%20Fighter.js&bc=23&options=1.5.1&checkboxes=011&names=%22(Choose%20One)%22%2C%22name2%22';
   assertions.push(
      {
         Expected: {
            "ab": "Crime Fighter.js",
            "bc": "23",
            options: ['1', '5', '1'], checkboxes: [false, true, true], names: ["(Choose One)", "name2"]
         },
         Actual: parseQueryParameters(input),
         Description: 'parse all query params'
      });

   input = '?options=1';
   assertions.push(
      {
         Expected: {options: ['1'], checkboxes: [], names: []},
         Actual: parseQueryParameters(input),
         Description: 'just options'
      });

   input = '?checkboxes=1';
   assertions.push(
      {
         Expected: {options: [], checkboxes: [true], names: []},
         Actual: parseQueryParameters(input),
         Description: 'just checkboxes'
      });

   input = '?names=%22a%22';
   assertions.push(
      {
         Expected: {options: [], checkboxes: [], names: ["a"]},
         Actual: parseQueryParameters(input),
         Description: 'just names'
      });

   return TestRunner.displayResults('TestSuite.characterFormParsing.parseQueryParameters', assertions, testState);
};
/**This is an IT to make sure characterForm and characterFormParsing agree on format*/
TestSuite.characterFormParsing.parseQueryParametersFromForm = function (testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [], query, form, link;

   function parseHtml(htmlString)
   {
      return document.createRange()
      .createContextualFragment(htmlString).firstChild;
   }

   form = parseHtml('<form></form>');
   link = parseHtml('<a href="current">link</a>');
   //real href needs a full path to avoid being changed to one
   testableAdjustLink(form, link, 'http://a/?b=1');
   query = link.href.substring('http://a/'.length);
   assertions.push(
      {
         Expected: {b: '1', options: [], checkboxes: [], names: []},
         Actual: parseQueryParameters(query),
         Description: 'empty'
      });

   form = parseHtml('<form>' +
      '<input type="radio" name="option0" value="1"/>' +
      '<input type="radio" name="option0" checked value="2"/>' +
      '<input type="checkbox" name="checkbox0" checked />' +
      '<input type="text" name="name0" value="j i"/>' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   testableAdjustLink(form, link, 'http://a/?b=1');
   query = link.href.substring('http://a/'.length);
   assertions.push(
      {
         Expected: {b: '1', options: ['2'], checkboxes: [true], names: ["j i"]},
         Actual: parseQueryParameters(query),
         Description: '1 each'
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
   query = link.href.substring('http://a/'.length);
   assertions.push(
      {
         Expected: {b: '1', options: ['2', '5', '1'], checkboxes: [], names: []},
         Actual: parseQueryParameters(query),
         Description: 'multiple options'
      });

   form = parseHtml('<form>' +
      '<input type="checkbox1" name="checkbox0" checked />' +
      '<input type="checkbox1" name="checkbox1" />' +
      '<input type="checkbox1" name="checkbox2" />' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   testableAdjustLink(form, link, 'http://a/?b=1');
   query = link.href.substring('http://a/'.length);
   assertions.push(
      {
         Expected: {b: '1', options: [], checkboxes: [true, false, false], names: []},
         Actual: parseQueryParameters(query),
         Description: 'multiple checkboxes'
      });

   form = parseHtml('<form>' +
      '<input type="text" name="name0" value="j i"/>' +
      //raw: "."
      '<input type="text" name="name1" value="&quot;.&quot;"/>' +
      //raw: \"
      '<input type="text" name="name2" value="\\&quot;"/>' +
      '</form>');
   link = parseHtml('<a href="current">link</a>');
   testableAdjustLink(form, link, 'http://a/?b=1');
   query = link.href.substring('http://a/'.length);
   assertions.push(
      {
         Expected: {b: '1', options: [], checkboxes: [], names: ["j i", "\".\"", "\\\""]},
         Actual: parseQueryParameters(query),
         Description: 'multiple names'
      });

   return TestRunner.displayResults('TestSuite.characterFormParsing.parseQueryParametersFromForm', assertions,
      testState);
};
