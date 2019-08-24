var energyType = 'Energy';
if(undefined !== queryParameters['names'][0]) energyType = queryParameters['names'][0];

var json = {
   "Hero": {
      "name": "Energy Controller",
      "transcendence": 0,
      "image": "../images/Energy-Controller.jpg"
   },
   "Abilities": {
      "Strength": 1,
      "Agility": 4,
      "Fighting": 4,
      "Dexterity": 7,
      "Stamina": 2,
      "Intellect": 0,
      "Awareness": 2,
      "Presence": 2
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": energyType + " Aura",
         "action": "Reaction",
         "range": "Close",
         "duration": "Instant",
         "name": energyType + " Aura",
         "Modifiers": [
            {
               "name": "Aura"
            },
            {
               "name": "Selective"
            }
         ],
         "rank": 3
      },
      {
         "effect": "Damage",
         "text": energyType + " Creation",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": energyType + " Creation",
         "skill": energyType + " Control",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            }
         ],
         "rank": 12
      },
      {
         "effect": "Nullify",
         "text": energyType + " Negation",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": energyType + " Negation",
         "skill": energyType + " Control",
         "Modifiers": [],
         "rank": 2
      },
      {
         "effect": "Resistance",
         "text": energyType + " Resistance",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 2
      },
      {
         "effect": "Flight",
         "text": "120 MPH",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 6
      },
      {
         "effect": "Protection",
         "text": "Force Field",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Decreased Duration",
               "applications": 2
            },
            {
               "name": "Impervious",
               "applications": 5
            }
         ],
         "rank": 10
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Quick Change: transform into costume",
         "action": "Free",
         "range": "Personal",
         "duration": "Instant",
         "Modifiers": [],
         "rank": 1
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
         "name": "Power Attack"
      }
   ],
   "Skills": [
      {
         "name": "Acrobatics",
         "rank": "Trained"
      },
      {
         "name": "Insight",
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
         "subtype": "Energy Control",
         "rank": "Mastered"
      },
      {
         "name": "Sleight of Hand",
         "rank": "Trained"
      }
   ],
   "Defenses": {
      "Dodge": 4,
      "Parry": 0,
      "Will": 6,
      "Fortitude": 5
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
