'use strict';
TestConfig.beforeFirst=function()
{
   TestConfig.betweenEach();
   Main.setMockMessenger(Messages.errorCapture);
};
TestConfig.betweenEach=function()
{
   Main.clear();
   Messages.list = [];  //no need to call Loader.resetData
   Main.setRuleset(3, latestMinorRuleset);
};
TestConfig.afterLast=function()
{
   Main.clearMockMessenger();
};
//every test needs to clear out for the other test to start clean
//even if slow do not disable Main generation because an error might occur (due to undefined values) in which case I need to see how Main was

//doesn't take as long as I thought but still leave it out of TestSuite.testAll() hence being a global function
function confirmAllXmls()
{
   //TODO: do something about validate xml test. I could validate js.
   TestRunner.clearResults();
    //Main.setRuleset(2, 7);  //the xmls are only saved with current rules
       //covered by clearResults and by Main.load

    var assertions=[];
    var actionTaken='Load Save Confirm';
    var basePath='xml/';  //relative is the only kind that is portable. it is relative to the .html file not the js
    var allFolders=['', 'Gamemaster/animals/', 'Gamemaster/civilians/', 'Gamemaster/public-servants/', 'Gamemaster/trained-combatants/', 'Gamemaster/underworld-archetypes/'];
    var allFiles=[];

    try{readXMLAsString(basePath+allFolders[1]+allFiles[1][2]);}
    catch(e){alert('You idiot, you can\'t run this here. I have a shortcut in the git folder.'); throw e;}  //Whoops, my bad I better turn on the flag first
       //and I don't care that file 1,2 is parsed twice:
       //1) twice in a row means it should be cached
       //2) this won't be run with other tests
       //3) it is worth the time cost
       //1,2 was chosen because it is smallest (with 0,0 being the largest)
   for (var folderIndex=0; folderIndex < allFolders.length; folderIndex++)
   {
      for (var fileIndex=0; fileIndex < allFiles[folderIndex].length; fileIndex++)
      {
          var originalContents=readXMLAsString(basePath+allFolders[folderIndex]+allFiles[folderIndex][fileIndex]);
          document.getElementById('code-box').value=originalContents;
          originalContents=originalContents.replace(/\/>/g, ' />');
          //originalContents=originalContents.replace(/<Document ruleset="\d+.\d+" version="\d+">/, '<Document>');  //don't replace: being out of date is noteworthy
          originalContents=originalContents.replace('?>', '?>\n\n');  //add a blank line
          originalContents=originalContents.replace('<Powers />', '<Powers></Powers>');  //make empty group instead of self closing
          originalContents=originalContents.replace('<Equipment />', '<Equipment></Equipment>');
          originalContents=originalContents.replace('<Advantages />', '<Advantages></Advantages>');
          originalContents=originalContents.replace('<Skills />', '<Skills></Skills>');
          originalContents+='\n';  //ends with a blank line
          originalContents=originalContents.replace(/\s+<!--[\s\S]*?-->/g, '');  //remove comments when comparing because save doesn't generate them
          Main.loadFromTextArea();
          Main.saveToTextArea();
          var newContents=document.getElementById('code-box').value;
          assertions.push({Expected: originalContents, Actual: newContents, Description: actionTaken+allFolders[folderIndex]+allFiles[folderIndex][fileIndex]});
          //break;
      }
       //break;
   }

    return TestRunner.displayResults('confirmAllXmls', assertions, true);
}
/*
What I want: rename, goto anything, goto definition, find all usages, stuff from np++
Visual Studio Code: https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx rename (local only), goto anything (can't mix file@fun)
Atom: https://atom.io/ has a fuzzy search (file name only) nothing else. although plugins probably have it all
Brackets: http://brackets.io/ built in lint (not hint!). goto anything (can't mix file@fun), goto definition
Sublime: goto anything (file@fun but not over all files), goto definition (via goto anything)

Next:
try webstorm if it looks good then try intelli-j with plug ins
try atom with plug ins
apparently sublime has plugins: http://stackoverflow.com/questions/18184207/ide-autocompletion-for-javascript-amd-loading-style

NetBeans: https://netbeans.org/downloads/ open file. weak goto definition which works or fails, has very few warnings
http://www.codelobster.com open file. goto definition which works or asks!
Komodo Edit (free version of Komodo IDE): http://komodoide.com/komodo-edit/ has warnings. open file. goto definition of local functions
Aptana Studio 3: http://www.aptana.com/products/studio3/download.html open file
Not free: WebStorm: https://www.jetbrains.com/webstorm/
NotePad++ has nothing
"Free JavaScript Editor": http://www.yaldex.com/Free_JavaScript_Editor.htm has nothing

http://docs.seleniumhq.org/ and http://www.eclipse.org/webtools/jsdt/
http://www.slant.co/topics/1686/~javascript-ides-and-editors
*/

//TODO: make a test for loading quirks (per section) to test for things that onChange wouldn't allow
    //for example: loading action is based on duration which is based on range which is based on duration... range is also based on modifiers
    //try: load effect name (and other power stuff), power rank, then all modifiers, then range, then duration, then action
//TODO: make all tests (search for ADD TESTS)

/**This function was made to test the difference and reliability of isNaN and isFinite. It is not included in TestSuite so that it isn't auto ran.
 Unlike confirmAllXmls this test suite is not in any way related to the project which is why is isn't hidden in TestSuite.*/
function unlinkedNanTest()
{
   var assertions=[], actionTaken, testDescription;
   var trueTests=['NaN', NaN, 'Text', 'x123', '#FF00FF', 'null', null, 'undefined', undefined, '', '     \t\n  ', '1Text', 'Text1', '12,345', '1.2.3', '-', '+', true, false, new Date(2009,1,1), {}, function(){}, [], '+-1', '++1', '1+', '1e', 'e', 'e1'];
   var falseTests=['123', '+123', 123, new Number(123), '0x123', '+0x123', '-0x123', '0', '-1.2', '.12', '+.12', '-1.2e-3', '1.2e+3', '+1.2e3', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER, Number.MIN_VALUE, Number.MIN_SAFE_INTEGER, '09'];
   var testFunctions=[isNaN, isNotFinite, numberConstructorNaN];
   function numberConstructorNaN(num){return (Number(num).toString() === 'NaN');}  //this works
   function isNotFinite(num){return (!isFinite(num));}

   TestRunner.clearResults();

   for (var functionIndex=0; functionIndex < testFunctions.length; functionIndex++)
   {
      actionTaken='NaN tests';
      for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
      {
         testDescription=testFunctions[functionIndex].name+'(';
         if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
         else testDescription+=trueTests[inputIndex];
         testDescription+=')';
         assertions.push({Expected: true, Actual: testFunctions[functionIndex](trueTests[inputIndex]), Description: actionTaken+testDescription});
      }
      actionTaken='Number tests';
      for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
      {
         testDescription=testFunctions[functionIndex].name+'(';
         if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
         else testDescription+=falseTests[inputIndex];
         testDescription+=')';
         assertions.push({Expected: false, Actual: testFunctions[functionIndex](falseTests[inputIndex]), Description: actionTaken+testDescription});
      }
   }

   actionTaken='Infinity tests';
   assertions.push({Expected: false, Actual: isNaN('Infinity'), Description: actionTaken+': isNaN("Infinity")'});
   assertions.push({Expected: false, Actual: isNaN(Infinity), Description: actionTaken+': isNaN(Infinity)'});
   assertions.push({Expected: false, Actual: isNaN('-Infinity'), Description: actionTaken+': isNaN("-Infinity")'});
   assertions.push({Expected: false, Actual: isNaN(-Infinity), Description: actionTaken+': isNaN(-Infinity)'});

   assertions.push({Expected: true, Actual: !isFinite('Infinity'), Description: actionTaken+': !isFinite("Infinity")'});
   assertions.push({Expected: true, Actual: !isFinite(Infinity), Description: actionTaken+': !isFinite(Infinity)'});
   assertions.push({Expected: true, Actual: !isFinite('-Infinity'), Description: actionTaken+': !isFinite("-Infinity")'});
   assertions.push({Expected: true, Actual: !isFinite(-Infinity), Description: actionTaken+': !isFinite(-Infinity)'});

   assertions.push({Expected: true, Actual: !numberConstructorNaN('Infinity'), Description: actionTaken+': !numberConstructorNaN("Infinity")'});
   assertions.push({Expected: true, Actual: !numberConstructorNaN(Infinity), Description: actionTaken+': !numberConstructorNaN(Infinity)'});
   assertions.push({Expected: true, Actual: !numberConstructorNaN('-Infinity'), Description: actionTaken+': !numberConstructorNaN("-Infinity")'});
   assertions.push({Expected: true, Actual: !numberConstructorNaN(-Infinity), Description: actionTaken+': !numberConstructorNaN(-Infinity)'});

   actionTaken='No Parameter tests';
   assertions.push({Expected: true, Actual: isNaN(), Description: actionTaken+': isNaN()'});
   assertions.push({Expected: true, Actual: !isFinite(), Description: actionTaken+': !isFinite()'});
   assertions.push({Expected: true, Actual: !numberConstructorNaN(), Description: actionTaken+': !numberConstructorNaN()'});

   actionTaken='Comparing NaN tests';
   for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
   {
      testDescription='isNaN(';
      if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
      else testDescription+=trueTests[inputIndex];
      testDescription+=') vs isNotFinite';
      assertions.push({Expected: isNaN(trueTests[inputIndex]), Actual: isNotFinite(trueTests[inputIndex]), Description: actionTaken+testDescription});
   }
   actionTaken='Comparing Number tests';
   for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
   {
      testDescription='isNaN(';
      if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
      else testDescription+=falseTests[inputIndex];
      testDescription+=') vs isNotFinite';
      assertions.push({Expected: isNaN(falseTests[inputIndex]), Actual: isNotFinite(falseTests[inputIndex]), Description: actionTaken+testDescription});
   }

   actionTaken='Comparing NaN tests';
   for (var inputIndex=0; inputIndex < trueTests.length; inputIndex++)
   {
      testDescription='isNaN(';
      if(typeof(trueTests[inputIndex]) === 'string') testDescription+='"'+trueTests[inputIndex]+'"';
      else testDescription+=trueTests[inputIndex];
      testDescription+=') vs numberConstructorNaN';
      assertions.push({Expected: isNaN(trueTests[inputIndex]), Actual: numberConstructorNaN(trueTests[inputIndex]), Description: actionTaken+testDescription});
   }
   actionTaken='Comparing Number tests';
   for (var inputIndex=0; inputIndex < falseTests.length; inputIndex++)
   {
      testDescription='isNaN(';
      if(typeof(falseTests[inputIndex]) === 'string') testDescription+='"'+falseTests[inputIndex]+'"';
      else testDescription+=falseTests[inputIndex];
      testDescription+=') vs numberConstructorNaN';
      assertions.push({Expected: isNaN(falseTests[inputIndex]), Actual: numberConstructorNaN(falseTests[inputIndex]), Description: actionTaken+testDescription});
   }

   return TestRunner.displayResults('unlinkedNanTest', assertions, true);  //grand total is pointless but this will scroll me to the bottom
}
/*
Primitives and objects get the same results. The special values:
NaN (also with optional leading +-), undefined, Infinity (also with optional leading +-)
all get the same results as is or with the string version. Except null

The following are NaN:
NaN (duh), 'Text', 'x123', '#FF00FF', 'null', undefined (and obviously passing in nothing is the same),
'1Text', 'Text1', '12,345', '1.2.3'

The following are numbers:
Infinity, -Infinity, '123', 123 (obviously anything that typeof() === 'number' or is a Number object), '0x123', null

Problem: isNaN(null) returns false (meaning isNaN thinks null is a number)

Failed tests:
isNaN(null), empty string, white space only string, primitive booleans, Date object, [], '+0x123'

so here's the code for isFinite:
function isFinite(num)
{
    if(isNaN(num)) return false;
    num=Math.abs(Number(num));
    if(num === Infinity) return false;
    return true;
}

WTF JS moments:
isNaN(null) === false
numberConstructorNaN() === true but numberConstructorNaN(undefined) === false
    which is only possible if it checks the number of parameters even though it only uses the first
NaN !== NaN
    there used to be a reason for this. javascript being old obeyed it by convention.
    currently the rational behind it is obsolete and some modern languages have fixed this logical contradiction
(new Number(1)) !== 1 and (new Number(1)) !== (new Number(1))
    They are the same type and value
    This makes sense in Java where == compares if they are pointing to the same object but that's not what === does in js
    unless they are both objects in which case that's exactly how they behave (=== and == are the same in such cases)
    ({}) !== ({}) so comparing objects is never possible yet Object.prototype.equals (or even Object.equals) doesn't exist
(new Number(1)) < (new Number(2))
    so it probably just calls valueOf but then why doesn't it do that for equality?
    but 'as' < 'asd' compares by ascii despite valueOf returning the same thing as toString (both return itself)
typeof(new Number(1)) !== typeof(Number(1))
    returns: 'object' and 'number'
typeof(new String(1)) === 'object' but typeof('1') === 'string'
    Why is there a primitive string? That doesn't even make sense. The reason for it is so that strings can be compared with any numeric comparison
    here's something confusing: since there is no character class all strings are arrays of strings, with string length 1 containing only itself
typeof(/a/) === 'object' despite being first class it has no primitive value and is considered an object
    the same is true for functions partially: typeof(function(){}) === 'function' but also has a wrapper object and primitive function compares like objects
function outerFun()
{
   console.log('outerFun '+(this === window || this === undefined));  //prints false
   innerFun();
   function innerFun()
   {
       console.log('innerFun '+(this === window || this === undefined));  //prints true
   }
}; new outerFun();
    innerFun is a private function that only exists within outerFun and can only be called from within outerFun.
    outerFun is constructed and exists as an object yet innerFun has global scope?
    global: { outerFun:{ innerFun:{} } } in definition and scope, yet this pointer does: global: { outerFun:{}, innerFun:{} }
    this is the reason why I made all my functions public
*/
