'use strict';
TestSuite.characterFormParsing = {};
TestSuite.characterFormParsing.parseQueryParameters = function (testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [], input;

   input = '';
   assertions.push(
      {
         Expected: {"": undefined, options: [], checkboxes: [], names: []},
         Actual: parseQueryParameters(input),
         Description: 'no query params => default values'
      });

   input = '?ab=Crime%20Fighter.js&bc=23&options=1.5.1&checkboxes=011&names=%22(Choose%20One)%22%2C%22name2%22';
   assertions.push(
      {
         Expected: {
            "ab": "Crime%20Fighter.js",
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
