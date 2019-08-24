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
      "Awareness": 9,
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
         "text": "Telekinesis",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Sustained",
         "name": "Telekinesis",
         "skill": "Telekinesis",
         "Modifiers": [
            {
               "name": "Accurate",
               "applications": 4
            },
            {
               "name": "Other Flat Extra",
               "applications": 1,
               "text": "Flying. speed rank 6 if you are rank 2 mass"
            }
         ],
         "rank": 8
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
         "effect": "Damage",
         "text": "Mental Blast",
         "action": "Standard",
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
         "rank": 3
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
         "name": "Insight",
         "rank": "Mastered"
      },
      {
         "name": "Perception",
         "rank": "Trained"
      },
      {
         "name": "Persuasion",
         "rank": "Trained"
      }
   ],
   "Defenses": {
      "Dodge": 7,
      "Parry": 6,
      "Will": 10,
      "Fortitude": 6
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};

var illusion = {
   "effect": "Illusion",
   "cost": 5,
   "text": "All senses",
   "action": "Standard",
   "range": "Perception",
   "duration": "Sustained",
   "name": "Telepathic Illusion",
   "Modifiers": [
      {
         "name": "Resistible",
         "text": "by Will (DC 14)"
      },
      {
         "name": "Selective"
      },
      {
         "name": "Alternate Effect",
         "text": "of Telepathy"
      }
   ],
   "rank": 3
};
if('2' === queryParameters['options'][0])
{
   illusion.Modifiers[2].text = 'of Mind Control';
   json.Powers = json.Powers.concat([
      {
         "effect": "Affliction",
         "text": "Mind Control: Resisted by Will; Dazed, Compelled, Controlled",
         "action": "Standard",
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
         "rank": 4
      },
      illusion
   ]);
}
else
{
   illusion.Modifiers[2].text = 'of Telepathy';
   json.Powers = json.Powers.concat([
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
         "rank": 5
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
      },
      illusion
   ]);
}
