'use strict';

function AdvantageRowHtml(props) {
   var state = props.state,
       derivedValues = props.derivedValues,
       key = props.myKey;
   var displayGodhood = props.generateGodHood;
   /*
   values used:
   state: {name, rank, text};
   derivedValues: {hasRank, costPerRank, total};
   key
   */
   var nameElement = null;
   var costElement = null;
   var textElement = null;
   var costPerRankElement = null;

   if (state.name === 'Equipment') nameElement = React.createElement(
      'div',
      { className: 'col-6 col-lg-4 col-xl-auto' },
      React.createElement(
         'b',
         null,
         'Equipment'
      )
   );else {
      var options = Data.Advantage.names.filter(function (name) {
         return 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood);
      }).map(function (name) {
         return React.createElement(
            'option',
            { key: name },
            name
         );
      });
      //unshift = addFirst
      options.unshift(React.createElement(
         'option',
         { key: 'Select Advantage' },
         'Select Advantage'
      ));

      var onChange = null;
      if (undefined === state.name) //if blank
         {
            onChange = function onChange() {
               Main.advantageSection.addRow();
            };
         } else {
         onChange = function onChange() {
            Main.advantageSection.getRowById(key).select();
         };
      }
      nameElement = React.createElement(
         'div',
         { className: 'col-12 col-sm-6 col-lg-4 col-xl-auto' },
         React.createElement(
            'select',
            { id: 'advantageChoices' + key, onChange: onChange,
               value: state.name },
            options
         )
      );
   }
   if (undefined !== state.name) //done for blank
      {
         if ('Equipment' === state.name) costElement = React.createElement(
            'div',
            { className: 'col-6 col-sm-3 col-lg-2 col-xl-auto' },
            'Cost ',
            state.rank
         );
         //state.rank is always defined but only show this if max rank is > 1
         else if (derivedValues.hasRank) costElement = React.createElement(
               'label',
               { className: 'col-5 col-sm-3 col-lg-2 col-xl-auto' },
               'Rank',
               ' ',
               React.createElement('input', { type: 'text', size: '1', id: 'advantageRank' + key,
                  onChange: function onChange() {
                     Main.advantageSection.getRowById(key).changeRank();
                  }, value: state.rank })
            );

         if (undefined !== state.text) {
            textElement = React.createElement(
               'div',
               { className: 'col-12 col-sm-6' },
               React.createElement('input', { type: 'text', id: 'advantageText' + key,
                  onChange: function onChange() {
                     Main.advantageSection.getRowById(key).changeText();
                  }, value: state.text, style: { width: '100%' } })
            );
         }
         if (derivedValues.costPerRank > 1) costPerRankElement = React.createElement(
            'div',
            { className: 'col-auto' },
            '=\xA0',
            derivedValues.total
         );
      }

   return React.createElement(
      'div',
      { className: 'row' },
      nameElement,
      costElement,
      textElement,
      costPerRankElement
   );
}