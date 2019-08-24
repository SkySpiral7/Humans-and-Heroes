var json = {
   "Hero": {
      "name": "Crime Fighter",
      "transcendence": 0,
      "image": "../images/Crime-Fighter.jpg"
   },
   "Abilities": {
      "Strength": 7,
      "Agility": 6,
      "Fighting": 12,
      "Dexterity": 9,
      "Stamina": 3,
      "Intellect": 5,
      "Awareness": 6,
      "Presence": 6
   },
   "Powers": [],
   "Equipment": [
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
         "effect": "Protection",
         "text": "Costume",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 2
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
         "effect": "Affliction",
         "text": "Flash-Bangs (much smaller than normal). Fortitude Dazzle (Impaired, Disabled, Unaware) Visual and Auditory",
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
         "rank": 2
      },
      {
         "effect": "Affliction",
         "text": "Sleep Gas Pellets. Fortitude; Daze, Stun, Asleep",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Sleep Gas Pellets",
         "skill": "Grenades",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Area",
               "applications": 1,
               "text": "Cloud"
            }
         ],
         "rank": 4
      },
      {
         "effect": "Damage",
         "text": "Boomerangs (Total Damage 4)",
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
         "rank": 1
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
      {
         "name": "Equipment",
         "rank": 6
      },
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
         "name": "Knowledge",
         "subtype": "Criminal",
         "rank": "Trained"
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
         "name": "Ranged Combat",
         "subtype": "Grenades",
         "rank": "Trained"
      },
      {
         "name": "Sleight of Hand",
         "rank": "Trained"
      },
      {
         "name": "Stealth",
         "rank": "Mastered"
      }
   ],
   "Defenses": {
      "Dodge": 6,
      "Parry": 0,
      "Will": 6,
      "Fortitude": 3
   },
   "ruleset": "4.0",
   "version": 2,
   "Information": "Complications, background and other information"
};

if ('2' === queryParameters['options'][0])
{
   json.Equipment = [];
   json.Advantages.remove(0);
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
      "rank": 5
   });
}
else if ('3' === queryParameters['options'][0])
{
   ++json.Advantages[0].rank;
   json.Powers.push({
      "effect": "Senses",
      "cost": 1,
      "text": "Low-light Vision",
      "action": "None",
      "range": "Personal",
      "duration": "Permanent",
      "Modifiers": [],
      "rank": 1
   });
   json.Equipment = json.Equipment.concat([
      {
         "effect": "Damage",
         "text": "piercing",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Knife",
         "skill": "Knives",
         "Modifiers": [],
         "rank": 1
      },
      {
         "effect": "Feature",
         "cost": 1,
         "text": "Camo Clothing, Multi-tool, Binoculars, Mini-Tracer",
         "action": "None",
         "range": "Personal",
         "duration": "Permanent",
         "Modifiers": [],
         "rank": 4
      }
   ]);
}
else if ('4' === queryParameters['options'][0])
{
   json.Advantages[0].rank += 3;
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
//1 === option[0] is the default (no changes)

if (queryParameters['checkboxes'][0])
{
   var benefitText = '(Choose One)';
   if(undefined !== queryParameters['names'][0]) benefitText = queryParameters['names'][0];
   json.Advantages.push({
      "name": "Benefit",
      "rank": 1,
      "text": benefitText
   });
}
if(queryParameters['checkboxes'][1]) json.Advantages.push({"name": "Defensive Attack"});
if(queryParameters['checkboxes'][2]) json.Advantages.push({"name": "Jack of All Trades"});
if(queryParameters['checkboxes'][3]) json.Advantages.push({"name": "Power Attack"});
if(queryParameters['checkboxes'][4]) json.Advantages.push({
   "name":"Skill Mastery",
   "text":"Stealth"
});
if(queryParameters['checkboxes'][5]) json.Advantages.push({
   "name": "Ultimate Effort",
   "text": "Investigation"
});
