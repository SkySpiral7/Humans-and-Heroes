var json = {
   "Hero": {
      "name": "Shapeshifter",
      "transcendence": 0,
      "image": "../images/Shapeshifter.jpg"
   },
   "Abilities": {
      "Strength": 1,
      "Agility": 2,
      "Fighting": 9,
      "Dexterity": 1,
      "Stamina": 2,
      "Intellect": 2,
      "Awareness": 2,
      "Presence": 3
   },
   "Powers": [
      {
         "effect": "Variable",
         "text": "Shapeshift: 40 variable points for assuming different animals",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Faster Action",
               "applications": 2
            }
         ],
         "rank": 8
      },
      {
         "effect": "Morph",
         "text": "",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Slower Action",
               "applications": 1
            },
            {
               "name": "Linked",
               "text": "With above"
            }
         ],
         "rank": 3
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Defensive Roll",
         "rank": 3
      }
   ],
   "Skills": [
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
         "name": "Handle Animal",
         "rank": "Mastered"
      },
      {
         "name": "Knowledge",
         "subtype": "Nature",
         "rank": "Trained"
      },
      {
         "name": "Perception",
         "rank": "Trained"
      },
      {
         "name": "Stealth",
         "rank": "Trained"
      },
      {
         "name": "Survival",
         "rank": "Mastered"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Parry": 2,
      "Will": 6,
      "Fortitude": 6
   },
<<<<<<< HEAD
   "ruleset": "4.0",
=======
   "ruleset": "3.16",
>>>>>>> gh-pages
   "version": 2,
   "Information": "Complications, background and other information"
};
