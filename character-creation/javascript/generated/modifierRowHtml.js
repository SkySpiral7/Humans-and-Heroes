'use strict'; //TODO: doc

function ModifierRowHtml(props) {
  var sectionName = props.powerRow.getSectionName();
  var powerRowIndex = props.powerRow.getRowIndex();
  var key = props.keyCopy;

  function idFor(elementLabel) {
    return sectionName + 'Modifier' + elementLabel + powerRowIndex + '.' + key;
  }

  var state = undefined !== props.modifierRow ? props.modifierRow.getState() : {
    name: undefined
  };
  /*
  mod row values used: TODO: update chart
  state: {powerRowIndex, name, rank};
  derivedValues: {costPerRank, hasRank, hasText, hasAutoTotal, rawTotal};
  */

  var nameElement = null;
  var amReadOnly = 'Selective' === state.name && 'Triggered' === props.powerRow.getAction(); //Triggered requires Selective started between 2.0 and 2.5. Triggered is only an action in 2.x
  //Triggered's Selective is amReadOnly even for Feature

  if (!amReadOnly && undefined !== state.name && props.powerRow.getEffect() !== 'Feature') amReadOnly = Data.Modifier[state.name].isReadOnly;

  if (!amReadOnly) {
    var options = Data.Modifier.names //equipment has removable built in and can't have the modifiers
    .filter(function (name) {
      return !(props.powerRow.getSection() === Main.equipmentSection && (name === 'Removable' || name === 'Easily Removable'));
    }).filter(function (name) {
      return props.powerRow.getEffect() === 'Feature' || !Data.Modifier[name].isReadOnly;
    }).map(function (name) {
      return /*#__PURE__*/React.createElement("option", {
        key: name
      }, name);
    });

    var onChange = function onChange(event) {
      var nameGiven = event.target.value;
      if (undefined === state.name) props.powerRow.getModifierList().addRow(event.target.value);else if (Data.Advantage.names.contains(nameGiven)) {
        props.modifierRow.setModifier(nameGiven);
        props.modifierRow.getSection().updateNameByKey(key);
      } //TODO: define updateNameByKey, removeByKey
      else props.modifierRow.getSection().removeByKey(key);
    }; //unshift = addFirst


    options.unshift( /*#__PURE__*/React.createElement("option", {
      key: "Select Modifier"
    }, "Select Modifier"));
    nameElement = /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-sm-5 col-lg-4 col-xl-auto"
    }, /*#__PURE__*/React.createElement("select", {
      id: idFor('Choices'),
      onChange: onChange,
      value: state.name
    }, options));
  } else {
    //TODO: className un-DRY here
    nameElement = /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-sm-5 col-lg-4 col-xl-auto"
    }, /*#__PURE__*/React.createElement("b", null, state.name));
  }

  var remainingElements = [];

  if (undefined !== state.name) //done for blank
    {
      var derivedValues = props.modifierRow.getDerivedValues();

      if ('Attack' === state.name) {
        //TODO: changeName, changeSkill need update
        remainingElements.push( /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-sm-6 col-lg-4",
          key: "powerNameDiv"
        }, /*#__PURE__*/React.createElement(PowerNameHtml, {
          sectionName: sectionName,
          rowIndex: powerRowIndex,
          currentValue: props.powerRow.getName(),
          onChange: function onChange() {
            return props.powerRow.changeName();
          }
        })));

        if (props.powerRow.getRange() !== 'Perception') {
          remainingElements.push( /*#__PURE__*/React.createElement("div", {
            className: "col-12 col-sm-6 col-lg-4",
            key: "powerSkillDiv"
          }, /*#__PURE__*/React.createElement(PowerSkillHtml, {
            sectionName: sectionName,
            rowIndex: powerRowIndex,
            currentValue: props.powerRow.getSkillUsed(),
            onChange: function onChange() {
              return props.powerRow.changeSkill();
            }
          })));
        }
      } else //attack doesn't have anything in this block so I might as well use else here
        {
          //if hasAutoTotal then hasRank is false
          if (derivedValues.hasRank) {
            //only Feature can change the ranks of these
            if (props.powerRow.getEffect() !== 'Feature' && Data.Modifier[state.name].hasAutoRank) {
              remainingElements.push( /*#__PURE__*/React.createElement("div", {
                className: "col-6 col-sm-3 col-xl-auto",
                key: "rank"
              }, 'Cost ' + state.rank));
            } else {
              remainingElements.push( /*#__PURE__*/React.createElement("label", {
                className: "col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto",
                key: "rank"
              }, "Applications", ' ', /*#__PURE__*/React.createElement("input", {
                type: "text",
                size: "1",
                id: idFor('Rank'),
                onChange: function onChange() {
                  return props.modifierRow.changeRank();
                },
                value: state.rank
              })));
            }
          }

          if (derivedValues.hasText) {
            remainingElements.push( /*#__PURE__*/React.createElement("label", {
              className: "col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining",
              key: "text"
            }, "Text\xA0", /*#__PURE__*/React.createElement("input", {
              type: "text",
              id: idFor('Text'),
              onChange: function onChange() {
                return props.modifierRow.changeText();
              },
              value: state.text
            })));
          } //auto total must see total (it doesn't show ranks)


          if (derivedValues.hasAutoTotal) {
            remainingElements.push( /*#__PURE__*/React.createElement("div", {
              className: "col-auto",
              key: "total"
            }, '=&nbsp;' + derivedValues.autoTotal));
          } //if costPerRank isn't 1 then show total to show how much its worth,
          //if total doesn't match then it has had some cost quirk so show the total
          else if (Math.abs(derivedValues.costPerRank) > 1 || derivedValues.rawTotal !== derivedValues.costPerRank * state.rank) {
              remainingElements.push( /*#__PURE__*/React.createElement("div", {
                className: "col-auto",
                key: "total"
              }, '=&nbsp;' + derivedValues.rawTotal));
            }
        }
    }

  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, nameElement, remainingElements);
}