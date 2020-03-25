'use strict';
/**Call List onChange
Select Skill: select(rowIndex);
Text: changeText(rowIndex);
Rank: changeRank(rowIndex);
Select Ability: selectAbility(rowIndex);  //needs to be saved for generating reasons
*/
function SkillObject(initialRowIndex)
{
   //private variable section:
   var state, derivedValues;

   //Basic getter section (all single line)
   this.doesHaveText=function(){return derivedValues.hasText;};
   this.getAbilityName=function(){return state.abilityName;};
   this.getName=function(){return state.name;};
   this.getRank=function(){return state.rank;};
   this.getText=function(){return state.text;};
   this.getTotalBonus=function(){return derivedValues.totalBonus;};

   //Single line function section (ignoring isBlank check)
   this.isBlank=function(){return (undefined === state.name);};
   /**Simple setter for totalBonus which is the sum of the ability value and skill rank. Or a string indicator if the ability is --.*/
   this.setTotalBonus=function(bonusGiven)
   {
       if(this.isBlank()) return;
       derivedValues.totalBonus = bonusGiven;  //number or string
   };
   this.setRowIndex=function(indexGiven){state.rowIndex=indexGiven;};

   //Onchange section
   /**Onchange function for selecting a skill*/
   this.select=function(){CommonsLibrary.select.call(this, this.setSkill, ('skillChoices'+state.rowIndex), Main.skillSection);};
   /**Onchange function for changing the text*/
   this.changeText=function(){CommonsLibrary.change.call(this, this.setText, ('skillText'+state.rowIndex), Main.skillSection);};
   /**Onchange function for changing the rank*/
   this.changeRank=function(){CommonsLibrary.change.call(this, this.setRank, ('skillRank'+state.rowIndex), Main.skillSection);};
   /**Onchange function for selecting an ability*/
   this.selectAbility=function(){CommonsLibrary.select.call(this, this.setAbility, ('skillAbility'+state.rowIndex), Main.skillSection);};

   //Value setting section
   /**Populates data of the skill by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/
   this.setSkill=function(nameGiven)
   {
       if(!Data.Skill.names.contains(nameGiven)){this._resetValues(); return;}
       state.name = nameGiven;
       state.rank = 1;
       state.abilityName = Data.Skill[state.name].ability;
       derivedValues.hasText = Data.Skill[state.name].hasText;
       if(state.name === 'Other') state.text = 'Skill Name and Subtype';  //doesn't exist in v1
       else if(derivedValues.hasText) state.text = 'Skill Subtype';
       else state.text = undefined;
   };
   /**Used to set data independent of the document and without calling update*/
   this.setText=function(textGiven)
   {
       if(this.isBlank()) return;
       if(!derivedValues.hasText) return;  //can only happen when loading
       state.text = textGiven.trim();  //trimmed in case it needs to match up with something else
   };
   /**Used to set data independent of the document and without calling update*/
   this.setRank=function(rankGiven)
   {
       if(this.isBlank()) return;
       state.rank = sanitizeNumber(rankGiven, 1, 1);
   };
   /**Used to set data independent of the document and without calling update. This function takes the ability's name*/
   this.setAbility=function(abilityNameGiven)
   {
       if(this.isBlank()) return;
       if(!Data.Ability.names.contains(abilityNameGiven)) return;  //only happens when loading bad data
       state.abilityName = abilityNameGiven;
   };

   //public function section
   /**This creates the page's html (for the row). called by skill section only*/
   this.generate=function()
   {
      return HtmlGenerator.skillRow(state, derivedValues);
   };
   /**Get the name of the skill appended with text to determine redundancy*/
   this.getUniqueName=function()
   {
       if(state.name === 'Close Combat' || state.name === 'Ranged Combat') return ('Combat: '+state.text);  //must not have the same text as each other
       if(derivedValues.hasText) return (state.name+': '+state.text);
       return state.name;
   };
   /**Returns a json object of this row's data*/
   this.save=function()
   {
      //don't just clone state: text is different
      var json = {};
      json.name = state.name;
      if (derivedValues.hasText) json.subtype = state.text;
      json.rank = state.rank;
      json.ability = state.abilityName;
      return json;
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   this._constructor=function()
   {
      state = {rowIndex: initialRowIndex};
      this._resetValues();
   };
   this._resetValues=function()
   {
      //index is not reset
      state = {rowIndex: state.rowIndex};
      derivedValues = {};
   };
   //constructor:
   this._constructor();
}
