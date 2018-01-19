var json = {
   "Hero": {
      "name": "Gadgeteer",
      "transcendence": 0,
      "image": "../images/Gadgeteer.jpg"
   },
   "Abilities": {
      "Strength": 0,
      "Agility": 1,
      "Fighting": 4,
      "Awareness": 5,
      "Stamina": 0,
      "Dexterity": 3,
      "Intellect": 8,
      "Presence": 0
   },
   "Powers": [
      {
         "effect": "Damage",
         "text": "Blaster",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Blaster Hurt",
         "skill": "Blaster",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Other Flat Flaw",
               "applications": 14,
               "text": "Easily Removable. Can't use the actual flaw because this calculator can't include alternate effects"
            }
         ],
         "rank": 12
      },
      {
         "effect": "Affliction",
         "text": "Fortitude Visual Dazzle (Impaired, Disabled, Unaware)",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Blaster Stun",
         "skill": "Blaster",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Alternate Effect",
               "text": "to Blaster"
            },
            {
               "name": "Other Rank Extra",
               "applications": 1,
               "text": "Cumulative"
            }
         ],
         "rank": 7
      },
      {
         "effect": "Protection",
         "text": "Force Shield Belt",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Decreased Duration",
               "applications": 2
            },
            {
               "name": "Impervious",
               "applications": 5
            },
            {
               "name": "Removable",
               "text": "Belt"
            }
         ],
         "rank": 10
      },
      {
         "effect": "Flight",
         "text": "Jet-Pack. 60 MPH",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Removable",
               "text": "Like a Back-back"
            }
         ],
         "rank": 5
      },
      {
         "effect": "Quickness",
         "text": "Quick-Thinking",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Limited",
               "applications": 1,
               "text": "only for Mental Tasks"
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
         "rank": 2
      },
      {
         "name": "Improved Initiative",
         "rank": 1
      },
      {
         "name": "Improvised Tools"
      },
      {
         "name": "Inspire"
      },
      {
         "name": "Lucky",
         "rank": 1
      },
      {
         "name": "Skill Mastery",
         "text": "Technology"
      }
   ],
   "Skills": [
      {
         "name": "Expertise",
         "subtype": "Engineering",
         "rank": 5,
         "ability": "Intellect"
      },
      {
         "name": "Expertise",
         "subtype": "Science",
         "rank": 10,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 5,
         "ability": "Awareness"
      },
      {
         "name": "Investigation",
         "subtype": "",
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Perception",
         "rank": 5,
         "ability": "Awareness"
      },
      {
         "name": "Technology",
         "subtype": "",
         "rank": 10,
         "ability": "Intellect"
      },
      {
         "name": "Vehicles",
         "subtype": "",
         "rank": 5,
         "ability": "Dexterity"
      },
      {
         "name": "Memory",
         "rank": 4,
         "ability": "Intellect"
      },
      {
         "name": "Other",
         "subtype": "Inventor",
         "rank": 3,
         "ability": "Intellect"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Blaster",
         "rank": 5,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Fortitude": 6,
      "Parry": 3,
      "Will": 7
   },
   "ruleset": "3.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
