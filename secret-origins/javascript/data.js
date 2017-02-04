'use strict';
const Data = {};
Data.Ability = {names: ['Strength', 'Agility', 'Fighting', 'Awareness', 'Stamina', 'Dexterity', 'Intellect', 'Presence']};
Data.SharedHtml = {
    powerName: function(sectionName, rowIndex){ return '          Name <input type="text" size="20" id="'+sectionName+ 'Name'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex +').changeName();" />\n';},
   powerSkill: function(sectionName, rowIndex){return '          Skill <input type="text" size="20" id="'+sectionName+'Skill'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeSkill();" />\n';}
};
//freeze the only ones that are never changed so that I don't accidentally change them
Object.freeze(Data.Ability);
Object.freeze(Data.SharedHtml);

/**This method changes all of the data to the major, minor ruleset passed in. The constructor of Main also calls this to initialize the rule dependant data.*/
Data.change = function(major, minor)
{
   Data.Advantage = {
      costPerRank: new MapDefault({'Beyond Mortal': 50, 'Let There Be': 40, 'Luck of the Gods': 5, 'Lucky': 5, 'Omnipresent': 5, 'Omniscient': 5,
         'Sidekick': 1, 'Stay Like That': 15, 'Variable Modifier': 35, 'Your Petty Rules Don\'t Apply to Me': 50}, 1),
      defaultText: new MapDefault({'Favored Environment': 'Environment', 'Favored Foe': 'Foe type', 'Languages': 'Languages Known',
         'Minion': 'Helper Name', 'Sidekick': 'Helper Name', 'Stay Like That': 'Power Modified', 'Supreme': 'Power Gained'}, 'Advantage Subtype'),
      godhoodNames: ['Beyond Mortal', 'Let There Be', 'Luck of the Gods', 'Omnipresent', 'Omniscient', 'Perfect Focus',
         'Stay Like That', 'Supreme', 'Variable Modifier', 'Your Petty Rules Don\'t Apply to Me'],
      mapThese: ['Close Attack', 'Defensive Roll', 'Improved Critical', 'Improved Initiative', 'Ranged Attack', 'Seize Initiative'],
      maxRank: new MapDefault({'Attractive': 2, 'Benefit': Infinity, 'Close Attack': Infinity, 'Daze': 2, 'Defensive Roll': Infinity,
         'Equipment': Infinity, 'Evasion': 2, 'Fascinate': Infinity, 'Improved Critical': 4, 'Improved Initiative': Infinity,
         'Improvised Weapon': Infinity, 'Inspire': 5, 'Languages': Infinity, 'Luck': Infinity, 'Lucky': 3, 'Minion': Infinity,
         'Omnipresent': 3, 'Omniscient': 5, 'Precise Attack': 4, 'Ranged Attack': Infinity, 'Second Chance': Infinity, 'Set-up': Infinity,
         'Sidekick': Infinity, 'Supreme': Infinity, 'Takedown': 2, 'Throwing Mastery': Infinity}, 1),
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
   Data.Advantage.hasText = Data.Advantage.defaultText.getAllKeys().concat(['Benefit', 'Improved Critical', 'Precise Attack', 'Second Chance', 'Skill Mastery', 'Ultimate Effort']);

   Data.Defense = {
      names:       [  'Dodge', 'Fortitude',    'Parry',      'Will', 'Toughness'],  //Toughness (Stamina) is listed for completeness (it isn't used)
      abilityUsed: ['Agility',   'Stamina', 'Fighting', 'Awareness',   'Stamina']   //this could be a map but it is only used in 1 place so I didn't bother
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
   Data.Modifier = {
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
      names: extraNames.concat(flawNames).concat(otherModifierNames),
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
   Data.Modifier.readOnly = Data.Modifier.actionRangeDuration.copy();
   Data.Modifier.hasAutoRank = Data.Modifier.hasAutoTotal.concat(Data.Modifier.actionRangeDuration);
   Data.Modifier.hasText = Data.Modifier.defaultText.getAllKeys().concat(['Feature', 'Limited', 'Noticeable', 'Quirk', 'Side Effect', 'Subtle', 'Triggered']).
      concat(otherModifierNames);

   Data.Power = {
      actions: ['Standard', 'Move', 'Free', 'Reaction', 'None'],  //None isn't a choice
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
      durations: ['Concentration', 'Sustained', 'Continuous', 'Permanent', 'Instant'],  //Instant isn't a choice and Permanent cost weird
      godhoodNames: ['A God I Am', 'Reality Warp'],
      hasInputBaseCost: ['Attain Knowledge', 'Concealment', 'Enhanced Trait', 'Environment', 'Feature', 'Illusion',
         'Movement', 'Remote Sensing', 'Senses', 'Transform'],
      //TODO: in 1.x Movement always costs 2 (not input)
      isAttack: ['Affliction', 'Damage', 'Illusion', 'Mental Transform', 'Mind Reading', 'Mind Switch', 'Move Object', 'Nullify', 'Weaken'],
      names: ['Affliction', 'Burrowing', 'Communication', 'Comprehend', 'Concealment', 'Create', 'Damage', 'Deflect', 'Elongation', 'Enhanced Trait',
         'Environment', 'Extra Limbs', 'Feature', 'Flight', 'Growth', 'Healing', 'Illusion', 'Immortality', 'Immunity', 'Insubstantial', 'Leaping',
         'Luck Control', 'Mind Reading', 'Morph', 'Move Object', 'Movement', 'Nullify', 'Protection', 'Quickness', 'Regeneration', 'Remote Sensing',
         'Senses', 'Shrinking', 'Speed', 'Summon', 'Swimming', 'Teleport', 'Transform', 'Variable', 'Weaken'],
      ranges: ['Close', 'Ranged', 'Perception', 'Personal']  //Personal isn't a choice
   };

   Data.Skill = {
      abilityMap: new MapDefault({'Acrobatics': 'Agility', 'Close Combat': 'Fighting', 'Common Knowledge': 'Intellect', 'Deception': 'Presence',
         'Expertise': 'Intellect', 'Insight': 'Awareness', 'Intimidation': 'Presence', 'Investigation': 'Intellect', 'Knowledge': 'Intellect',
         'Memory': 'Intellect', 'Perception': 'Awareness', 'Persuasion': 'Presence', 'Ranged Combat': 'Dexterity', 'Sleight of Hand': 'Dexterity',
         'Stealth': 'Agility', 'Strategy': 'Intellect', 'Technology': 'Intellect', 'Tracking': 'Awareness', 'Treatment': 'Intellect', 'Vehicles': 'Dexterity'},
         'Strength'),
      hasText: ['Close Combat', 'Expertise', 'Ranged Combat'],
      names: ['Acrobatics', 'Athletics', 'Close Combat', 'Deception', 'Expertise', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion',
         'Ranged Combat', 'Sleight of Hand', 'Stealth', 'Technology', 'Treatment', 'Vehicles']
   };

   if(1 === major) return;  //v1.x is already defined above
   if (major >= 2)
   {
      //v1.x has 74 advantages but 36 of them are removed so I might as well redefine the array
      Data.Advantage.names = ['Accurate Attack', 'All-out Attack', 'Attractive', 'Beginner\'s Luck', 'Benefit', 'Connected', 'Defensive Attack',
         'Defensive Roll', 'Diehard', 'Equipment', 'Evasion', 'Extraordinary Effort', 'Fast Grab', 'Improved Aim', 'Improved Critical', 'Improved Defense',
         'Improved Disarm', 'Improved Grab', 'Improved Hold', 'Improved Initiative', 'Improved Trip', 'Improvised Tools', 'Inspire', 'Instant Up',
         'Interpose', 'Jack of All Trades', 'Languages', 'Lucky', 'Meekness', 'Minion', 'Move-by Action', 'Power Attack', 'Prone Fighting', 'Quick Draw',
         'Seize Initiative', 'Sidekick', 'Skill Mastery', 'Teamwork', 'Trance', 'Ultimate Effort'];
      Data.Advantage.costPerRank.set('Sidekick', 2);
      Data.Advantage.maxRank.set('Improved Initiative', 5);

      Data.Defense.abilityUsed[Data.Defense.names.indexOf('Will')] = 'Presence';

      extraNames.removeByValue('Affects Insubstantial');
      extraNames.removeByValue('Alternate Effect');
      extraNames.removeByValue('Dynamic Alternate Effect');
      extraNames.removeByValue('Incurable');
      extraNames.removeByValue('Sleep');
      extraNames.removeByValue('Triggered');
      extraNames.push('Existence Dependent');
      extraNames.sort();
      flawNames.removeByValue('Uncontrolled');
      flawNames = flawNames.concat(['Alternate Effect', 'Ammunition', 'Fragile', 'System Dependent', 'Uncontrollable Entirely', 'Uncontrollable Result', 'Uncontrollable Target']);
         //Alternate Effect is a flaw in 2.x even though it was mislabeled as an extra
      flawNames.sort();
      Data.Modifier.names = extraNames.concat(flawNames).concat(otherModifierNames);

      Data.Modifier.cost.set('Attack', 1);
      Data.Modifier.type.set('Attack', 'Rank');
      Data.Modifier.maxRank.set('Diminished Range', 1);
      Data.Modifier.cost.set('Impervious', 2);
      Data.Modifier.maxRank.set('Impervious', Infinity);
      Data.Modifier.type.set('Impervious', 'Flat');
      Data.Modifier.cost.set('Increased Mass', 3);
      Data.Modifier.type.set('Innate', 'Rank');
      Data.Modifier.cost.set('Penetrating', 2);

      Data.Power.actions = ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered', 'None'];  //None isn't a choice
      Data.Power.defaultAction.set('Variable', 'Full');
      Data.Power.baseCost.set('Growth', 6);
      Data.Power.baseCost.set('Immortality', 5);
      Data.Power.baseCost.set('Morph', 1);  //I could add/remove morph but this is nicer
      Data.Power.baseCost.set('Nullify', 3);
      Data.Power.baseCost.set('Regeneration', 3);
      Data.Power.baseCost.set('Shrinking', 3);
      Data.Power.names.removeByValue('Burrowing');
      Data.Power.names.removeByValue('Deflect');
      Data.Power.names.removeByValue('Elongation');
      Data.Power.names.removeByValue('Extra Limbs');
      Data.Power.names.removeByValue('Speed');
      Data.Power.names.removeByValue('Summon');
      Data.Power.names.removeByValue('Swimming');
      Data.Power.names = Data.Power.names.concat(['Attain Knowledge', 'Mental Transform', 'Mind Switch',
         'Permeate', 'Phantom Ranks', 'Resistance', 'Summon Minion', 'Summon Object']).sort();

      Data.Skill.names = Data.Skill.names.concat(['Common Knowledge', 'Knowledge', 'Memory', 'Strategy', 'Tracking']).sort();
      Data.Skill.names.push('Other');  //must be last instead of sorted
      Data.Skill.hasText = Data.Skill.names.copy();
      //most of them have text except the following:
      Data.Skill.hasText.removeByValue('Memory');
      Data.Skill.hasText.removeByValue('Perception');
      Data.Skill.hasText.removeByValue('Persuasion');
      Data.Skill.hasText.removeByValue('Tracking');
   }
   if (major >= 3)
   {
      Data.Advantage.names.removeByValue('Improved Critical');
      Data.Advantage.names.removeByValue('Trance');  //moved to feature
      Data.Advantage.names.push('Persistent Information');
      Data.Advantage.names.sort();
      Data.Advantage.maxRank.set('Inspire', 1);

      if (minor < 4)  //v3.0 added it then v3.4 removed it
      {
         flawNames.push('Uncontrollable Activation');
         flawNames.sort();
         Data.Modifier.names = extraNames.concat(flawNames).concat(otherModifierNames);
      }
      if (minor >= 4)
      {
         Data.Power.actions.removeByValue('Triggered');  //Reaction is still here but is only sometimes a choice
         Data.Power.defaultAction.set('A God I Am', 'Free');
         Data.Power.defaultAction.set('Flight', 'Move');
         Data.Power.defaultAction.set('Leaping', 'Move');
         Data.Power.defaultAction.set('Movement', 'Move');
         Data.Power.defaultAction.set('Permeate', 'Move');
         Data.Power.defaultAction.set('Teleport', 'Move');
         Data.Power.allowReaction = ['Affliction', 'Damage', 'Feature', 'Luck Control', 'Mental Transform', 'Mind Switch', 'Nullify', 'Weaken'];

         Data.Modifier.readOnly.push('Aura');
         extraNames.push('Aura');
         extraNames.sort();
         flawNames.removeByValue('Grab-Based');
         Data.Modifier.names = extraNames.concat(flawNames).concat(otherModifierNames);
      }
      if (minor >= 5)
      {
         extraNames.removeByValue('Secondary Effect');
         Data.Modifier.names = extraNames.concat(flawNames).concat(otherModifierNames);
      }
   }
};
