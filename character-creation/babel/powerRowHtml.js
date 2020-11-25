'use strict';

//TODO: more doc (state, derivedValues)
/** @param props: state, derivedValues, keyCopy, sectionName, powerRow */
function PowerRowHtml(props)
{
   const state = props.state;
   const derivedValues = props.derivedValues;
   const key = props.keyCopy;

   /*
   values used:
   var state = {rowIndex, effect, skillUsed};
   var derivedValues = {possibleActions, possibleRanges, possibleDurations, canSetBaseCost};
   */

   function idFor(elementLabel)
   {
      return props.sectionName + elementLabel + key;
   }

   function onChangeFor(nextFunctionName)
   {
      //TODO: onChange
      return function () {};
      //return 'Main.' + props.sectionName + 'Section.getRow(' + state.rowIndex + ').' + nextFunctionName + '();'
   }

   let topElementList = [];
   let onChange = null;
   let rowList = [], rowElementList = [];

   //TODO: Main.canUseGodhood should be in state somewhere
   let displayGodhood = ('equipment' !== props.sectionName &&
      undefined !== Main && Main.canUseGodhood());
   /*displayGodhood is false during main's constructor
   equipment can't be god-like so exclude it
   don't check isUsingGodhoodPowers because global includes that (more relevant with react)*/

   let options = Data.Power.names
   .filter(name => displayGodhood || !Data.Power[name].isGodhood)
   .map(name =>
      <option key={name}>{name}</option>
   );

   //unshift = addFirst
   options.unshift(<option key="Select Power">Select Power</option>);

   rowElementList.push(<div className="col-12 col-sm-6 col-xl-auto" key="Choices">
      <select id={idFor('Choices')} onChange={onChangeFor('select')} value={state.effect}>
         {options}
      </select>
   </div>);

   if (undefined !== state.effect)
   {
      if (derivedValues.canSetBaseCost)
      {
         rowElementList.push(<label className="col" key="BaseCost">{'Base Cost per Rank: '}
            <input type="text" size="1" id={idFor('BaseCost')}
                   onChange={onChangeFor('changeBaseCost')} value={state.baseCost} />
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
         <input type="text" style={{width: '100%'}} id={idFor('Text')} onChange={onChangeFor('changeText')}
                value={state.text} />
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
               <select id={idFor('SelectAction')} onChange={onChangeFor('selectAction')} value={state.action}>
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
               <select id={idFor('SelectRange')} onChange={onChangeFor('selectRange')} value={state.range}>
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
               <select id={idFor('SelectDuration')} onChange={onChangeFor('selectDuration')} value={state.duration}>
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
            <PowerNameHtml sectionName={props.sectionName} powerKey={key} currentValue={state.name}
                           onChange={() => props.powerRow.changeName()} />
         </div>);

         if (undefined !== state.skillUsed)
         {
            rowElementList.push(<div className="col-12 col-sm-6 col-lg-5 col-xl-4" key="skillUsed">
               <PowerSkillHtml sectionName={props.sectionName} powerKey={key} currentValue={state.skillUsed}
                               onChange={() => props.powerRow.changeSkill()} />
            </div>);
         }

         rowList.push(<div className="row justify-content-end justify-content-xl-center" key="attack">
            {rowElementList}
         </div>);
         rowElementList = [];
      }

      const modifierRows = state.Modifiers.map(modifierState =>
      {
         const key = MainObject.generateKey();
         return (<ModifierRowHtml key={key} keyCopy={key} powerRow={props.powerRow}
                                  modifierRow={modifierState} />);
      });
      const blankModifierKey = MainObject.generateKey();
      modifierRows.push(<ModifierRowHtml key={blankModifierKey} keyCopy={blankModifierKey} powerRow={props.powerRow}
                                         modifierRow={undefined} />);

      rowList.push(<div id={props.sectionName + 'ModifierSection' + props.powerRow.getKey()} key="ModifierSection">
         {modifierRows}
      </div>);

      let costPerRankDisplay;
      if (derivedValues.costPerRank >= 1) costPerRankDisplay = '' + derivedValues.costPerRank;
      else costPerRankDisplay = '(1/' + (2 - derivedValues.costPerRank) + ')';  //0 is 1/2 and -1 is 1/3

      rowList.push(<div className="row" key="cost">
         <label className="col-12 col-sm-6 col-md-4 col-xl-auto">{'Ranks: '}
            <input type="text" size="1" id={idFor('Rank')} onChange={onChangeFor('changeRank')} value={state.rank} /></label>
         <div className="col-12 col-sm-6 col-md-4 col-xl-auto">{'Total Cost Per Rank: ' + costPerRankDisplay}</div>
         <div className="col-12 col-md-4 col-xl-auto">{'Total Flat Modifier Cost: ' + derivedValues.flatValue}</div>
      </div>);

      rowList.push(<div className="row" key="grandTotal">
         <div className="col">{'Grand total for ' + props.sectionName.toTitleCase() + ': '}
            {derivedValues.total}</div>
      </div>);
   }

   topElementList.push(<div className="container-fluid" key="rows">
      {rowList}
   </div>);

   if (undefined !== state.effect)
   {
      topElementList.push(<hr key="hr" />);
   }

   //TODO: confirm that react allows this. might need a wrapper div for the hr to be allowed
   return topElementList;
}
