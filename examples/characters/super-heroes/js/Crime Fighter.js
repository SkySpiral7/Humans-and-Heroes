<<<<<<< HEAD
=======
var expertise = '(Choose One)';
if (undefined !== queryParameters.strings[1]) expertise = queryParameters.strings[1];

var equipmentAdvantage = {
   "name": "Equipment",
   "rank": 13
};

>>>>>>> gh-pages
var json = {
   "Hero": {
      "name": "Crime Fighter",
      "transcendence": 0,
      "image": "../images/Crime-Fighter.jpg"
   },
   "Abilities": {
      "Strength": 8,
      "Agility": 6,
<<<<<<< HEAD
      "Fighting": 12,
      "Dexterity": 9,
      "Stamina": 3,
      "Intellect": 5,
      "Awareness": 6,
      "Presence": 6
=======
      "Fighting": 10,
      "Dexterity": 6,
      "Stamina": 1,
      "Intellect": 3,
      "Awareness": 4,
      "Presence": 3
>>>>>>> gh-pages
   },
   "Powers": [],
   "Equipment": [
      {
         "effect": "Protection",
         "text": "Costume",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 7
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Commlink",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Movement",
         "cost": 2,
         "text": "Grappling hook: Swinging",
         "action": "Move",
         "range": "Personal",
         "duration": "Sustained",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Damage",
         "text": "Boomerangs (Total Damage 10)",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Boomerang",
         "skill": "Boomerang",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Other Free Modifier",
               "text": "Strength-Based"
            }
         ],
         "rank": 2
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Handcuffs",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 1
      }
   ],
   "Advantages": [
      equipmentAdvantage,
      {
         "name": "Defensive Roll",
         "rank": 3
      }
   ],
   "Skills": [
      {
         "name": "Acrobatics",
         "rank": "Trained"
      },
      {
         "name": "Athletics",
         "rank": "Trained"
      },
      {
         "name": "Contortion",
         "rank": "Trained"
      },
      {
         "name": "Deception",
         "rank": "Trained"
      },
      {
         "name": "Engineering",
         "subtype": "Electronic",
         "rank": "Trained"
      },
      {
         "name": "Insight",
         "rank": "Trained"
      },
      {
         "name": "Investigation",
         "rank": "Trained"
      },
      {
<<<<<<< HEAD
         "name": "Knowledge",
         "subtype": "Criminal",
         "rank": "Trained"
=======
         "name": "Investigation",
         "subtype": "",
         "rank": 6,
         "ability": "Intellect"
>>>>>>> gh-pages
      },
      {
         "name": "Perception",
         "rank": "Trained"
      },
      {
         "name": "Persuasion",
         "rank": "Trained"
      },
      {
         "name": "Ranged Combat",
         "subtype": "Boomerang",
         "rank": "Trained"
      },
      {
<<<<<<< HEAD
         "name": "Ranged Combat",
         "subtype": "Grenades",
         "rank": "Trained"
      },
      {
=======
>>>>>>> gh-pages
         "name": "Sleight of Hand",
         "rank": "Trained"
      },
      {
         "name": "Stealth",
         "rank": "Mastered"
      }
   ],
   "Defenses": {
      "Dodge": 4,
      "Parry": 0,
      "Will": 6,
      "Fortitude": 7
   },
<<<<<<< HEAD
   "ruleset": "4.0",
=======
   "ruleset": "3.16",
>>>>>>> gh-pages
   "version": 2,
   "Information": "Complications, background and other information"
};

//2 removes these. requirement: this must run when there's no query params
if ('2' !== queryParameters.options[0])
{
   json.Equipment.push({
      "effect": "Affliction",
      "text": "Flash-Bangs (much stronger than normal). Fortitude Dazzle (Impaired, Disabled, Unaware) Visual and Auditory",
      "action": "Standard",
      "range": "Ranged",
      "duration": "Instant",
      "name": "Flash-Bangs",
      "skill": "Grenades",
      "Modifiers": [
         {
            "name": "Increased Range",
            "applications": 1
         },
         {
            "name": "Other Rank Extra",
            "applications": 2,
            "text": "Cumulative, Extra Condition"
         },
         {
            "name": "Area",
            "applications": 1,
            "text": "Burst"
         }
      ],
      "rank": 10
   });
   json.Skills.push({
      "name": "Ranged Combat",
      "subtype": "Grenades",
      "rank": 4,
      "ability": "Dexterity"
   });
}

if ('2' === queryParameters.options[0])
{
   equipmentAdvantage.rank -= 10;
   json.Powers.push({
      "effect": "Healing",
      "text": "(Device of your choice)",
      "action": "Standard",
      "range": "Close",
      "duration": "Instant",
      "Modifiers": [
         {
            "name": "Easily Removable",
            "text": "Amulet"
         }
      ],
      "rank": 8
   });
}
else if ('3' === queryParameters.options[0])
{
   ++equipmentAdvantage.rank;
   json.Equipment.push({
      "effect": "Feature",
      "cost": 1,
      "text": "Camo Clothing, Multi-tool, Binoculars, Parabolic Microphone, Night Vision Goggles",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 5
   });
}
else if ('4' === queryParameters.options[0])
{
   equipmentAdvantage.rank += 3;
   json.Equipment.push({
      "effect": "Feature",
      "cost": 1,
      "text": "(Vehicle of your choice)",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 15
   });
}

if (queryParameters.checkboxes[0])
{
   var benefitText = '(Choose One)';
   if (undefined !== queryParameters.strings[0]) benefitText = queryParameters.strings[0];
   json.Advantages.push({
      "name": "Benefit",
      "rank": 1,
      "text": benefitText
   });
}
if (queryParameters.checkboxes[1]) json.Advantages.push({"name": "Defensive Attack"});
//0 === queryParameters.checkboxes.length is only possible if there are no queryParameters
if (queryParameters.checkboxes[2] || 0 === queryParameters.checkboxes.length)
   json.Advantages.push({"name": "Jack of All Trades"});
if (queryParameters.checkboxes[3]) json.Advantages.push({"name": "Power Attack"});
if (queryParameters.checkboxes[4] || 0 === queryParameters.checkboxes.length)
{
   json.Advantages.push({
      "name": "Skill Mastery",
      "text": "Stealth"
   });
}
if (queryParameters.checkboxes[5] || 0 === queryParameters.checkboxes.length)
{
   json.Advantages.push({
      "name": "Ultimate Effort",
      "text": "Investigation"
   });
}
