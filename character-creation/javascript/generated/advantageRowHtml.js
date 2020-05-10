'use strict';

function AdvantageRowHtml(props) {
  const state = props.state,
        derivedValues = props.derivedValues,
        key = props.myKey;
  const displayGodhood = props.generateGodHood;
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
  if (state.name === 'Equipment') nameElement = /*#__PURE__*/React.createElement("div", {
    className: "col-6 col-lg-4 col-xl-auto"
  }, /*#__PURE__*/React.createElement("b", null, "Equipment"));else {
    const options = Data.Advantage.names.filter(name => 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood)).map(name => /*#__PURE__*/React.createElement("option", {
      key: name
    }, name)); //unshift = addFirst

    options.unshift( /*#__PURE__*/React.createElement("option", {
      key: "Select Advantage"
    }, "Select Advantage"));
    let onChange = null;

    if (undefined === state.name) //if blank
      {
        onChange = () => {
          Main.advantageSection.addRow();
        };
      } else {
      onChange = () => {
        Main.advantageSection.getRowById(key).select();
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
          onChange: () => {
            Main.advantageSection.getRowById(key).changeRank();
          },
          value: state.rank
        }));

      if (undefined !== state.text) {
        textElement = /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-sm-6"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          id: 'advantageText' + key,
          onChange: () => {
            Main.advantageSection.getRowById(key).changeText();
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