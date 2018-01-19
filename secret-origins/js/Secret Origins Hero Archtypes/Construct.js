var rangedAttackName = '(Name of Ranged Attack)';
if(undefined !== queryParameters['names'][0]) rangedAttackName = queryParameters['names'][0];

var json = {
   "Hero": {
      "name": "Construct",
      "transcendence": 0,
      "image": "../images/Construct.jpg"
   },
   "Abilities": {
      "Strength": 6,
      "Agility": 3,
      "Fighting": 5,
      "Awareness": 1,
      "Stamina": "--",
      "Dexterity": 3,
      "Intellect": 5,
      "Presence": 0
   },
   "Powers": [
      {
         "effect": "Protection",
         "text": "Armored",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Impervious",
               "applications": 3
            }
         ],
         "rank": 11
      }
   ],
   "Equipment": [],
   "Advantages": [],
   "Skills": [
      {
         "name": "Ranged Combat",
         "subtype": rangedAttackName,
         "rank": 5,
         "ability": "Dexterity"
      },
      {
         "name": "Memory",
         "rank": 5,
         "ability": "Intellect"
      },
      {
         "name": "Investigation",
         "subtype": "",
         "rank": 2,
         "ability": "Intellect"
      },
      {
         "name": "Perception",
         "rank": 5,
         "ability": "Awareness"
      },
      {
         "name": "Persuasion",
         "rank": 4,
         "ability": "Presence"
      },
      {
         "name": "Technology",
         "subtype": "",
         "rank": 5,
         "ability": "Intellect"
      },
      {
         "name": "Vehicles",
         "subtype": "",
         "rank": 2,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Fortitude": 8,
      "Parry": 0,
      "Will": 9
   },
   "ruleset": "3.0",
   "version": 2,
   "Information": "Complications, background and other information"
};



if('3' === queryParameters['options'][0]) json.Powers = json.Powers.concat([
   {
      "effect": "Immortality",
      "text": "Undead Revenant Option",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Regeneration",
      "text": "Undead Revenant Option",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 5
   }
]);
else if('4' === queryParameters['options'][0]) json.Powers.push({
   "effect": "Insubstantial",
   "text": "Wraith Option",
   "action": "Free",
   "range": "Personal",
   "duration": "Sustained",
   "Modifiers": [],
   "rank": 4
});
else
{
   var text = ('2' === queryParameters['options'][0]) ?
      'Soldier Option (built-in weapon)' :
      'Elemental Option (See Elemental Control)';
   json.Powers.push({
      "effect": "Damage",
      "text": text,
      "action": "Standard",
      "range": "Ranged",
      "duration": "Instant",
      "name": rangedAttackName,
      "skill": rangedAttackName,
      "Modifiers": [
         {
            "name": "Increased Range",
            "applications": 1
         }
      ],
      "rank": 10
   });
}
