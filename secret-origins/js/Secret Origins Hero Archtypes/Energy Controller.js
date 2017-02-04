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
      "Awareness": 2,
      "Stamina": 2,
      "Dexterity": 3,
      "Intellect": 0,
      "Presence": 2
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "Energy Aura",
         "action": "Reaction",
         "range": "Close",
         "duration": "Instant",
         "name": "Energy Aura",
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
         "text": "Energy Creation",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Energy Creation",
         "skill": "Energy Control",
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
         "text": "Energy Negation of Energy type",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Energy Negation",
         "skill": "Energy Control",
         "Modifiers": [],
         "rank": 2
      },
      {
         "effect": "Resistance",
         "text": "Energy Resistance from Energy type",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 2
      },
      {
         "effect": "Flight",
         "text": "120 MPH",
         "action": "Free",
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
         "subtype": "",
         "rank": 6,
         "ability": "Agility"
      },
      {
         "name": "Other",
         "subtype": "Demoralize",
         "rank": 7,
         "ability": "Presence"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Perception",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Persuasion",
         "rank": 4,
         "ability": "Presence"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Energy Control",
         "rank": 5,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 4,
      "Fortitude": 5,
      "Parry": 0,
      "Will": 6
   },
   "ruleset": "3.4",
   "version": 2,
   "Information": "Complications, background and other information"
};
