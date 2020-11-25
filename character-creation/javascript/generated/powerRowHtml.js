'use strict'; //TODO: more doc (state, derivedValues)

/** @param props: state, derivedValues, keyCopy, sectionName, powerRow, powerSection */

function PowerRowHtml(props) {
  var state = props.state;
  var derivedValues = props.derivedValues;
  var key = props.keyCopy;
  /*
  values used:
  var state = {rowIndex, effect, skillUsed};
  var derivedValues = {possibleActions, possibleRanges, possibleDurations, canSetBaseCost};
  */

  function idFor(elementLabel) {
    return props.sectionName + elementLabel + key;
  }

  function onChangeFor(nextFunctionName) {
    //TODO: onChange
    return function () {}; //return 'Main.' + props.sectionName + 'Section.getRow(' + state.rowIndex + ').' + nextFunctionName + '();'
  }

  var topElementList = [];
  var onChange = null;
  var rowList = [],
      rowElementList = []; //TODO: Main.canUseGodhood should be in state somewhere

  var displayGodhood = 'equipment' !== props.sectionName && undefined !== Main && Main.canUseGodhood();
  /*displayGodhood is false during main's constructor
  equipment can't be god-like so exclude it
  don't check isUsingGodhoodPowers because global includes that (more relevant with react)*/

  var options = Data.Power.names.filter(function (name) {
    return displayGodhood || !Data.Power[name].isGodhood;
  }).map(function (name) {
    return /*#__PURE__*/React.createElement("option", {
      key: name
    }, name);
  }); //unshift = addFirst

  options.unshift( /*#__PURE__*/React.createElement("option", {
    key: "Select Power"
  }, "Select Power"));
  rowElementList.push( /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-sm-6 col-xl-auto",
    key: "Choices"
  }, /*#__PURE__*/React.createElement("select", {
    id: idFor('Choices'),
    onChange: function onChange(event) {
      var nameGiven = event.target.value;
      props.powerSection.updateNameByKey(nameGiven, key);
    },
    value: state.effect
  }, options)));

  if (undefined !== state.effect) {
    if (derivedValues.canSetBaseCost) {
      rowElementList.push( /*#__PURE__*/React.createElement("label", {
        className: "col",
        key: "BaseCost"
      }, 'Base Cost per Rank: ', /*#__PURE__*/React.createElement("input", {
        type: "text",
        size: "1",
        id: idFor('BaseCost'),
        onChange: onChangeFor('changeBaseCost'),
        value: state.baseCost
      })));
    } else {
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col",
        key: "BaseCost"
      }, 'Base Cost per Rank: ', /*#__PURE__*/React.createElement("span", {
        id: idFor('BaseCost'),
        style: {
          display: 'inline-block',
          width: '50px',
          textAlign: 'center'
        }
      }, state.baseCost)));
    }
  }

  rowList.push( /*#__PURE__*/React.createElement("div", {
    className: "row",
    key: "power/cost"
  }, rowElementList));
  rowElementList = [];

  if (undefined !== state.effect) {
    rowList.push( /*#__PURE__*/React.createElement("div", {
      className: "row",
      key: "Text"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      style: {
        width: '100%'
      },
      id: idFor('Text'),
      onChange: onChangeFor('changeText'),
      value: state.text
    })));

    if (1 === derivedValues.possibleActions.length) {
      //TODO: class not DRY with else (same for each ARD)
      //TODO: if only diff is span width I could sub-function to have a single ARD
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-4 col-lg-3",
        key: "Action"
      }, 'Action ', /*#__PURE__*/React.createElement("span", {
        id: idFor('SelectAction'),
        style: {
          display: 'inline-block',
          width: '85px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("b", null, state.action)))); //although triggered is not in old rules, the difference in width is 79 to 80 so ignore it
    } else {
      options = derivedValues.possibleActions.map(function (name) {
        return /*#__PURE__*/React.createElement("option", {
          key: name
        }, name);
      });
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-4 col-lg-3",
        key: "Action"
      }, /*#__PURE__*/React.createElement("label", null, 'Action ', /*#__PURE__*/React.createElement("select", {
        id: idFor('SelectAction'),
        onChange: onChangeFor('selectAction'),
        value: state.action
      }, options))));
    }

    if (1 === derivedValues.possibleRanges.length) {
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-4 col-lg-3",
        key: "Range"
      }, 'Range ', /*#__PURE__*/React.createElement("span", {
        id: idFor('SelectRange'),
        style: {
          display: 'inline-block',
          width: '90px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("b", null, state.range))));
    } else {
      options = derivedValues.possibleRanges.map(function (name) {
        return /*#__PURE__*/React.createElement("option", {
          key: name
        }, name);
      });
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-4 col-lg-3",
        key: "Range"
      }, /*#__PURE__*/React.createElement("label", null, 'Range ', /*#__PURE__*/React.createElement("select", {
        id: idFor('SelectRange'),
        onChange: onChangeFor('selectRange'),
        value: state.range
      }, options))));
    }

    if (1 === derivedValues.possibleDurations.length) {
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-4 col-lg-3",
        key: "Duration"
      }, 'Duration ', /*#__PURE__*/React.createElement("span", {
        id: idFor('SelectDuration'),
        style: {
          display: 'inline-block',
          width: '80px',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("b", null, state.duration))));
    } else {
      options = derivedValues.possibleDurations.map(function (name) {
        return /*#__PURE__*/React.createElement("option", {
          key: name
        }, name);
      });
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-4 col-lg-3",
        key: "Duration"
      }, /*#__PURE__*/React.createElement("label", null, 'Duration ', /*#__PURE__*/React.createElement("select", {
        id: idFor('SelectDuration'),
        onChange: onChangeFor('selectDuration'),
        value: state.duration
      }, options))));
    }

    rowList.push( /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-center",
      key: "action, range, duration"
    }, rowElementList));
    rowElementList = []; //don't check for attack modifier because that's handled by the modifier code

    if (Data.Power[state.effect].isAttack) {
      rowElementList.push( /*#__PURE__*/React.createElement("div", {
        className: "col-12 col-sm-6 col-lg-5 col-xl-4",
        key: "powerName"
      }, /*#__PURE__*/React.createElement(PowerNameHtml, {
        sectionName: props.sectionName,
        powerKey: key,
        currentValue: state.name,
        onChange: function onChange() {
          return props.powerRow.changeName();
        }
      })));

      if (undefined !== state.skillUsed) {
        rowElementList.push( /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-sm-6 col-lg-5 col-xl-4",
          key: "skillUsed"
        }, /*#__PURE__*/React.createElement(PowerSkillHtml, {
          sectionName: props.sectionName,
          powerKey: key,
          currentValue: state.skillUsed,
          onChange: function onChange() {
            return props.powerRow.changeSkill();
          }
        })));
      }

      rowList.push( /*#__PURE__*/React.createElement("div", {
        className: "row justify-content-end justify-content-xl-center",
        key: "attack"
      }, rowElementList));
      rowElementList = [];
    }

    var modifierRows = state.Modifiers.map(function (modifierState) {
      var key = MainObject.generateKey();
      return /*#__PURE__*/React.createElement(ModifierRowHtml, {
        key: key,
        keyCopy: key,
        powerRow: props.powerRow,
        modifierRow: modifierState
      });
    });
    var blankModifierKey = MainObject.generateKey();
    modifierRows.push( /*#__PURE__*/React.createElement(ModifierRowHtml, {
      key: blankModifierKey,
      keyCopy: blankModifierKey,
      powerRow: props.powerRow,
      modifierRow: undefined
    }));
    rowList.push( /*#__PURE__*/React.createElement("div", {
      id: props.sectionName + 'ModifierSection' + props.powerRow.getKey(),
      key: "ModifierSection"
    }, modifierRows));
    var costPerRankDisplay;
    if (derivedValues.costPerRank >= 1) costPerRankDisplay = '' + derivedValues.costPerRank;else costPerRankDisplay = '(1/' + (2 - derivedValues.costPerRank) + ')'; //0 is 1/2 and -1 is 1/3

    rowList.push( /*#__PURE__*/React.createElement("div", {
      className: "row",
      key: "cost"
    }, /*#__PURE__*/React.createElement("label", {
      className: "col-12 col-sm-6 col-md-4 col-xl-auto"
    }, 'Ranks: ', /*#__PURE__*/React.createElement("input", {
      type: "text",
      size: "1",
      id: idFor('Rank'),
      onChange: onChangeFor('changeRank'),
      value: state.rank
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-sm-6 col-md-4 col-xl-auto"
    }, 'Total Cost Per Rank: ' + costPerRankDisplay), /*#__PURE__*/React.createElement("div", {
      className: "col-12 col-md-4 col-xl-auto"
    }, 'Total Flat Modifier Cost: ' + derivedValues.flatValue)));
    rowList.push( /*#__PURE__*/React.createElement("div", {
      className: "row",
      key: "grandTotal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, 'Grand total for ' + props.sectionName.toTitleCase() + ': ', derivedValues.total)));
  }

  topElementList.push( /*#__PURE__*/React.createElement("div", {
    className: "container-fluid",
    key: "rows"
  }, rowList));

  if (undefined !== state.effect) {
    topElementList.push( /*#__PURE__*/React.createElement("hr", {
      key: "hr"
    }));
  } //TODO: confirm that react allows this. might need a wrapper div for the hr to be allowed


  return topElementList;
}