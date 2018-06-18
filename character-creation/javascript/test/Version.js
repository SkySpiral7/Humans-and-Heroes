'use strict';
TestSuite.version={};
TestSuite.version.toString=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];
   try{
   assertions.push({Expected: '5.6', Actual: new VersionObject(5, 6).toString(), Description: '5.6 toString'});
   } catch(e){assertions.push({Error: e, Description: '5.6 toString'});}

   return TestRunner.displayResults('TestSuite.version.toString', assertions, testState);
};
TestSuite.version.clone=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[];
   try{
   var original = new VersionObject(5, 6);
   var cloned = original.clone();
   assertions.push({Expected: original.major, Actual: cloned.major, Description: 'clone is same: major'});
   assertions.push({Expected: original.minor, Actual: cloned.minor, Description: 'clone is same: minor'});
   original.minor = 0;
   assertions.push({Expected: 0, Actual: original.minor, Description: 'original was changed'});
   assertions.push({Expected: 6, Actual: cloned.minor, Description: 'clone was not'});
   } catch(e){assertions.push({Error: e, Description: 'clone'});}

   return TestRunner.displayResults('TestSuite.version.clone', assertions, testState);
};
TestSuite.version.isGreaterThan=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], initial = new VersionObject(2, 4);

   try{
   assertions.push({Expected: true, Actual: initial.isGreaterThan(new VersionObject(1, 1)), Description: 'happy path: true'});
   assertions.push({Expected: false, Actual: initial.isGreaterThan(new VersionObject(4, 5)), Description: 'happy path: false'});
   } catch(e){assertions.push({Error: e, Description: 'happy path'});}

   try{
   assertions.push({Expected: true, Actual: initial.isGreaterThan(1, 1), Description: 'Converts 2 numbers into VersionObject'});
   } catch(e){assertions.push({Error: e, Description: 'Converts 2 numbers into VersionObject'});}

   try{
   assertions.push({Expected: true, Actual: initial.isGreaterThan(1, 4), Description: 'this.major is greater'});
   assertions.push({Expected: false, Actual: initial.isGreaterThan(5, 4), Description: 'other.major is greater'});
   assertions.push({Expected: true, Actual: initial.isGreaterThan(2, 3), Description: 'this.minor is greater'});
   assertions.push({Expected: false, Actual: initial.isGreaterThan(2, 4), Description: 'are equal'});
   } catch(e){assertions.push({Error: e, Description: 'Comparisons'});}

   return TestRunner.displayResults('TestSuite.version.isGreaterThan', assertions, testState);
};
TestSuite.version.isLessThan=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], initial = new VersionObject(2, 4);

   try{
   assertions.push({Expected: true, Actual: initial.isLessThan(new VersionObject(4, 5)), Description: 'happy path: true'});
   assertions.push({Expected: false, Actual: initial.isLessThan(new VersionObject(1, 1)), Description: 'happy path: false'});
   } catch(e){assertions.push({Error: e, Description: 'happy path'});}

   try{
   assertions.push({Expected: true, Actual: initial.isLessThan(4, 5), Description: 'Converts 2 numbers into VersionObject'});
   } catch(e){assertions.push({Error: e, Description: 'Converts 2 numbers into VersionObject'});}

   try{
   assertions.push({Expected: true, Actual: initial.isLessThan(3, 4), Description: 'this.major is lesser'});
   assertions.push({Expected: false, Actual: initial.isLessThan(1, 4), Description: 'other.major is lesser'});
   assertions.push({Expected: true, Actual: initial.isLessThan(2, 5), Description: 'this.minor is lesser'});
   assertions.push({Expected: false, Actual: initial.isLessThan(2, 4), Description: 'are equal'});
   } catch(e){assertions.push({Error: e, Description: 'Comparisons'});}

   return TestRunner.displayResults('TestSuite.version.isLessThan', assertions, testState);
};
TestSuite.version.equals=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], initial = new VersionObject(2, 4);

   try{
   assertions.push({Expected: true, Actual: initial.equals(initial), Description: 'happy path: true'});
   assertions.push({Expected: false, Actual: initial.equals(new VersionObject(1, 1)), Description: 'happy path: false'});
   } catch(e){assertions.push({Error: e, Description: 'happy path'});}

   try{
   assertions.push({Expected: true, Actual: initial.equals(2, 4), Description: 'Converts 2 numbers into VersionObject'});
   } catch(e){assertions.push({Error: e, Description: 'Converts 2 numbers into VersionObject'});}

   try{
   assertions.push({Expected: false, Actual: initial.equals(3, 4), Description: 'major is different'});
   assertions.push({Expected: false, Actual: initial.equals(2, 1), Description: 'minor is different'});
   } catch(e){assertions.push({Error: e, Description: 'Comparisons'});}

   return TestRunner.displayResults('TestSuite.version.equals', assertions, testState);
};
TestSuite.version.isGreaterThanOrEqualTo=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], initial = new VersionObject(2, 4);

   try{
   assertions.push({Expected: true, Actual: initial.isGreaterThanOrEqualTo(new VersionObject(1, 1)), Description: 'happy path: true'});
   assertions.push({Expected: false, Actual: initial.isGreaterThanOrEqualTo(new VersionObject(4, 5)), Description: 'happy path: false'});
   } catch(e){assertions.push({Error: e, Description: 'happy path'});}

   try{
   assertions.push({Expected: true, Actual: initial.isGreaterThanOrEqualTo(1, 1), Description: 'Converts 2 numbers into VersionObject'});
   } catch(e){assertions.push({Error: e, Description: 'Converts 2 numbers into VersionObject'});}

   try{
   assertions.push({Expected: true, Actual: initial.isGreaterThanOrEqualTo(2, 4), Description: 'equals'});
   } catch(e){assertions.push({Error: e, Description: 'equals'});}

   return TestRunner.displayResults('TestSuite.version.isGreaterThanOrEqualTo', assertions, testState);
};
