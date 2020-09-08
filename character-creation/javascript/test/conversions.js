'use strict';
TestSuite.conversions={};
TestSuite.conversions.sanitizeNumber=function(testState={})
{
    TestRunner.clearResults(testState);

    var assertions=[];
    var actionTaken='Initial';
    var zeroArray = ['NaN', NaN, 'Text', 'x123', '#FF00FF', 'null', null, 'undefined', undefined, '', '     \t\n  ', '1Text', 'Text1', '12,345', '1.2.3', '-', '+', '+-1', '++1', '1+', '1e', 'e', 'e1', 'Infinity', '-Infinity', '0x123', '+0x123', '-0x123', '0', '.12', '+.12', '-0.12', Number.EPSILON, Number.MIN_VALUE, '-1.2e-3'];
    var numberArray = ['123', '+123', '1.2e+3', '+1.2e3', Number.MAX_VALUE, Number.MAX_SAFE_INTEGER];
    var result, i;
    var normalSanitize = function(num){return sanitizeNumber(num, -5, 0);};

    try{
    actionTaken='Invalid Loop';
   for (i=0; i < zeroArray.length; i++)
   {
       result = normalSanitize(zeroArray[i]);
       assertions.push({Expected: 0, Actual: result, Description: actionTaken+(zeroArray[i] + ' => 0 (default value)')});
   }
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    try{
    actionTaken='Valid Loop';
   for (i=0; i < numberArray.length; i++)
   {
       result = normalSanitize(numberArray[i]);
       assertions.push({Expected: Math.floor(parseFloat(numberArray[i])), Actual: result, Description: actionTaken+(numberArray[i] + ' string to number')});
   }
    result = normalSanitize(-1);
    assertions.push({Expected: -1, Actual: result, Description: actionTaken+': -1 string to number'});
    result = normalSanitize(-1.2);
    assertions.push({Expected: -1, Actual: result, Description: actionTaken+': -1.2 string to number'});
    result = normalSanitize(Number.MIN_SAFE_INTEGER);
    assertions.push({Expected: -5, Actual: result, Description: actionTaken+(Number.MIN_SAFE_INTEGER + ' string to number (min of -5)')});
    result = normalSanitize(-500);
    assertions.push({Expected: -5, Actual: result, Description: actionTaken+': -500 string to number (min of -5)'});
    } catch(e){assertions.push({Error: e, Description: actionTaken});}

    return TestRunner.displayResults('TestSuite.conversions.sanitizeNumber', assertions, testState);
};
TestSuite.conversions.xmlToJson=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions=[];

   //ADD TESTS

   return TestRunner.displayResults('TestSuite.conversions.xmlToJson', assertions, testState);
};
TestSuite.conversions.jsonToMarkdown=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], dataToLoad, expected, actual;

   //loading is the fastest way to set bulk data

   //blank character (no need to load)
   expected = '# Hero Name\n' +
      'A character for Humans and Heroes v3.' + latestMinorRuleset + '\n' +
      'PL 1 (transcendence 0)\n' +
      '\n' +
      '## Abilities\n' +
      '* Strength: 0\n' +
      '* Agility: 0\n' +
      '* Fighting: 0\n' +
      '* Dexterity: 0\n' +
      '* Stamina: 0\n' +
      '* Intellect: 0\n' +
      '* Awareness: 0\n' +
      '* Presence: 0\n' +
      '\n' +
      '## Defenses\n' +
      '* Dodge: 0 (0 ranks + 0 Agility)\n' +
      '* Parry: 0 (0 ranks + 0 Fighting)\n' +
      '* Will: 0 (0 ranks + 0 Presence)\n' +
      '* Fortitude: 0 (0 ranks + 0 Stamina)\n' +
      '* Toughness: 0\n' +
      '\n' +
      '## Point Totals\n' +
      'Grand Total: 0/15\n' +
      'Equipment Points: 0/0\n' +
      '\n' +
      '\n' +
      '## More Info\n' +
      '![Character Image](../images/Sirocco.png)\n' +
      'Complications, background and other information\n';
   document.getElementById('export-button').onclick();
   actual = document.getElementById('code-box').value;
   assertions.push({Expected: expected, Actual: actual, Description: 'blank doc: value'});

   Loader.resetData();  //reset but don't need skeleton
   dataToLoad =
      {
         "Hero": {"name": "New Name", "transcendence": 0, "image": "image path"},
         "Abilities": {
            "Strength": 1,
            "Agility": 2,
            "Fighting": 3,
            "Dexterity": 6,
            "Stamina": 5,
            "Intellect": 7,
            "Awareness": 4,
            "Presence": 8
         },
         "Powers": [{
            "effect": "Damage",
            "text": "damage text",
            "action": "Standard",
            "range": "Close",
            "duration": "Instant",
            "name": "damage name",
            "skill": "damage skill",
            "Modifiers": [
               {
                  "name": "Area",
                  "applications": 1,
                  "text": "damage Shape"
               },
               {
                  "name": "Accurate",
                  "applications": 2
               },
               {
                  "name": "Feature",
                  "text": "damage feature Description"
               }
            ],
            "rank": 1
         }],
         "Equipment": [
            {
               "effect": "Feature",
               "cost": 2,
               "text": "",
               "action": "None",
               "range": "Personal",
               "duration": "Permanent",
               "Modifiers": [],
               "rank": 1
            },
            {
               "effect": "Damage",
               "text": "Descriptors and other text",
               "action": "Standard",
               "range": "Perception",
               "duration": "Instant",
               "name": "Equipment 2 Damage name",
               "Modifiers": [{"name": "Increased Range", "applications": 2}],
               "rank": 1
            }
         ],
         "Advantages": [
            {"name": "Equipment", "rank": 2},
            {
               "name": "Benefit",
               "rank": 2,
               "text": "benefit text"
            },
            {"name": "Ultimate Effort", "text": "ultimate text"},
            {"name": "Defensive Roll", "rank": 1}
         ],
         "Skills": [
            {"name": "Perception", "rank": 2, "ability": "Awareness"},
            {
               "name": "Close Combat",
               "subtype": "close combat text",
               "rank": 1,
               "ability": "Fighting"
            }
         ],
         "Defenses": {"Dodge": 2, "Parry": 1, "Will": 3, "Fortitude": 4},
         "ruleset": "3." + latestMinorRuleset,
         "version": 2,
         "Information": "my bio"
      };
   Loader.sendData(dataToLoad);
   expected = '# New Name\n' +
      'A character for Humans and Heroes v3.' + latestMinorRuleset + '\n' +
      'PL 11 (transcendence 0)\n' +
      '\n' +
      '## Abilities\n' +
      '* Strength: 1\n' +
      '* Agility: 2\n' +
      '* Fighting: 3\n' +
      '* Dexterity: 6\n' +
      '* Stamina: 5\n' +
      '* Intellect: 7\n' +
      '* Awareness: 4\n' +
      '* Presence: 8\n' +
      '\n' +
      '## Powers\n' +
      '* damage name (damage skill): Damage 1, Standard, Close, Instant. damage text\n' +
      '   - Area 1. damage Shape\n' +
      '   - Accurate 2\n' +
      '   - Feature. damage feature Description\n' +
      '\n' +
      '## Equipment\n' +
      '* Feature 1 (base cost 2), None, Personal, Permanent\n' +
      '* Equipment 2 Damage name: Damage 1, Standard, Perception, Instant. Descriptors and other text\n' +
      '   - Increased Range 2\n' +
      '\n' +
      '## Advantages\n' +
      '* Equipment 2\n' +
      '* Benefit 2. benefit text\n' +
      '* Ultimate Effort. ultimate text\n' +
      '* Defensive Roll 1\n' +
      '\n' +
      '## Skills\n' +
      '* Perception (Awareness) 2\n' +
      '* Close Combat: close combat text (Fighting) 1\n' +
      '\n' +
      '## Defenses\n' +
      '* Dodge: 4 (2 ranks + 2 Agility)\n' +
      '* Parry: 4 (1 ranks + 3 Fighting)\n' +
      '* Will: 11 (3 ranks + 8 Presence)\n' +
      '* Fortitude: 9 (4 ranks + 5 Stamina)\n' +
      '* Toughness: 6 (5 without Defensive Roll)\n' +
      '\n' +
      '## Point Totals\n' +
      '* Ability: 72\n' +
      '* Power: 5\n' +
      '* Advantage: 6\n' +
      '* Skill: 2\n' +
      '* Defense: 10\n' +
      '\n' +
      'Grand Total: 95/165\n' +
      'Equipment Points: 6/10\n' +
      'Unused skill rank: 1\n' +
      '\n' +
      '\n' +
      '## More Info\n' +
      '![Character Image](image path)\n' +
      'my bio\n';
   document.getElementById('export-button').onclick();
   actual = document.getElementById('code-box').value;
   assertions.push({Expected: [], Actual: Messages.list, Description: 'big doc: load errors'});
   assertions.push({Expected: expected, Actual: actual, Description: 'big doc: value'});

   dataToLoad = Loader.resetData();
   dataToLoad.Hero.transcendence = 1;
   dataToLoad.Skills = [{"name": "Perception", "rank": 2, "ability": "Awareness"}];
   Loader.sendData(dataToLoad);
   expected = '# Hero Name\n' +
      'A character for Humans and Heroes v3.' + latestMinorRuleset + '\n' +
      'PL 1 (transcendence 1)\n' +
      '\n' +
      '## Abilities\n' +
      '* Strength: 0\n' +
      '* Agility: 0\n' +
      '* Fighting: 0\n' +
      '* Dexterity: 0\n' +
      '* Stamina: 0\n' +
      '* Intellect: 0\n' +
      '* Awareness: 0\n' +
      '* Presence: 0\n' +
      '\n' +
      '## Skills\n' +
      '* Perception (Awareness) 2\n' +
      '\n' +
      '## Defenses\n' +
      '* Dodge: 0 (0 ranks + 0 Agility)\n' +
      '* Parry: 0 (0 ranks + 0 Fighting)\n' +
      '* Will: 0 (0 ranks + 0 Presence)\n' +
      '* Fortitude: 0 (0 ranks + 0 Stamina)\n' +
      '* Toughness: 0\n' +
      '\n' +
      '## Point Totals\n' +
      '* Skill: 1\n' +
      '\n' +
      'Grand Total: 1/15\n' +
      'Equipment Points: 0/0\n' +
      '\n' +
      '\n' +
      '## More Info\n' +
      '![Character Image](../images/Sirocco.png)\n' +
      'Complications, background and other information\n';
   document.getElementById('export-button').onclick();
   actual = document.getElementById('code-box').value;
   assertions.push({Expected: [], Actual: Messages.list, Description: 'just transcendence, +something (skill): load errors'});
   assertions.push({Expected: expected, Actual: actual, Description: 'just transcendence, +something (skill): value'});

   return TestRunner.displayResults('TestSuite.conversions.jsonToMarkdown', assertions, testState);
};
