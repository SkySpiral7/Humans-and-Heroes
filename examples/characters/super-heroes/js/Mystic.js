var json = {
   "Hero": {
      "name": "Mystic",
      "transcendence": 0,
      "image": "../images/Mystic.jpg"
   },
   "Abilities": {
      "Strength": 0,
      "Agility": 1,
      "Fighting": 4,
      "Dexterity": 3,
      "Stamina": 0,
      "Intellect": 3,
      "Awareness": 6,
      "Presence": 4
   },
   "Powers": [
      {
         "effect": "Remote Sensing",
         "cost": 3,
         "text": "Astral Projection: visual, auditory, mental. up to 960 feet away",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Limited",
               "applications": 1,
               "text": "physical body is defenseless during the use of this power"
            },
            {
               "name": "Subtle",
               "applications": 2,
               "text": ""
            }
         ],
         "rank": 6
      },
      {
         "effect": "Flight",
         "text": "Levitation: 30 MPH",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 4
      },
      {
         "effect": "Protection",
         "text": "Protection charm",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Impervious",
               "applications": 3
            }
         ],
         "rank": 9
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Magical Awareness (Mental)",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Other Flat Extra",
               "applications": 1,
               "text": "Radius"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Damage",
         "text": "Spellcasting",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Spellcasting",
         "skill": "Spellcasting",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            }
         ],
         "rank": 10
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Trance",
         "action": "Full",
         "range": "Personal",
         "duration": "Concentration",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Healing",
         "text": "Heal Spell",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "Modifiers": [],
         "rank": 5
      }
   ],
   "Equipment": [],
   "Advantages": [],
   "Skills": [
      {
         "name": "Expertise",
         "subtype": "Wizardry",
         "rank": 10,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 6,
         "ability": "Awareness"
      },
      {
         "name": "Intimidation",
         "subtype": "",
         "rank": 4,
         "ability": "Presence"
      },
      {
         "name": "Perception",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Sleight of Hand",
         "subtype": "",
         "rank": 4,
         "ability": "Dexterity"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Spellcasting",
         "rank": 6,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 7,
      "Parry": 2,
      "Will": 6,
      "Fortitude": 6
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": "Complications, background and other information"
};
