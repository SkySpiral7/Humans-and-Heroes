'use strict';

function AdvantageRowHtml(props) {
  //TODO: combine all 3 by just passing in ad row object
  var state = props.state,
      derivedValues = props.derivedValues,
      key = props.keyCopy;
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
  if (state.name === 'Equipment') nameElement = /*#__PURE__*/React.createElement("div", {
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
        onChange = function onChange() {
          Main.advantageSection.addRow();
        };
      } else {
      onChange = function onChange() {
        Main.advantageSection.getRowByKey(key).select();
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
      if ('Equipment' === state.name) costElement = /*#__PURE__*/React.createElement("div", {
        className: "col-6 col-sm-3 col-lg-2 col-xl-auto"
      }, "Cost ", state.rank); //state.rank is always defined but only show this if max rank is > 1
      else if (derivedValues.hasRank) costElement = /*#__PURE__*/React.createElement("label", {
          className: "col-5 col-sm-3 col-lg-2 col-xl-auto"
        }, "Rank", ' ', /*#__PURE__*/React.createElement("input", {
          type: "text",
          size: "1",
          id: 'advantageRank' + key,
          onChange: function onChange() {
            Main.advantageSection.getRowByKey(key).changeRank();
          },
          value: state.rank
        }));

      if (undefined !== state.text) {
        textElement = /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-sm-6"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          id: 'advantageText' + key,
          onChange: function onChange() {
            Main.advantageSection.getRowByKey(key).changeText();
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