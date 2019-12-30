var expertise = 'Business';
if (undefined !== queryParameters.options[0])
{
   var optionIndex = queryParameters.options[0] - 1;
   expertise = ['Business', 'Engineering', 'Science'][optionIndex];
}

var json = {
   "Hero": {
      "name": "Battlesuit",
      "transcendence": 0,
      "image": "../images/Battlesuit.jpg"
   },
   "Abilities": {
      "Strength": 8,
      "Agility": 0,
      "Fighting": 6,
      "Dexterity": 2,
      "Stamina": 0,
      "Intellect": 5,
      "Awareness": 1,
      "Presence": 1
   },
   "Powers": [
      {
         "effect": "Protection",
         "text": "Armor",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Impervious",
               "applications": 5
            },
            {
               "name": "Other Flat Flaw",
               "applications": 19,
               "text": "Removable (for the whole group and Enhanced Traits)"
            }
         ],
         "rank": 10
      },
      {
         "effect": "Flight",
         "text": "Boot Jets: 190 MPH",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Other Flat Flaw",
               "applications": 5,
               "text": "Removable (was split because the flat flaw was too big for Armor alone)"
            }
         ],
         "rank": 6
      },
      {
         "effect": "Communication",
         "text": "Radio",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 2
      },
      {
         "effect": "Immunity",
         "text": "Life Support System",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 6
      },
      {
         "effect": "Immunity",
         "text": "Sensory Effects",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 5
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Sensors: radar",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [
            {
               "name": "Other Flat Extra",
               "applications": 4,
               "text": "Accurate (2) and Extended (2)"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 2,
         "text": "Sensors: Darkvision",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Sensors: Direction Sense",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Sensors: Distance Sense",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Sensors: Infravision",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 2,
         "text": "Sensors: Time Sense",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Sensors: Ultra-Hearing",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Damage",
         "text": "",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Force Beams",
         "skill": "Force Beams",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            }
         ],
         "rank": 10
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Improvised Tools"
      }
   ],
   "Skills": [
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 5,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Perception",
         "rank": 5,
         "ability": "Awareness"
      },
      {
         "name": "Persuasion",
         "rank": 4,
         "ability": "Presence"
      },
      {
         "name": "Technology",
         "subtype": "",
         "rank": 8,
         "ability": "Intellect"
      },
      {
         "name": "Other",
         "subtype": "Inventor",
         "rank": 8,
         "ability": "Intellect"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Force Beams",
         "rank": 8,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 7,
      "Parry": 2,
      "Will": 8,
      "Fortitude": 5
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": "Complications, background and other information"
};
