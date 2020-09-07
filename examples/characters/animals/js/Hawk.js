var json = {
   "Hero": {
      "name": "Hawk",
      "transcendence": 0,
      "image": "../images/Sirocco.png"
   },
   "Abilities": {
      "Strength": 0,
      "Agility": 3,
      "Fighting": 3,
      "Dexterity": 0,
      "Stamina": 0,
      "Intellect": -4,
      "Awareness": 2,
      "Presence": 0
   },
   "Powers": [
      {
         "effect": "Flight",
         "text": "30 MPH",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Other Rank Flaw",
               "applications": 1,
               "text": "Wings"
            }
         ],
         "rank": 4
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Extended Vision",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Low-light Vision",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Shrinking",
         "text": "-2 strength and -2 stamina not included above",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Increased Duration",
               "applications": 2
            },
            {"name": "Innate"}
         ],
         "rank": 2
      }
   ],
   "Equipment": [],
   "Advantages": [],
   "Skills": [
      {
         "name": "Perception",
         "rank": 6,
         "ability": "Awareness"
      }
   ],
   "Defenses": {
      "Dodge": 2,
      "Parry": 2,
      "Will": 2,
      "Fortitude": 4
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": ""
};
