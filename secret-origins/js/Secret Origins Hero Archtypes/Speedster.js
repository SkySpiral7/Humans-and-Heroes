var json = {
   "Hero": {
      "name": "Speedster",
      "transcendence": 0,
      "image": "../images/Speedster.jpg"
   },
   "Abilities": {
      "Strength": 2,
      "Agility": 4,
      "Fighting": 4,
      "Awareness": 1,
      "Stamina": 2,
      "Dexterity": 3,
      "Intellect": 0,
      "Presence": 2
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "Fast Attack. Total of Damage 8 by default",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Fast Attack",
         "skill": "Unarmed",
         "Modifiers": [
            {
               "name": "Other Free Modifier",
               "text": "Strength-based"
            },
            {
               "name": "Multiattack"
            },
            {
               "name": "Selective"
            }
         ],
         "rank": 6
      },
      {
         "effect": "Damage",
         "text": "Cyclone",
         "action": "Full",
         "range": "Close",
         "duration": "Instant",
         "name": "Cyclone",
         "skill": "Cyclone",
         "Modifiers": [
            {
               "name": "Slower Action",
               "applications": 1
            },
            {
               "name": "Area",
               "applications": 1,
               "text": "Cylinder: 30 ft radius and height"
            },
            {
               "name": "Limited",
               "applications": 1,
               "text": "Always points straight up"
            }
         ],
         "rank": 2
      },
      {
         "effect": "Quickness",
         "text": "",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 10
      },
      {
         "effect": "Movement",
         "cost": 1,
         "text": "Gound Speed 15: 64,000 MPH",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 15
      },
      {
         "effect": "Movement",
         "cost": 2,
         "text": "Run On Water. Movement 1: Water Walking",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Limited",
               "applications": 1,
               "text": "Only while running"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Movement",
         "cost": 2,
         "text": "Run Up Walls. Movement 2: Wall Crawling",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Limited",
               "applications": 1,
               "text": "Only while running"
            }
         ],
         "rank": 2
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Defensive Roll",
         "rank": 3
      },
      {
         "name": "Improved Initiative",
         "rank": 5
      },
      {
         "name": "Instant Up"
      },
      {
         "name": "Move-by Action"
      }
   ],
   "Skills": [
      {
         "name": "Acrobatics",
         "subtype": "",
         "rank": 4,
         "ability": "Agility"
      },
      {
         "name": "Athletics",
         "subtype": "",
         "rank": 8,
         "ability": "Strength"
      },
      {
         "name": "Close Combat",
         "subtype": "Unarmed",
         "rank": 6,
         "ability": "Fighting"
      },
      {
         "name": "Deception",
         "subtype": "",
         "rank": 3,
         "ability": "Presence"
      },
      {
         "name": "Expertise",
         "subtype": "(Choose One)",
         "rank": 6,
         "ability": "Intellect"
      },
      {
         "name": "Perception",
         "rank": 8,
         "ability": "Awareness"
      },
      {
         "name": "Technology",
         "subtype": "",
         "rank": 3,
         "ability": "Intellect"
      }
   ],
   "Defenses": {
      "Dodge": 11,
      "Fortitude": 8,
      "Parry": 11,
      "Will": 8
   },
   "ruleset": "3.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
