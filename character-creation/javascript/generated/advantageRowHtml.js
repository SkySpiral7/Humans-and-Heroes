'use strict';
/**
 props:
 state: {name, rank, text};
 derivedValues: {hasRank, costPerRank, total};
 keyCopy
 generateGodHood
 */

function AdvantageRowHtml(props) {
  var key = props.keyCopy;
  var displayGodhood = props.generateGodHood;
  var state = undefined !== props.advantageRow ? props.advantageRow.getState() : {
    name: undefined
  };
  var nameElement = null;
  var costElement = null;
  var textElement = null;
  var costPerRankElement = null;
  if ('Equipment' === state.name) nameElement = /*#__PURE__*/React.createElement("div", {
    className: "col-6 col-lg-4 col-xl-auto"
  }, /*#__PURE__*/React.createElement("b", null, "Equipment"));else {
    var options = Data.Advantage.names.filter(function (name) {
      return 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood);
    }).map(function (name) {
      return /*#__PURE__*/React.createElement("option", {
        key: name
      }, name);
    }); //unshift = addFirst
    //TODO: technically should key be undefined?

    options.unshift( /*#__PURE__*/React.createElement("option", {
      key: "Select Advantage"
    }, "Select Advantage"));
    var onChange = null;

    if (undefined === state.name) //if blank
      {
        onChange = function onChange(event) {
          var nameGiven = event.target.value;
          Main.advantageSection.addRow(nameGiven);
        };
      } else {
      onChange = function onChange(event) {
        var nameGiven = event.target.value;
        props.advantageRow.select(nameGiven);
      };
    }

    nameElement = /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-sm-6 col-lg-4 col-xl-auto"
    }, /*#__PURE__*/React.createElement("select", {
      id: 'advantageChoices' + key,
      onChange: onChange,
      value: state.name
    }, options));
  }

  if (undefined !== state.name) //done for blank
    {
      var derivedValues = props.advantageRow.getDerivedValues();
      if ('Equipment' === state.name) costElement = /*#__PURE__*/React.createElement("div", {
        className: "col-6 col-sm-3 col-lg-2 col-xl-auto"
      }, "Cost ", state.rank); //state.rank is always defined but only show this if max rank is > 1
      else if (derivedValues.hasRank) costElement = /*#__PURE__*/React.createElement("label", {
          className: "col-5 col-sm-3 col-lg-2 col-xl-auto"
        }, "Rank", ' ', /*#__PURE__*/React.createElement("input", {
          type: "text",
          size: "1",
          id: 'advantageRank' + key,
          onChange: function onChange(event) {
            var rankGiven = event.target.value;
            props.advantageRow.changeRank(rankGiven);
          },
          value: state.rank
        }));

      if (undefined !== state.text) {
        textElement = /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-sm-6"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          id: 'advantageText' + key,
          onChange: function onChange(event) {
            var textGiven = event.target.value;
            props.advantageRow.changeText(textGiven);
          },
          value: state.text,
          style: {
            width: '100%'
          }
        }));
      }

      if (derivedValues.costPerRank > 1) costPerRankElement = /*#__PURE__*/React.createElement("div", {
        className: "col-auto"
      }, "=\xA0", derivedValues.total);
    }

  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, nameElement, costElement, textElement, costPerRankElement);
}