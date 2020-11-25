'use strict';

/**
 props:
 state: {name, rank, text};
 derivedValues: {hasRank, costPerRank, total};
 keyCopy
 generateGodHood
 */
function AdvantageRowHtml(props)
{
   const key = props.keyCopy;
   const displayGodhood = props.generateGodHood;

   const state = (undefined !== props.advantageRow)
      ? props.advantageRow.getState()
      : {name: undefined};

   let nameElement = null;
   let costElement = null;
   let textElement = null;
   let costPerRankElement = null;

   if ('Equipment' === state.name) nameElement = <div className="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>;
   else
   {
      const options = Data.Advantage.names
      .filter(name => 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood))
      .map(name =>
         <option key={name}>{name}</option>
      );
      //unshift = addFirst
      //TODO: technically should key be undefined?
      options.unshift(<option key="Select Advantage">Select Advantage</option>);

      let onChange = null;
      if (undefined === state.name)  //if blank
      {
         onChange = (event) =>
         {
            const nameGiven = event.target.value;
            Main.advantageSection.addRow(nameGiven);
         };
      }
      else
      {
         onChange = (event) =>
         {
            const nameGiven = event.target.value;
            props.advantageRow.select(nameGiven);
         };
      }
      nameElement = (<div className="col-12 col-sm-6 col-lg-4 col-xl-auto">
            <select id={'advantageChoices' + key} onChange={onChange}
                    value={state.name}>
               {options}
            </select></div>
      );
   }

   if (undefined !== state.name)  //done for blank
   {
      const derivedValues = props.advantageRow.getDerivedValues();

      if ('Equipment' === state.name) costElement =
         <div className="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost {state.rank}</div>;
      //state.rank is always defined but only show this if max rank is > 1
      else if (derivedValues.hasRank) costElement = <label className="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank{' '}
         <input type="text" size="1" id={'advantageRank' + key}
                onChange={(event) =>
                {
                   const rankGiven = event.target.value;
                   props.advantageRow.changeRank(rankGiven);
                }} value={state.rank} /></label>;

      if (undefined !== state.text)
      {
         textElement = (<div className="col-12 col-sm-6">
            <input type="text" id={'advantageText' + key}
                   onChange={(event) =>
                   {
                      const textGiven = event.target.value;
                      props.advantageRow.changeText(textGiven);
                   }} value={state.text} style={{width: '100%'}} /></div>);
      }
      if (derivedValues.costPerRank > 1) costPerRankElement = <div className="col-auto">=&nbsp;{derivedValues.total}</div>;
   }

   return (<div className="row">
      {nameElement}{costElement}{textElement}{costPerRankElement}
   </div>);
}
