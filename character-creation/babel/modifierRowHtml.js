'use strict';

//TODO: doc
function ModifierRowHtml(props)
{
   const sectionName = props.powerRow.getSectionName();
   const powerRowIndex = props.powerRow.getRowIndex();
   const key = props.keyCopy;

   function idFor(elementLabel)
   {
      return sectionName + 'Modifier' + elementLabel + powerRowIndex + '.' + key;
   }

   const state = (undefined !== props.modifierRow)
      ? props.modifierRow.getState()
      : {name: undefined};

   /*
   mod row values used: TODO: update chart
   state: {powerRowIndex, name, rank};
   derivedValues: {costPerRank, hasRank, hasText, hasAutoTotal, rawTotal};
   */

   let nameElement = null;

   let amReadOnly = ('Selective' === state.name && 'Triggered' === props.powerRow.getAction());
   //Triggered requires Selective started between 2.0 and 2.5. Triggered is only an action in 2.x
   //Triggered's Selective is amReadOnly even for Feature
   if (!amReadOnly && undefined !== state.name &&
      props.powerRow.getEffect() !== 'Feature') amReadOnly = Data.Modifier[state.name].isReadOnly;
   if (!amReadOnly)
   {
      const options = Data.Modifier.names
      //equipment has removable built in and can't have the modifiers
      .filter(name => !(props.powerRow.getSection() === Main.equipmentSection &&
         (name === 'Removable' || name === 'Easily Removable')))
      .filter(name => props.powerRow.getEffect() === 'Feature' || !Data.Modifier[name].isReadOnly)
      .map(name =>
         <option key={name}>{name}</option>
      );
      const onChange = (event) =>
      {
         const nameGiven = event.target.value;

         if (undefined === state.name) props.powerRow.getModifierList()
         .addRow(event.target.value);
         else if (Data.Advantage.names.contains(nameGiven))
         {
            props.modifierRow.setModifier(nameGiven);
            props.modifierRow.getSection()
            .updateNameByKey(key);
         }
         //TODO: define updateNameByKey, removeByKey
         else props.modifierRow.getSection()
            .removeByKey(key);
      };
      //unshift = addFirst
      options.unshift(<option key="Select Modifier">Select Modifier</option>);

      nameElement = (<div className="col-12 col-sm-5 col-lg-4 col-xl-auto">
            <select id={idFor('Choices')} onChange={onChange}
                    value={state.name}>
               {options}
            </select>
         </div>
      );
   }
   else
   {
      //TODO: className un-DRY here
      nameElement = (<div className="col-12 col-sm-5 col-lg-4 col-xl-auto">
            <b>{state.name}</b>
         </div>
      );
   }

   let remainingElements = [];
   if (undefined !== state.name)  //done for blank
   {
      const derivedValues = props.modifierRow.getDerivedValues();

      if ('Attack' === state.name)
      {
         //TODO: changeName, changeSkill need update
         remainingElements.push(<div className="col-12 col-sm-6 col-lg-4" key="powerNameDiv">
            <PowerNameHtml sectionName={sectionName} rowIndex={powerRowIndex} currentValue={props.powerRow.getName()}
                           onChange={() => props.powerRow.changeName()} />
         </div>);
         if (props.powerRow.getRange() !== 'Perception')
         {
            remainingElements.push(<div className="col-12 col-sm-6 col-lg-4" key="powerSkillDiv">
               <PowerSkillHtml sectionName={sectionName} rowIndex={powerRowIndex} currentValue={props.powerRow.getSkillUsed()}
                               onChange={() => props.powerRow.changeSkill()} />
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
               remainingElements.push(
                  <div className="col-6 col-sm-3 col-xl-auto" key="rank">{'Cost ' + state.rank}</div>);
            }
            else
            {
               remainingElements.push(
                  <label className="col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto" key="rank">Applications{' '}
                     <input type="text" size="1" id={idFor('Rank')}
                            onChange={() => props.modifierRow.changeRank()} value={state.rank} />
                  </label>);
            }
         }
         if (derivedValues.hasText)
         {
            remainingElements.push(
               <label className="col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining" key="text">
                  Text&nbsp;
                  <input type="text" id={idFor('Text')} onChange={() => props.modifierRow.changeText()} value={state.text} /></label>);
         }
         //auto total must see total (it doesn't show ranks)
         if (derivedValues.hasAutoTotal)
         {
            remainingElements.push(<div className="col-auto" key="total">
               {'=&nbsp;' + derivedValues.autoTotal}</div>);
         }
         //if costPerRank isn't 1 then show total to show how much its worth,
         //if total doesn't match then it has had some cost quirk so show the total
         else if (Math.abs(derivedValues.costPerRank) > 1
            || derivedValues.rawTotal !== (derivedValues.costPerRank * state.rank))
         {
            remainingElements.push(<div className="col-auto" key="total">
               {'=&nbsp;' + derivedValues.rawTotal}</div>);
         }
      }
   }

   return (<div className="row">
      {nameElement}{remainingElements}
   </div>);
}
