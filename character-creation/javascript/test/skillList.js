'use strict';
TestSuite.skillList={};
TestSuite.skillList.calculateValues=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   DomUtil.changeValue('Strength', '--');
   SelectUtil.changeText('skillChoices0', 'Athletics');
   assertions.push({Expected: 'Always Fail', Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Missing ability always fail'});

   DomUtil.changeValue('Strength', 0);
   assertions.push({Expected: '+1', Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Normal display'});

   Main.setRuleset(3, 10);  //v3.11+ can't lack stamina
   DomUtil.changeValue('Stamina', '--');
   assertions.push({Expected: '--', Actual: Main.abilitySection.getByName('Stamina').getValue(), Description: 'Missing stamina'});
   SelectUtil.changeText('skillChoices0', 'Athletics');
   SelectUtil.changeText('skillAbility0', 'Stamina');
   assertions.push({Expected: 'Always Pass', Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Missing Stamina always pass'});

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.skillList.calculateValues', assertions, testState);
};
TestSuite.skillList.load=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[], dataToLoad;

   try{
      dataToLoad = Loader.resetData();
      dataToLoad.Skills.push({"name":"Close Combat","subtype":"Swords","rank":2});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Close Combat', Actual: Main.skillSection.getRow(0).getName(), Description: 'Happy Path: skill'});
      assertions.push({Expected: true, Actual: Main.skillSection.getRow(1).isBlank(), Description: 'Happy Path: 1 row'});
      assertions.push({Expected: [], Actual: Messages.list, Description: 'Happy Path: no errors'});
      assertions.push({Expected: 'Swords', Actual: Main.skillSection.getRow(0).getText(), Description: 'Happy Path: getText'});
      assertions.push({Expected: 2, Actual: Main.skillSection.getRow(0).getRank(), Description: 'Happy Path: getRank'});
      assertions.push({Expected: undefined, Actual: Main.skillSection.getRow(0).getAbilityName(), Description: 'Happy Path: getAbilityName'});
      assertions.push({Expected: undefined, Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Happy Path: getTotalBonus'});
      assertions.push({Expected: 1, Actual: Main.skillSection.getTotal(), Description: 'Happy Path: Make sure update was called'});
   } catch(e){assertions.push({Error: e, Description: 'Happy Path'});}

   try{
      dataToLoad = Loader.resetData();
      dataToLoad.Skills.push({"name":"Invalid"});
      dataToLoad.Skills.push({"name":"Close Combat","subtype":"Swords","rank":2});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Close Combat', Actual: Main.skillSection.getRow(0).getName(), Description: 'Not a skill: doesn\'t stop'});
      assertions.push({Expected: true, Actual: Main.skillSection.getRow(1).isBlank(), Description: 'Not a skill: invalid not loaded'});
      assertions.push({Expected: ['SkillList.load.notExist'], Actual: Messages.errorCodes(), Description: 'Not a skill: error'});
   } catch(e){assertions.push({Error: e, Description: 'Not a skill'});}

   try{
      dataToLoad = Loader.resetData();
      dataToLoad.Skills.push({"name":"Close Combat","rank":2,"ability":"Strength"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Close Combat', Actual: Main.skillSection.getRow(0).getName(), Description: 'Ignores Text/Ability: loaded'});
      assertions.push({Expected: [], Actual: Messages.list, Description: 'Ignores Text/Ability: no errors'});
      assertions.push({Expected: 'Skill Subtype', Actual: Main.skillSection.getRow(0).getText(), Description: 'Ignores Text/Ability: text not cleared'});
      assertions.push({Expected: undefined, Actual: Main.skillSection.getRow(0).getAbilityName(), Description: 'Ignores Text/Ability: ability not set'});
   } catch(e){assertions.push({Error: e, Description: 'Ignores Text/Ability'});}

   try{
      Main.clear();  //TODO: this shouldn't be needed but is because otherwise setRuleset fails: clear ability, update skill
      Main.setRuleset(3, 14);
      dataToLoad = Loader.resetData();
      dataToLoad.Skills.push({"name":"Insight","subtype":"Reading faces","rank":2,"ability":"Strength"});
      Loader.sendData(dataToLoad);
      assertions.push({Expected: 'Insight', Actual: Main.skillSection.getRow(0).getName(), Description: 'Happy Path 3.14: skill'});
      assertions.push({Expected: true, Actual: Main.skillSection.getRow(1).isBlank(), Description: 'Happy Path 3.14: 1 row'});
      assertions.push({Expected: [], Actual: Messages.list, Description: 'Happy Path 3.14: no errors'});
      assertions.push({Expected: 'Reading faces', Actual: Main.skillSection.getRow(0).getText(), Description: 'Happy Path 3.14: getText'});
      assertions.push({Expected: 2, Actual: Main.skillSection.getRow(0).getRank(), Description: 'Happy Path 3.14: getRank'});
      assertions.push({Expected: 'Strength', Actual: Main.skillSection.getRow(0).getAbilityName(), Description: 'Happy Path 3.14: getAbilityName'});
      assertions.push({Expected: 2, Actual: Main.skillSection.getRow(0).getTotalBonus(), Description: 'Happy Path 3.14: getTotalBonus'});
      assertions.push({Expected: 1, Actual: Main.skillSection.getTotal(), Description: 'Happy Path 3.14: Make sure update was called'});
   } catch(e){assertions.push({Error: e, Description: 'Happy Path 3.14'});}

   return TestRunner.displayResults('TestSuite.skillList.load', assertions, testState);
};
