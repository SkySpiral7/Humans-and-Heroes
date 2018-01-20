var expertise = '(Choose One)';
if(undefined !== queryParameters['names'][0]) expertise = queryParameters['names'][0];

var json = {
   "Hero": {
      "name": "Weapon Master",
      "transcendence": 0,
      "image": "../images/Weapon-Master.jpg"
   },
   "Abilities": {
      "Strength": 5,
      "Agility": 5,
      "Fighting": 7,
      "Awareness": 1,
      "Stamina": 2,
      "Dexterity": 7,
      "Intellect": 0,
      "Presence": 2
   },
   "Powers": [],
   "Equipment": [
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Vehicle: Motorcycle",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 10
      },
      {
         "effect": "Protection",
         "text": "Plate-mail",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 5
      },
      {
         "effect": "Damage",
         "text": "Battleaxe",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Battleaxe",
         "skill": "Axes",
         "Modifiers": [
            {
               "name": "Other Free Modifier",
               "text": "Strength-based"
            }
         ],
         "rank": 3
      },
      {
         "effect": "Damage",
         "text": "Brass Knuckles. bludgeoning",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Brass Knuckles",
         "skill": "Unarmed",
         "Modifiers": [
            {
               "name": "Other Free Modifier",
               "text": "Strength-based"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Gas Mask",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      }
   ],
   "Advantages": [
      {
         "name": "Equipment",
         "rank": 4
      },
      {
         "name": "Accurate Attack"
      },
      {
         "name": "Defensive Attack"
      },
      {
         "name": "Evasion",
         "rank": 1
      },
      {
         "name": "Improved Defense"
      },
      {
         "name": "Improved Disarm"
      },
      {
         "name": "Improved Initiative",
         "rank": 1
      },
      {
         "name": "Improved Trip"
      },
      {
         "name": "Power Attack"
      }
   ],
   "Skills": [
      {
         "name": "Acrobatics",
         "subtype": "",
         "rank": 8,
         "ability": "Agility"
      },
      {
         "name": "Athletics",
         "subtype": "",
         "rank": 8,
         "ability": "Strength"
      },
      {
         "name": "Deception",
         "subtype": "",
         "rank": 8,
         "ability": "Presence"
      },
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 6,
         "ability": "Intellect"
      },
      {
         "name": "Close Combat",
         "subtype": "Axes",
         "rank": 5,
         "ability": "Fighting"
      },
      {
         "name": "Intimidation",
         "subtype": "",
         "rank": 6,
         "ability": "Presence"
      },
      {
         "name": "Investigation",
         "subtype": "",
         "rank": 6,
         "ability": "Intellect"
      },
      {
         "name": "Perception",
         "rank": 8,
         "ability": "Awareness"
      },
      {
         "name": "Sleight of Hand",
         "subtype": "",
         "rank": 6,
         "ability": "Dexterity"
      },
      {
         "name": "Stealth",
         "subtype": "",
         "rank": 8,
         "ability": "Agility"
      },
      {
         "name": "Vehicles",
         "subtype": "",
         "rank": 7,
         "ability": "Dexterity"
      }
   ],
   "Defenses": {
      "Dodge": 10,
      "Fortitude": 7,
      "Parry": 8,
      "Will": 7
   },
   "ruleset": "3.0",
   "version": 2,
   "Information": "Complications, background and other information"
};

if(queryParameters['checkboxes'][0]) json.Powers.push({
   "effect": "Affliction",
   "text": "Resisted by Fortitude; Stamina Impaired, Stamina Hindered, Incapacitated",
   "action": "Standard",
   "range": "Close",
   "duration": "Instant",
   "name": "Crippling Strike",
   "skill": "(Choose)",
   "Modifiers": [
      {
         "name": "Easily Removable",
         "text": "A Chosen Weapon that is not Equipment"
      }
   ],
   "rank": 7
});
if(queryParameters['checkboxes'][1]) json.Powers = json.Powers.concat([
   {
      "effect": "Quickness",
      "text": "",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 3
   },
   {
      "effect": "Movement",
      "cost": 1,
      "text": "Ground Speed: 8 MPH",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 2
   }
]);
if(queryParameters['checkboxes'][2]) json.Powers.push({
   "effect": "Variable",
   "text": "(5 points) anything equipment could reasonably do (this is a multi-purpose device not a utility belt)",
   "action": "Full",
   "range": "Personal",
   "duration": "Sustained",
   "Modifiers": [
      {
         "name": "Easily Removable",
         "text": "hand held"
      }
   ],
   "rank": 1
});
if(queryParameters['checkboxes'][3]) json.Powers.push({
   "effect": "Regeneration",
   "text": "",
   "action": "None",
   "range": "Personal",
   "duration": "Permanent",
   "Modifiers": [
      {
         "name": "Activation",
         "applications": 1,
         "text": "Move action"
      }
   ],
   "rank": 2
});
if(queryParameters['checkboxes'][4]) json.Powers = json.Powers.concat([
   {
      "effect": "Senses",
      "cost": 2,
      "text": "Accurate (2) Normal Hearing",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Danger Sense (Auditory)",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Extended Hearing",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Ultra-Hearing",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   }
]);
if(queryParameters['checkboxes'][5]) json.Powers = json.Powers.concat([
   {
      "effect": "Senses",
      "cost": 2,
      "text": "Darkvision",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Extended Vision",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Senses",
      "cost": 1,
      "text": "Microscopic (Vision)",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 2
   }
]);
if(queryParameters['checkboxes'][6]) json.Powers = json.Powers.concat([
   {
      "effect": "Leaping",
      "text": "",
      "action": "Free",
      "range": "Personal",
      "duration": "Instant",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Movement",
      "cost": 2,
      "text": "Sure-Footed",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 1
   },
   {
      "effect": "Movement",
      "cost": 2,
      "text": "Swinging",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 1
   }
]);
