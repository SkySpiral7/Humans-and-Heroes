'use strict';
const Data2 = {};
Data2.Ability = {names: ['Strength', 'Agility', 'Fighting', 'Awareness', 'Stamina', 'Dexterity', 'Intellect', 'Presence']};
Data2.SharedHtml = {
    powerName: function(sectionName, rowIndex){ return '          Name <input type="text" size="20" id="'+sectionName+ 'Name'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex +').changeName();" />\n';},
   powerSkill: function(sectionName, rowIndex){return '          Skill <input type="text" size="20" id="'+sectionName+'Skill'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeSkill();" />\n';}
};
//freeze the only ones that are never changed so that I don't accidentally change them
Object.freeze(Data2.Ability);
Object.freeze(Data2.SharedHtml);

/**This method changes all of the data to the major, minor ruleset passed in. The constructor of Main also calls this to initialize the rule dependant data.*/
Data2.change = function(major, minor)
{
   Data2.Advantage = {
      godhoodNames: ['Beyond Mortal', 'Let There Be', 'Luck of the Gods', 'Omnipresent', 'Omniscient', 'Perfect Focus',
         'Stay Like That', 'Supreme', 'Variable Modifier', 'Your Petty Rules Don\'t Apply to Me'],
      mapThese: ['Close Attack', 'Defensive Roll', 'Improved Critical', 'Improved Initiative', 'Ranged Attack', 'Seize Initiative'],
      names: ['Accurate Attack', 'Agile Feint', 'All-out Attack', 'Animal Empathy', 'Artificer', 'Assessment', 'Attractive', 'Beginner\'s Luck',
         'Benefit',  'Chokehold', 'Close Attack', 'Connected', 'Contacts', 'Daze', 'Defensive Attack', 'Defensive Roll', 'Diehard', 'Eidetic Memory',
         'Equipment', 'Evasion', 'Extraordinary Effort', 'Fascinate', 'Fast Grab', 'Favored Environment', 'Favored Foe', 'Fearless', 'Grabbing Finesse',
         'Great Endurance', 'Hide in Plain Sight', 'Improved Aim', 'Improved Critical', 'Improved Defense', 'Improved Disarm', 'Improved Grab',
         'Improved Hold', 'Improved Initiative', 'Improved Smash', 'Improved Trip', 'Improvised Tools', 'Improvised Weapon', 'Inspire', 'Instant Up',
         'Interpose', 'Inventor', 'Jack of All Trades', 'Languages', 'Leadership', 'Luck', 'Minion', 'Move-by Action', 'Power Attack', 'Precise Attack',
         'Prone Fighting', 'Quick Draw', 'Ranged Attack', 'Redirect', 'Ritualist', 'Second Chance', 'Seize Initiative', 'Set-up', 'Sidekick', 'Skill Mastery',
         'Startle', 'Takedown', 'Taunt', 'Teamwork', 'Throwing Mastery', 'Tracking', 'Trance', 'Ultimate Effort', 'Uncanny Dodge', 'Weapon Bind',
         'Weapon Break', 'Well-informed']
   };
   var advantageLookup = {
      costPerRank: new MapDefault({'Beyond Mortal': 50, 'Let There Be': 40, 'Luck of the Gods': 5, 'Lucky': 5, 'Omnipresent': 5, 'Omniscient': 5,
         'Sidekick': 1, 'Stay Like That': 15, 'Variable Modifier': 35, 'Your Petty Rules Don\'t Apply to Me': 50}, 1),
      defaultText: new MapDefault({'Favored Environment': 'Environment', 'Favored Foe': 'Foe type', 'Languages': 'Languages Known',
         'Minion': 'Helper Name', 'Sidekick': 'Helper Name', 'Stay Like That': 'Power Modified', 'Supreme': 'Power Gained'}, 'Advantage Subtype'),
      maxRank: new MapDefault({'Attractive': 2, 'Benefit': Infinity, 'Close Attack': Infinity, 'Daze': 2, 'Defensive Roll': Infinity,
         'Equipment': Infinity, 'Evasion': 2, 'Fascinate': Infinity, 'Improved Critical': 4, 'Improved Initiative': Infinity,
         'Improvised Weapon': Infinity, 'Inspire': 5, 'Languages': Infinity, 'Luck': Infinity, 'Lucky': 3, 'Minion': Infinity,
         'Omnipresent': 3, 'Omniscient': 5, 'Precise Attack': 4, 'Ranged Attack': Infinity, 'Second Chance': Infinity, 'Set-up': Infinity,
         'Sidekick': Infinity, 'Supreme': Infinity, 'Takedown': 2, 'Throwing Mastery': Infinity}, 1)
   };
   advantageLookup.hasText = advantageLookup.defaultText.getAllKeys().concat(['Benefit', 'Improved Critical', 'Precise Attack', 'Second Chance', 'Skill Mastery', 'Ultimate Effort']);

   Data2.Defense = {
      names: ['Dodge', 'Fortitude', 'Parry', 'Will', 'Toughness'],
      Dodge: {ability: 'Agility', name: 'Dodge'},  //name is defined because all other data does this
      Fortitude: {ability: 'Stamina', name: 'Fortitude'},
      Parry: {ability: 'Fighting', name: 'Parry'},
      Will: {ability: 'Awareness', name: 'Will'},
      Toughness: {ability: 'Stamina', name: 'Toughness'}  //Toughness is listed for completeness (it isn't used)
   };

   var extraNames = ['Accurate', 'Affects Corporeal', 'Affects Insubstantial', 'Affects Objects Also', 'Affects Objects Only', 'Affects Others Also',
         'Affects Others Only', 'Alternate Effect', 'Alternate Resistance (Cost)', 'Alternate Resistance (Free)', 'Area', 'Attack', 'Contagious',
         'Dimensional', 'Dynamic Alternate Effect', 'Extended Range', 'Faster Action', 'Feature', 'Homing', 'Impervious', 'Increased Duration',
         'Increased Mass', 'Increased Range', 'Incurable', 'Indirect', 'Innate', 'Insidious', 'Linked', 'Multiattack', 'Penetrating', 'Precise',
         'Reach', 'Reversible', 'Ricochet', 'Secondary Effect', 'Selective', 'Sleep', 'Split', 'Subtle', 'Triggered', 'Variable Descriptor'];
   var flawNames = ['Activation', 'Check Required', 'Decreased Duration', 'Diminished Range', 'Distracting', 'Easily Removable', 'Fades', 'Feedback',
         'Grab-Based', 'Inaccurate', 'Limited', 'Noticeable', 'Quirk', 'Reduced Range', 'Removable', 'Resistible', 'Sense-Dependent', 'Side Effect',
         'Slower Action', 'Tiring', 'Uncontrolled', 'Unreliable'];
   var otherModifierNames = ['Other Rank Extra', 'Other Flat Extra', 'Other Free Modifier', 'Other Flat Flaw', 'Other Rank Flaw'];
   var modifierLookup = {
      actionRangeDuration: ['Decreased Duration', 'Faster Action', 'Increased Duration', 'Increased Range', 'Reduced Range', 'Slower Action'],
      cost: new MapDefault({'Activation': -1, 'Affects Objects Only': 0, 'Affects Others Only': 0, 'Alternate Effect': -1, 'Alternate Resistance (Free)': 0,
         'Ammunition': -1, 'Attack': 0, 'Aura': 2, 'Decreased Duration': -1, 'Diminished Range': -1, 'Distracting': -1, 'Dynamic Alternate Effect': -1,
         'Easily Removable': -1, 'Existence Dependent': 0, 'Fades': -1, 'Feedback': -1, 'Fragile': -1, 'Grab-Based': -1, 'Impervious': 1, 'Inaccurate': -1,
         'Increased Mass': 1, 'Limited': -1, 'Linked': 0, 'Noticeable': -1, 'Other Flat Flaw': -1, 'Other Free Modifier': 0, 'Other Rank Flaw': -1,
         'Penetrating': 1, 'Quirk': -1, 'Reduced Range': -1, 'Removable': -1, 'Resistible': -1, 'Sense-Dependent': -1, 'Side Effect': -1, 'Sleep': 0,
         'Slower Action': -1, 'System Dependent': -2, 'Tiring': -1, 'Uncontrollable Activation': -1, 'Uncontrollable Entirely': -5,
         'Uncontrollable Result': -1, 'Uncontrollable Target': -1, 'Uncontrolled': -1, 'Unreliable': -1}, 1),
      defaultText: new MapDefault({'Activation': 'Action Required', 'Alternate Effect': 'To What', 'Alternate Resistance (Cost)': 'Name of Resistance',
         'Alternate Resistance (Free)': 'Name of Resistance', 'Ammunition': 'Usage Per time or reload', 'Area': 'Shape', 'Check Required': 'What Check',
         'Contagious': 'Method of Spreading', 'Dimensional': 'Which Dimensions', 'Dynamic Alternate Effect': 'To What', 'Easily Removable': 'Type of item',
         'Extended Range': 'Total Ranges', 'Fragile': 'Total Toughness', 'Homing': 'Description or Method of targeting', 'Increased Mass': 'Total Mass',
         'Indirect': 'Direction', 'Linked': 'To What', 'Reach': 'Total Attack Distance', 'Removable': 'Type of item', 'Resistible': 'Name of Resistance',
         'Sense-Dependent': 'Name of Sense', 'Variable Descriptor': 'Category'}, 'Description'),
      hasAutoTotal: ['Alternate Effect', 'Dynamic Alternate Effect', 'Easily Removable', 'Removable'],
      maxRank: new MapDefault({'Accurate': Infinity, 'Activation': 2, 'Affects Corporeal': Infinity, 'Affects Insubstantial': 2, 'Ammunition': 2,
         'Area': Infinity, 'Check Required': Infinity, 'Decreased Duration': 3, 'Dimensional': 3, 'Diminished Range': 3, 'Extended Range': Infinity,
         'Faster Action': 6, 'Fragile': Infinity, 'Homing': Infinity, 'Impervious': 1, 'Inaccurate': Infinity, 'Increased Duration': 3,
         'Increased Mass': Infinity, 'Increased Range': 4, 'Indirect': 4, 'Limited': 2, 'Other Flat Extra': Infinity, 'Other Flat Flaw': Infinity,
         'Other Rank Extra': Infinity, 'Other Rank Flaw': Infinity, 'Penetrating': Infinity, 'Reach': Infinity, 'Reduced Range': 4, 'Ricochet': Infinity,
         'Side Effect': 2, 'Slower Action': 6, 'Split': Infinity, 'Subtle': 2, 'Triggered': Infinity, 'Variable Descriptor': 2}, 1),
      type: new MapDefault({'Accurate': 'Flat', 'Activation': 'Flat', 'Affects Corporeal': 'Flat', 'Affects Insubstantial': 'Flat',
         'Affects Objects Only': 'Free', 'Affects Others Only': 'Free', 'Alternate Effect': 'Flat', 'Alternate Resistance (Free)': 'Free',
         'Attack': 'Free', 'Check Required': 'Flat', 'Dimensional': 'Flat', 'Diminished Range': 'Flat', 'Dynamic Alternate Effect': 'Flat',
         'Easily Removable': 'Flat', 'Existence Dependent': 'Free', 'Extended Range': 'Flat', 'Feature': 'Flat', 'Fragile': 'Flat', 'Homing': 'Flat',
         'Impervious': 'Rank', 'Inaccurate': 'Flat', 'Increased Mass': 'Flat', 'Incurable': 'Flat', 'Indirect': 'Flat', 'Innate': 'Flat',
         'Insidious': 'Flat', 'Linked': 'Free', 'Noticeable': 'Flat', 'Other Flat Extra': 'Flat', 'Other Flat Flaw': 'Flat',
         'Other Free Modifier': 'Free', 'Penetrating': 'Flat', 'Precise': 'Flat', 'Quirk': 'Flat', 'Reach': 'Flat', 'Removable': 'Flat',
         'Reversible': 'Flat', 'Ricochet': 'Flat', 'Sleep': 'Free', 'Split': 'Flat', 'Subtle': 'Flat', 'System Dependent': 'Flat', 'Triggered': 'Flat',
         'Variable Descriptor': 'Flat'}, 'Rank')
   };
   modifierLookup.readOnly = modifierLookup.actionRangeDuration.copy();
   modifierLookup.hasAutoRank = modifierLookup.hasAutoTotal.concat(modifierLookup.actionRangeDuration);
   modifierLookup.hasText = modifierLookup.defaultText.getAllKeys().concat(['Feature', 'Limited', 'Noticeable', 'Quirk', 'Side Effect', 'Subtle', 'Triggered']).
      concat(otherModifierNames);

   var powerLookup = {
      baseCost: new MapDefault({'A God I Am': 5, 'Attain Knowledge': 2, 'Communication': 4, 'Comprehend': 2, 'Concealment': 2, 'Create': 2,
         'Enhanced Trait': 2, 'Flight': 2, 'Growth': 2, 'Healing': 2, 'Immortality': 2, 'Insubstantial': 5, 'Luck Control': 3, 'Mental Transform': 2,
         'Mind Reading': 2, 'Mind Switch': 8, 'Morph': 5, 'Move Object': 2, 'Movement': 2, 'Nullify': 1, 'Phantom Ranks': 5, 'Reality Warp': 5,
         'Regeneration': 1, 'Resistance': 3, 'Shrinking': 2, 'Summon': 2, 'Summon Minion': 5, 'Summon Object': 2, 'Teleport': 2, 'Transform': 2,
         'Variable': 7}, 1),
      defaultAction: new MapDefault({'A God I Am': 'Triggered', 'Burrowing': 'Free', 'Communication': 'Free', 'Comprehend': 'None', 'Concealment': 'Free',
         'Elongation': 'Free', 'Enhanced Trait': 'Free', 'Extra Limbs': 'None', 'Feature': 'None', 'Flight': 'Free', 'Growth': 'Free', 'Immortality': 'None',
         'Immunity': 'None', 'Insubstantial': 'Free', 'Leaping': 'Free', 'Luck Control': 'Reaction', 'Morph': 'Free', 'Movement': 'Free', 'Permeate': 'Free',
         'Phantom Ranks': 'Free', 'Protection': 'None', 'Quickness': 'Free', 'Reality Warp': 'Free', 'Regeneration': 'None', 'Remote Sensing': 'Free',
         'Resistance': 'None', 'Senses': 'None', 'Shrinking': 'Free', 'Speed': 'Free', 'Swimming': 'Free', 'Teleport': 'Move', 'Variable': 'Standard'},
         'Standard'),
      defaultDuration: new MapDefault({'A God I Am': 'Continuous', 'Affliction': 'Instant', 'Attain Knowledge': 'Instant', 'Comprehend': 'Permanent',
         'Damage': 'Instant', 'Deflect': 'Instant', 'Extra Limbs': 'Permanent', 'Feature': 'Permanent', 'Healing': 'Instant', 'Immortality': 'Permanent',
         'Immunity': 'Permanent', 'Leaping': 'Instant', 'Luck Control': 'Instant', 'Mental Transform': 'Instant', 'Nullify': 'Instant',
         'Protection': 'Permanent', 'Reality Warp': 'Continuous', 'Regeneration': 'Permanent', 'Resistance': 'Permanent', 'Senses': 'Permanent',
         'Teleport': 'Instant', 'Weaken': 'Instant'}, 'Sustained'),
      defaultRange: new MapDefault({'Affliction': 'Close', 'Create': 'Ranged', 'Damage': 'Close', 'Deflect': 'Ranged', 'Environment': 'Close',
         'Healing': 'Close', 'Illusion': 'Perception', 'Luck Control': 'Perception', 'Mental Transform': 'Close', 'Mind Reading': 'Perception',
         'Mind Switch': 'Close', 'Move Object': 'Ranged', 'Nullify': 'Ranged', 'Reality Warp': 'Perception', 'Summon': 'Close', 'Summon Minion': 'Close',
         'Summon Object': 'Close', 'Transform': 'Close', 'Weaken': 'Close'}, 'Personal'),
      hasInputBaseCost: ['Attain Knowledge', 'Concealment', 'Enhanced Trait', 'Environment', 'Feature', 'Illusion',
         'Movement', 'Remote Sensing', 'Senses', 'Transform'],
      //TODO: in 1.x Movement always costs 2 (not input)
      isAttack: ['Affliction', 'Damage', 'Illusion', 'Mental Transform', 'Mind Reading', 'Mind Switch', 'Move Object', 'Nullify', 'Weaken']
   };
   Data2.Power = {
      actions: ['Standard', 'Move', 'Free', 'Reaction', 'None'],  //None isn't a choice
      durations: ['Concentration', 'Sustained', 'Continuous', 'Permanent', 'Instant'],  //Instant isn't a choice and Permanent cost weird
      godhoodNames: ['A God I Am', 'Reality Warp'],
      names: ['Affliction', 'Burrowing', 'Communication', 'Comprehend', 'Concealment', 'Create', 'Damage', 'Deflect', 'Elongation', 'Enhanced Trait',
         'Environment', 'Extra Limbs', 'Feature', 'Flight', 'Growth', 'Healing', 'Illusion', 'Immortality', 'Immunity', 'Insubstantial', 'Leaping',
         'Luck Control', 'Mind Reading', 'Morph', 'Move Object', 'Movement', 'Nullify', 'Protection', 'Quickness', 'Regeneration', 'Remote Sensing',
         'Senses', 'Shrinking', 'Speed', 'Summon', 'Swimming', 'Teleport', 'Transform', 'Variable', 'Weaken'],
      ranges: ['Close', 'Ranged', 'Perception', 'Personal']  //Personal isn't a choice
   };

   var skillLookup = {
      abilityMap: new MapDefault({'Acrobatics': 'Agility', 'Close Combat': 'Fighting', 'Common Knowledge': 'Intellect', 'Deception': 'Presence',
         'Expertise': 'Intellect', 'Insight': 'Awareness', 'Intimidation': 'Presence', 'Investigation': 'Intellect', 'Knowledge': 'Intellect',
         'Memory': 'Intellect', 'Perception': 'Awareness', 'Persuasion': 'Presence', 'Ranged Combat': 'Dexterity', 'Sleight of Hand': 'Dexterity',
         'Stealth': 'Agility', 'Strategy': 'Intellect', 'Technology': 'Intellect', 'Tracking': 'Awareness', 'Treatment': 'Intellect', 'Vehicles': 'Dexterity'},
         'Strength'),
      hasText: ['Close Combat', 'Expertise', 'Ranged Combat']
   };
   Data2.Skill = {
      names: ['Acrobatics', 'Athletics', 'Close Combat', 'Deception', 'Expertise', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion',
         'Ranged Combat', 'Sleight of Hand', 'Stealth', 'Technology', 'Treatment', 'Vehicles']
   };

   //if(1 === major) ;  //v1.x is already done (no delta)
   if (major >= 2)
   {
      //v1.x has 74 advantages but 36 of them are removed so I might as well redefine the array
      Data2.Advantage.names = ['Accurate Attack', 'All-out Attack', 'Attractive', 'Beginner\'s Luck', 'Benefit', 'Connected', 'Defensive Attack',
         'Defensive Roll', 'Diehard', 'Equipment', 'Evasion', 'Extraordinary Effort', 'Fast Grab', 'Improved Aim', 'Improved Critical', 'Improved Defense',
         'Improved Disarm', 'Improved Grab', 'Improved Hold', 'Improved Initiative', 'Improved Trip', 'Improvised Tools', 'Inspire', 'Instant Up',
         'Interpose', 'Jack of All Trades', 'Languages', 'Lucky', 'Meekness', 'Minion', 'Move-by Action', 'Power Attack', 'Prone Fighting', 'Quick Draw',
         'Seize Initiative', 'Sidekick', 'Skill Mastery', 'Teamwork', 'Trance', 'Ultimate Effort'];
      advantageLookup.costPerRank.set('Sidekick', 2);
      advantageLookup.maxRank.set('Improved Initiative', 5);

      Data2.Defense.Will.ability = 'Presence';

      extraNames.removeByValue('Affects Insubstantial');
      extraNames.removeByValue('Alternate Effect');
      extraNames.removeByValue('Dynamic Alternate Effect');
      extraNames.removeByValue('Incurable');
      extraNames.removeByValue('Sleep');
      extraNames.removeByValue('Triggered');
      extraNames.push('Existence Dependent');
      flawNames.removeByValue('Uncontrolled');
      flawNames = flawNames.concat(['Alternate Effect', 'Ammunition', 'Fragile', 'System Dependent', 'Uncontrollable Entirely', 'Uncontrollable Result', 'Uncontrollable Target']);
         //Alternate Effect is a flaw in 2.x even though it was mislabeled as an extra

      modifierLookup.cost.set('Attack', 1);
      modifierLookup.type.set('Attack', 'Rank');
      modifierLookup.maxRank.set('Diminished Range', 1);
      modifierLookup.cost.set('Impervious', 2);
      modifierLookup.maxRank.set('Impervious', Infinity);
      modifierLookup.type.set('Impervious', 'Flat');
      modifierLookup.cost.set('Increased Mass', 3);
      modifierLookup.type.set('Innate', 'Rank');
      modifierLookup.cost.set('Penetrating', 2);

      Data2.Power.actions = ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered', 'None'];  //None isn't a choice
      powerLookup.defaultAction.set('Variable', 'Full');
      powerLookup.baseCost.set('Growth', 6);
      powerLookup.baseCost.set('Immortality', 5);
      powerLookup.baseCost.set('Morph', 1);  //I could add/remove morph but this is nicer
      powerLookup.baseCost.set('Nullify', 3);
      powerLookup.baseCost.set('Regeneration', 3);
      powerLookup.baseCost.set('Shrinking', 3);
      Data2.Power.names.removeByValue('Burrowing');
      Data2.Power.names.removeByValue('Deflect');
      Data2.Power.names.removeByValue('Elongation');
      Data2.Power.names.removeByValue('Extra Limbs');
      Data2.Power.names.removeByValue('Speed');
      Data2.Power.names.removeByValue('Summon');
      Data2.Power.names.removeByValue('Swimming');
      Data2.Power.names = Data2.Power.names.concat(['Attain Knowledge', 'Mental Transform', 'Mind Switch',
         'Permeate', 'Phantom Ranks', 'Resistance', 'Summon Minion', 'Summon Object']);

      Data2.Skill.names = Data2.Skill.names.concat(['Common Knowledge', 'Knowledge', 'Memory', 'Strategy', 'Tracking']).sort();
      Data2.Skill.names.push('Other');  //must be last instead of sorted
      skillLookup.hasText = Data2.Skill.names.copy();
      //most of them have text except the following:
      skillLookup.hasText.removeByValue('Memory');
      skillLookup.hasText.removeByValue('Perception');
      skillLookup.hasText.removeByValue('Persuasion');
      skillLookup.hasText.removeByValue('Tracking');
   }
   if (major >= 3)
   {
      Data2.Advantage.names.removeByValue('Improved Critical');
      Data2.Advantage.names.removeByValue('Trance');  //moved to feature
      Data2.Advantage.names.push('Persistent Information');
      advantageLookup.maxRank.set('Inspire', 1);

      if(minor < 4) flawNames.push('Uncontrollable Activation');  //v3.0 added it then v3.4 removed it
      if (minor >= 4)
      {
         Data2.Power.actions.removeByValue('Triggered');  //Reaction is still here but is only sometimes a choice
         powerLookup.defaultAction.set('A God I Am', 'Free');
         powerLookup.defaultAction.set('Flight', 'Move');
         powerLookup.defaultAction.set('Leaping', 'Move');
         powerLookup.defaultAction.set('Movement', 'Move');
         powerLookup.defaultAction.set('Permeate', 'Move');
         powerLookup.defaultAction.set('Teleport', 'Move');
         powerLookup.allowReaction = ['Affliction', 'Damage', 'Feature', 'Luck Control', 'Mental Transform', 'Mind Switch', 'Nullify', 'Weaken'];
         powerLookup.isMovement = ['Flight', 'Leaping', 'Movement', 'Permeate', 'Teleport'];

         extraNames.push('Aura');
         flawNames.removeByValue('Grab-Based');
         modifierLookup.readOnly.push('Aura');
      }
      if(minor >= 5) extraNames.removeByValue('Secondary Effect');
   }

   var i, name, allNames;
   Data2.Advantage.names.sort();
   allNames = Data2.Advantage.names.concat(Data2.Advantage.godhoodNames);
   for (i = 0; i < allNames.length; ++i)
   {
      name = allNames[i];
      Data2.Advantage[name] = {
         name: name,
         costPerRank: advantageLookup.costPerRank.get(name),
         defaultText: advantageLookup.defaultText.get(name),
         hasText: advantageLookup.hasText.contains(name),
         maxRank: advantageLookup.maxRank.get(name)
      };
   }
   extraNames.sort();
   flawNames.sort();
   Data2.Modifier = {
      names: extraNames.concat(flawNames).concat(otherModifierNames)
   };
   for (i = 0; i < Data2.Modifier.names.length; ++i)
   {
      name = Data2.Modifier.names[i];
      Data2.Modifier[name] = {
         name: name,
         cost: modifierLookup.cost.get(name),
         defaultText: modifierLookup.defaultText.get(name),
         hasAutoRank: modifierLookup.hasAutoRank.contains(name),
         hasAutoTotal: modifierLookup.hasAutoTotal.contains(name),
         hasText: modifierLookup.hasText.contains(name),
         isActionRangeDuration: modifierLookup.actionRangeDuration.contains(name),
         isReadOnly: modifierLookup.readOnly.contains(name),
         maxRank: modifierLookup.maxRank.get(name),
         type: modifierLookup.type.get(name)
      };
   }
   Data2.Power.names.sort();
   allNames = Data2.Power.names.concat(Data2.Power.godhoodNames);
   for (i = 0; i < allNames.length; ++i)
   {
      name = allNames[i];
      Data2.Power[name] = {
         name: name,
         baseCost: powerLookup.baseCost.get(name),
         defaultAction: powerLookup.defaultAction.get(name),
         defaultDuration: powerLookup.defaultDuration.get(name),
         defaultRange: powerLookup.defaultRange.get(name),
         hasInputBaseCost: powerLookup.hasInputBaseCost.contains(name),
         isAttack: powerLookup.isAttack.contains(name)
      };
      if(undefined !== powerLookup.allowReaction) Data2.Power[name].allowReaction = powerLookup.allowReaction.contains(name);
      if(undefined !== powerLookup.isMovement) Data2.Power[name].isMovement = powerLookup.isMovement.contains(name);
   }
   for (i = 0; i < Data2.Skill.names.length; ++i)
   {
      name = Data2.Skill.names[i];
      Data2.Skill[name] = {
         name: name,
         ability: Data.Skill.abilityMap.get(name),
         hasText: Data.Skill.hasText.contains(name)
      };
   }
};
