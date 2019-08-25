var json = {
   "Hero": {
      "name": "Powerhouse",
      "transcendence": 0,
      "image": "../images/Powerhouse.jpg"
   },
   "Abilities": {
      "Strength": 12,
      "Agility": 0,
      "Fighting": 7,
      "Dexterity": 7,
      "Stamina": 13,
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
         "name": "Athletics",
         "rank": "Mastered"
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
      "Dodge": 5,
      "Parry": 0,
      "Will": 5,
      "Fortitude": 0
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
