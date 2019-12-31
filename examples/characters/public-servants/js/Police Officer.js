var json = {
   "Hero": {
      "name": "Police Officer",
      "transcendence": 0,
      "image": "../images/Sirocco.png"
   },
   "Abilities": {
      "Strength": 2,
      "Agility": 1,
      "Fighting": 3,
      "Dexterity": 1,
      "Stamina": 2,
      "Intellect": 0,
      "Awareness": 1,
      "Presence": 1
   },
   "Powers": [],
   "Equipment": [
      {
         "effect": "Protection",
         "text": "Bulletproof Vest",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Limited",
               "applications": 1,
               "text": "Only against Ballistic"
            },
            {
               "name": "Subtle",
               "applications": 1,
               "text": ""
            }
         ],
         "rank": 4
      },
      {
         "effect": "Damage",
         "text": "",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Light Pistol",
         "skill": "Pistols",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            }
         ],
         "rank": 3
      },
      {
         "effect": "Damage",
         "text": "bludgeoning",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Police Baton",
         "skill": "Clubs",
         "Modifiers": [],
         "rank": 2
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "cell phone, handcuffs",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 2
      }
   ],
   "Advantages": [
      {
         "name": "Equipment",
         "rank": 3
      }
   ],
   "Skills": [
      {
         "name": "Athletics",
         "subtype": "",
         "rank": 3,
         "ability": "Strength"
      },
      {
         "name": "Knowledge",
         "subtype": "Current Events",
         "rank": 2,
         "ability": "Intellect"
      },
      {
         "name": "Expertise",
         "subtype": "Streetwise",
         "rank": 3,
         "ability": "Intellect"
      },
      {
         "name": "Expertise",
         "subtype": "Police Officer",
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Intimidation",
         "subtype": "",
         "rank": 2,
         "ability": "Presence"
      },
      {
         "name": "Investigation",
         "subtype": "",
         "rank": 2,
         "ability": "Intellect"
      },
      {
         "name": "Perception",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Pistols",
         "rank": 4,
         "ability": "Dexterity"
      },
      {
         "name": "Treatment",
         "subtype": "",
         "rank": 2,
         "ability": "Intellect"
      },
      {
         "name": "Vehicles",
         "subtype": "",
         "rank": 4,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 1,
      "Parry": 1,
      "Will": 1,
      "Fortitude": 2
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": ""
};
