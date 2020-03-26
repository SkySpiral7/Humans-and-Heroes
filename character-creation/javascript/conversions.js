'use strict';
/**This function is designed to sanitize numbers given by user input and to validate the number (if it is one).
More simply: it returns a valid integer based on the given input.
numberGiven: null safe converted into an integer if possible, if not possible defaultValue is returned
minimum: if numberGiven can be converted into an integer and it is less than minimum then the minimum is returned (pass in minimum of -Infinity to avoid this)
Note that the entire numberGiven is validated as a float then truncated meaning that '2z' is invalid but '-2.99' returns -2
*/
function sanitizeNumber(numberGiven, minimum, defaultValue)
{
   //TODO: add messageUser since it now has ui support. pass in errorCode, amLoading. use json
    //Number.isFinite can't simplify this because I need to pass in a string and fail on trailing text
    var value = (numberGiven+'').trim();  //null safe. convert the type to string in case it is something that isn't number or string
    if(value === '' || !isFinite(value)) return defaultValue;  //empty string is checked because isFinite('') === true
       //isFinite(NaN) === false && isFinite(-Infinity) === false
    value = Math.trunc(Number.parseFloat(value));  //trailing text is caught by isFinite
    if(value < minimum) return minimum;  //make minimum -Infinity to skip this (no one skips this step)
    //there are only 2 places that have a maximum: modifier and advantage
       //vs 5/6 that don't: ability, power/ equipment, skill, defense, transcendence
       //and of the 2 that do only requires 1 line in the file so sanitizeNumber doesn't handle maximums
    return value;
}

/**This function converts an xml string (of a valid saved document) into a json object and returns it.
This is used when loading an xml since json is used internally*/
function xmlToJson(xmlString)
{
    var json = {Hero: {}, Abilities: {}, Powers: [], Equipment: [], Advantages: [], Skills: [], Defenses: {}};  //skeleton so I don't need to create these later
    var xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');  //reference: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
       //this will parse before going to the next line (ie not asynchronous)
    var thisRow, i;  //temp variables used throughout

    if(xmlDoc.getElementsByTagName('Document')[0].hasAttribute('ruleset')) json.ruleset = xmlDoc.getElementsByTagName('Document')[0].getAttribute('ruleset');
    if(xmlDoc.getElementsByTagName('Document')[0].hasAttribute('version')) json.version = xmlDoc.getElementsByTagName('Document')[0].getAttribute('version');
    json.Hero.name = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('name');
    if(xmlDoc.getElementsByTagName('Hero')[0].hasAttribute('transcendence')) json.Hero.transcendence = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('transcendence');
    json.Hero.image = xmlDoc.getElementsByTagName('Hero')[0].getAttribute('image');

    var informationNode = xmlDoc.getElementsByTagName('Information')[0].childNodes;
    json.Information = '';  //stays empty if <Information></Information>
   for (i=0; i < informationNode.length; ++i)
   {
      json.Information += informationNode[i].nodeValue;  //if <Information>Any text</Information>. will have more than 1 if nested CDATA
   }

   for (i=0; i < Data.Ability.names.length; i++)
   {
       json.Abilities[Data.Ability.names[i]] = xmlDoc.getElementsByTagName(Data.Ability.names[i])[0].getAttribute('value');
   }

    json.Powers = convertXmlPowersBothToJson(xmlDoc.getElementsByTagName('Powers')[0].getElementsByTagName('Row'));
    json.Equipment = convertXmlPowersBothToJson(xmlDoc.getElementsByTagName('Equipment')[0].getElementsByTagName('Row'));

    var xmlSection = xmlDoc.getElementsByTagName('Advantages')[0].getElementsByTagName('Row');
   for (i=0; i < xmlSection.length; i++)
   {
       thisRow = {};
       thisRow.name = xmlSection[i].getAttribute('name');
       if(xmlSection[i].hasAttribute('rank')) thisRow.rank = xmlSection[i].getAttribute('rank');
       if(xmlSection[i].hasAttribute('text')) thisRow.text = xmlSection[i].getAttribute('text');
       json.Advantages.push(thisRow);
   }

    xmlSection = xmlDoc.getElementsByTagName('Skills')[0].getElementsByTagName('Row');
   for (i=0; i < xmlSection.length; i++)
   {
       thisRow = {};
       thisRow.name = xmlSection[i].getAttribute('name');
       if(xmlSection[i].hasAttribute('subtype')) thisRow.subtype = xmlSection[i].getAttribute('subtype');
       thisRow.rank = xmlSection[i].getAttribute('rank');
       thisRow.ability = xmlSection[i].getAttribute('ability');
       json.Skills.push(thisRow);
   }

   for (i=0; i < Data.Defense.names.length-1; i++)  //-1 to avoid toughness
   {
       json.Defenses[Data.Defense.names[i]] = xmlDoc.getElementsByTagName(Data.Defense.names[i])[0].getAttribute('value');
   }

    return json;

   /**This function converts the xml section pointer into a json object and returns it. This function is nested so that it is private*/
   function convertXmlPowersBothToJson(xmlSection)
   {
       var thisSection = [];
      for (var i=0; i < xmlSection.length; i++)
      {
          var thisRow = {};
          thisRow.effect = xmlSection[i].getAttribute('effect');
          if(xmlSection[i].hasAttribute('cost')) thisRow.cost = xmlSection[i].getAttribute('cost');
          thisRow.text = xmlSection[i].getAttribute('text');
          thisRow.action = xmlSection[i].getAttribute('action');
          thisRow.range = xmlSection[i].getAttribute('range');
          thisRow.duration = xmlSection[i].getAttribute('duration');
          if(xmlSection[i].hasAttribute('name')) thisRow.name = xmlSection[i].getAttribute('name');
          if(xmlSection[i].hasAttribute('skill')) thisRow.skill = xmlSection[i].getAttribute('skill');
          thisRow.rank = xmlSection[i].getAttribute('rank');

          var xmlModifiers = xmlSection[i].getElementsByTagName('Modifier');
          thisRow.Modifiers = [];
         for (var j=0; j < xmlModifiers.length; j++)
         {
             var thisModifier={};
             thisModifier.name = xmlModifiers[j].getAttribute('name');
             if(xmlModifiers[j].hasAttribute('applications')) thisModifier.applications = xmlModifiers[j].getAttribute('applications');
             if(xmlModifiers[j].hasAttribute('text')) thisModifier.text = xmlModifiers[j].getAttribute('text');
             thisRow.Modifiers.push(thisModifier);
         }
          thisSection.push(thisRow);
      }
       return thisSection;
   }
}

/**This function converts a json object (of valid internal data) into plain text as markdown and returns it
This is used to export as plain text since json is used internally*/
function jsonToMarkdown(jsonDoc, derivedValues)
{
   var i;  //loop variable used throughout
   var markdownString='# ' + jsonDoc.Hero.name + '\n';
   markdownString+='A character for Humans and Heroes v' + jsonDoc.ruleset+'\n';
   markdownString+='PL ' + derivedValues.powerLevel;
   if(undefined !== jsonDoc.Hero.transcendence) markdownString+=' (transcendence ' + jsonDoc.Hero.transcendence + ')';
   markdownString+='\n\n';

   markdownString+='## Abilities\n';
   for (i=0; i < Data.Ability.names.length; i++)
   {
      markdownString+='* ' + Data.Ability.names[i] + ': ' + jsonDoc.Abilities[Data.Ability.names[i]] + '\n';
   }
   markdownString+='\n';

   markdownString+= convertJsonPowersBothToMarkdown(jsonDoc.Powers, 'Powers');
   markdownString+= convertJsonPowersBothToMarkdown(jsonDoc.Equipment, 'Equipment');

   if (!jsonDoc.Advantages.isEmpty())
   {
      markdownString+='## Advantages\n';
      for (i=0; i < jsonDoc.Advantages.length; i++)
      {
         var thisRow = jsonDoc.Advantages[i];
         markdownString+='* '+thisRow.name;
         if(thisRow.rank !== undefined) markdownString+=' '+thisRow.rank;
         if(thisRow.text !== undefined) markdownString+='. '+thisRow.text;
         markdownString+='\n';
      }
      markdownString+='\n';
   }

   if (!jsonDoc.Skills.isEmpty())
   {
      markdownString+='## Skills\n';
      for (i=0; i < jsonDoc.Skills.length; i++)
      {
         var skillRow = jsonDoc.Skills[i];
         markdownString+='* '+skillRow.name;
         if(undefined !== skillRow.subtype && '' !== skillRow.subtype) markdownString+=': '+skillRow.subtype;
         markdownString+=' ('+skillRow.ability+') ';
         markdownString+=skillRow.rank;
         markdownString+='\n';
      }
      markdownString+='\n';
   }

   markdownString+='## Defenses\n';
   var defenseDerivedValues = Main.defenseSection.getDerivedValues();
   for (i=0; i < Data.Defense.names.length-1; i++)  //-1 to avoid toughness
   {
      var defenseName = Data.Defense.names[i];
      markdownString+='* ' + defenseName + ': ' + defenseDerivedValues[defenseName].totalBonus +' ('
         + jsonDoc.Defenses[defenseName] + ' ranks + '
         + defenseDerivedValues[defenseName].abilityValue + ' ' + Data.Defense[defenseName].ability + ')\n';
   }
   markdownString+='* Toughness: ' + defenseDerivedValues.Toughness.totalBonus;
   if(undefined !== defenseDerivedValues.Toughness.withoutDefensiveRoll)
      markdownString+=' ('+defenseDerivedValues.Toughness.withoutDefensiveRoll+' without Defensive Roll)';
   markdownString+='\n\n';

   markdownString+='## Point Totals\n';
   //TODO: should use derivedValues without calling methods (but requires top level state)
   if(0 !== Main.abilitySection.getTotal()) markdownString+='* Ability: '+Main.abilitySection.getTotal()+'\n';
   if(0 !== Main.powerSection.getTotal()) markdownString+='* Power: '+Main.powerSection.getTotal()+'\n';
   if(0 !== Main.advantageSection.getTotal()) markdownString+='* Advantage: '+Main.advantageSection.getTotal()+'\n';
   if(0 !== Main.skillSection.getTotal()) markdownString+='* Skill: '+Math.ceil(Main.skillSection.getTotal())+'\n';
   if(0 !== Main.defenseSection.getTotal()) markdownString+='* Defense: '+Main.defenseSection.getTotal()+'\n';
   if(0 !== derivedValues.characterPointsSpent) markdownString+='\n';
   markdownString+='Grand Total: '+Math.ceil(derivedValues.characterPointsSpent)+'/'+(derivedValues.powerLevel * 15)+'\n';
   markdownString+='Equipment Points: '+Main.equipmentSection.getTotal()+'/'+Main.advantageSection.getEquipmentMaxTotal()+'\n';
   //if skill total contains a half point
   if(0 !== Main.skillSection.getTotal() % 1) markdownString+='Unused skill rank: 1\n';  //it can only be 1 or 0
   markdownString+='\n\n';

   markdownString+='## More Info\n';
   markdownString+='![Character Image]('+jsonDoc.Hero.image+')\n';
   markdownString+=jsonDoc.Information + '\n';
   return markdownString;

   /**This function converts the json section into a markdown string and returns it. The name of the section is used to
    create the header. This function is nested so that it is private*/
   function convertJsonPowersBothToMarkdown(jsonSection, sectionName)
   {
      if(jsonSection.isEmpty()) return '';
      var sectionString = '## ' + sectionName + '\n';
      for (var i=0; i < jsonSection.length; i++)
      {
         sectionString+='* ';
         if (jsonSection[i].name !== undefined)
         {
            sectionString+=jsonSection[i].name;
            if(jsonSection[i].skill !== undefined) sectionString+=' ('+jsonSection[i].skill+')';
            sectionString+=': ';
         }

         sectionString+=jsonSection[i].effect + ' ';
         sectionString+=jsonSection[i].rank;
         if(jsonSection[i].cost !== undefined) sectionString+=' (base cost '+jsonSection[i].cost+')';
         sectionString+=', ' + jsonSection[i].action+', ';
         sectionString+=jsonSection[i].range+', ';
         sectionString+=jsonSection[i].duration;
         if('' !== jsonSection[i].text) sectionString+='. ' + jsonSection[i].text;
         sectionString+='\n';

         for (var j=0; j < jsonSection[i].Modifiers.length; j++)
         {
            var thisModifier=jsonSection[i].Modifiers[j];
            sectionString+='   - ' + thisModifier.name;
            if(thisModifier.applications !== undefined) sectionString+=' '+thisModifier.applications;
            if(thisModifier.text !== undefined) sectionString+='. '+thisModifier.text;
            sectionString+='\n';
         }
      }
      return sectionString + '\n';
   }
}
