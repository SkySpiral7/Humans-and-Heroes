'use strict';
var Loader = {};
var Messages = {};
Messages.list = [];  //intentionally public in order to clear it (without Loader) or to read amLoading
Loader.resetData=function()
{
   Messages.list = [];
   Main.clear();
   return Main.save();  //return skeleton needed
};
Loader.sendData=function(jsonData)
{
   document.getElementById('code-box').value = JSON.stringify(jsonData);  //to simulate user input
   document.getElementById('load-text-button').onclick();
};
Messages.errorCapture=function(errorCode, amLoading)
{
   //TODO: why not assert message?
   Messages.list.push({errorCode: errorCode, amLoading: amLoading});
};
Messages.errorCodes=function()
{
   var result = [];
   for (var i=0; i < Messages.list.length; ++i)
   {
      result.push(Messages.list[i].errorCode);
   }
   return result;
};

var DomUtil = {};
/**Given the DOM's id this function sets the value property equal to valueToSet then calls onchange.
 No validation is done so if the id is not found it will throw an error.
 It will also throw if there is no onchange defined (instead just set .value directly).*/
DomUtil.changeValue=function(elementId, valueToSet)
{
   var element = document.getElementById(elementId);
   element.value = valueToSet;
   element.onchange();
};

TestSuite.DomUtil = {};
TestSuite.DomUtil.changeValue=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual;
   var resultBox = document.getElementById('testResults');

   try{
      resultBox.value = '';
      actual = false;
      resultBox.onchange = function(){actual = true;};
      DomUtil.changeValue('testResults', 'new value');
      assertions.push({Expected: true, Actual: actual, Description: 'Happy path: called'});
      assertions.push({Expected: 'new value', Actual: resultBox.value, Description: 'Happy path: value'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
      DomUtil.changeValue('Dana', 'only Zuul');  //assuming there is no Dana
      TestRunner.failedToThrow(assertions, 'Element doesn\'t exist');
   }
   catch(e)
   {
      assertions.push({Expected: true, Actual: true, Description: 'Element doesn\'t exist'});
      //ignore exact error because it is browser specific
   }

   try{
      resultBox.onchange = undefined;
      DomUtil.changeValue('testResults', 'new value');
      TestRunner.failedToThrow(assertions, 'No onchange');
   }
   catch(e)
   {
      assertions.push({Expected: true, Actual: true, Description: 'No onchange'});
      //ignore exact error because it is browser specific
   }

   resultBox.value = '';
   //delete resultBox.onchange;  //not possible so just leave it undefined

   return TestRunner.displayResults('DomUtil.changeValue', assertions, testState);
};
