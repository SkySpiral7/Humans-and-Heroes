'use strict';

//TODO: more doc (state, derivedValues)
/** @param props: powerRow, modifierRow, keyCopy */
function ModifierRowHtml(props)
{
   const sectionName = props.powerRow.getSectionName();
   const powerKey = props.powerRow.getKey();
   const key = props.keyCopy;
   const powerSection = props.powerRow.getSection();

   function idFor(elementLabel)
   {
      return sectionName + 'Modifier' + elementLabel + powerKey + '.' + key;
   }

   const state = (undefined !== props.modifierRow)
      ? props.modifierRow.state
      : {name: undefined};

   /*
   mod row values used: TODO: update chart
   state: {name, rank};
   derivedValues: {costPerRank, hasRank, hasText, hasAutoTotal, rawTotal};
   */

   let elementList = [];

   /*current range can't be personal unless default is personal and it doesn't already have a non personal modifier.
   if there is a non personal modifier then only that row should have the option*/
   const showNonPersonalOption = (props.powerRow.getRange() === 'Personal' || ModifierList.isNonPersonalModifier(state.name));
   let amReadOnly = ('Selective' === state.name && 'Triggered' === props.powerRow.getAction());
   //Triggered requires Selective started between 2.0 and 2.5. Triggered is only an action in 2.x
   //Triggered's Selective is amReadOnly even for Feature
   if (!amReadOnly && undefined !== state.name &&
      props.powerRow.getEffect() !== 'Feature') amReadOnly = Data.Modifier[state.name].isReadOnly;
   if (!amReadOnly)
   {
      const options = Data.Modifier.names
      //equipment has removable built in and can't have the modifiers
      //TODO: checking Main isn't an issue because it will exist for mod. but should check constant name instead
      .filter(name => !(props.powerRow.getSection() === Main.equipmentSection &&
         (name === 'Removable' || name === 'Easily Removable')))
      .filter(name => props.powerRow.getEffect() === 'Feature' || !Data.Modifier[name].isReadOnly)
      .filter(name => showNonPersonalOption || !ModifierList.isNonPersonalModifier(name))
      .map(name =>
         <option key={name}>{name}</option>
      );
      //unshift = addFirst
      options.unshift(<option key="Select Modifier">Select Modifier</option>);

      elementList.push(<div className="col-12 col-sm-5 col-lg-4 col-xl-auto" key="name">
            <select id={idFor('Choices')}
                    onChange={(event) =>
                    {
                       const nameGiven = event.target.value;
                       powerSection.updateModifierNameByRow(nameGiven, props.powerRow, props.modifierRow);
                    }}
                    value={state.name}>
               {options}
            </select>
         </div>
      );
   }
   else
   {
      //TODO: className un-DRY here
      elementList.push(<div className="col-12 col-sm-5 col-lg-4 col-xl-auto" key="name">
            <b>{state.name}</b>
         </div>
      );
   }

   if (undefined !== state.name)  //done for blank
   {
      const derivedValues = props.modifierRow.derivedValues;

      if ('Attack' === state.name)
      {
         elementList.push(<div className="col-12 col-sm-6 col-lg-4" key="powerNameDiv">
            <PowerNameHtml sectionName={sectionName} powerKey={powerKey} currentValue={props.powerRow.getName()}
                           onChange={(event) =>
                           {
                              const nameGiven = event.target.value;
                              powerSection.updatePropertyByKey('name', nameGiven, powerKey);
                           }} />
         </div>);
         if (props.powerRow.getRange() !== 'Perception')
         {
            elementList.push(<div className="col-12 col-sm-6 col-lg-4" key="powerSkillDiv">
               <PowerSkillHtml sectionName={sectionName} powerKey={powerKey} currentValue={props.powerRow.getSkillUsed()}
                               onChange={(event) =>
                               {
                                  const nameGiven = event.target.value;
                                  powerSection.updatePropertyByKey('skillUsed', nameGiven, powerKey);
                               }} />
            </div>);
         }
      }
      else  //attack doesn't have anything in this block so I might as well use else here
      {
         //if hasAutoTotal then hasRank is false
         if (derivedValues.hasRank)
         {
            //only Feature can change the ranks of these
            if (props.powerRow.getEffect() !== 'Feature' && Data.Modifier[state.name].hasAutoRank)
            {
               elementList.push(
                  <div className="col-6 col-sm-3 col-xl-auto" key="rank">{'Cost ' + state.rank}</div>);
            }
            else
            {
               //TODO: confirm spaces and non-breaking
               elementList.push(
                  <label className="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto" key="rank">Applications{' '}
                     <input type="text" size="1" id={idFor('Rank')}
                            onChange={(event) =>
                            {
                               const rankGiven = event.target.value;
                               powerSection.updateModifierPropertyByKey('rank', rankGiven, props.powerRow, props.modifierRow.key);
                            }} value={state.rank} />
                  </label>);
            }
         }
         if (derivedValues.hasText)
         {
            elementList.push(
               <label className="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining" key="text">
                  Text&nbsp;
                  <input type="text" id={idFor('Text')}
                         onChange={(event) =>
                         {
                            const textGiven = event.target.value;
                            powerSection.updateModifierPropertyByKey('text', textGiven, props.powerRow, props.modifierRow.key);
                         }} value={state.text} />
               </label>);
         }
         //auto total must see total (it doesn't show ranks)
         if (derivedValues.hasAutoTotal)
         {
            elementList.push(<div className="col-auto" key="total">
               {'=&nbsp;' + derivedValues.autoTotal}</div>);
         }
         //if costPerRank isn't 1 then show total to show how much its worth,
         //if total doesn't match then it has had some cost quirk so show the total
         else if (Math.abs(derivedValues.costPerRank) > 1
            || derivedValues.rawTotal !== (derivedValues.costPerRank * state.rank))
         {
            elementList.push(<div className="col-auto" key="total">
               {'=&nbsp;' + derivedValues.rawTotal}</div>);
         }
      }
   }

   return (<div className="row">
      {elementList}
   </div>);
}
