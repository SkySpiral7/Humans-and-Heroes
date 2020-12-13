'use strict'; //TODO: more doc (state, derivedValues)

/** @param props: powerRow, modifierRow, keyCopy */

function ModifierRowHtml(props) {
  var sectionName = props.powerRow.getSectionName();
  var powerKey = props.powerRow.getKey();
  var key = props.keyCopy;
  var powerSection = props.powerRow.getSection();

  function idFor(elementLabel) {
    return sectionName + 'Modifier' + elementLabel + powerKey + '.' + key;
  }

  var state = undefined !== props.modifierRow ? props.modifierRow : {
    name: undefined
  };
  /*
  mod row values used: TODO: update chart
  state: {name, rank};
  derivedValues: {costPerRank, hasRank, hasText, hasAutoTotal, rawTotal};
  */

  var elementList = [];
  var amReadOnly = 'Selective' === state.name && 'Triggered' === props.powerRow.getAction(); //Triggered requires Selective started between 2.0 and 2.5. Triggered is only an action in 2.x
  //Triggered's Selective is amReadOnly even for Feature

  if (!amReadOnly && undefined !== state.name && props.powerRow.getEffect() !== 'Feature') amReadOnly = Data.Modifier[state.name].isReadOnly;

  if (!amReadOnly) {
    var options = Data.Modifier.names //equipment has removable built in and can't have the modifiers
    //TODO: checking Main isn't an issue because it will exist for mod. but should check constant name instead
    .filter(function (name) {
      return !(props.powerRow.getSection() === Main.equipmentSection && (name === 'Removable' || name === 'Easily Removable'));
    }).filter(function (name) {
      return props.powerRow.getEffect() === 'Feature' || !Data.Modifier[name].isReadOnly;
    }).map(function (name) {
      return /*#__PURE__*/React.createElement("option", {
        key: name
      }, name);
    }); //unshift = addFirst

    options.unshift( /*#__PURE__*/React.createElement("option", {
      key: "Select Modifier"
    }, "Select Modifier"));
    elementList.push( /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-sm-5 col-lg-4 col-xl-auto",
      key: "name"
    }, /*#__PURE__*/React.createElement("select", {
      id: idFor('Choices'),
      onChange: function onChange(event) {
        var nameGiven = event.target.value;
        powerSection.updateModifierNameByRow(nameGiven, props.powerRow, props.modifierRow);
      },
      value: state.name
    }, options)));
  } else {
    //TODO: className un-DRY here
    elementList.push( /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-sm-5 col-lg-4 col-xl-auto",
      key: "name"
    }, /*#__PURE__*/React.createElement("b", null, state.name)));
  }

  if (undefined !== state.name) //done for blank
    {
      var derivedValues = props.modifierRow.derivedValues;

      if ('Attack' === state.name) {
        elementList.push( /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-sm-6 col-lg-4",
          key: "powerNameDiv"
        }, /*#__PURE__*/React.createElement(PowerNameHtml, {
          sectionName: sectionName,
          powerKey: powerKey,
          currentValue: props.powerRow.getName(),
          onChange: function onChange(event) {
            var nameGiven = event.target.value;
            powerSection.updatePropertyByKey('name', nameGiven, powerKey);
          }
        })));

        if (props.powerRow.getRange() !== 'Perception') {
          elementList.push( /*#__PURE__*/React.createElement("div", {
            className: "col-12 col-sm-6 col-lg-4",
            key: "powerSkillDiv"
          }, /*#__PURE__*/React.createElement(PowerSkillHtml, {
            sectionName: sectionName,
            powerKey: powerKey,
            currentValue: props.powerRow.getSkillUsed(),
            onChange: function onChange(event) {
              var nameGiven = event.target.value;
              powerSection.updatePropertyByKey('skillUsed', nameGiven, powerKey);
            }
          })));
        }
      } else //attack doesn't have anything in this block so I might as well use else here
        {
          //if hasAutoTotal then hasRank is false
          if (derivedValues.hasRank) {
            //only Feature can change the ranks of these
            if (props.powerRow.getEffect() !== 'Feature' && Data.Modifier[state.name].hasAutoRank) {
              elementList.push( /*#__PURE__*/React.createElement("div", {
                className: "col-6 col-sm-3 col-xl-auto",
                key: "rank"
              }, 'Cost ' + state.rank));
            } else {
              //TODO: confirm spaces and non-breaking
              elementList.push( /*#__PURE__*/React.createElement("label", {
                className: "col-8 col-sm-5 col-md-4 col-lg-3 col-xl-auto",
                key: "rank"
              }, "Applications", ' ', /*#__PURE__*/React.createElement("input", {
                type: "text",
                size: "1",
                id: idFor('Rank'),
                onChange: function onChange(event) {
                  var rankGiven = event.target.value;
                  powerSection.updateModifierPropertyByKey('rank', rankGiven, props.powerRow, props.modifierRow.key);
                },
                value: state.rank
              })));
            }
          }

          if (derivedValues.hasText) {
            elementList.push( /*#__PURE__*/React.createElement("label", {
              className: "col-12 col-sm-6 col-lg-4 col-xl-6 fill-remaining",
              key: "text"
            }, "Text\xA0", /*#__PURE__*/React.createElement("input", {
              type: "text",
              id: idFor('Text'),
              onChange: function onChange(event) {
                var textGiven = event.target.value;
                powerSection.updateModifierPropertyByKey('text', textGiven, props.powerRow, props.modifierRow.key);
              },
              value: state.text
            })));
          } //auto total must see total (it doesn't show ranks)


          if (derivedValues.hasAutoTotal) {
            elementList.push( /*#__PURE__*/React.createElement("div", {
              className: "col-auto",
              key: "total"
            }, '=&nbsp;' + derivedValues.autoTotal));
          } //if costPerRank isn't 1 then show total to show how much its worth,
          //if total doesn't match then it has had some cost quirk so show the total
          else if (Math.abs(derivedValues.costPerRank) > 1 || derivedValues.rawTotal !== derivedValues.costPerRank * state.rank) {
              elementList.push( /*#__PURE__*/React.createElement("div", {
                className: "col-auto",
                key: "total"
              }, '=&nbsp;' + derivedValues.rawTotal));
            }
        }
    }

  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, elementList);
}