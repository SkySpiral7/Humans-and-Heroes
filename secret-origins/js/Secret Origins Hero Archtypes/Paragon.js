var expertise = '(Choose One)';
if(undefined !== queryParameters['names'][0]) expertise = queryParameters['names'][0];

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
      "Awareness": 1,
      "Stamina": 12,
      "Dexterity": 3,
      "Intellect": 0,
      "Presence": 1
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
         "rank": 7
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
         "text": "Lifting Str 14; 400 tons",
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
         "name": "Expertise",
         "subtype": expertise,
         "rank": 7,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 8,
         "ability": "Awareness"
      },
      {
         "name": "Perception",
         "rank": 8,
         "ability": "Awareness"
      },
      {
         "name": "Persuasion",
         "rank": 6,
         "ability": "Presence"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Throwing",
         "rank": 5,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 5,
      "Fortitude": 0,
      "Parry": 0,
      "Will": 7
   },
   "ruleset": "3.10",
   "version": 2,
   "Information": "Complications, background and other information"
};
