var benefit = '(Choose One)';
if(undefined !== queryParameters['names'][0]) benefit = queryParameters['names'][0];
var languages = '(Choose One)';
if(undefined !== queryParameters['names'][1]) languages = queryParameters['names'][1];
var skillMastery = '(Choose One)';
if(undefined !== queryParameters['names'][2]) skillMastery = queryParameters['names'][2];
var expertise = 'History';
if(undefined !== queryParameters['options'][2]) expertise = ['History', 'Mythology', 'Tactics'][queryParameters['options'][2] - 1];

var json = {
   "Hero": {
      "name": "Warrior",
      "transcendence": 0,
      "image": "../images/Powerhouse.jpg"
   },
   "Abilities": {
      "Strength": 10,
      "Agility": 6,
      "Fighting": 10,
      "Awareness": 4,
      "Stamina": 8,
      "Dexterity": 4,
      "Intellect": 1,
      "Presence": 4
   },
   "Powers": [
      {
         "effect": "Enhanced Trait",
         "cost": 2,
         "text": "Power Lifting: Enhanced Strength. Lifting Str 12; 100 tons",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Limited",
               "applications": 1,
               "text": "to Lifting"
            }
         ],
         "rank": 2
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Accurate Attack"
      },
      {
         "name": "All-out Attack"
      },
      {
         "name": "Benefit",
         "rank": 1,
         "text": benefit
      },
      {
         "name": "Defensive Attack"
      },
      {
         "name": "Defensive Roll",
         "rank": 2
      },
      {
         "name": "Diehard"
      },
      {
         "name": "Improved Disarm"
      },
      {
         "name": "Interpose"
      },
      {
         "name": "Languages",
         "rank": 1,
         "text": languages
      },
      {
         "name": "Move-by Action"
      },
      {
         "name": "Power Attack"
      },
      {
         "name": "Prone Fighting"
      },
      {
         "name": "Skill Mastery",
         "text": skillMastery
      }
   ],
   "Skills": [
      {
         "name": "Acrobatics",
         "subtype": "",
         "rank": 6,
         "ability": "Agility"
      },
      {
         "name": "Athletics",
         "subtype": "",
         "rank": 5,
         "ability": "Strength"
      },
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 6,
         "ability": "Awareness"
      },
      {
         "name": "Intimidation",
         "subtype": "",
         "rank": 5,
         "ability": "Presence"
      },
      {
         "name": "Perception",
         "rank": 6,
         "ability": "Awareness"
      },
      {
         "name": "Stealth",
         "subtype": "",
         "rank": 4,
         "ability": "Agility"
      }
   ],
   "Defenses": {
      "Dodge": 4,
      "Fortitude": 2,
      "Parry": 0,
      "Will": 6
   },
   "ruleset": "3.0",
   "version": 2,
   "Information": "Complications, background and other information"
};

if('2' === queryParameters['options'][0]) json.Powers = json.Powers.concat([
   {
      "effect": "Quickness",
      "text": "",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 5
   },
   {
      "effect": "Movement",
      "cost": 1,
      "text": "Ground Speed",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 5
   }
]);
else if('3' === queryParameters['options'][0]) json.Powers.push({
   "effect": "Leaping",
   "text": "",
   "action": "Free",
   "range": "Personal",
   "duration": "Instant",
   "Modifiers": [],
   "rank": 10
});
else if('4' === queryParameters['options'][0]) json.Powers = json.Powers.concat([
   {
      "effect": "Senses",
      "cost": 3,
      "text": "Accurate (2) and Analytical (1) Normal Hearing",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Danger Sense",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Extended Hearing",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Extended Vision",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 2,
      "text": "Hearing Counters Illusion 1",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Low-light Vision",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Ultra-Hearing",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   }
]);
else if('5' === queryParameters['options'][0]) json.Powers.push({
   "effect": "Flight",
   "text": "Wind Riding",
   "action": "Free",
   "range": "Personal",
   "duration": "Sustained",
   "Modifiers": [],
   "rank": 5
});
else json.Powers = json.Powers.concat([
   {
      "effect": "Immunity",
      "text": "Drowning",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Movement",
      "cost": 1,
      "text": "Swimming",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 6
   },
   {
      "effect": "Movement",
      "cost": 2,
      "text": "Environmental Adaptation, Aquatic",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Low-light Vision",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   }
]);

if('2' === queryParameters['options'][1])
{
   json.Abilities.Strength += 2;
   json.Abilities.Fighting -= 2;
}
else if('3' === queryParameters['options'][1])
{
   json.Abilities.Strength -= 4;
   json.Advantages.push({
      "name": "Improved Initiative",
      "rank": 2
   });
   json.Powers.push({
      "effect": "Damage",
      "text": "Unique Weapon",
      "action": "Standard",
      "range": "Close",
      "duration": "Instant",
      "name": "Unique Weapon",
      "skill": "(Choose something)",
      "Modifiers": [
         {
            "name": "Penetrating",
            "applications": 3
         },
         {
            "name": "Easily Removable",
            "text": "(Choose something)"
         },
         {
            "name": "Other Free Modifier",
            "text": "Strength-based"
         }
      ],
      "rank": 4
   });
}
//1 === else is default (no changes)
