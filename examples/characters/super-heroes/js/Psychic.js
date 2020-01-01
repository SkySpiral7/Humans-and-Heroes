var expertise = '(Choose One)';
if (undefined !== queryParameters.strings[0]) expertise = queryParameters.strings[0];

var json = {
   "Hero": {
      "name": "Psychic",
      "transcendence": 0,
      "image": "../images/Psychic.jpg"
   },
   "Abilities": {
      "Strength": 0,
      "Agility": 1,
      "Fighting": 2,
      "Dexterity": 2,
      "Stamina": 0,
      "Intellect": 2,
      "Awareness": 5,
      "Presence": 4
   },
   "Powers": [
      {
         "effect": "Senses",
         "cost": 1,
         "text": "Mental Awareness (Mental)",
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
         "effect": "Move Object",
         "text": "Telekinesis. 100 lb objects",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Sustained",
         "name": "Telekinesis",
         "skill": "Telekinesis",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Protection",
         "text": "Telekinetic Field",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Decreased Duration",
               "applications": 2
            }
         ],
         "rank": 10
      },
      {
         "effect": "Mind Reading",
         "text": "Telepathy",
         "action": "Standard",
         "range": "Perception",
         "duration": "Sustained",
         "name": "Telepathy",
         "Modifiers": [
            {
               "name": "Linked",
               "text": "with next power"
            }
         ],
         "rank": 8
      },
      {
         "effect": "Communication",
         "text": "Mental",
         "action": "Free",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [
            {
               "name": "Area",
               "applications": 1,
               "text": "Burst "
            },
            {
               "name": "Linked",
               "text": "with previous power"
            }
         ],
         "rank": 2
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Ultimate Effort",
         "text": "Will defense"
      }
   ],
   "Skills": [
      {
         "name": "Expertise",
         "subtype": expertise,
         "rank": 6,
         "ability": "Intellect"
      },
      {
         "name": "Insight",
         "subtype": "",
         "rank": 6,
         "ability": "Awareness"
      },
      {
         "name": "Perception",
         "rank": 4,
         "ability": "Awareness"
      },
      {
         "name": "Persuasion",
         "rank": 8,
         "ability": "Presence"
      }
   ],
   "Defenses": {
      "Dodge": 7,
      "Parry": 6,
      "Will": 6,
      "Fortitude": 6
   },
   "ruleset": "3.16",
   "version": 2,
   "Information": "Complications, background and other information"
};

if ('2' === queryParameters.options[0])
{
   json.Powers.push({
      "effect": "Affliction",
      "text": "Mind Control: Resisted by Will; Dazed, Compelled, Controlled",
      "action": "Full",
      "range": "Perception",
      "duration": "Instant",
      "name": "Mind Control",
      "Modifiers": [
         {
            "name": "Increased Range",
            "applications": 2
         },
         {
            "name": "Other Rank Extra",
            "applications": 1,
            "text": "Cumulative"
         }
      ],
      "rank": 10
   });
}
else
{
   json.Powers.push({
      "effect": "Damage",
      "text": "Mental Blast",
      "action": "Full",
      "range": "Perception",
      "duration": "Instant",
      "name": "Mental Blast",
      "Modifiers": [
         {
            "name": "Increased Range",
            "applications": 2
         },
         {
            "name": "Alternate Resistance (Cost)",
            "text": "Will"
         }
      ],
      "rank": 10
   });
}
