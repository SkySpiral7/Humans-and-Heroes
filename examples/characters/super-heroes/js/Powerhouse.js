<<<<<<< HEAD
=======
var expertise = '(Choose One)';
if (undefined !== queryParameters.strings[0]) expertise = queryParameters.strings[0];

>>>>>>> gh-pages
var json = {
   "Hero": {
      "name": "Powerhouse",
      "transcendence": 0,
      "image": "../images/Powerhouse.jpg"
   },
   "Abilities": {
<<<<<<< HEAD
      "Strength": 12,
      "Agility": 0,
      "Fighting": 7,
      "Dexterity": 7,
      "Stamina": 13,
=======
      "Strength": 10,
      "Agility": 1,
      "Fighting": 6,
      "Dexterity": 1,
      "Stamina": 10,
>>>>>>> gh-pages
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
         "text": "960 feet",
         "action": "Move",
         "range": "Personal",
         "duration": "Instant",
         "Modifiers": [],
         "rank": 7
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
         "text": "Impervious Toughness 5",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 5
      },
      {
         "effect": "Enhanced Trait",
         "cost": 2,
         "text": "Power Lifting: Enhanced Strength 6. Lifting Str 16; 1,600 tons",
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
         "rank": 6
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
<<<<<<< HEAD
         "name": "Athletics",
         "rank": "Mastered"
=======
         "name": "Close Combat",
         "subtype": "Unarmed",
         "rank": 4,
         "ability": "Fighting"
      },
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 6,
         "ability": "Intellect"
>>>>>>> gh-pages
      },
      {
         "name": "Close Combat",
         "subtype": "Unarmed",
         "rank": "Trained"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Throwing",
         "rank": "Trained"
      }
   ],
   "Defenses": {
      "Dodge": 9,
      "Parry": 4,
      "Will": 8,
      "Fortitude": 0
   },
<<<<<<< HEAD
   "ruleset": "4.0",
=======
   "ruleset": "3.16",
>>>>>>> gh-pages
   "version": 2,
   "Information": "Complications, background and other information"
};
