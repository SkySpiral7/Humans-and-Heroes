var json = {
   "Hero": {
      "name": "Shapeshifter",
      "transcendence": 0,
      "image": "../images/Shapeshifter.jpg"
   },
   "Abilities": {
      "Strength": 1,
      "Agility": 2,
      "Fighting": 6,
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
         "rank": 4,
         "ability": "Fighting"
      },
      {
         "name": "Deception",
         "subtype": "",
         "rank": 6,
         "ability": "Presence"
      },
      {
         "name": "Expertise",
         "subtype": "Zoology",
         "rank": 6,
         "ability": "Intellect"
      },
      {
         "name": "Perception",
         "rank": 6,
         "ability": "Awareness"
      },
      {
         "name": "Stealth",
         "subtype": "",
         "rank": 8,
         "ability": "Agility"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Parry": 2,
      "Will": 6,
      "Fortitude": 6
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": "Complications, background and other information"
};
