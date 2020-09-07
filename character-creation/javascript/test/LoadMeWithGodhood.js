//This file has a lot of examples rows in order to see how the form looks
var json = {
   "Hero": {
      "name": "Hero Name",
      "transcendence": 1,
      "image": "../images/Sirocco.png"
   },
   "Abilities": {
      "Strength": 0,
      "Agility": 500,
      "Fighting": 0,
      "Dexterity": 0,
      "Stamina": 0,
      "Intellect": 0,
      "Awareness": 0,
      "Presence": 0
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "Descriptors and other text",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Power 1 Damage",
         "skill": "Skill used for attack",
         "Modifiers": [
            {
               "name": "Area",
               "applications": 1,
               "text": "Shape"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Descriptors and other text",
         "action": "Free",
         "range": "Ranged",
         "duration": "Sustained",
         "name": "Power 2 Senses",
         "skill": "Skill used for attack",
         "Modifiers": [
            {"name": "Increased Range", "applications": 1},
            {"name": "Attack"},
            {"name": "Removable", "text": "Type of item"}
         ],
         "rank": 1
      },
      {
         "effect": "Flight",
         "text": "Descriptors and other text",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [{"name": "Increased Duration", "applications": 2}],
         "rank": 1
      }
   ],
   "Equipment": [
      {
         "effect": "Communication",
         "text": "Descriptors and other text",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 1
      }
   ],
   "Advantages": [
      {"name": "Equipment", "rank": 1},
      {"name": "Benefit", "rank": 1, "text": "Advantage Subtype"},
      {"name": "Persistent Information"},
      {"name": "Lucky", "rank": 1},
      {"name": "Ultimate Effort", "text": "Advantage Subtype"},
      {"name": "Your Petty Rules Don't Apply to Me"}
   ],
   "Skills": [{"name": "Common Knowledge", "subtype": "Skill Subtype", "rank": 1, "ability": "Fighting"}],
   "Defenses": {
      "Dodge": 0,
      "Parry": 0,
      "Will": 0,
      "Fortitude": 0
   },
   "ruleset": "3.13",
   "version": 2,
   "Information": ""
};
