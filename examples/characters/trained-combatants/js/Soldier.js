var json = {
   "Hero": {
      "name": "Soldier",
      "transcendence": 0,
      "image": "../images/Sirocco.png"
   },
   "Abilities": {
      "Strength": 1,
      "Agility": 1,
      "Fighting": 5,
      "Dexterity": 1,
      "Stamina": 2,
      "Intellect": 0,
      "Awareness": 0,
      "Presence": 0
   },
   "Powers": [],
   "Equipment": [
      {
         "effect": "Damage",
         "text": "",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Assault rifle",
         "skill": "Rifles",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {"name": "Multiattack"}
         ],
         "rank": 5
      },
      {
         "effect": "Protection",
         "text": "body armor",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 3
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "17 points of other equipment",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 17
      }
   ],
   "Advantages": [
      {
         "name": "Equipment",
         "rank": 7
      }
   ],
   "Skills": [
      {
         "name": "Ranged Combat",
         "subtype": "Rifles",
         "rank": 4,
         "ability": "Dexterity"
      },
      {
         "name": "Athletics",
         "subtype": "",
         "rank": 4,
         "ability": "Strength"
      },
      {
         "name": "Expertise",
         "subtype": "Soldier",
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Strategy",
         "subtype": "Military",
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Intimidation",
         "subtype": "",
         "rank": 2,
         "ability": "Presence"
      },
      {
         "name": "Perception",
         "rank": 2,
         "ability": "Awareness"
      },
      {
         "name": "Vehicles",
         "subtype": "",
         "rank": 2,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 4,
      "Parry": 0,
      "Will": 1,
      "Fortitude": 3
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": ""
};
