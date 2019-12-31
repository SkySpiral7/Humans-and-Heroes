var json = {
   "Hero": {
      "name": "Shark",
      "transcendence": 0,
      "image": "../images/Sirocco.png"
   },
   "Abilities": {
      "Strength": 2,
      "Agility": 2,
      "Fighting": 4,
      "Dexterity": 1,
      "Stamina": 1,
      "Intellect": -4,
      "Awareness": 1,
      "Presence": -4
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Bite",
         "skill": "Bite",
         "Modifiers": [
            {
               "name": "Other Free Modifier",
               "text": "Strength-based"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Protection",
         "text": "Scales",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 3
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Low-Light Vision",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Acute Normal Smell",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Movement",
         "cost": 1,
         "text": "Swimming (8 MPH)",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 4
      }
   ],
   "Equipment": [],
   "Advantages": [
      {"name": "All-out Attack"},
      {"name": "Power Attack"}
   ],
   "Skills": [
      {
         "name": "Athletics",
         "subtype": "",
         "rank": 4,
         "ability": "Strength"
      },
      {
         "name": "Close Combat",
         "subtype": "Bite",
         "rank": 1,
         "ability": "Fighting"
      },
      {
         "name": "Perception",
         "rank": 5,
         "ability": "Awareness"
      }
   ],
   "Defenses": {
      "Dodge": 2,
      "Parry": 0,
      "Will": 7,
      "Fortitude": 4
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": ""
};
