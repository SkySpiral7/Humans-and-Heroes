'use strict';

/**Updates:
 modifiers
 if (equipment)
 {
     Main.advantageSection.calculateValues();
     Main.advantageSection.generate();
 }
 Main.updateOffense();
 Main.defenseSection.calculateValues();

 Use (this === Main.equipmentSection) instead of checking the sectionName. but sectionName is still needed and passed for document reasons*/
class PowerListAgnostic extends React.Component
{
   constructor(props)
   {
      super(props);
      //state isn't allowed to be an array therefore everything is under the prop it
      //main is an external dependency
      this.state = {it: [], main: {godhood: false}};
      this._rowArray = [];
      this._derivedValues = {
         total: 0,
         protectionRankTotal: null,
         attackEffectRanks: new MapDefault({}, 0)
      };
      this._blankKey = MainObject.generateKey();
   };

   //region Single line function section
   getAttackEffectRanks = () => {return this._derivedValues.attackEffectRanks;};
   getProtectionRankTotal = () => {return this._derivedValues.protectionRankTotal;};
   getSectionName = () => {return this.props.sectionName;};
   getTotal = () => {return this._derivedValues.total;};
   //endregion Single line function section

   /**Removes all rows (main.godhood is untouched)*/
   clear = () =>
   {
      this._rowArray = [];
      this._prerender();
      this.setState(state =>
      {
         state.it = [];
         //doesn't change state.main
         return state;
      });
   };
   /**Returns the row object or nothing if the index is out of range. Used in order to call each onChange*/
   getRow = (rowIndex) => {return this._rowArray[rowIndex];};
   /**Returns an array of json objects for this section's data*/
   save = () =>
   {
      const json = [];
      for (let i = 0; i < this._rowArray.length; i++)
      {
         json.push(this._rowArray[i].save());
      }
      return json;  //might still be empty
   };
   /**This creates the page's html (for the section)*/
   render = () =>
   {
      this._rowArray = [];
      const elementArray = this.state.it.map(powerState =>
      {
         const callback = (newThing) => {this._rowArray.push(newThing);};
         const rowKey = MainObject.generateKey();
         return (<PowerObjectAgnostic key={rowKey} keyCopy={rowKey}
                                      sectionName={this.props.sectionName}
                                      powerListParent={this}
                                      state={powerState}
                                      callback={callback} />);
      });
      elementArray.push(<PowerRowHtml sectionName={this.props.sectionName} state={{}}
                                      key={this._blankKey} keyCopy={this._blankKey} />);
      return elementArray;
   };
   /**Removes the row from the array and updates the index of all others in the list.*/
   _removeRow = (rowIndex) =>
   {
      this._rowArray.remove(rowIndex);
      this._prerender();
      this.setState(state =>
      {
         state.it.remove(rowIndex);
         return state;
      });
   };
   /**Call this after updating rowArray but before setState*/
   _prerender = () =>
   {
      //don't update any state
      this._calculateValues();
      this._notifyDependent();
   };
   /**Counts totals etc. All values that are not user set or final are created by this method*/
   _calculateValues = () =>
   {
      this._derivedValues.attackEffectRanks.clear();
      this._derivedValues.protectionRankTotal = 0;  //this makes math easier. will be set to null at bottom as needed
      let usingGodhoodPowers = false;
      this._derivedValues.total = 0;
      for (let i = 0; i < this._rowArray.length - 1; i++)  //the last row is always blank
      {
         this._rowArray[i].calculateValues();  //will calculate rank and total
         const powerEffect = this._rowArray[i].getEffect();
         const rank = this._rowArray[i].getRank();
         if (Data.Power[powerEffect].isGodhood) usingGodhoodPowers = true;
         else if (1 === Main.getActiveRuleset().major && 'Protection' === powerEffect) this._derivedValues.protectionRankTotal += rank;
         //protection only stacks in v1
         else if ('Protection' === powerEffect && rank > this._derivedValues.protectionRankTotal) this._derivedValues.protectionRankTotal = rank;

         //TODO: bug? what if there's multiple of same skill? why not just return [] of indexes?
         if (this._rowArray[i].getName() !== undefined) this._derivedValues.attackEffectRanks.add(this._rowArray[i].getSkillUsed(), i);
         this._derivedValues.total += this._rowArray[i].getTotal();
      }
      //rank 0 is impossible. if it doesn't exist then use null instead
      if (0 === this._derivedValues.protectionRankTotal) this._derivedValues.protectionRankTotal = null;
      //equipment is always Godhood false. excluded to avoid messing up power Godhood
      if (this !== Main.equipmentSection) Main.setPowerGodhood(usingGodhoodPowers);
   };
   /**Short hand version of Main.powerSection.getRow(0).getModifierList().getRowByIndex(0) is instead Main.powerSection.getModifierRowShort(0, 0)*/
   getModifierRowShort = (powerRowIndex, modifierRowIndex) =>
   {
      //TODO: is range check needed?
      if (powerRowIndex >= powerRowIndex.length) return;  //range checking of modifierRowIndex will be handled in getRowByIndex
      return this._rowArray[powerRowIndex].getModifierList()
      .getRowByIndex(modifierRowIndex);
   };
   /**Sets data from a json object given then updates*/
   load = (jsonSection) =>
   {
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      for (let i = 0; i < jsonSection.length; i++)
      {
         const nameToLoad = jsonSection[i].effect;
         if (!Data.Power.names.contains(nameToLoad))
         {
            Main.messageUser('PowerListAgnostic.load.notExist', this.props.sectionName.toTitleCase() + ' #' + (i + 1) + ': ' +
               nameToLoad + ' is not a power name.');
            continue;
         }
         if (Data.Power[nameToLoad].isGodhood && !Main.canUseGodhood())
         {
            Main.messageUser('PowerListAgnostic.load.godhood', this.props.sectionName.toTitleCase() + ' #' + (i + 1) + ': ' +
               nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.');
            continue;
         }
         const rowPointer = this._rowArray.last();
         rowPointer.setPower(nameToLoad);  //must be done first
         if (undefined !== jsonSection[i].cost) rowPointer.setBaseCost(jsonSection[i].cost);
         rowPointer.setText(jsonSection[i].text);  //they all have text because descriptors

         rowPointer.disableValidationForActivationInfo();
         //TODO: turn on loading mod list
         //rowPointer.getModifierList().load(jsonSection[i].Modifiers);
         //modifiers are loaded first so that I can use isNonPersonalModifierPresent and reset the activation modifiers

         //blindly set activation info then validate
         rowPointer.setAction(jsonSection[i].action);
         rowPointer.setRange(jsonSection[i].range);
         rowPointer.setDuration(jsonSection[i].duration);
         //TODO: turn on these
         //rowPointer.validateActivationInfo();
         //rowPointer.updateActivationModifiers();

         if (undefined !== jsonSection[i].name) rowPointer.setName(jsonSection[i].name);
         if (undefined !== jsonSection[i].skill) rowPointer.setSkill(jsonSection[i].skill);  //skill requires name however perception range
                                                                                             // has name without skill
         rowPointer.generateNameAndSkill();  //TODO: should give warning about removing name and skill
         rowPointer.setRank(jsonSection[i].rank);

         this.addRow();
      }
      this.update();
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/
   addRow = () =>
   {
      //TODO: add rows
      this._rowArray.push(new PowerObjectAgnostic({
         powerListParent: this,
         initialRowIndex: this._rowArray.length,
         sectionName: this.props.sectionName
      }));
   };
   /**Updates other sections which depend on power section*/
   _notifyDependent = () =>
   {
      if (this === Main.equipmentSection)
      {
         //always call it even if total is 0 because the row may need to be removed
         Main.advantageSection.calculateEquipmentRank(this.getTotal());
      }
      Main.updateOffense();
      Main.defenseSection.calculateValues();
   };
}