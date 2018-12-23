var expertise = '(Choose One)';
if(undefined !== queryParameters['names'][0]) expertise = queryParameters['names'][0];

var json = {
   "Hero": {
      "name": "Powerhouse",
      "transcendence": 0,
      "image": "../images/Powerhouse.jpg"
   },
   "Abilities": {
      "Strength": 12,
      "Agility": 1,
      "Fighting": 6,
      "Dexterity": 1,
      "Stamina": 14,
      "Intellect": 0,
      "Awareness": 1,
      "Presence": 1
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "Shockwave",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Shockwave",
         "skill": "Unarmed",
         "Modifiers": [
            {
               "name": "Area",
               "applications": 1,
               "text": "Burst"
            },
            {
               "name": "Limited",
               "applications": 1,
               "text": "Both the Powerhouse and its targets must be in contact with the ground"
            }
         ],
         "rank": 10
      },
      {
         "effect": "Leaping",
         "text": "120 feet",
         "action": "Move",
         "range": "Personal",
         "duration": "Instant",
         "Modifiers": [],
         "rank": 4
      },
      {
         "effect": "Regeneration",
         "text": "1 HP every other round",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 5
      },
      {
         "effect": "Immunity",
         "text": "From natural cold",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Immunity",
         "text": "From natural heat",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Immunity",
         "text": "Pressure",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Feature",
         "cost": 2,
         "text": "Impervious Toughness 6",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 6
      },
      {
         "effect": "Enhanced Trait",
         "cost": 2,
         "text": "Power Lifting: Enhanced Trait 4. Lifting Str 16; 1,600 tons",
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
         "rank": 4
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "All-out Attack"
      },
      {
         "name": "Power Attack"
      },
      {
         "name": "Ultimate Effort",
         "text": "Toughness checks"
      }
   ],
   "Skills": [
      {
         "name": "Close Combat",
         "subtype": "Unarmed",
         "rank": 2,
         "ability": "Fighting"
      },
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 6,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 5,
         "ability": "Awareness"
      },
      {
         "name": "Intimidation",
         "subtype": "",
         "rank": 7,
         "ability": "Presence"
      },
      {
         "name": "Perception",
         "rank": 7,
         "ability": "Awareness"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Throwing",
         "rank": 7,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 5,
      "Parry": 0,
      "Will": 5,
      "Fortitude": 0
   },
   "ruleset": "3.11",
   "version": 2,
   "Information": "Complications, background and other information"
};
