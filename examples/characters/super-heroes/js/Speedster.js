var expertise = '(Choose One)';
if (undefined !== queryParameters.strings[0]) expertise = queryParameters.strings[0];

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
      "Dexterity": 3,
      "Stamina": 2,
      "Intellect": 0,
      "Awareness": 1,
      "Presence": 2
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "Fast Attack. Total of Damage 10 by default",
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
         "rank": 8
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
         "rank": 10
      },
      {
         "effect": "Protection",
         "text": "Anti-kinetic barrier",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 5
      },
      {
         "effect": "Quickness",
         "text": "2 hour task in 6 seconds",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 10
      },
      {
         "effect": "Movement",
         "cost": 1,
         "text": "Ground Speed 10: 3,000 MPH",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 10
      },
      {
         "effect": "Movement",
         "cost": 2,
         "text": "Run On Water. Movement 1: Water Walking",
         "action": "Move",
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
         "action": "Move",
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
         "subtype": expertise,
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
      "Dodge": 6,
      "Parry": 6,
      "Will": 8,
      "Fortitude": 8
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": "Complications, background and other information"
};
