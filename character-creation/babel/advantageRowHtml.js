'use strict';

function AdvantageRowHtml(props)
{
   const state=props.state, derivedValues=props.derivedValues, key=props.myKey;
   const displayGodhood=props.generateGodHood;
   /*
   values used:
   state: {name, rank, text};
   derivedValues: {hasRank, costPerRank, total};
   key
   */
   let nameElement = null;
   let costElement = null;
   let textElement = null;
   let costPerRankElement = null;

   if (state.name === 'Equipment') nameElement = <div className="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>;
   else
   {
      const options = Data.Advantage.names
      .filter((name) => 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood))
      .map((name) =>
         <option key={name}>{name}</option>
      );
      //unshift = addFirst
      options.unshift(<option key="Select Advantage">Select Advantage</option>);

      let onChange = null;
      if (undefined === state.name)  //if blank
      {
         onChange = () => {Main.advantageSection.addRow();};
      }
      else
      {
         onChange = () =>
         {
            Main.advantageSection.getRowById(key)
            .select();
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
      if ('Equipment' === state.name) costElement =
         <div className="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost {state.rank}</div>;
      //state.rank is always defined but only show this if max rank is > 1
      else if (derivedValues.hasRank) costElement = <label className="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank{' '}
         <input type="text" size="1" id={'advantageRank' + key}
                onChange={() =>
                {
                   Main.advantageSection.getRowById(key)
                   .changeRank();
                }} value={state.rank} /></label>;

      if (undefined !== state.text)
      {
         textElement = (<div className="col-12 col-sm-6">
            <input type="text" id={'advantageText' + key}
                   onChange={() =>
                   {
                      Main.advantageSection.getRowById(key)
                      .changeText();
                   }} value={state.text} style={{width: '100%'}} /></div>);
      }
      if (derivedValues.costPerRank > 1) costPerRankElement = <div className="col-auto">=&nbsp;{derivedValues.total}</div>;
   }

   return (<div className="row">
      {nameElement}{costElement}{textElement}{costPerRankElement}
   </div>);
}
