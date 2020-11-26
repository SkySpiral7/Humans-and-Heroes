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

      this._calculateValues();
      props.callback(this);
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
   getRowByIndex = (rowIndex) => {return this._rowArray[rowIndex];};
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
      const elementArray = this.state.it.map((state, powerIndex) =>
      {
         const powerRow = this._rowArray[powerIndex];
         const rowKey = powerRow.getKey();
         //getDerivedValues makes a clone
         const rowDerivedValues = powerRow.getDerivedValues();
         //TODO: it's stupid that main use has several useless args
         const loadLocation = {toString: function () {throw new AssertionError('Should already be valid.');}};
         rowDerivedValues.possibleActions = PowerObjectAgnostic._validateAndGetPossibleActions(state, state, state.duration,
            loadLocation).choices;
         rowDerivedValues.possibleRanges = PowerObjectAgnostic._getPossibleRanges(state, state.action, state.range);
         rowDerivedValues.possibleDurations = PowerObjectAgnostic._validateAndGetPossibleDurations(state, state, state.range,
            loadLocation).choices;
         return (<PowerRowHtml key={rowKey} keyCopy={rowKey}
                               state={state}
                               derivedValues={rowDerivedValues}
                               sectionName={this.props.sectionName}
                               powerRow={powerRow}
                               powerSection={this} />);
      });
      elementArray.push(<PowerRowHtml key={this._blankKey} keyCopy={this._blankKey}
                                      state={{}}
                                      derivedValues={undefined}
                                      sectionName={this.props.sectionName}
                                      powerRow={undefined}
                                      powerSection={this} />);

      return elementArray;
   };
   /**Onchange function for selecting a power*/
   updateEffectByKey = (newEffect, updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         this._addRow(newEffect);
         return;
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      if (!Data.Power.names.contains(newEffect))
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         const state = this._rowArray[updatedIndex].getState();
         state.effect = newEffect;
         this._rowArray[updatedIndex] = new PowerObjectAgnostic({
            key: this._rowArray[updatedIndex].getKey(),
            sectionName: this.props.sectionName,
            powerListParent: this,
            state: state
         });
         this._prerender();
         this.setState(state =>
         {
            state.it[updatedIndex].effect = newEffect;
            return state;
         });
      }
   };
   /**Onchange function for base cost*/
   updatePropertyByKey = (propertyName, newValue, updatedKey) =>
   {
      if (updatedKey === this._blankKey)
      {
         throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      const state = this._rowArray[updatedIndex].getState();
      state[propertyName] = newValue;
      this._rowArray[updatedIndex] = new PowerObjectAgnostic({
         key: this._rowArray[updatedIndex].getKey(),
         sectionName: this.props.sectionName,
         powerListParent: this,
         state: state
      });
      this._prerender();
      this.setState(state =>
      {
         state.it[updatedIndex][propertyName] = newValue;
         return state;
      });
   };
   /**Creates a new row at the end of the array*/
   _addRow = (newEffect) =>
   {
      const powerObject = this._addRowNoPush(newEffect);

      this._rowArray.push(powerObject);
      this._prerender();
      this.setState(state =>
      {
         state.it.push(powerObject.getState());
         return state;
      });
   };
   /**Converts blank row into AdvantageObject but doesn't update rowArray or state*/
   _addRowNoPush = (newEffect) =>
   {
      //the row that was blank no longer is so use the blank key
      const transcendence = Main.getTranscendence();
      const sectionName = this.props.sectionName;
      const state = PowerObjectAgnostic.sanitizeState({effect: newEffect}, sectionName, this._rowArray.length, transcendence);
      const powerObject = new PowerObjectAgnostic({
         key: this._blankKey,
         sectionName: sectionName,
         powerListParent: this,
         state: state
      });
      //need a new key for the new blank row
      this._blankKey = MainObject.generateKey();
      return powerObject;
   };
   getIndexByKey = (key) =>
   {
      if (key === this._blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');
      for (let i = 0; i < this._rowArray.length; i++)
      {
         if (this._rowArray[i].getKey() === key) return i;
      }
      throw new AssertionError('No row with id ' + key + ' (rowArray.length=' + this._rowArray.length + ')');
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
      for (let i = 0; i < this._rowArray.length; i++)
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
      if (undefined !== Main && this !== Main.equipmentSection) Main.setPowerGodhood(usingGodhoodPowers);
   };
   /**Short hand version of Main.powerSection.getRowByIndex(0).getModifierList().getRowByIndex(0) is instead Main.powerSection.getModifierRowShort(0, 0)*/
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
      const transcendence = Main.getTranscendence();
      const sectionName = this.props.sectionName;
      const newState = [];
      for (let powerIndex = 0; powerIndex < jsonSection.length; powerIndex++)
      {
         const validRowState = PowerObjectAgnostic.sanitizeState(jsonSection[powerIndex], sectionName, powerIndex, transcendence);
         if (undefined !== validRowState) newState.push(validRowState);  //already sent message
      }

      this._prerender();
      this.setState(state =>
      {
         state.it = newState;
         return state;
      });
   };

   //'private' functions section. Although all public none of these should be called from outside of this object
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

function createPowerList(callback, sectionName)
{
   ReactDOM.render(
      <PowerListAgnostic callback={callback} sectionName={sectionName} />,
      document.getElementById(sectionName + '-section')
   );
}
