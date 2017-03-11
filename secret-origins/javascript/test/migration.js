'use strict';
TestSuite.migration={};
TestSuite.migration.advantage=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   try {
   var currentVersion = Main.getActiveRuleset();
   Data.change(currentVersion.major, currentVersion.minor);
   Data2.change(currentVersion.major, currentVersion.minor);

   testResults.push({Expected: Data.Advantage.godhoodNames, Actual: Data2.Advantage.godhoodNames, Description: 'Data.Advantage.godhoodNames'});
   testResults.push({Expected: Data.Advantage.mapThese, Actual: Data2.Advantage.mapThese, Description: 'Data.Advantage.mapThese'});
   testResults.push({Expected: Data.Advantage.names, Actual: Data2.Advantage.names, Description: 'Data.Advantage.names'});

   var allNames = Data.Advantage.names.concat(Data.Advantage.godhoodNames);
   for (var i = 0; i < allNames.length; ++i)
   {
      var name = allNames[i];

      testResults.push({Expected: name, Actual: Data2.Advantage[name].name, Description: 'Data2.Advantage['+name+'].name'});
      testResults.push({Expected: Data.Advantage.costPerRank.get(name), Actual: Data2.Advantage[name].costPerRank, Description: 'Data.Advantage['+name+'].costPerRank'});
      testResults.push({Expected: Data.Advantage.defaultText.get(name), Actual: Data2.Advantage[name].defaultText, Description: 'Data.Advantage['+name+'].defaultText'});
      testResults.push({Expected: Data.Advantage.hasText.contains(name), Actual: Data2.Advantage[name].hasText, Description: 'Data.Advantage['+name+'].hasText'});
      testResults.push({Expected: Data.Advantage.maxRank.get(name), Actual: Data2.Advantage[name].maxRank, Description: 'Data.Advantage['+name+'].maxRank'});
   }
   } catch(e){testResults.push({Error: e, Description: 'Same data'});}

   return TestRunner.displayResults('TestSuite.migration.advantage', testResults, isFirst);
};
TestSuite.migration.defense=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   try {
   var currentVersion = Main.getActiveRuleset();
   Data.change(currentVersion.major, currentVersion.minor);
   Data2.change(currentVersion.major, currentVersion.minor);

   testResults.push({Expected: Data.Defense.names, Actual: Data2.Defense.names, Description: 'Data.Defense.names'});

   for (var i = 0; i < Data.Defense.names.length; ++i)
   {
      var name = Data.Defense.names[i];

      testResults.push({Expected: name, Actual: Data2.Defense[name].name, Description: 'Data2.Defense['+name+'].name'});
      testResults.push({Expected: Data.Defense.abilityUsed[i], Actual: Data2.Defense[name].ability, Description: 'Data.Defense['+name+'].ability'});
   }
   } catch(e){testResults.push({Error: e, Description: 'Same data'});}

   return TestRunner.displayResults('TestSuite.migration.defense', testResults, isFirst);
};
TestSuite.migration.modifier=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   try {
   var currentVersion = Main.getActiveRuleset();
   Data.change(currentVersion.major, currentVersion.minor);
   Data2.change(currentVersion.major, currentVersion.minor);

   testResults.push({Expected: Data.Modifier.names, Actual: Data2.Modifier.names, Description: 'Data.Modifier.names'});

   for (var i = 0; i < Data.Modifier.names.length; ++i)
   {
      var name = Data.Modifier.names[i];

      testResults.push({Expected: name, Actual: Data2.Modifier[name].name, Description: 'Data2.Modifier['+name+'].name'});
      testResults.push({Expected: Data.Modifier.actionRangeDuration.contains(name), Actual: Data2.Modifier[name].isActionRangeDuration, Description: 'Data.Modifier['+name+'].actionRangeDuration'});
      testResults.push({Expected: Data.Modifier.cost.get(name), Actual: Data2.Modifier[name].cost, Description: 'Data.Modifier['+name+'].cost'});
      testResults.push({Expected: Data.Modifier.defaultText.get(name), Actual: Data2.Modifier[name].defaultText, Description: 'Data.Modifier['+name+'].defaultText'});
      testResults.push({Expected: Data.Modifier.hasAutoTotal.contains(name), Actual: Data2.Modifier[name].hasAutoTotal, Description: 'Data.Modifier['+name+'].hasAutoTotal'});
      testResults.push({Expected: Data.Modifier.maxRank.get(name), Actual: Data2.Modifier[name].maxRank, Description: 'Data.Modifier['+name+'].maxRank'});
      testResults.push({Expected: Data.Modifier.type.get(name), Actual: Data2.Modifier[name].type, Description: 'Data.Modifier['+name+'].type'});
      testResults.push({Expected: Data.Modifier.readOnly.contains(name), Actual: Data2.Modifier[name].isReadOnly, Description: 'Data.Modifier['+name+'].readOnly'});
      testResults.push({Expected: Data.Modifier.hasAutoRank.contains(name), Actual: Data2.Modifier[name].hasAutoRank, Description: 'Data.Modifier['+name+'].hasAutoRank'});
      testResults.push({Expected: Data.Modifier.hasText.contains(name), Actual: Data2.Modifier[name].hasText, Description: 'Data.Modifier['+name+'].hasText'});
   }
   } catch(e){testResults.push({Error: e, Description: 'Same data'});}

   return TestRunner.displayResults('TestSuite.migration.modifier', testResults, isFirst);
};
TestSuite.migration.power=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   try {
   var currentVersion = Main.getActiveRuleset();
   Data.change(currentVersion.major, currentVersion.minor);
   Data2.change(currentVersion.major, currentVersion.minor);

   testResults.push({Expected: Data.Power.actions, Actual: Data2.Power.actions, Description: 'Data.Power.actions'});
   testResults.push({Expected: Data.Power.durations, Actual: Data2.Power.durations, Description: 'Data.Power.durations'});
   testResults.push({Expected: Data.Power.godhoodNames, Actual: Data2.Power.godhoodNames, Description: 'Data.Power.godhoodNames'});
   testResults.push({Expected: Data.Power.names, Actual: Data2.Power.names, Description: 'Data.Power.names'});
   testResults.push({Expected: Data.Power.ranges, Actual: Data2.Power.ranges, Description: 'Data.Power.ranges'});

   var allNames = Data.Power.names.concat(Data.Power.godhoodNames);
   for (var i = 0; i < allNames.length; ++i)
   {
      var name = allNames[i];

      testResults.push({Expected: name, Actual: Data2.Power[name].name, Description: 'Data2.Power['+name+'].name'});
      testResults.push({Expected: Data.Power.baseCost.get(name), Actual: Data2.Power[name].baseCost, Description: 'Data.Power['+name+'].baseCost'});
      testResults.push({Expected: Data.Power.defaultAction.get(name), Actual: Data2.Power[name].defaultAction, Description: 'Data.Power['+name+'].defaultAction'});
      testResults.push({Expected: Data.Power.defaultDuration.get(name), Actual: Data2.Power[name].defaultDuration, Description: 'Data.Power['+name+'].defaultDuration'});
      testResults.push({Expected: Data.Power.defaultRange.get(name), Actual: Data2.Power[name].defaultRange, Description: 'Data.Power['+name+'].defaultRange'});
      testResults.push({Expected: Data.Power.hasInputBaseCost.contains(name), Actual: Data2.Power[name].hasInputBaseCost, Description: 'Data.Power['+name+'].hasInputBaseCost'});
      testResults.push({Expected: Data.Power.isAttack.contains(name), Actual: Data2.Power[name].isAttack, Description: 'Data.Power['+name+'].isAttack'});

      var expected = undefined;
      if(undefined !== Data.Power.allowReaction) expected = Data.Power.allowReaction.contains(name);
      testResults.push({Expected: expected, Actual: Data2.Power[name].allowReaction, Description: 'Data.Power['+name+'].allowReaction'});

      expected = undefined;
      if(undefined !== Data.Power.isMovement) expected = Data.Power.isMovement.contains(name);
      testResults.push({Expected: expected, Actual: Data2.Power[name].isMovement, Description: 'Data.Power['+name+'].isMovement'});
   }
   } catch(e){testResults.push({Error: e, Description: 'Same data'});}

   return TestRunner.displayResults('TestSuite.migration.power', testResults, isFirst);
};
TestSuite.migration.skill=function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults=[];

   try {
   var currentVersion = Main.getActiveRuleset();
   Data.change(currentVersion.major, currentVersion.minor);
   Data2.change(currentVersion.major, currentVersion.minor);

   testResults.push({Expected: Data.Skill.names, Actual: Data2.Skill.names, Description: 'Data.Skill.names'});

   for (var i = 0; i < Data.Skill.names.length; ++i)
   {
      var name = Data.Skill.names[i];

      testResults.push({Expected: name, Actual: Data2.Skill[name].name, Description: 'Data2.Skill['+name+'].name'});
      testResults.push({Expected: Data.Skill.abilityMap.get(name), Actual: Data2.Skill[name].ability, Description: 'Data.Skill['+name+'].abilityMap'});
      testResults.push({Expected: Data.Skill.hasText.contains(name), Actual: Data2.Skill[name].hasText, Description: 'Data.Skill['+name+'].hasText'});
   }
   } catch(e){testResults.push({Error: e, Description: 'Same data'});}

   return TestRunner.displayResults('TestSuite.migration.skill', testResults, isFirst);
};
function testDataForAllVersions()
{
   var everyVersion = [new VersionObject(1, 0), new VersionObject(2, 7), new VersionObject(3, 0), new VersionObject(3, 4), new VersionObject(3, 5)];
   var output = '';
   for (var i = 0; i < everyVersion.length; ++i)
   {
      Main.setRuleset(everyVersion[i].major, everyVersion[i].minor);
      var testResults = [];
      testResults.push(TestSuite.migration.advantage(false));
      testResults.push(TestSuite.migration.modifier(false));
      testResults.push(TestSuite.migration.power(false));
      testResults.push(TestSuite.migration.skill(false));
      testResults.push(TestSuite.migration.defense(false));
      output += everyVersion[i] + ': ' + TestRunner.generateResultTable(testResults, {defaultDelta: 0, hidePassed: true});
   }
   document.getElementById('testResults').value = output;
   location.hash = '#testResults';  //scroll to the results
}
