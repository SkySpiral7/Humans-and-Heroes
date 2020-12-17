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
      this._blankPowerKey = MainObject.generateKey();

      this._calculateValues();
      props.callback(this);
   };

   //region Single line function section
   getAttackEffectRanks = () => {return this._derivedValues.attackEffectRanks;};
   getProtectionRankTotal = () => {return this._derivedValues.protectionRankTotal;};
   getSectionName = () => {return this.props.sectionName;};
   getState = () => {return JSON.clone(this.state);};
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
   /**This is only used by tests. Blank row is considered === arr.length to make it easier to hit DOM*/
   indexToKey = (rowIndex) =>
   {
      if (rowIndex === this._rowArray.length) return this._blankPowerKey;
      return this._rowArray[rowIndex].getKey();
   };
   /**This is only used by tests. Blank row is considered === arr.length to make it easier to hit DOM*/
   indexToPowerAndModifierKey = (powerIndex, modifierIndex) =>
   {
      if (powerIndex === this._rowArray.length) throw new AssertionError('Blank power row (' + key + ') has no modifiers');
      const powerKey = this._rowArray[powerIndex].getKey();
      const modifierKey = this._rowArray[powerIndex].getModifierList()
      .indexToKey(modifierIndex);
      return powerKey + '.' + modifierKey;
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
      /*equipment can't be god-like so exclude it
      don't check usingGodhoodPowers because global includes that
      don't call a main method for this because render should be pure.*/
      const generateGodHood = 'equipment' !== this.props.sectionName && this.state.main.godhood;

      const elementArray = this.state.it.map((_, powerIndex) =>
      {
         const powerRow = this._rowArray[powerIndex];
         //TODO: this is a work around and indicates a bug
         if (undefined === powerRow) return null;
         const rowKey = powerRow.getKey();
         return (<PowerRowHtml key={rowKey} keyCopy={rowKey}
                               powerRow={powerRow}
                               powerSection={this}
                               generateGodHood={generateGodHood} />);
      });
      elementArray.push(<PowerRowHtml key={this._blankPowerKey} keyCopy={this._blankPowerKey}
                                      powerRow={undefined}
                                      powerSection={this}
                                      generateGodHood={generateGodHood} />);

      return elementArray;
   };
   setMainState = (value) =>
   {
      /*don't prerender because ad list state isn't updating so we don't need to calculate anything just render.
      plus calling prerender causes a resolvable circle*/
      this.setState(state =>
      {
         state.main.godhood = value;
         return state;
      });
   };
   /**Onchange function for selecting a power*/
   updateEffectByKey = (newEffect, updatedKey) =>
   {
      const transcendence = Main.getTranscendence();
      const sectionName = this.props.sectionName;
      if (updatedKey === this._blankPowerKey)
      {
         const validStateAndDv = PowerObjectAgnostic.sanitizeStateAndGetDerivedValues({effect: newEffect}, sectionName,
            this._rowArray.length, transcendence);

         this._addRowNoSetState(validStateAndDv);

         this._prerender();
         this.setState(state =>
         {
            state.it.push(validStateAndDv.state);
            return state;
         });
         return;
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      if (!Data.Power.names.contains(newEffect))
      {
         this._removeRow(updatedIndex);
      }
      else
      {
         const validStateAndDv = PowerObjectAgnostic.sanitizeStateAndGetDerivedValues({effect: newEffect}, sectionName, updatedIndex,
            transcendence);

         this._rowArray[updatedIndex] = new PowerObjectAgnostic({
            key: this._rowArray[updatedIndex].getKey(),
            sectionName: this.props.sectionName,
            powerListParent: this,
            state: validStateAndDv.state,
            derivedValues: validStateAndDv.derivedValues,
            modifierKeyList: this._rowArray[updatedIndex].getModifierList()
            .getKeyList()
         });
         this._prerender();
         this.setState(state =>
         {
            state.it[updatedIndex] = validStateAndDv.state;
            return state;
         });
      }
   };
   /**Onchange function for everything else in power*/
   updatePropertyByKey = (propertyName, newValue, updatedKey) =>
   {
      if (updatedKey === this._blankPowerKey)
      {
         throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      const updatedIndex = this.getIndexByKey(updatedKey);
      let powerState = this._rowArray[updatedIndex].getState();

      //when change to Permanent duration change action to none
      if ('duration' === propertyName && 'Permanent' === newValue)
      {
         powerState.action = 'None';
      }
      //none is only for Permanent duration which this no longer is
      else if ('duration' === propertyName && 'Permanent' === powerState.duration)
      {
         powerState.action = Data.Power[powerState.effect].defaultAction;
         if ('None' === powerState.action) powerState.action = 'Free';
         //use default action if possible otherwise use Free
         //either way it will cost 0
      }
      //when changing to Aura change range to close
      else if (Main.getActiveRuleset()
         .isGreaterThanOrEqualTo(3, 4)
         && 'action' === propertyName && 'Reaction' === newValue
         && 'Feature' !== powerState.effect && 'Luck Control' !== powerState.effect)
      {
         powerState.range = 'Close';
      }

      powerState[propertyName] = newValue;

      const transcendence = Main.getTranscendence();
      const validStateAndDv = PowerObjectAgnostic.sanitizeStateAndGetDerivedValues(powerState, this.props.sectionName, updatedIndex,
         transcendence);
      powerState = validStateAndDv.state;

      //sanitizeState may have auto added/removed modifiers so adjust key list
      const modifierKeyList = this._rowArray[updatedIndex].getModifierList()
      .getKeyList();
      //grow as needed (>= because blank row has key but no state):
      while (powerState.Modifiers.length >= modifierKeyList.length)
      {
         modifierKeyList.push(MainObject.generateKey());
      }
      //shrink as needed (+1 for blank row):
      modifierKeyList.length = (powerState.Modifiers.length + 1);

      this._rowArray[updatedIndex] = new PowerObjectAgnostic({
         key: this._rowArray[updatedIndex].getKey(),
         sectionName: this.props.sectionName,
         powerListParent: this,
         state: powerState,
         derivedValues: validStateAndDv.derivedValues,
         modifierKeyList: modifierKeyList
      });
      this._prerender();
      this.setState(state =>
      {
         state.it[updatedIndex] = powerState;
         return state;
      });
   };
   /**Onchange function for selecting a modifier*/
   updateModifierNameByRow = (newName, powerRow, updatedModifierRow) =>
   {
      const powerIndex = this.getIndexByKey(powerRow.getKey());
      let powerState = this._rowArray[powerIndex].getState();
      const modifierSection = powerRow.getModifierList();
      const modifierKeyList = modifierSection.getKeyList();

      //if new is 'Select...' then newIsNonPersonal will be false (won't throw)
      const newIsNonPersonal = ModifierList.isNonPersonalModifier(newName);
      let oldWasNonPersonal = false;
      let modifierIndex = undefined;
      if (undefined !== updatedModifierRow)
      {
         modifierIndex = modifierSection.getIndexByKey(updatedModifierRow.key);
         oldWasNonPersonal = ModifierList.isNonPersonalModifier(powerState.Modifiers[modifierIndex].name);
      }

      //TODO: consider what to do about feature
      //non personal modifier was added
      if (!oldWasNonPersonal && newIsNonPersonal)
      {
         powerState.range = 'Close';

         const defaultDuration = Data.Power[powerState.effect].defaultDuration;
         //duration can't be permanent if range isn't personal
         if ('Permanent' === defaultDuration) powerState.duration = 'Sustained';
         else powerState.duration = defaultDuration;
         //use default duration if possible. otherwise use Sustained
         //either way it will cost 0

         //none is only for Permanent duration which this no longer is
         if ('None' === powerState.action)
         {
            powerState.action = Data.Power[powerState.effect].defaultAction;
            if ('None' === powerState.action) powerState.action = 'Free';
            //use default action if possible otherwise use Free
            //either way it will cost 0
         }
      }
      //non personal modifier was removed or changed to another mod
      else if (oldWasNonPersonal && !newIsNonPersonal)
      {
         //default range. no need to change other 2
         powerState.range = 'Personal';
      }

      if (undefined === updatedModifierRow)
      {
         powerState.Modifiers.push({name: newName});
         modifierKeyList.push(MainObject.generateKey());
      }
      //TODO: figure out how to handle duplicates
      else if (!Data.Modifier.names.contains(newName))
      {
         powerState.Modifiers.remove(modifierIndex);
         modifierKeyList.remove(modifierIndex);
      }
      else
      {
         //TODO: most of the time a new name should clear other state
         powerState.Modifiers[modifierIndex].name = newName;
      }

      const transcendence = Main.getTranscendence();
      const sectionName = this.props.sectionName;
      const validStateAndDv = PowerObjectAgnostic.sanitizeStateAndGetDerivedValues(powerState, sectionName, powerIndex, transcendence);
      this._rowArray[powerIndex] = new PowerObjectAgnostic({
         key: this._rowArray[powerIndex].getKey(),
         sectionName: this.props.sectionName,
         powerListParent: this,
         state: validStateAndDv.state,
         derivedValues: validStateAndDv.derivedValues,
         modifierKeyList: modifierKeyList
      });
      this._prerender();
      this.setState(state =>
      {
         state.it[powerIndex] = validStateAndDv.state;
         return state;
      });
   };
   /**Onchange function for modifier rank or text*/
   updateModifierPropertyByKey = (propertyName, newValue, powerRow, updatedKey) =>
   {
      const powerIndex = this.getIndexByKey(powerRow.getKey());
      const modifierSection = powerRow.getModifierList();
      const modifierIndex = modifierSection.getIndexByKey(updatedKey);

      let newModState = this._rowArray[powerIndex].getState();
      newModState.Modifiers[modifierIndex][propertyName] = newValue;

      const transcendence = Main.getTranscendence();
      const validStateAndDv = PowerObjectAgnostic.sanitizeStateAndGetDerivedValues(newModState, this.props.sectionName, powerIndex,
         transcendence);

      this._rowArray[powerIndex] = new PowerObjectAgnostic({
         key: this._rowArray[powerIndex].getKey(),
         sectionName: this.props.sectionName,
         powerListParent: this,
         state: validStateAndDv.state,
         derivedValues: validStateAndDv.derivedValues,
         modifierKeyList: this._rowArray[powerIndex].getModifierList()
         .getKeyList()
      });
      this._prerender();
      this.setState(state =>
      {
         state.it[powerIndex].Modifiers[modifierIndex] = validStateAndDv.state;
         return state;
      });
   };
   /**
    * Converts blank row into PowerObjectAgnostic and pushes to rowArray but doesn't update state
    * @param validStateAndDv must already be valid and from PowerObjectAgnostic.sanitizeStateAndGetDerivedValues
    * @return void
    */
   _addRowNoSetState = (validStateAndDv) =>
   {
      //the row that was blank no longer is so use the blank key
      //need a new key for each new mod (can be 1+ for load)
      const modifierKeyList = validStateAndDv.state.Modifiers.map(_ => MainObject.generateKey());
      modifierKeyList.push(MainObject.generateKey());  //for blank
      const powerObject = new PowerObjectAgnostic({
         key: this._blankPowerKey,
         sectionName: this.props.sectionName,
         powerListParent: this,
         state: validStateAndDv.state,
         derivedValues: validStateAndDv.derivedValues,
         modifierKeyList: modifierKeyList
      });
      //need a new key for the new blank power row
      this._blankPowerKey = MainObject.generateKey();
      this._rowArray.push(powerObject);
   };
   getIndexByKey = (key) =>
   {
      if (key === this._blankPowerKey) throw new AssertionError('Blank row (' + key + ') has no row index');
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
         const jsonPowerRow = JSON.clone(jsonSection[powerIndex]);
         jsonPowerRow.baseCost = jsonPowerRow.cost;
         delete jsonPowerRow.cost;
         jsonPowerRow.skillUsed = jsonPowerRow.skill;
         delete jsonPowerRow.skill;
         if (undefined !== jsonPowerRow.Modifiers)
         {
            jsonPowerRow.Modifiers = jsonPowerRow.Modifiers.map(jsonModRow =>
            {
               jsonModRow.rank = jsonModRow.applications;
               delete jsonModRow.applications;
               return jsonModRow;
            });
         }

         const validStateAndDv = PowerObjectAgnostic.sanitizeStateAndGetDerivedValues(jsonPowerRow, sectionName, powerIndex, transcendence);
         if (undefined !== validStateAndDv)
         {
            //already sent message if invalid
            newState.push(validStateAndDv.state);
            this._addRowNoSetState(validStateAndDv);
         }
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
      //TODO: resolve godhood circle:
      Main.update();
      //high CP needs to trigger godhood but prerender can't update state
   };
}

function createPowerList(callback, sectionName)
{
   ReactDOM.render(
      <PowerListAgnostic callback={callback} sectionName={sectionName} />,
      document.getElementById(sectionName + '-section')
   );
}
