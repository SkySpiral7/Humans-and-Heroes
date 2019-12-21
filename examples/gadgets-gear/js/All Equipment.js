var json = {
   "Hero": {
      "name": "Equipment List",
      "transcendence": 0,
      "image": "../images/Sirocco.png"
   },
   "Abilities": {
      "Strength": 0,
      "Agility": 0,
      "Fighting": 0,
      "Dexterity": 0,
      "Stamina": 0,
      "Intellect": 0,
      "Awareness": 0,
      "Presence": 0
   },
   "Powers": [],
   "Equipment": [
      {
         "effect": "Affliction",
         "text": "Resisted by Fortitude; Vision Impaired, Vision Disabled, Incapacitated",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Tear Gas Pellets",
         "skill": "Grenades",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Other Rank Extra",
               "applications": 1,
               "text": "Extra Condition. Dazed, Stunned, (Incapacitated)"
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
         "effect": "Affliction",
         "text": "Hindered, Immobilized",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Bolos",
         "skill": "Bolos",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Other Rank Extra",
               "applications": 1,
               "text": "Cumulative"
            },
            {
               "name": "Alternate Resistance (Cost)",
               "text": "Sleight of Hand: Escaping instead of Fortitude or Will"
            },
            {
               "name": "Other Rank Flaw",
               "applications": 1,
               "text": "Limited Degree (2 degrees)"
            }
         ],
         "rank": 3
      },
      {
         "effect": "Damage",
         "text": "",
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
               "text": "Strength-based"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Damage",
         "text": "Explosives",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Explosives",
         "skill": "Explosives",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Area",
               "applications": 1,
               "text": "Burst"
            }
         ],
         "rank": 5
      },
      {
         "effect": "Weaken",
         "text": "Weaken: Toughness",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Cutting Torch",
         "skill": "Cutting Torch",
         "Modifiers": [
            {"name": "Affects Objects Only"},
            {
               "name": "Other Flat Extra",
               "applications": 1,
               "text": "Linked to Damage 1"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Affliction",
         "text": "Flash-Bangs. Fortitude Dazzle (Impaired, Disabled, Unaware) Visual and Auditory",
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
         "rank": 4
      },
      {
         "effect": "Affliction",
         "text": "Pepper Spray. Chemical. Resisted by Fortitude; Visual Dazzle: Vision Impaired, Vision Disabled, Vision Unaware",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Pepper Spray",
         "skill": "Pepper Spray",
         "Modifiers": [
            {
               "name": "Other Rank Extra",
               "applications": 1,
               "text": "Cumulative"
            }
         ],
         "rank": 4
      },
      {
         "effect": "Damage",
         "text": "bludgeoning",
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
         "effect": "Affliction",
         "text": "Sleep Resisted by Fortitude; (Fatigued, Exhausted, Asleep)",
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
         "effect": "Concealment",
         "cost": 4,
         "text": "Smoke Pellets. Normal Vision",
         "action": "Free",
         "range": "Ranged",
         "duration": "Sustained",
         "name": "Smoke Pellets",
         "skill": "Grenades",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {"name": "Attack"},
            {
               "name": "Area",
               "applications": 1,
               "text": "Cloud"
            }
         ],
         "rank": 1
      },
      {
         "effect": "Damage",
         "text": "bludgeoning",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Club",
         "skill": "Clubs",
         "Modifiers": [],
         "rank": 2
      },
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
         "effect": "Affliction",
         "text": "electrical. Resisted by Fortitude; daze, stun, incapacitate",
         "action": "Standard",
         "range": "Close",
         "duration": "Instant",
         "name": "Taser",
         "skill": "Taser",
         "Modifiers": [],
         "rank": 5
      },
      {
         "effect": "Damage",
         "text": "",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Shotgun solid slug",
         "skill": "Shotgun",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            }
         ],
         "rank": 5
      },
      {
         "effect": "Damage",
         "text": "",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Shotgun buckshot",
         "skill": "Shotgun",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Area",
               "applications": 1,
               "text": "Multiattack single target if close (adjacent). Cone Area 1 if short range."
            },
            {
               "name": "Limited",
               "applications": 1,
               "text": "Can't do damage at medium or further range"
            },
            {
               "name": "Alternate Effect",
               "text": "the 2 shotgun effects depend on shell loaded"
            }
         ],
         "rank": 3
      },
      {
         "effect": "Affliction",
         "text": "electrical. Resisted by Fortitude; daze, stun, incapacitate",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Stun Gun",
         "skill": "Pistols",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            }
         ],
         "rank": 5
      },
      {
         "effect": "Damage",
         "text": "Fire",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Flamethrower",
         "skill": "Flamethrower",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Area",
               "applications": 1,
               "text": "Cone or Line"
            },
            {
               "name": "Feature",
               "text": "Adjustable area shape but only 1 is usable at a time"
            }
         ],
         "rank": 6
      },
      {
         "effect": "Damage",
         "text": "Rocket launcher",
         "action": "Standard",
         "range": "Ranged",
         "duration": "Instant",
         "name": "Rocket launcher",
         "skill": "Rocket launcher",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {
               "name": "Area",
               "applications": 1,
               "text": "Burst"
            }
         ],
         "rank": 10
      },
      {
         "effect": "Concealment",
         "cost": 4,
         "text": "Smoke Grenade. Normal Vision",
         "action": "Free",
         "range": "Ranged",
         "duration": "Sustained",
         "name": "Smoke Grenade",
         "skill": "Grenades",
         "Modifiers": [
            {
               "name": "Increased Range",
               "applications": 1
            },
            {"name": "Attack"},
            {
               "name": "Area",
               "applications": 1,
               "text": "Cloud"
            }
         ],
         "rank": 4
      }
   ],
   "Advantages": [
      {
         "name": "Equipment",
         "rank": 40
      }
   ],
   "Skills": [],
   "Defenses": {
      "Dodge": 0,
      "Parry": 0,
      "Will": 0,
      "Fortitude": 0
   },
   "ruleset": "3.11",
   "version": 2,
   "Information": ""
};
