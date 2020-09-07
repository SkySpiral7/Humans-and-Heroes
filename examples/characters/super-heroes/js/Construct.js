var rangedAttackName = '(Name of Ranged Attack)';
if (undefined !== queryParameters.strings[0]) rangedAttackName = queryParameters.strings[0];

var json = {
   "Hero": {
      "name": "Construct",
      "transcendence": 0,
      "image": "../images/Construct.jpg"
   },
   "Abilities": {
      "Strength": 6,
      "Agility": 3,
      "Fighting": 5,
      "Dexterity": 7,
      "Stamina": 0,
      "Intellect": 5,
      "Awareness": 3,
      "Presence": 0
   },
   "Powers": [
      {
         "effect": "Immunity",
         "text": "Fatigue",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 30
      },
      {
         "effect": "Protection",
         "text": "Armored",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [{"name": "Impervious", "applications": 3}],
         "rank": 10
      }
   ],
   "Equipment": [],
   "Advantages": [
      {
         "name": "Perfect Memory"
      }
   ],
   "Skills": [],
   "Defenses": {
      "Dodge": 5,
      "Parry": 3,
      "Will": 8,
      "Fortitude": 8
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};

//TODO: not conflicted but unarmed versions (3/4) have too low attack
if ('3' === queryParameters.options[0])
{
   json.Abilities.Strength += 3;
   json.Abilities.Intellect -= 3;
   json.Skills.push({
      "name": "Close Combat",
      "subtype": "Unarmed",
      "rank": "Trained"
   });
   json.Powers = json.Powers.concat([
      {
         "effect": "Immortality",
         "text": "Undead Revenant Option. Back to life in 4.8 months",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Regeneration",
         "text": "Undead Revenant Option. 1 HP every other round",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 5
      }
   ]);
}
else if ('4' === queryParameters.options[0])
{
   json.Abilities.Strength += 3;
   json.Abilities.Intellect -= 3;
   json.Skills.push({
      "name": "Close Combat",
      "subtype": "Unarmed",
      "rank": "Trained"
   });
   json.Powers.push({
      "effect": "Insubstantial",
      "text": "Wraith Option",
      "action": "Free",
      "range": "Personal",
      "duration": "Sustained",
      "Modifiers": [],
      "rank": 4
   });
}
else
{
   json.Skills.push({
      "name": "Ranged Combat",
      "subtype": rangedAttackName,
      "rank": "Trained"
   });
   var text = ('2' === queryParameters.options[0]) ? 'Soldier Option (built-in weapon)'
      : 'Elemental Option (See Elemental Control for Alternate Effect examples)';
   json.Powers.push({
      "effect": "Damage",
      "text": text,
      "action": "Standard",
      "range": "Ranged",
      "duration": "Instant",
      "name": rangedAttackName,
      "skill": rangedAttackName,
      "Modifiers": [
         {
            "name": "Increased Range",
            "applications": 1
         }
      ],
      "rank": 10
   });
}
