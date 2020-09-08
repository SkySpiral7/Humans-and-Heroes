var knowledge = '(Choose One)';
if (undefined !== queryParameters.strings[0]) knowledge = queryParameters.strings[0];

var json = {
   "Hero": {
      "name": "Paragon",
      "transcendence": 0,
      "image": "../images/Paragon.jpg"
   },
   "Abilities": {
      "Strength": 10,
      "Agility": 3,
      "Fighting": 10,
      "Dexterity": 7,
      "Stamina": 10,
      "Intellect": 0,
      "Awareness": 1,
      "Presence": 5
   },
   "Powers": [
      {
         "effect": "Flight",
         "text": "500 MPH",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 8
      },
      {
         "effect": "Immunity",
         "text": "Life Support",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 6
      },
      {
         "effect": "Immunity",
         "text": "Age",
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
         "effect": "Quickness",
         "text": "1 minute task within 6 seconds",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 3
      },
      {
         "effect": "Enhanced Trait",
         "cost": 2,
         "text": "Power Lifting: Enhanced Strength 4. Lifting Str 14; 410 tons",
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
      }
   ],
   "Skills": [
      {
         "name": "Insight",
         "rank": "Trained"
      },
      {
         "name": "Knowledge",
         "subtype": knowledge,
         "rank": "Trained"
      },
      {
         "name": "Persuasion",
         "rank": "Trained"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Throwing",
         "rank": "Trained"
      }
   ],
   "Defenses": {
      "Dodge": 7,
      "Parry": 0,
      "Will": 5,
      "Fortitude": 0
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
