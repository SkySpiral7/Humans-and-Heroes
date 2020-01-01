var expertise = '(Choose One)';
if (undefined !== queryParameters.strings[0]) expertise = queryParameters.strings[0];

var json = {
   "Hero": {
      "name": "Mimic",
      "transcendence": 0,
      "image": "../images/Mimic.jpg"
   },
   "Abilities": {
      "Strength": 1,
      "Agility": 1,
      "Fighting": 1,
      "Dexterity": 1,
      "Stamina": 1,
      "Intellect": 1,
      "Awareness": 1,
      "Presence": 1
   },
   "Powers": [
      {
         "effect": "Variable",
         "text": "Mimic: 50 variable points for duplicating a subject's traits",
         "action": "Move",
         "range": "Personal",
         "duration": "Continuous",
         "Modifiers": [
            {
               "name": "Faster Action",
               "applications": 2
            },
            {
               "name": "Increased Duration",
               "applications": 1
            },
            {
               "name": "Limited",
               "applications": 1,
               "text": "to One Subject at a time"
            },
            {
               "name": "Other Free Modifier",
               "text": "Limited to subjects he can remember seeing with Power Sense (-0)"
            }
         ],
         "rank": 10
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Power Sense: Detect Powers (Vision)",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Other Flat Extra",
               "applications": 4,
               "text": "Accurate (2), Analytical (1), Acute (1)"
            }
         ],
         "rank": 1
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Jack of All Trades"
      },
      {
         "name": "Seize Initiative"
      },
      {
         "name": "Defensive Roll",
         "rank": 1
      }
   ],
   "Skills": [
      {
         "name": "Deception",
         "subtype": "",
         "rank": 6,
         "ability": "Presence"
      },
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 8,
         "ability": "Awareness"
      },
      {
         "name": "Perception",
         "rank": 6,
         "ability": "Awareness"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Parry": 6,
      "Will": 6,
      "Fortitude": 6
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": "Complications, background and other information"
};
