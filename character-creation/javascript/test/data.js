'use strict';
TestSuite.data={};
TestSuite.data.allVersions=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], expected;

   try {
   expected = {
      "names": [
         "Strength",
         "Agility",
         "Fighting",
         "Dexterity",
         "Stamina",
         "Intellect",
         "Awareness",
         "Presence"
      ]
   };
   assertions.push({Expected: expected, Actual: Data.Ability, Description: 'Data.Ability'});

   expected = '<label class="fill-remaining">Name&nbsp;<input type="text" id="powerName5" onChange="Main.powerSection.getRow(5).changeName();" value="Negavision" /></label>';
   assertions.push({Expected: expected, Actual: Data.SharedHtml.powerName('power', 5, 'Negavision'), Description: 'Data.SharedHtml.powerName'});
   expected = '<label class="fill-remaining">Skill&nbsp;<input type="text" id="powerSkill5" onChange="Main.powerSection.getRow(5).changeSkill();" value="Gaze" /></label>';
   assertions.push({Expected: expected, Actual: Data.SharedHtml.powerSkill('power', 5, 'Gaze'), Description: 'Data.SharedHtml.powerSkill'});
   } catch(e){assertions.push({Error: e, Description: 'Same data'});}

   return TestRunner.displayResults('TestSuite.data.allVersions', assertions, testState);
};
TestSuite.data.v1=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], expected;

   try {
   Data.change(new VersionObject(1, 0));

   expected = {
      "mapThese": [
         "Close Attack",
         "Defensive Roll",
         "Improved Critical",
         "Improved Initiative",
         "Ranged Attack",
         "Seize Initiative"
      ],
      "names": [
         "Accurate Attack",
         "Agile Feint",
         "All-out Attack",
         "Animal Empathy",
         "Artificer",
         "Assessment",
         "Attractive",
         "Beginner's Luck",
         "Benefit",
         "Chokehold",
         "Close Attack",
         "Connected",
         "Contacts",
         "Daze",
         "Defensive Attack",
         "Defensive Roll",
         "Diehard",
         "Eidetic Memory",
         "Equipment",
         "Evasion",
         "Extraordinary Effort",
         "Fascinate",
         "Fast Grab",
         "Favored Environment",
         "Favored Foe",
         "Fearless",
         "Grabbing Finesse",
         "Great Endurance",
         "Hide in Plain Sight",
         "Improved Aim",
         "Improved Critical",
         "Improved Defense",
         "Improved Disarm",
         "Improved Grab",
         "Improved Hold",
         "Improved Initiative",
         "Improved Smash",
         "Improved Trip",
         "Improvised Tools",
         "Improvised Weapon",
         "Inspire",
         "Instant Up",
         "Interpose",
         "Inventor",
         "Jack of All Trades",
         "Languages",
         "Leadership",
         "Luck",
         "Minion",
         "Move-by Action",
         "Power Attack",
         "Precise Attack",
         "Prone Fighting",
         "Quick Draw",
         "Ranged Attack",
         "Redirect",
         "Ritualist",
         "Second Chance",
         "Seize Initiative",
         "Set-up",
         "Sidekick",
         "Skill Mastery",
         "Startle",
         "Takedown",
         "Taunt",
         "Teamwork",
         "Throwing Mastery",
         "Tracking",
         "Trance",
         "Ultimate Effort",
         "Uncanny Dodge",
         "Weapon Bind",
         "Weapon Break",
         "Well-informed"
      ],
      "Accurate Attack": {
         "name": "Accurate Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Agile Feint": {
         "name": "Agile Feint",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "All-out Attack": {
         "name": "All-out Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Animal Empathy": {
         "name": "Animal Empathy",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Artificer": {
         "name": "Artificer",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Assessment": {
         "name": "Assessment",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Attractive": {
         "name": "Attractive",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 2
      },
      "Beginner's Luck": {
         "name": "Beginner's Luck",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Benefit": {
         "name": "Benefit",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Chokehold": {
         "name": "Chokehold",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Close Attack": {
         "name": "Close Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Connected": {
         "name": "Connected",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Contacts": {
         "name": "Contacts",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Daze": {
         "name": "Daze",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 2
      },
      "Defensive Attack": {
         "name": "Defensive Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Defensive Roll": {
         "name": "Defensive Roll",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Diehard": {
         "name": "Diehard",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Eidetic Memory": {
         "name": "Eidetic Memory",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Equipment": {
         "name": "Equipment",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Evasion": {
         "name": "Evasion",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 2
      },
      "Extraordinary Effort": {
         "name": "Extraordinary Effort",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Fascinate": {
         "name": "Fascinate",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Fast Grab": {
         "name": "Fast Grab",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Favored Environment": {
         "name": "Favored Environment",
         "costPerRank": 1,
         "defaultText": "Environment",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 1
      },
      "Favored Foe": {
         "name": "Favored Foe",
         "costPerRank": 1,
         "defaultText": "Foe type",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 1
      },
      "Fearless": {
         "name": "Fearless",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Grabbing Finesse": {
         "name": "Grabbing Finesse",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Great Endurance": {
         "name": "Great Endurance",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Hide in Plain Sight": {
         "name": "Hide in Plain Sight",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Aim": {
         "name": "Improved Aim",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Critical": {
         "name": "Improved Critical",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 4
      },
      "Improved Defense": {
         "name": "Improved Defense",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Disarm": {
         "name": "Improved Disarm",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Grab": {
         "name": "Improved Grab",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Hold": {
         "name": "Improved Hold",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Initiative": {
         "name": "Improved Initiative",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Improved Smash": {
         "name": "Improved Smash",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Trip": {
         "name": "Improved Trip",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improvised Tools": {
         "name": "Improvised Tools",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improvised Weapon": {
         "name": "Improvised Weapon",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Inspire": {
         "name": "Inspire",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 5
      },
      "Instant Up": {
         "name": "Instant Up",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Interpose": {
         "name": "Interpose",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Inventor": {
         "name": "Inventor",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Jack of All Trades": {
         "name": "Jack of All Trades",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Languages": {
         "name": "Languages",
         "costPerRank": 1,
         "defaultText": "Languages Known",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Leadership": {
         "name": "Leadership",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Luck": {
         "name": "Luck",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Minion": {
         "name": "Minion",
         "costPerRank": 1,
         "defaultText": "Helper Name",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Move-by Action": {
         "name": "Move-by Action",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Power Attack": {
         "name": "Power Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Precise Attack": {
         "name": "Precise Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 4
      },
      "Prone Fighting": {
         "name": "Prone Fighting",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Quick Draw": {
         "name": "Quick Draw",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Ranged Attack": {
         "name": "Ranged Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Redirect": {
         "name": "Redirect",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Ritualist": {
         "name": "Ritualist",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Second Chance": {
         "name": "Second Chance",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Seize Initiative": {
         "name": "Seize Initiative",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Set-up": {
         "name": "Set-up",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Sidekick": {
         "name": "Sidekick",
         "costPerRank": 1,
         "defaultText": "Helper Name",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Skill Mastery": {
         "name": "Skill Mastery",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 1
      },
      "Startle": {
         "name": "Startle",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Takedown": {
         "name": "Takedown",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 2
      },
      "Taunt": {
         "name": "Taunt",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Teamwork": {
         "name": "Teamwork",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Throwing Mastery": {
         "name": "Throwing Mastery",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Tracking": {
         "name": "Tracking",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Trance": {
         "name": "Trance",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Ultimate Effort": {
         "name": "Ultimate Effort",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 1
      },
      "Uncanny Dodge": {
         "name": "Uncanny Dodge",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Weapon Bind": {
         "name": "Weapon Bind",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Weapon Break": {
         "name": "Weapon Break",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Well-informed": {
         "name": "Well-informed",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      }
   };
   assertions.push({Expected: expected, Actual: Data.Advantage, Description: 'Data.Advantage'});

   expected = {
      "names": [
         "Dodge",
         "Parry",
         "Will",
         "Fortitude",
         "Toughness"
      ],
      "Dodge": {
         "ability": "Agility",
         "name": "Dodge"
      },
      "Parry": {
         "ability": "Fighting",
         "name": "Parry"
      },
      "Will": {
         "ability": "Awareness",
         "name": "Will"
      },
      "Fortitude": {
         "ability": "Stamina",
         "name": "Fortitude"
      },
      "Toughness": {
         "ability": "Stamina",
         "name": "Toughness"
      }
   };
   assertions.push({Expected: expected, Actual: Data.Defense, Description: 'Data.Defense'});

   expected = {
      "names": [
         "Accurate",
         "Affects Corporeal",
         "Affects Insubstantial",
         "Affects Objects Also",
         "Affects Objects Only",
         "Affects Others Also",
         "Affects Others Only",
         "Alternate Effect",
         "Alternate Resistance (Cost)",
         "Alternate Resistance (Free)",
         "Area",
         "Attack",
         "Contagious",
         "Dimensional",
         "Dynamic Alternate Effect",
         "Extended Range",
         "Faster Action",
         "Feature",
         "Homing",
         "Impervious",
         "Increased Duration",
         "Increased Mass",
         "Increased Range",
         "Incurable",
         "Indirect",
         "Innate",
         "Insidious",
         "Linked",
         "Multiattack",
         "Penetrating",
         "Precise",
         "Reach",
         "Reversible",
         "Ricochet",
         "Secondary Effect",
         "Selective",
         "Sleep",
         "Split",
         "Subtle",
         "Triggered",
         "Variable Descriptor",
         "Activation",
         "Check Required",
         "Decreased Duration",
         "Diminished Range",
         "Distracting",
         "Easily Removable",
         "Fades",
         "Feedback",
         "Grab-Based",
         "Inaccurate",
         "Limited",
         "Noticeable",
         "Quirk",
         "Reduced Range",
         "Removable",
         "Resistible",
         "Sense-Dependent",
         "Side Effect",
         "Slower Action",
         "Tiring",
         "Uncontrolled",
         "Unreliable",
         "Other Rank Extra",
         "Other Flat Extra",
         "Other Free Modifier",
         "Other Flat Flaw",
         "Other Rank Flaw"
      ],
      "Accurate": {
         "name": "Accurate",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Affects Corporeal": {
         "name": "Affects Corporeal",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Affects Insubstantial": {
         "name": "Affects Insubstantial",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Affects Objects Also": {
         "name": "Affects Objects Also",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Affects Objects Only": {
         "name": "Affects Objects Only",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Affects Others Also": {
         "name": "Affects Others Also",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Affects Others Only": {
         "name": "Affects Others Only",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Alternate Effect": {
         "name": "Alternate Effect",
         "cost": 1,
         "defaultText": "To What",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Alternate Resistance (Cost)": {
         "name": "Alternate Resistance (Cost)",
         "cost": 1,
         "defaultText": "Name of Resistance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Alternate Resistance (Free)": {
         "name": "Alternate Resistance (Free)",
         "cost": 0,
         "defaultText": "Name of Resistance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Area": {
         "name": "Area",
         "cost": 1,
         "defaultText": "Shape",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Rank"
      },
      "Attack": {
         "name": "Attack",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Contagious": {
         "name": "Contagious",
         "cost": 1,
         "defaultText": "Method of Spreading",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Dimensional": {
         "name": "Dimensional",
         "cost": 1,
         "defaultText": "Which Dimensions",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 3,
         "type": "Flat"
      },
      "Dynamic Alternate Effect": {
         "name": "Dynamic Alternate Effect",
         "cost": 1,
         "defaultText": "To What",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Extended Range": {
         "name": "Extended Range",
         "cost": 1,
         "defaultText": "Total Ranges",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Faster Action": {
         "name": "Faster Action",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 6,
         "type": "Rank"
      },
      "Feature": {
         "name": "Feature",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Homing": {
         "name": "Homing",
         "cost": 1,
         "defaultText": "Description or Method of targeting",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Impervious": {
         "name": "Impervious",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Increased Duration": {
         "name": "Increased Duration",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 3,
         "type": "Rank"
      },
      "Increased Mass": {
         "name": "Increased Mass",
         "cost": 1,
         "defaultText": "Total Mass",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Increased Range": {
         "name": "Increased Range",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 4,
         "type": "Rank"
      },
      "Incurable": {
         "name": "Incurable",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Indirect": {
         "name": "Indirect",
         "cost": 1,
         "defaultText": "Direction",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 4,
         "type": "Flat"
      },
      "Innate": {
         "name": "Innate",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Insidious": {
         "name": "Insidious",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Linked": {
         "name": "Linked",
         "cost": 0,
         "defaultText": "To What",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Multiattack": {
         "name": "Multiattack",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Penetrating": {
         "name": "Penetrating",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Precise": {
         "name": "Precise",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Reach": {
         "name": "Reach",
         "cost": 1,
         "defaultText": "Total Attack Distance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Reversible": {
         "name": "Reversible",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Ricochet": {
         "name": "Ricochet",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Secondary Effect": {
         "name": "Secondary Effect",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Selective": {
         "name": "Selective",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Sleep": {
         "name": "Sleep",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Split": {
         "name": "Split",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Subtle": {
         "name": "Subtle",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Triggered": {
         "name": "Triggered",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Variable Descriptor": {
         "name": "Variable Descriptor",
         "cost": 1,
         "defaultText": "Category",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Activation": {
         "name": "Activation",
         "cost": -1,
         "defaultText": "Action Required",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Check Required": {
         "name": "Check Required",
         "cost": -1,
         "defaultText": "What Check",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Decreased Duration": {
         "name": "Decreased Duration",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 3,
         "type": "Rank"
      },
      "Diminished Range": {
         "name": "Diminished Range",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 3,
         "type": "Flat"
      },
      "Distracting": {
         "name": "Distracting",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Easily Removable": {
         "name": "Easily Removable",
         "cost": -1,
         "defaultText": "Type of item",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Fades": {
         "name": "Fades",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Feedback": {
         "name": "Feedback",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Grab-Based": {
         "name": "Grab-Based",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Inaccurate": {
         "name": "Inaccurate",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Limited": {
         "name": "Limited",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Rank"
      },
      "Noticeable": {
         "name": "Noticeable",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Quirk": {
         "name": "Quirk",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Reduced Range": {
         "name": "Reduced Range",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 4,
         "type": "Rank"
      },
      "Removable": {
         "name": "Removable",
         "cost": -1,
         "defaultText": "Type of item",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Resistible": {
         "name": "Resistible",
         "cost": -1,
         "defaultText": "Name of Resistance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Sense-Dependent": {
         "name": "Sense-Dependent",
         "cost": -1,
         "defaultText": "Name of Sense",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Side Effect": {
         "name": "Side Effect",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Rank"
      },
      "Slower Action": {
         "name": "Slower Action",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 6,
         "type": "Rank"
      },
      "Tiring": {
         "name": "Tiring",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Uncontrolled": {
         "name": "Uncontrolled",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Unreliable": {
         "name": "Unreliable",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Other Rank Extra": {
         "name": "Other Rank Extra",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Rank"
      },
      "Other Flat Extra": {
         "name": "Other Flat Extra",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Other Free Modifier": {
         "name": "Other Free Modifier",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Other Flat Flaw": {
         "name": "Other Flat Flaw",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Other Rank Flaw": {
         "name": "Other Rank Flaw",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Rank"
      }
   };
   assertions.push({Expected: expected, Actual: Data.Modifier, Description: 'Data.Modifier'});

   expected = {
      "actions": [
         "Standard",
         "Move",
         "Free",
         "Reaction",
         "None"
      ],
      "durations": [
         "Concentration",
         "Sustained",
         "Continuous",
         "Permanent",
         "Instant"
      ],
      "names": [
         "Affliction",
         "Burrowing",
         "Communication",
         "Comprehend",
         "Concealment",
         "Create",
         "Damage",
         "Deflect",
         "Elongation",
         "Enhanced Trait",
         "Environment",
         "Extra Limbs",
         "Feature",
         "Flight",
         "Growth",
         "Healing",
         "Illusion",
         "Immortality",
         "Immunity",
         "Insubstantial",
         "Leaping",
         "Luck Control",
         "Mind Reading",
         "Morph",
         "Move Object",
         "Movement",
         "Nullify",
         "Protection",
         "Quickness",
         "Regeneration",
         "Remote Sensing",
         "Senses",
         "Shrinking",
         "Speed",
         "Summon",
         "Swimming",
         "Teleport",
         "Transform",
         "Variable",
         "Weaken"
      ],
      "ranges": [
         "Close",
         "Ranged",
         "Perception",
         "Personal"
      ],
      "Affliction": {
         "name": "Affliction",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Burrowing": {
         "name": "Burrowing",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Communication": {
         "name": "Communication",
         "baseCost": 4,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Comprehend": {
         "name": "Comprehend",
         "baseCost": 2,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Concealment": {
         "name": "Concealment",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Create": {
         "name": "Create",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Damage": {
         "name": "Damage",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Deflect": {
         "name": "Deflect",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Elongation": {
         "name": "Elongation",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Enhanced Trait": {
         "name": "Enhanced Trait",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Environment": {
         "name": "Environment",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Extra Limbs": {
         "name": "Extra Limbs",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Feature": {
         "name": "Feature",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Flight": {
         "name": "Flight",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Growth": {
         "name": "Growth",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Healing": {
         "name": "Healing",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Illusion": {
         "name": "Illusion",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Perception",
         "hasInputBaseCost": true,
         "isAttack": true,
         "isGodhood": false
      },
      "Immortality": {
         "name": "Immortality",
         "baseCost": 2,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Immunity": {
         "name": "Immunity",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Insubstantial": {
         "name": "Insubstantial",
         "baseCost": 5,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Leaping": {
         "name": "Leaping",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Instant",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Luck Control": {
         "name": "Luck Control",
         "baseCost": 3,
         "defaultAction": "Reaction",
         "defaultDuration": "Instant",
         "defaultRange": "Perception",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Mind Reading": {
         "name": "Mind Reading",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Perception",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Morph": {
         "name": "Morph",
         "baseCost": 5,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Move Object": {
         "name": "Move Object",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Movement": {
         "name": "Movement",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Nullify": {
         "name": "Nullify",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Protection": {
         "name": "Protection",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Quickness": {
         "name": "Quickness",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Regeneration": {
         "name": "Regeneration",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Remote Sensing": {
         "name": "Remote Sensing",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Senses": {
         "name": "Senses",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Shrinking": {
         "name": "Shrinking",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Speed": {
         "name": "Speed",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Summon": {
         "name": "Summon",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Swimming": {
         "name": "Swimming",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Teleport": {
         "name": "Teleport",
         "baseCost": 2,
         "defaultAction": "Move",
         "defaultDuration": "Instant",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Transform": {
         "name": "Transform",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Variable": {
         "name": "Variable",
         "baseCost": 7,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Weaken": {
         "name": "Weaken",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      }
   };
   assertions.push({Expected: expected, Actual: Data.Power, Description: 'Data.Power'});

   expected = {
      "names": [
         "Acrobatics",
         "Athletics",
         "Close Combat",
         "Deception",
         "Expertise",
         "Insight",
         "Intimidation",
         "Investigation",
         "Perception",
         "Persuasion",
         "Ranged Combat",
         "Sleight of Hand",
         "Stealth",
         "Technology",
         "Treatment",
         "Vehicles"
      ],
      "Acrobatics": {
         "name": "Acrobatics",
         "ability": "Agility",
         "hasText": false
      },
      "Athletics": {
         "name": "Athletics",
         "ability": "Strength",
         "hasText": false
      },
      "Close Combat": {
         "name": "Close Combat",
         "ability": "Fighting",
         "hasText": true
      },
      "Deception": {
         "name": "Deception",
         "ability": "Presence",
         "hasText": false
      },
      "Expertise": {
         "name": "Expertise",
         "ability": "Intellect",
         "hasText": true
      },
      "Insight": {
         "name": "Insight",
         "ability": "Awareness",
         "hasText": false
      },
      "Intimidation": {
         "name": "Intimidation",
         "ability": "Presence",
         "hasText": false
      },
      "Investigation": {
         "name": "Investigation",
         "ability": "Intellect",
         "hasText": false
      },
      "Perception": {
         "name": "Perception",
         "ability": "Awareness",
         "hasText": false
      },
      "Persuasion": {
         "name": "Persuasion",
         "ability": "Presence",
         "hasText": false
      },
      "Ranged Combat": {
         "name": "Ranged Combat",
         "ability": "Dexterity",
         "hasText": true
      },
      "Sleight of Hand": {
         "name": "Sleight of Hand",
         "ability": "Dexterity",
         "hasText": false
      },
      "Stealth": {
         "name": "Stealth",
         "ability": "Agility",
         "hasText": false
      },
      "Technology": {
         "name": "Technology",
         "ability": "Intellect",
         "hasText": false
      },
      "Treatment": {
         "name": "Treatment",
         "ability": "Intellect",
         "hasText": false
      },
      "Vehicles": {
         "name": "Vehicles",
         "ability": "Dexterity",
         "hasText": false
      }
   };
   assertions.push({Expected: expected, Actual: Data.Skill, Description: 'Data.Skill'});
   } catch(e){assertions.push({Error: e, Description: 'Same data'});}

   //reset data, Main.setRuleset will not work because Main.activeRuleset is out of sync
   Data.change(new VersionObject(3, latestMinorRuleset));

   return TestRunner.displayResults('TestSuite.data.v1', assertions, testState);
};
TestSuite.data.v2=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], expected;

   try {
   Data.change(new VersionObject(2, 7));

   expected = {
      "mapThese": [
         "Close Attack",
         "Defensive Roll",
         "Improved Critical",
         "Improved Initiative",
         "Ranged Attack",
         "Seize Initiative"
      ],
      "names": [
         "Accurate Attack",
         "All-out Attack",
         "Attractive",
         "Beginner's Luck",
         "Benefit",
         "Connected",
         "Defensive Attack",
         "Defensive Roll",
         "Diehard",
         "Equipment",
         "Evasion",
         "Extraordinary Effort",
         "Fast Grab",
         "Improved Aim",
         "Improved Critical",
         "Improved Defense",
         "Improved Disarm",
         "Improved Grab",
         "Improved Hold",
         "Improved Initiative",
         "Improved Trip",
         "Improvised Tools",
         "Inspire",
         "Instant Up",
         "Interpose",
         "Jack of All Trades",
         "Languages",
         "Lucky",
         "Meekness",
         "Minion",
         "Move-by Action",
         "Power Attack",
         "Prone Fighting",
         "Quick Draw",
         "Seize Initiative",
         "Sidekick",
         "Skill Mastery",
         "Teamwork",
         "Trance",
         "Ultimate Effort",
         "Beyond Mortal",
         "Let There Be",
         "Luck of the Gods",
         "Omnipresent",
         "Omniscient",
         "Perfect Focus",
         "Stay Like That",
         "Supreme",
         "Variable Modifier",
         "Your Petty Rules Don't Apply to Me"
      ],
      "Accurate Attack": {
         "name": "Accurate Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "All-out Attack": {
         "name": "All-out Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Attractive": {
         "name": "Attractive",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 2
      },
      "Beginner's Luck": {
         "name": "Beginner's Luck",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Benefit": {
         "name": "Benefit",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Connected": {
         "name": "Connected",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Defensive Attack": {
         "name": "Defensive Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Defensive Roll": {
         "name": "Defensive Roll",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Diehard": {
         "name": "Diehard",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Equipment": {
         "name": "Equipment",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Evasion": {
         "name": "Evasion",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 2
      },
      "Extraordinary Effort": {
         "name": "Extraordinary Effort",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Fast Grab": {
         "name": "Fast Grab",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Aim": {
         "name": "Improved Aim",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Critical": {
         "name": "Improved Critical",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 4
      },
      "Improved Defense": {
         "name": "Improved Defense",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Disarm": {
         "name": "Improved Disarm",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Grab": {
         "name": "Improved Grab",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Hold": {
         "name": "Improved Hold",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improved Initiative": {
         "name": "Improved Initiative",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 5
      },
      "Improved Trip": {
         "name": "Improved Trip",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Improvised Tools": {
         "name": "Improvised Tools",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Inspire": {
         "name": "Inspire",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 5
      },
      "Instant Up": {
         "name": "Instant Up",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Interpose": {
         "name": "Interpose",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Jack of All Trades": {
         "name": "Jack of All Trades",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Languages": {
         "name": "Languages",
         "costPerRank": 1,
         "defaultText": "Languages Known",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Lucky": {
         "name": "Lucky",
         "costPerRank": 5,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 3
      },
      "Meekness": {
         "name": "Meekness",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Minion": {
         "name": "Minion",
         "costPerRank": 1,
         "defaultText": "Helper Name",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Move-by Action": {
         "name": "Move-by Action",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Power Attack": {
         "name": "Power Attack",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Prone Fighting": {
         "name": "Prone Fighting",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Quick Draw": {
         "name": "Quick Draw",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Seize Initiative": {
         "name": "Seize Initiative",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Sidekick": {
         "name": "Sidekick",
         "costPerRank": 2,
         "defaultText": "Helper Name",
         "hasText": true,
         "isGodhood": false,
         "maxRank": Infinity
      },
      "Skill Mastery": {
         "name": "Skill Mastery",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 1
      },
      "Teamwork": {
         "name": "Teamwork",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Trance": {
         "name": "Trance",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": false,
         "maxRank": 1
      },
      "Ultimate Effort": {
         "name": "Ultimate Effort",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": true,
         "isGodhood": false,
         "maxRank": 1
      },
      "Beyond Mortal": {
         "name": "Beyond Mortal",
         "costPerRank": 50,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 1
      },
      "Let There Be": {
         "name": "Let There Be",
         "costPerRank": 40,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 1
      },
      "Luck of the Gods": {
         "name": "Luck of the Gods",
         "costPerRank": 5,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 1
      },
      "Omnipresent": {
         "name": "Omnipresent",
         "costPerRank": 5,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 3
      },
      "Omniscient": {
         "name": "Omniscient",
         "costPerRank": 5,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 5
      },
      "Perfect Focus": {
         "name": "Perfect Focus",
         "costPerRank": 1,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 1
      },
      "Stay Like That": {
         "name": "Stay Like That",
         "costPerRank": 15,
         "defaultText": "Power Modified",
         "hasText": true,
         "isGodhood": true,
         "maxRank": 1
      },
      "Supreme": {
         "name": "Supreme",
         "costPerRank": 1,
         "defaultText": "Power Gained",
         "hasText": true,
         "isGodhood": true,
         "maxRank": Infinity
      },
      "Variable Modifier": {
         "name": "Variable Modifier",
         "costPerRank": 35,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 1
      },
      "Your Petty Rules Don't Apply to Me": {
         "name": "Your Petty Rules Don't Apply to Me",
         "costPerRank": 50,
         "defaultText": "Advantage Subtype",
         "hasText": false,
         "isGodhood": true,
         "maxRank": 1
      }
   };
   assertions.push({Expected: expected, Actual: Data.Advantage, Description: 'Data.Advantage'});

   assertions.push({Expected: 'Presence', Actual: Data.Defense['Will'].ability, Description: 'Data.Defense[Will].ability = Presence'});

   expected = {
      "names": [
         "Accurate",
         "Affects Corporeal",
         "Affects Objects Also",
         "Affects Objects Only",
         "Affects Others Also",
         "Affects Others Only",
         "Alternate Resistance (Cost)",
         "Alternate Resistance (Free)",
         "Area",
         "Attack",
         "Contagious",
         "Dimensional",
         "Existence Dependent",
         "Extended Range",
         "Faster Action",
         "Feature",
         "Homing",
         "Impervious",
         "Increased Duration",
         "Increased Mass",
         "Increased Range",
         "Indirect",
         "Innate",
         "Insidious",
         "Linked",
         "Multiattack",
         "Penetrating",
         "Precise",
         "Reach",
         "Reversible",
         "Ricochet",
         "Secondary Effect",
         "Selective",
         "Split",
         "Subtle",
         "Variable Descriptor",
         "Activation",
         "Alternate Effect",
         "Ammunition",
         "Check Required",
         "Decreased Duration",
         "Diminished Range",
         "Distracting",
         "Easily Removable",
         "Fades",
         "Feedback",
         "Fragile",
         "Grab-Based",
         "Inaccurate",
         "Limited",
         "Noticeable",
         "Quirk",
         "Reduced Range",
         "Removable",
         "Resistible",
         "Sense-Dependent",
         "Side Effect",
         "Slower Action",
         "System Dependent",
         "Tiring",
         "Uncontrollable Entirely",
         "Uncontrollable Result",
         "Uncontrollable Target",
         "Unreliable",
         "Other Rank Extra",
         "Other Flat Extra",
         "Other Free Modifier",
         "Other Flat Flaw",
         "Other Rank Flaw"
      ],
      "Accurate": {
         "name": "Accurate",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Affects Corporeal": {
         "name": "Affects Corporeal",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Affects Objects Also": {
         "name": "Affects Objects Also",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Affects Objects Only": {
         "name": "Affects Objects Only",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Affects Others Also": {
         "name": "Affects Others Also",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Affects Others Only": {
         "name": "Affects Others Only",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Alternate Resistance (Cost)": {
         "name": "Alternate Resistance (Cost)",
         "cost": 1,
         "defaultText": "Name of Resistance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Alternate Resistance (Free)": {
         "name": "Alternate Resistance (Free)",
         "cost": 0,
         "defaultText": "Name of Resistance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Area": {
         "name": "Area",
         "cost": 1,
         "defaultText": "Shape",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Rank"
      },
      "Attack": {
         "name": "Attack",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Contagious": {
         "name": "Contagious",
         "cost": 1,
         "defaultText": "Method of Spreading",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Dimensional": {
         "name": "Dimensional",
         "cost": 1,
         "defaultText": "Which Dimensions",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 3,
         "type": "Flat"
      },
      "Existence Dependent": {
         "name": "Existence Dependent",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Extended Range": {
         "name": "Extended Range",
         "cost": 1,
         "defaultText": "Total Ranges",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Faster Action": {
         "name": "Faster Action",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 6,
         "type": "Rank"
      },
      "Feature": {
         "name": "Feature",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Homing": {
         "name": "Homing",
         "cost": 1,
         "defaultText": "Description or Method of targeting",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Impervious": {
         "name": "Impervious",
         "cost": 2,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Increased Duration": {
         "name": "Increased Duration",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 3,
         "type": "Rank"
      },
      "Increased Mass": {
         "name": "Increased Mass",
         "cost": 3,
         "defaultText": "Total Mass",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Increased Range": {
         "name": "Increased Range",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 4,
         "type": "Rank"
      },
      "Indirect": {
         "name": "Indirect",
         "cost": 1,
         "defaultText": "Direction",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 4,
         "type": "Flat"
      },
      "Innate": {
         "name": "Innate",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Insidious": {
         "name": "Insidious",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Linked": {
         "name": "Linked",
         "cost": 0,
         "defaultText": "To What",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Multiattack": {
         "name": "Multiattack",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Penetrating": {
         "name": "Penetrating",
         "cost": 2,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Precise": {
         "name": "Precise",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Reach": {
         "name": "Reach",
         "cost": 1,
         "defaultText": "Total Attack Distance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Reversible": {
         "name": "Reversible",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Ricochet": {
         "name": "Ricochet",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Secondary Effect": {
         "name": "Secondary Effect",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Selective": {
         "name": "Selective",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Split": {
         "name": "Split",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Subtle": {
         "name": "Subtle",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Variable Descriptor": {
         "name": "Variable Descriptor",
         "cost": 1,
         "defaultText": "Category",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Activation": {
         "name": "Activation",
         "cost": -1,
         "defaultText": "Action Required",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Flat"
      },
      "Alternate Effect": {
         "name": "Alternate Effect",
         "cost": -1,
         "defaultText": "To What",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Ammunition": {
         "name": "Ammunition",
         "cost": -1,
         "defaultText": "Usage Per time or reload",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Rank"
      },
      "Check Required": {
         "name": "Check Required",
         "cost": -1,
         "defaultText": "What Check",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Decreased Duration": {
         "name": "Decreased Duration",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 3,
         "type": "Rank"
      },
      "Diminished Range": {
         "name": "Diminished Range",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Distracting": {
         "name": "Distracting",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Easily Removable": {
         "name": "Easily Removable",
         "cost": -1,
         "defaultText": "Type of item",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Fades": {
         "name": "Fades",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Feedback": {
         "name": "Feedback",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Fragile": {
         "name": "Fragile",
         "cost": -1,
         "defaultText": "Total Toughness",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Grab-Based": {
         "name": "Grab-Based",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Inaccurate": {
         "name": "Inaccurate",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Limited": {
         "name": "Limited",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Rank"
      },
      "Noticeable": {
         "name": "Noticeable",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Quirk": {
         "name": "Quirk",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Reduced Range": {
         "name": "Reduced Range",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 4,
         "type": "Rank"
      },
      "Removable": {
         "name": "Removable",
         "cost": -1,
         "defaultText": "Type of item",
         "hasAutoRank": true,
         "hasAutoTotal": true,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Resistible": {
         "name": "Resistible",
         "cost": -1,
         "defaultText": "Name of Resistance",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Sense-Dependent": {
         "name": "Sense-Dependent",
         "cost": -1,
         "defaultText": "Name of Sense",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Side Effect": {
         "name": "Side Effect",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 2,
         "type": "Rank"
      },
      "Slower Action": {
         "name": "Slower Action",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": true,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": true,
         "isReadOnly": true,
         "maxRank": 6,
         "type": "Rank"
      },
      "System Dependent": {
         "name": "System Dependent",
         "cost": -2,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Flat"
      },
      "Tiring": {
         "name": "Tiring",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Uncontrollable Entirely": {
         "name": "Uncontrollable Entirely",
         "cost": -5,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Uncontrollable Result": {
         "name": "Uncontrollable Result",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Uncontrollable Target": {
         "name": "Uncontrollable Target",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Unreliable": {
         "name": "Unreliable",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": false,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Rank"
      },
      "Other Rank Extra": {
         "name": "Other Rank Extra",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Rank"
      },
      "Other Flat Extra": {
         "name": "Other Flat Extra",
         "cost": 1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Other Free Modifier": {
         "name": "Other Free Modifier",
         "cost": 0,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": 1,
         "type": "Free"
      },
      "Other Flat Flaw": {
         "name": "Other Flat Flaw",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Flat"
      },
      "Other Rank Flaw": {
         "name": "Other Rank Flaw",
         "cost": -1,
         "defaultText": "Description",
         "hasAutoRank": false,
         "hasAutoTotal": false,
         "hasText": true,
         "isActionRangeDuration": false,
         "isReadOnly": false,
         "maxRank": Infinity,
         "type": "Rank"
      }
   };
   assertions.push({Expected: expected, Actual: Data.Modifier, Description: 'Data.Modifier'});

   expected = {
      "actions": [
         "Slow",
         "Full",
         "Standard",
         "Move",
         "Free",
         "Reaction",
         "Triggered",
         "None"
      ],
      "durations": [
         "Concentration",
         "Sustained",
         "Continuous",
         "Permanent",
         "Instant"
      ],
      "names": [
         "Affliction",
         "Attain Knowledge",
         "Communication",
         "Comprehend",
         "Concealment",
         "Create",
         "Damage",
         "Enhanced Trait",
         "Environment",
         "Feature",
         "Flight",
         "Growth",
         "Healing",
         "Illusion",
         "Immortality",
         "Immunity",
         "Insubstantial",
         "Leaping",
         "Luck Control",
         "Mental Transform",
         "Mind Reading",
         "Mind Switch",
         "Morph",
         "Move Object",
         "Movement",
         "Nullify",
         "Permeate",
         "Phantom Ranks",
         "Protection",
         "Quickness",
         "Regeneration",
         "Remote Sensing",
         "Resistance",
         "Senses",
         "Shrinking",
         "Summon Minion",
         "Summon Object",
         "Teleport",
         "Transform",
         "Variable",
         "Weaken",
         "A God I Am",
         "Reality Warp"
      ],
      "ranges": [
         "Close",
         "Ranged",
         "Perception",
         "Personal"
      ],
      "Affliction": {
         "name": "Affliction",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Attain Knowledge": {
         "name": "Attain Knowledge",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Communication": {
         "name": "Communication",
         "baseCost": 4,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Comprehend": {
         "name": "Comprehend",
         "baseCost": 2,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Concealment": {
         "name": "Concealment",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Create": {
         "name": "Create",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Damage": {
         "name": "Damage",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Enhanced Trait": {
         "name": "Enhanced Trait",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Environment": {
         "name": "Environment",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Feature": {
         "name": "Feature",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Flight": {
         "name": "Flight",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Growth": {
         "name": "Growth",
         "baseCost": 6,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Healing": {
         "name": "Healing",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Illusion": {
         "name": "Illusion",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Perception",
         "hasInputBaseCost": true,
         "isAttack": true,
         "isGodhood": false
      },
      "Immortality": {
         "name": "Immortality",
         "baseCost": 5,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Immunity": {
         "name": "Immunity",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Insubstantial": {
         "name": "Insubstantial",
         "baseCost": 5,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Leaping": {
         "name": "Leaping",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Instant",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Luck Control": {
         "name": "Luck Control",
         "baseCost": 3,
         "defaultAction": "Reaction",
         "defaultDuration": "Instant",
         "defaultRange": "Perception",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Mental Transform": {
         "name": "Mental Transform",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Mind Reading": {
         "name": "Mind Reading",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Perception",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Mind Switch": {
         "name": "Mind Switch",
         "baseCost": 8,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Morph": {
         "name": "Morph",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Move Object": {
         "name": "Move Object",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Movement": {
         "name": "Movement",
         "baseCost": 2,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Nullify": {
         "name": "Nullify",
         "baseCost": 3,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Ranged",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "Permeate": {
         "name": "Permeate",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Phantom Ranks": {
         "name": "Phantom Ranks",
         "baseCost": 5,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Protection": {
         "name": "Protection",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Quickness": {
         "name": "Quickness",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Regeneration": {
         "name": "Regeneration",
         "baseCost": 3,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Remote Sensing": {
         "name": "Remote Sensing",
         "baseCost": 1,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Resistance": {
         "name": "Resistance",
         "baseCost": 3,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Senses": {
         "name": "Senses",
         "baseCost": 1,
         "defaultAction": "None",
         "defaultDuration": "Permanent",
         "defaultRange": "Personal",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Shrinking": {
         "name": "Shrinking",
         "baseCost": 3,
         "defaultAction": "Free",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Summon Minion": {
         "name": "Summon Minion",
         "baseCost": 5,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Summon Object": {
         "name": "Summon Object",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Teleport": {
         "name": "Teleport",
         "baseCost": 2,
         "defaultAction": "Move",
         "defaultDuration": "Instant",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Transform": {
         "name": "Transform",
         "baseCost": 2,
         "defaultAction": "Standard",
         "defaultDuration": "Sustained",
         "defaultRange": "Close",
         "hasInputBaseCost": true,
         "isAttack": false,
         "isGodhood": false
      },
      "Variable": {
         "name": "Variable",
         "baseCost": 7,
         "defaultAction": "Full",
         "defaultDuration": "Sustained",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": false
      },
      "Weaken": {
         "name": "Weaken",
         "baseCost": 1,
         "defaultAction": "Standard",
         "defaultDuration": "Instant",
         "defaultRange": "Close",
         "hasInputBaseCost": false,
         "isAttack": true,
         "isGodhood": false
      },
      "A God I Am": {
         "name": "A God I Am",
         "baseCost": 5,
         "defaultAction": "Triggered",
         "defaultDuration": "Continuous",
         "defaultRange": "Personal",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": true
      },
      "Reality Warp": {
         "name": "Reality Warp",
         "baseCost": 5,
         "defaultAction": "Free",
         "defaultDuration": "Continuous",
         "defaultRange": "Perception",
         "hasInputBaseCost": false,
         "isAttack": false,
         "isGodhood": true
      }
   };
   assertions.push({Expected: expected, Actual: Data.Power, Description: 'Data.Power'});

   expected = {
      "names": [
         "Acrobatics",
         "Athletics",
         "Close Combat",
         "Common Knowledge",
         "Deception",
         "Expertise",
         "Insight",
         "Intimidation",
         "Investigation",
         "Knowledge",
         "Memory",
         "Perception",
         "Persuasion",
         "Ranged Combat",
         "Sleight of Hand",
         "Stealth",
         "Strategy",
         "Technology",
         "Tracking",
         "Treatment",
         "Vehicles",
         "Other"
      ],
      "Acrobatics": {
         "name": "Acrobatics",
         "ability": "Agility",
         "hasText": true
      },
      "Athletics": {
         "name": "Athletics",
         "ability": "Strength",
         "hasText": true
      },
      "Close Combat": {
         "name": "Close Combat",
         "ability": "Fighting",
         "hasText": true
      },
      "Common Knowledge": {
         "name": "Common Knowledge",
         "ability": "Intellect",
         "hasText": true
      },
      "Deception": {
         "name": "Deception",
         "ability": "Presence",
         "hasText": true
      },
      "Expertise": {
         "name": "Expertise",
         "ability": "Intellect",
         "hasText": true
      },
      "Insight": {
         "name": "Insight",
         "ability": "Awareness",
         "hasText": true
      },
      "Intimidation": {
         "name": "Intimidation",
         "ability": "Presence",
         "hasText": true
      },
      "Investigation": {
         "name": "Investigation",
         "ability": "Intellect",
         "hasText": true
      },
      "Knowledge": {
         "name": "Knowledge",
         "ability": "Intellect",
         "hasText": true
      },
      "Memory": {
         "name": "Memory",
         "ability": "Intellect",
         "hasText": false
      },
      "Perception": {
         "name": "Perception",
         "ability": "Awareness",
         "hasText": false
      },
      "Persuasion": {
         "name": "Persuasion",
         "ability": "Presence",
         "hasText": false
      },
      "Ranged Combat": {
         "name": "Ranged Combat",
         "ability": "Dexterity",
         "hasText": true
      },
      "Sleight of Hand": {
         "name": "Sleight of Hand",
         "ability": "Dexterity",
         "hasText": true
      },
      "Stealth": {
         "name": "Stealth",
         "ability": "Agility",
         "hasText": true
      },
      "Strategy": {
         "name": "Strategy",
         "ability": "Intellect",
         "hasText": true
      },
      "Technology": {
         "name": "Technology",
         "ability": "Intellect",
         "hasText": true
      },
      "Tracking": {
         "name": "Tracking",
         "ability": "Awareness",
         "hasText": false
      },
      "Treatment": {
         "name": "Treatment",
         "ability": "Intellect",
         "hasText": true
      },
      "Vehicles": {
         "name": "Vehicles",
         "ability": "Dexterity",
         "hasText": true
      },
      "Other": {
         "name": "Other",
         "ability": "Strength",
         "hasText": true
      }
   };
   assertions.push({Expected: expected, Actual: Data.Skill, Description: 'Data.Skill'});
   } catch(e){assertions.push({Error: e, Description: 'Same data'});}

   //reset data, Main.setRuleset will not work because Main.activeRuleset is out of sync
   Data.change(new VersionObject(3, latestMinorRuleset));

   return TestRunner.displayResults('TestSuite.data.v2', assertions, testState);
};
TestSuite.data.v3=function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions=[], expected;

   try {
   Data.change(new VersionObject(3, 0));

   assertions.push({Expected: false, Actual: Data.Advantage.names.contains('Improved Critical'), Description: 'Removed Data.Advantage name Improved Critical'});
   assertions.push({Expected: undefined, Actual: Data.Advantage['Improved Critical'], Description: 'Removed Data.Advantage[Improved Critical]'});
   assertions.push({Expected: false, Actual: Data.Advantage.names.contains('Trance'), Description: 'Removed Data.Advantage name Trance'});
   assertions.push({Expected: undefined, Actual: Data.Advantage['Trance'], Description: 'Removed Data.Advantage[Trance]'});
   expected = {
      "name": "Persistent Information",
      "costPerRank": 1,
      "defaultText": "Advantage Subtype",
      "hasText": false,
      "isGodhood": false,
      "maxRank": 1
   };
   assertions.push({Expected: expected, Actual: Data.Advantage['Persistent Information'], Description: 'Added Data.Advantage[Persistent Information]'});
   assertions.push({Expected: 1, Actual: Data.Advantage['Inspire'].maxRank, Description: 'Data.Advantage[Inspire] no longer ranked'});
   expected = {
      "name": "Uncontrollable Activation",
      "cost": 1,
      "defaultText": "Description",
      "hasAutoRank": false,
      "hasAutoTotal": false,
      "hasText": false,
      "isActionRangeDuration": false,
      "isReadOnly": false,
      "maxRank": 1,
      "type": "Rank"
   };
   assertions.push({Expected: expected, Actual: Data.Modifier['Uncontrollable Activation'], Description: 'Added Data.Modifier[Uncontrollable Activation]'});
   } catch(e){assertions.push({Error: e, Description: 'v3.0 Same data'});}

   try {
   Data.change(new VersionObject(3, 4));

   assertions.push({Expected: false, Actual: Data.Modifier.names.contains('Uncontrollable Activation'), Description: 'Removed Data.Modifier name Uncontrollable Activation'});
   assertions.push({Expected: undefined, Actual: Data.Modifier['Uncontrollable Activation'], Description: 'Removed Data.Skill[Uncontrollable Activation]'});
   assertions.push({Expected: false, Actual: Data.Power.actions.contains('Triggered'), Description: 'Removed Data.Power.actions[Triggered]'});
   assertions.push({Expected: 'Free', Actual: Data.Power['A God I Am'].defaultAction, Description: 'Data.Power[A God I Am].defaultAction = Free'});
   assertions.push({Expected: 'Move', Actual: Data.Power['Flight'].defaultAction, Description: 'Data.Power[Flight].defaultAction = Move'});
   assertions.push({Expected: 'Move', Actual: Data.Power['Leaping'].defaultAction, Description: 'Data.Power[Leaping].defaultAction = Move'});
   assertions.push({Expected: 'Move', Actual: Data.Power['Movement'].defaultAction, Description: 'Data.Power[Movement].defaultAction = Move'});
   assertions.push({Expected: 'Move', Actual: Data.Power['Permeate'].defaultAction, Description: 'Data.Power[Permeate].defaultAction = Move'});
   assertions.push({Expected: 'Move', Actual: Data.Power['Teleport'].defaultAction, Description: 'Data.Power[Teleport].defaultAction = Move'});

   var actualAllowReaction=[], actualIsMovement=[];
   for (var i = 0; i < Data.Power.names.length; ++i)
   {
      var name = Data.Power.names[i];
      if(true === Data.Power[name].allowReaction) actualAllowReaction.push(name);
      if(true === Data.Power[name].isMovement) actualIsMovement.push(name);
   }
   actualAllowReaction.sort();
   actualIsMovement.sort();
   expected = ['Affliction', 'Damage', 'Feature', 'Luck Control', 'Mental Transform', 'Mind Switch', 'Nullify', 'Weaken'];
   assertions.push({Expected: expected, Actual: actualAllowReaction, Description: 'Data.Power[*].allowReaction'});
   expected = ['Flight', 'Leaping', 'Movement', 'Permeate', 'Teleport'];
   assertions.push({Expected: expected, Actual: actualIsMovement, Description: 'Data.Power[*].isMovement'});

   expected = {
      "name": "Aura",
      "cost": 2,
      "defaultText": "Description",
      "hasAutoRank": false,
      "hasAutoTotal": false,
      "hasText": false,
      "isActionRangeDuration": false,
      "isReadOnly": true,
      "maxRank": 1,
      "type": "Rank"
   };
   assertions.push({Expected: expected, Actual: Data.Modifier['Aura'], Description: 'Added Data.Modifier[Aura]'});
   assertions.push({Expected: false, Actual: Data.Modifier.names.contains('Grab-Based'), Description: 'Removed Data.Modifier name Grab-Based'});
   assertions.push({Expected: undefined, Actual: Data.Modifier['Grab-Based'], Description: 'Removed Data.Modifier[Grab-Based]'});
   assertions.push({Expected: true, Actual: Data.Modifier['Aura'].isReadOnly, Description: 'Data.Modifier[Aura].isReadOnly = true'});
   } catch(e){assertions.push({Error: e, Description: 'v3.4 Same data'});}

   try {
   Data.change(new VersionObject(3, 5));

   assertions.push({Expected: false, Actual: Data.Modifier.names.contains('Secondary Effect'), Description: 'Removed Data.Modifier name Secondary Effect'});
   assertions.push({Expected: undefined, Actual: Data.Modifier['Secondary Effect'], Description: 'Removed Data.Modifier[Secondary Effect]'});
   } catch(e){assertions.push({Error: e, Description: 'v3.5 Same data'});}

   try {
   Data.change(new VersionObject(3, 9));

   assertions.push({Expected: 1, Actual: Data.Power['Transform'].baseCost, Description: 'Data.Power[Transform].baseCost = 1'});
   assertions.push({Expected: false, Actual: Data.Power['Transform'].hasInputBaseCost, Description: 'Data.Power[Transform].hasInputBaseCost = false'});
   assertions.push({Expected: false, Actual: Data.Modifier.names.contains('Increased Mass'), Description: 'Removed Data.Modifier name Increased Mass'});
   assertions.push({Expected: undefined, Actual: Data.Modifier['Increased Mass'], Description: 'Removed Data.Modifier[Increased Mass]'});
   } catch(e){assertions.push({Error: e, Description: 'v3.9 Same data'});}

   //reset data, Main.setRuleset will not work because Main.activeRuleset is out of sync
   Data.change(new VersionObject(3, latestMinorRuleset));

   return TestRunner.displayResults('TestSuite.data.v3', assertions, testState);
};
