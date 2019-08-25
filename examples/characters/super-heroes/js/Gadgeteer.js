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
      "Dexterity": 7,
      "Stamina": 0,
      "Intellect": 9,
      "Awareness": 5,
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
         "action": "Move",
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
         "text": "Quick-Thinking. 6 and a half minutes of thought in 6 seconds",
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
         "rank": 6
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
         "rank": 3
      },
      {
         "name": "Perfect Memory"
      },
      {
         "name": "Skill Mastery",
         "text": "Technology"
      }
   ],
   "Skills": [
      {
         "name": "Engineering",
         "subtype": "Mechanical",
         "rank": "Mastered"
      },
      {
         "name": "Investigation",
         "rank": "Trained"
      },
      {
         "name": "Medical",
         "rank": "Trained"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Blaster",
         "rank": "Trained"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Parry": 3,
      "Will": 7,
      "Fortitude": 6
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};
