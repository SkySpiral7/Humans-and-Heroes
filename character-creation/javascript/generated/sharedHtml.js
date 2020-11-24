'use strict';
/** @param props: sectionName, powerKey, onChange, currentValue */

function PowerNameHtml(props) {
  return /*#__PURE__*/React.createElement("label", {
    className: "fill-remaining"
  }, "Name\xA0", /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: props.sectionName + 'Name' + props.powerKey,
    onChange: props.onChange,
    value: props.currentValue
  }));
}
/** @param props: sectionName, powerKey, onChange, currentValue */


function PowerSkillHtml(props) {
  return /*#__PURE__*/React.createElement("label", {
    className: "fill-remaining"
  }, "Skill\xA0", /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: props.sectionName + 'Skill' + props.powerKey,
    onChange: props.onChange,
    value: props.currentValue
  }));
}