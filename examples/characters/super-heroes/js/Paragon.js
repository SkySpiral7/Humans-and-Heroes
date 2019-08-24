var knowledge = '(Choose One)';
if(undefined !== queryParameters['names'][0]) knowledge = queryParameters['names'][0];

var json = {
   "Hero": {
      "name": "Paragon",
      "transcendence": 0,
      "image": "../images/Paragon.jpg"
   },
   "Abilities": {
      "Strength": 12,
      "Agility": 3,
      "Fighting": 8,
      "Dexterity": 7,
      "Stamina": 12,
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
         "text": "Impervious Toughness 6",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 6
      },
      {
         "effect": "Quickness",
         "text": "",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 3
      },
      {
         "effect": "Enhanced Trait",
         "cost": 2,
         "text": "Lifting Str 14; 410 tons",
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
         "name": "Perception",
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
      "Dodge": 5,
      "Parry": 0,
      "Will": 3,
      "Fortitude": 0
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
