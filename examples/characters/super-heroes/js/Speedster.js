<<<<<<< HEAD
var knowledge = '(Choose One)';
if(undefined !== queryParameters['names'][0]) knowledge = queryParameters['names'][0];
=======
var expertise = '(Choose One)';
if (undefined !== queryParameters.strings[0]) expertise = queryParameters.strings[0];
>>>>>>> gh-pages

var json = {
   "Hero": {
      "name": "Speedster",
      "transcendence": 0,
      "image": "../images/Speedster.jpg"
   },
   "Abilities": {
      "Strength": 2,
      "Agility": 4,
      "Fighting": 9,
      "Dexterity": 3,
      "Stamina": 2,
      "Intellect": 0,
      "Awareness": 1,
      "Presence": 2
   },
   "Powers": [
      {
         "effect": "Damage",
<<<<<<< HEAD
         "text": "Fast Attack. Total of Damage 9 by default",
=======
         "text": "Fast Attack. Total of Damage 10 by default",
>>>>>>> gh-pages
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
<<<<<<< HEAD
         "rank": 7
=======
         "rank": 8
>>>>>>> gh-pages
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
<<<<<<< HEAD
         "rank": 6
=======
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
>>>>>>> gh-pages
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
<<<<<<< HEAD
         "text": "Ground Speed 15: 95,000 MPH",
=======
         "text": "Ground Speed 10: 3,000 MPH",
>>>>>>> gh-pages
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
         "name": "Beginner's Luck"
      },
      {
         "name": "Defensive Roll",
         "rank": 3
      },
      {
         "name": "Evasion",
         "rank": 2
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
      },
      {
         "name": "Seize Initiative"
      }
   ],
   "Skills": [
      {
         "name": "Acrobatics",
         "rank": "Trained"
      },
      {
         "name": "Close Combat",
         "subtype": "Unarmed",
         "rank": "Trained"
      },
      {
         "name": "Deception",
         "rank": "Trained"
      },
      {
         "name": "Knowledge",
         "subtype": knowledge,
         "rank": "Trained"
      },
      {
         "name": "Sleight of Hand",
         "rank": "Trained"
      }
   ],
   "Defenses": {
<<<<<<< HEAD
      "Dodge": 11,
=======
      "Dodge": 6,
>>>>>>> gh-pages
      "Parry": 6,
      "Will": 8,
      "Fortitude": 8
   },
<<<<<<< HEAD
   "ruleset": "4.0",
=======
   "ruleset": "3.16",
>>>>>>> gh-pages
   "version": 2,
   "Information": "Complications, background and other information"
};
