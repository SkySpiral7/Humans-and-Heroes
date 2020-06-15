TestSuite.MapDefault = {};
TestSuite.MapDefault.isEmpty = function (testState = {})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   assertions.push({Expected: true, Actual: new MapDefault().isEmpty(), Description: 'new MapDefault()'});
   assertions.push({Expected: true, Actual: new MapDefault({}, 4).isEmpty(), Description: 'new MapDefault({}, 4)'});
   assertions.push({Expected: false, Actual: new MapDefault({a: undefined}).isEmpty(), Description: 'new MapDefault({a: undefined})'});

   return TestRunner.displayResults('TestSuite.MapDefault.isEmpty', assertions, testState);
};
TestSuite.MapDefault.equals = function (testState = {})
{
   TestRunner.clearResults(testState);
   var assertions = [];

   var testObject = new MapDefault({a: 1}, 0);
   assertions.push({Expected: true, Actual: testObject.equals(testObject), Description: 'equal to self'});
   var fakeMap = {
      getDefaultValue() {return 0;},
      getAllKeys() {return ['a'];},
      get() {return 1;}
   };
   assertions.push({Expected: false, Actual: testObject.equals(fakeMap), Description: '!equal not instanceof'});
   assertions.push({Expected: false, Actual: testObject.equals(null), Description: '!equal no throw when null'});
   assertions.push({Expected: false, Actual: testObject.equals(undefined), Description: '!equal no throw when undefined'});

   var other = new MapDefault({a: 1}, 1);
   assertions.push({Expected: false, Actual: testObject.equals(other), Description: '!equal default value'});

   other = new MapDefault({}, 0);
   assertions.push({Expected: false, Actual: testObject.equals(other), Description: '!equal key length'});

   other = new MapDefault({b: undefined}, 0);
   assertions.push({Expected: false, Actual: testObject.equals(other), Description: '!equal: undefined vs missing'});

   other = new MapDefault({a: 5}, 0);
   assertions.push({Expected: false, Actual: testObject.equals(other), Description: '!equal value'});

   other.set('a', 1);
   assertions.push({Expected: true, Actual: testObject.equals(other), Description: 'equal'});

   return TestRunner.displayResults('TestSuite.MapDefault.equals', assertions, testState);
};
