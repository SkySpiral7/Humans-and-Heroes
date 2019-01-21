'use strict';
const Data = {};
Data.Ability = {names: ['Strength', 'Agility', 'Fighting', 'Dexterity', 'Stamina', 'Intellect', 'Awareness', 'Presence']};
Data.SharedHtml = {
    powerName: function(sectionName, rowIndex){ return '<label class="fill-remaining">Name&nbsp;<input type="text" id="'+sectionName+ 'Name'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex +').changeName();" /></label>\n';},
   powerSkill: function(sectionName, rowIndex){return '<label class="fill-remaining">Skill&nbsp;<input type="text" id="'+sectionName+'Skill'+rowIndex+'" onChange="Main.'+sectionName+'Section.getRow('+rowIndex+').changeSkill();" /></label>\n';}
};
//freeze the only ones that are never changed so that I don't accidentally change them
Object.freeze(Data.Ability);
Object.freeze(Data.SharedHtml);

/**This method changes all of the data to the version passed in.
The constructor of Main also calls this to initialize the rule dependant data.*/
Data.change = function(version)
{
   Data.Advantage = {
      mapThese: ['Close Attack', 'Defensive Roll', 'Improved Critical', 'Improved Initiative', 'Ranged Attack', 'Seize Initiative'],
      names: []
   };
   var advantageLookup = {
      costPerRank: new MapDefault({'Beyond Mortal': 50, 'Let There Be': 40, 'Luck of the Gods': 5, 'Lucky': 5, 'Omnipresent': 5, 'Omniscient': 5,
         'Sidekick': 1, 'Stay Like That': 15, 'Variable Modifier': 35, 'Your Petty Rules Don\'t Apply to Me': 50}, 1),
      defaultText: new MapDefault({'Favored Environment': 'Environment', 'Favored Foe': 'Foe type', 'Languages': 'Languages Known',
         'Minion': 'Helper Name', 'Sidekick': 'Helper Name', 'Stay Like That': 'Power Modified', 'Supreme': 'Power Gained'}, 'Advantage Subtype'),
      godhoodNames: ['Beyond Mortal', 'Let There Be', 'Luck of the Gods', 'Omnipresent', 'Omniscient', 'Perfect Focus',
         'Stay Like That', 'Supreme', 'Variable Modifier', 'Your Petty Rules Don\'t Apply to Me'],
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
   advantageLookup.hasText = advantageLookup.defaultText.getAllKeys().concat(['Benefit', 'Improved Critical', 'Precise Attack', 'Second Chance', 'Skill Mastery', 'Ultimate Effort']);

   Data.Defense = {
      names: ['Dodge', 'Parry', 'Will', 'Fortitude', 'Toughness'],
      Dodge: {ability: 'Agility', name: 'Dodge'},  //name is defined because all other data does this
      Parry: {ability: 'Fighting', name: 'Parry'},
      Will: {ability: 'Awareness', name: 'Will'},
      Fortitude: {ability: 'Stamina', name: 'Fortitude'},
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
      //cost could be a normal object but use MapDefault because everything else is
      cost: new MapDefault({'Ammunition': -1, 'Aura': 2, 'Fragile': -1, 'Other Flat Flaw': -1, 'Other Rank Flaw': -1, 'System Dependent': -2,
         'Uncontrollable Entirely': -5, 'Uncontrollable Result': -1, 'Uncontrollable Target': -1}, undefined),
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
   Data.Modifier = {names: []};

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
      godhoodNames: ['A God I Am', 'Reality Warp'],
      hasInputBaseCost: ['Attain Knowledge', 'Concealment', 'Enhanced Trait', 'Environment', 'Feature', 'Illusion',
         'Remote Sensing', 'Senses', 'Transform'],
      isAttack: ['Affliction', 'Damage', 'Illusion', 'Mental Transform', 'Mind Reading', 'Mind Switch', 'Move Object', 'Nullify', 'Weaken'],
      names: ['Affliction', 'Burrowing', 'Communication', 'Comprehend', 'Concealment', 'Create', 'Damage', 'Deflect', 'Elongation', 'Enhanced Trait',
         'Environment', 'Extra Limbs', 'Feature', 'Flight', 'Growth', 'Healing', 'Illusion', 'Immortality', 'Immunity', 'Insubstantial', 'Leaping',
         'Luck Control', 'Mind Reading', 'Morph', 'Move Object', 'Movement', 'Nullify', 'Protection', 'Quickness', 'Regeneration', 'Remote Sensing',
         'Senses', 'Shrinking', 'Speed', 'Summon', 'Swimming', 'Teleport', 'Transform', 'Variable', 'Weaken'],
   };
   Data.Power = {
      actions: ['Standard', 'Move', 'Free', 'Reaction', 'None'],  //None isn't a choice
      durations: ['Concentration', 'Sustained', 'Continuous', 'Permanent', 'Instant'],  //Instant isn't a choice and Permanent cost weird
      names: [],
      ranges: ['Close', 'Ranged', 'Perception', 'Personal']  //Personal isn't a choice
   };

   var skillLookup = {
      abilityMap: new MapDefault({'Acrobatics': 'Agility', 'Close Combat': 'Fighting', 'Common Knowledge': 'Intellect', 'Deception': 'Presence',
         'Expertise': 'Intellect', 'Insight': 'Awareness', 'Intimidation': 'Presence', 'Investigation': 'Intellect', 'Knowledge': 'Intellect',
         'Memory': 'Intellect', 'Perception': 'Awareness', 'Persuasion': 'Presence', 'Ranged Combat': 'Dexterity', 'Sleight of Hand': 'Dexterity',
         'Stealth': 'Agility', 'Strategy': 'Intellect', 'Technology': 'Intellect', 'Tracking': 'Awareness', 'Treatment': 'Intellect', 'Vehicles': 'Dexterity'},
         'Strength'),
      hasText: ['Close Combat', 'Expertise', 'Ranged Combat'],
      names: ['Acrobatics', 'Athletics', 'Close Combat', 'Deception', 'Expertise', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion',
         'Ranged Combat', 'Sleight of Hand', 'Stealth', 'Technology', 'Treatment', 'Vehicles']
   };
   Data.Skill = {names: []};

   var i, newNames;
   newNames = advantageLookup.names;
   for (i = 0; i < newNames.length; ++i)
   {
      addAdvantage(newNames[i]);
   }
   newNames = extraNames.concat(flawNames).concat(otherModifierNames);
   for (i = 0; i < newNames.length; ++i)
   {
      addModifier(newNames[i]);
   }
   newNames = powerLookup.names;
   for (i = 0; i < newNames.length; ++i)
   {
      addPower(newNames[i]);
   }
   newNames = skillLookup.names;
   for (i = 0; i < newNames.length; ++i)
   {
      addSkill(newNames[i]);
   }

   //if(1 === version.major) ;  //v1.0 is already done (no delta). only thing left is sorting
   if (version.major >= 2)
   {
      //v1.0 has 74 advantages but 36 of them are removed so I might as well redefine Data.Advantage
      Data.Advantage = {mapThese: Data.Advantage.mapThese};  //keep the value for mapThese
      Data.Advantage.names = [];
      newNames = ['Accurate Attack', 'All-out Attack', 'Attractive', 'Beginner\'s Luck', 'Benefit', 'Connected', 'Defensive Attack',
         'Defensive Roll', 'Diehard', 'Equipment', 'Evasion', 'Extraordinary Effort', 'Fast Grab', 'Improved Aim', 'Improved Critical', 'Improved Defense',
         'Improved Disarm', 'Improved Grab', 'Improved Hold', 'Improved Initiative', 'Improved Trip', 'Improvised Tools', 'Inspire', 'Instant Up',
         'Interpose', 'Jack of All Trades', 'Languages', 'Lucky', 'Meekness', 'Minion', 'Move-by Action', 'Power Attack', 'Prone Fighting', 'Quick Draw',
         'Seize Initiative', 'Sidekick', 'Skill Mastery', 'Teamwork', 'Trance', 'Ultimate Effort'].concat(advantageLookup.godhoodNames);
      for (i = 0; i < newNames.length; ++i)
      {
         addAdvantage(newNames[i]);
      }
      Data.Advantage.Sidekick.costPerRank = 2;
      Data.Advantage['Improved Initiative'].maxRank = 5;

      Data.Defense['Will'].ability = 'Presence';

      remove(Data.Modifier, 'Affects Insubstantial');
      remove(Data.Modifier, 'Dynamic Alternate Effect');
      remove(Data.Modifier, 'Incurable');
      remove(Data.Modifier, 'Sleep');
      remove(Data.Modifier, 'Triggered');
      remove(Data.Modifier, 'Uncontrolled');
      addModifier('Existence Dependent');
      addModifier('Ammunition');
      addModifier('Fragile');
      addModifier('System Dependent');
      addModifier('Uncontrollable Entirely');
      addModifier('Uncontrollable Result');
      addModifier('Uncontrollable Target');
      Data.Modifier['Alternate Effect'].cost = -1;
         //Alternate Effect is a flaw in 2.x even though it was mislabeled as an extra

      Data.Modifier.Attack.cost = 1;
      Data.Modifier.Attack.type = 'Rank';
      Data.Modifier['Diminished Range'].maxRank = 1;
      Data.Modifier['Impervious'].cost = 2;
      Data.Modifier['Impervious'].maxRank = Infinity;
      Data.Modifier.Impervious.type = 'Flat';
      Data.Modifier['Increased Mass'].cost = 3;
      Data.Modifier.Innate.type = 'Rank';
      Data.Modifier['Penetrating'].cost = 2;

      Data.Power.actions = ['Slow', 'Full', 'Standard', 'Move', 'Free', 'Reaction', 'Triggered', 'None'];  //None isn't a choice
      Data.Power['Movement'].hasInputBaseCost = true;
      Data.Power['Variable'].defaultAction = 'Full';
      Data.Power['Growth'].baseCost = 6;
      Data.Power['Immortality'].baseCost = 5;
      Data.Power['Morph'].baseCost = 1;
      Data.Power['Nullify'].baseCost = 3;
      Data.Power['Regeneration'].baseCost = 3;
      Data.Power['Shrinking'].baseCost = 3;
      remove(Data.Power, 'Burrowing');
      remove(Data.Power, 'Deflect');
      remove(Data.Power, 'Elongation');
      remove(Data.Power, 'Extra Limbs');
      remove(Data.Power, 'Speed');
      remove(Data.Power, 'Summon');
      remove(Data.Power, 'Swimming');
      addPower('Attain Knowledge');
      addPower('Mental Transform');
      addPower('Mind Switch');
      addPower('Permeate');
      addPower('Phantom Ranks');
      addPower('Resistance');
      addPower('Summon Minion');
      addPower('Summon Object');
      addPower('A God I Am');
      addPower('Reality Warp');

      addSkill('Common Knowledge');
      addSkill('Knowledge');
      addSkill('Memory');
      addSkill('Strategy');
      addSkill('Tracking');
      addSkill('Other');
      skillLookup.hasText = Data.Skill.names.copy();
      //most of them have text except the following:
      skillLookup.hasText.removeByValue('Memory');
      skillLookup.hasText.removeByValue('Perception');
      skillLookup.hasText.removeByValue('Persuasion');
      skillLookup.hasText.removeByValue('Tracking');
      for (i = 0; i < Data.Skill.names.length; ++i)
      {
         Data.Skill[Data.Skill.names[i]].hasText = skillLookup.hasText.contains(Data.Skill.names[i]);
      }
   }

   if (version.major >= 3)
   {
      remove(Data.Advantage, 'Improved Critical');
      remove(Data.Advantage, 'Trance');  //moved to feature
      addAdvantage('Persistent Information');
      Data.Advantage.Inspire.maxRank = 1;

      if(version.isLessThan(3, 4)) addModifier('Uncontrollable Activation');  //v3.0 added it then v3.4 removed it
      if (version.isGreaterThanOrEqualTo(3, 4))
      {
         Data.Power.actions.removeByValue('Triggered');  //Reaction is still here but is only sometimes a choice
         Data.Power['A God I Am'].defaultAction = 'Free';
         Data.Power['Flight'].defaultAction = 'Move';
         Data.Power['Leaping'].defaultAction = 'Move';
         Data.Power['Movement'].defaultAction = 'Move';
         Data.Power['Permeate'].defaultAction = 'Move';
         Data.Power['Teleport'].defaultAction = 'Move';

         var allowReaction = ['Affliction', 'Damage', 'Feature', 'Luck Control', 'Mental Transform', 'Mind Switch', 'Nullify', 'Weaken'];
         var isMovement = ['Flight', 'Leaping', 'Movement', 'Permeate', 'Teleport'];
         var name;
         for (i = 0; i < Data.Power.names.length; ++i)
         {
            name = Data.Power.names[i];
            Data.Power[name].allowReaction = allowReaction.contains(name);
            Data.Power[name].isMovement = isMovement.contains(name);
         }

         addModifier('Aura');
         Data.Modifier.Aura.isReadOnly = true;
         remove(Data.Modifier, 'Grab-Based');
      }
      if(version.isGreaterThanOrEqualTo(3, 5)) remove(Data.Modifier, 'Secondary Effect');
      if (version.isGreaterThanOrEqualTo(3, 9))
      {
         Data.Power.Transform.baseCost = 1;
         Data.Power.Transform.hasInputBaseCost = false;

         remove(Data.Modifier, 'Increased Mass');  //moved into the specific pages
      }
   }

   if (version.major >= 4)
   {
      //v3.x has 22 skills -10 +8 = 20. not redefining so you can see the diff
      remove(Data.Skill, 'Common Knowledge');
      remove(Data.Skill, 'Expertise');
      remove(Data.Skill, 'Intimidation');
      remove(Data.Skill, 'Memory');
      remove(Data.Skill, 'Strategy');
      remove(Data.Skill, 'Technology');
      remove(Data.Skill, 'Tracking');
      remove(Data.Skill, 'Treatment');
      remove(Data.Skill, 'Vehicles');
      remove(Data.Skill, 'Other');
      addSkill('Competition');  //addSkill adds the unused ability property. some will have bad defaults for now.
      addSkill('Contortion');
      addSkill('Craft');
      addSkill('Engineering');
      addSkill('Handle Animal');
      addSkill('Medical');
      addSkill('Performance');
      addSkill('Survival');
      //will need to update all skill's hasText (not just ones added)
      skillLookup.hasText = ['Close Combat', 'Competition', 'Craft', 'Engineering', 'Knowledge', 'Performance', 'Ranged Combat'];
      for (i = 0; i < Data.Skill.names.length; ++i)
      {
         Data.Skill[Data.Skill.names[i]].hasText = skillLookup.hasText.contains(Data.Skill.names[i]);
         //ability isn't used by 4.0 calc so delete it
         delete Data.Skill[Data.Skill.names[i]].ability;
      }
   }

   sortData();

   function addAdvantage(nameToAdd)
   {
      if(Data.Advantage[nameToAdd] !== undefined || Data.Advantage.names.contains(nameToAdd)) throw new Error(nameToAdd + ' is already an Advantage');
      Data.Advantage.names.push(nameToAdd);
      Data.Advantage[nameToAdd] = {
         name: nameToAdd,
         costPerRank: advantageLookup.costPerRank.get(nameToAdd),
         defaultText: advantageLookup.defaultText.get(nameToAdd),
         hasText: advantageLookup.hasText.contains(nameToAdd),
         isGodhood: advantageLookup.godhoodNames.contains(nameToAdd),
         maxRank: advantageLookup.maxRank.get(nameToAdd)
      };
   }
   function addPower(nameToAdd)
   {
      if(Data.Power[nameToAdd] !== undefined || Data.Power.names.contains(nameToAdd)) throw new Error(nameToAdd + ' is already a Power');
      Data.Power.names.push(nameToAdd);
      Data.Power[nameToAdd] = {
         name: nameToAdd,
         baseCost: powerLookup.baseCost.get(nameToAdd),
         defaultAction: powerLookup.defaultAction.get(nameToAdd),
         defaultDuration: powerLookup.defaultDuration.get(nameToAdd),
         defaultRange: powerLookup.defaultRange.get(nameToAdd),
         hasInputBaseCost: powerLookup.hasInputBaseCost.contains(nameToAdd),
         isAttack: powerLookup.isAttack.contains(nameToAdd),
         isGodhood: powerLookup.godhoodNames.contains(nameToAdd)
      };
   }
   function addModifier(nameToAdd)
   {
      if(Data.Modifier[nameToAdd] !== undefined || Data.Modifier.names.contains(nameToAdd)) throw new Error(nameToAdd + ' is already a Modifier');
      Data.Modifier.names.push(nameToAdd);
      Data.Modifier[nameToAdd] = {
         name: nameToAdd,
         cost: modifierLookup.cost.get(nameToAdd),
         defaultText: modifierLookup.defaultText.get(nameToAdd),
         hasAutoRank: modifierLookup.hasAutoRank.contains(nameToAdd),
         hasAutoTotal: modifierLookup.hasAutoTotal.contains(nameToAdd),
         hasText: modifierLookup.hasText.contains(nameToAdd),
         isActionRangeDuration: modifierLookup.actionRangeDuration.contains(nameToAdd),
         isReadOnly: modifierLookup.readOnly.contains(nameToAdd),
         maxRank: modifierLookup.maxRank.get(nameToAdd),
         type: modifierLookup.type.get(nameToAdd)
      };
      if (undefined === Data.Modifier[nameToAdd].cost)
      {
         if('Free' === Data.Modifier[nameToAdd].type) Data.Modifier[nameToAdd].cost = 0;
         else if(flawNames.contains(nameToAdd)) Data.Modifier[nameToAdd].cost = -1;
         else Data.Modifier[nameToAdd].cost = 1;
      }
   }
   function addSkill(nameToAdd)
   {
      if(Data.Skill[nameToAdd] !== undefined || Data.Skill.names.contains(nameToAdd)) throw new Error(nameToAdd + ' is already a Skill');
      Data.Skill.names.push(nameToAdd);
      Data.Skill[nameToAdd] = {
         name: nameToAdd,
         ability: skillLookup.abilityMap.get(nameToAdd),
         hasText: skillLookup.hasText.contains(nameToAdd)
      };
   }
   function remove(objectToModify, nameToRemove)
   {
      if(objectToModify[nameToRemove] === undefined || !objectToModify.names.contains(nameToRemove)) throw new Error(nameToRemove + ' is not here');
      delete objectToModify[nameToRemove];
      objectToModify.names.removeByValue(nameToRemove);
   }
   function sortData()
   {
      var aFirst = -1, bFirst = 1;
      Data.Advantage.names.sort(function(a, b)
      {
         if(!Data.Advantage[a].isGodhood && Data.Advantage[b].isGodhood) return aFirst;
         if(Data.Advantage[a].isGodhood && !Data.Advantage[b].isGodhood) return bFirst;

         if(a < b) return aFirst;
         return bFirst;  //can't be a tie
      });

      Data.Power.names.sort(function(a, b)
      {
         if(!Data.Power[a].isGodhood && Data.Power[b].isGodhood) return aFirst;
         if(Data.Power[a].isGodhood && !Data.Power[b].isGodhood) return bFirst;

         if(a < b) return aFirst;
         return bFirst;  //can't be a tie
      });

      Data.Modifier.names.sort(function(a, b)
      {
         var aIsOther = otherModifierNames.contains(a);
         var bIsOther = otherModifierNames.contains(b);
         if(!aIsOther && bIsOther) return aFirst;
         if(aIsOther && !bIsOther) return bFirst;
         if (aIsOther && bIsOther)
         {
            if(otherModifierNames.indexOf(a) < otherModifierNames.indexOf(b)) return aFirst;
            return bFirst;  //can't be a tie
         }

         //extras first
         if(Data.Modifier[a].cost >= 0 && Data.Modifier[b].cost < 0) return aFirst;
         if(Data.Modifier[a].cost < 0 && Data.Modifier[b].cost >= 0) return bFirst;

         if(a < b) return aFirst;
         return bFirst;  //can't be a tie
      });
      Data.Skill.names.sort(function(a, b)
      {
         if('Other' === a) return bFirst;
         if('Other' === b) return aFirst;

         if(a < b) return aFirst;
         return bFirst;  //can't be a tie
      });
   }
};
