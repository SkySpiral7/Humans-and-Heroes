'use strict';

//TODO: more doc (state, derivedValues)
/** @param props: keyCopy, powerRow, powerSection, generateGodHood */
function PowerRowHtml(props)
{
   const key = props.keyCopy;
   const displayGodhood = props.generateGodHood;
   const sectionName = props.powerSection.getSectionName();

   const state = (undefined !== props.powerRow)
      ? props.powerRow.getState()
      : {effect: undefined};
   const derivedValues = (undefined !== props.powerRow)
      ? props.powerRow.getDerivedValues()
      : undefined;

   /*
   values used:
   var state = {rowIndex, effect, skillUsed};
   var derivedValues = {possibleActions, possibleRanges, possibleDurations, canSetBaseCost};
   */

   function idFor(elementLabel)
   {
      return sectionName + elementLabel + key;
   }

   function onChangeFor(propertyName)
   {
      return (event =>
      {
         const valueGiven = event.target.value;
         props.powerSection.updatePropertyByKey(propertyName, valueGiven, key);
      });
   }

   let topElementList = [];
   let rowList = [], rowElementList = [];

   let options = Data.Power.names
   .filter(name => displayGodhood || !Data.Power[name].isGodhood)
   .map(name =>
      <option key={name}>{name}</option>
   );

   //unshift = addFirst
   options.unshift(<option key="Select Power">Select Power</option>);

   rowElementList.push(<div className="col-12 col-sm-6 col-xl-auto" key="Choices">
      <select id={idFor('Choices')}
              onChange={(event) =>
              {
                 const nameGiven = event.target.value;
                 props.powerSection.updateEffectByKey(nameGiven, key);
              }} value={state.effect}>
         {options}
      </select>
   </div>);

   if (undefined !== state.effect)
   {
      if (derivedValues.canSetBaseCost)
      {
         rowElementList.push(<label className="col" key="BaseCost">{'Base Cost per Rank: '}
            <input type="text" size="1" id={idFor('BaseCost')}
                   onChange={onChangeFor('baseCost')} value={state.baseCost} />
         </label>);
      }
      else
      {
         rowElementList.push(<div className="col" key="BaseCost">{'Base Cost per Rank: '}
            <span id={idFor('BaseCost')} style={{display: 'inline-block', width: '50px', textAlign: 'center'}}>{state.baseCost}</span>
         </div>);
      }
   }

   rowList.push(<div className="row" key="power/cost">
      {rowElementList}
   </div>);
   rowElementList = [];

   if (undefined !== state.effect)
   {
      rowList.push(<div className="row" key="Text">
         <input type="text" style={{width: '100%'}} id={idFor('Text')}
                onChange={onChangeFor('text')} value={state.text} />
      </div>);

      if (1 === derivedValues.possibleActions.length)
      {
         //TODO: class not DRY with else (same for each ARD)
         //TODO: if only diff is span width I could sub-function to have a single ARD
         rowElementList.push(<div className="col-12 col-sm-4 col-lg-3" key="Action">
               {'Action '}<span id={idFor('SelectAction')}
                                style={{display: 'inline-block', width: '85px', textAlign: 'center'}}><b>{state.action}</b></span>
            </div>
         );
         //although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
      }
      else
      {
         options = derivedValues.possibleActions
         .map(name =>
            <option key={name}>{name}</option>
         );

         rowElementList.push(<div className="col-12 col-sm-4 col-lg-3" key="Action">
            <label>{'Action '}
               <select id={idFor('SelectAction')} onChange={onChangeFor('action')} value={state.action}>
                  {options}
               </select>
            </label>
         </div>);
      }

      if (1 === derivedValues.possibleRanges.length)
      {
         rowElementList.push(
            <div className="col-12 col-sm-4 col-lg-3" key="Range">
               {'Range '}<span id={idFor('SelectRange')}
                               style={{display: 'inline-block', width: '90px', textAlign: 'center'}}><b>{state.range}</b></span>
            </div>);
      }
      else
      {
         options = derivedValues.possibleRanges
         .map(name =>
            <option key={name}>{name}</option>
         );

         rowElementList.push(<div className="col-12 col-sm-4 col-lg-3" key="Range">
            <label>{'Range '}
               <select id={idFor('SelectRange')} onChange={onChangeFor('range')} value={state.range}>
                  {options}
               </select>
            </label>
         </div>);
      }

      if (1 === derivedValues.possibleDurations.length)
      {
         rowElementList.push(
            <div className="col-12 col-sm-4 col-lg-3" key="Duration">
               {'Duration '}<span id={idFor('SelectDuration')}
                                  style={{display: 'inline-block', width: '80px', textAlign: 'center'}}><b>{state.duration}</b></span>
            </div>);
      }
      else
      {
         options = derivedValues.possibleDurations
         .map(name =>
            <option key={name}>{name}</option>
         );

         rowElementList.push(<div className="col-12 col-sm-4 col-lg-3" key="Duration">
            <label>{'Duration '}
               <select id={idFor('SelectDuration')} onChange={onChangeFor('duration')} value={state.duration}>
                  {options}
               </select>
            </label>
         </div>);
      }

      rowList.push(<div className="row justify-content-center" key="action, range, duration">
         {rowElementList}
      </div>);
      rowElementList = [];

      //don't check for attack modifier because that's handled by the modifier code
      if (Data.Power[state.effect].isAttack)
      {
         rowElementList.push(<div className="col-12 col-sm-6 col-lg-5 col-xl-4" key="powerName">
            <PowerNameHtml sectionName={sectionName} powerKey={key} currentValue={state.name}
                           onChange={onChangeFor('name')} />
         </div>);

         if (undefined !== state.skillUsed)
         {
            rowElementList.push(<div className="col-12 col-sm-6 col-lg-5 col-xl-4" key="skillUsed">
               <PowerSkillHtml sectionName={sectionName} powerKey={key} currentValue={state.skillUsed}
                               onChange={onChangeFor('skillUsed')} />
            </div>);
         }

         rowList.push(<div className="row justify-content-end justify-content-xl-center" key="attack">
            {rowElementList}
         </div>);
         rowElementList = [];
      }

      const modifierList = props.powerRow.getModifierList();
      const modifierKeyList = modifierList.getKeyList();
      //modifierState is unused since I pass down the whole row object
      const modifierHtmlRows = state.Modifiers.map((unused, modifierIndex) =>
      {
         const key = modifierKeyList[modifierIndex];
         return (<ModifierRowHtml key={key} keyCopy={key}
                                  powerRow={props.powerRow}
                                  modifierRow={modifierList.getRowByIndex(modifierIndex)} />);
      });
      const blankModifierKey = modifierKeyList.last();
      modifierHtmlRows.push(<ModifierRowHtml key={blankModifierKey} keyCopy={blankModifierKey}
                                             powerRow={props.powerRow}
                                             modifierRow={undefined} />);

      rowList.push(<div id={sectionName + 'ModifierSection' + props.powerRow.getKey()} key="ModifierSection">
         {modifierHtmlRows}
      </div>);

      let costPerRankDisplay;
      if (derivedValues.costPerRank >= 1) costPerRankDisplay = '' + derivedValues.costPerRank;
      else costPerRankDisplay = '(1/' + (2 - derivedValues.costPerRank) + ')';  //0 is 1/2 and -1 is 1/3

      rowList.push(<div className="row" key="cost">
         <label className="col-12 col-sm-6 col-md-4 col-xl-auto">{'Ranks: '}
            <input type="text" size="1" id={idFor('Rank')} onChange={onChangeFor('rank')} value={state.rank} /></label>
         <div className="col-12 col-sm-6 col-md-4 col-xl-auto">{'Total Cost Per Rank: ' + costPerRankDisplay}</div>
         <div className="col-12 col-md-4 col-xl-auto">{'Total Flat Modifier Cost: ' + derivedValues.flatValue}</div>
      </div>);

      rowList.push(<div className="row" key="grandTotal">
         <div className="col">{'Grand total for ' + sectionName.toTitleCase() + ': '}
            {derivedValues.total}</div>
      </div>);
   }

   topElementList.push(<div className="container-fluid" key="rows">
      {rowList}
   </div>);

   if (undefined !== state.effect)
   {
      //hr after every non-blank will put it between them
      topElementList.push(<hr key="hr" />);
   }

   return topElementList;
}
