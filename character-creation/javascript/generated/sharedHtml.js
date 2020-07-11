'use strict';

function PowerNameHtml(props) {
  return /*#__PURE__*/React.createElement("label", {
    className: "fill-remaining"
  }, "Name\xA0", /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: props.sectionName + 'Name' + props.rowIndex,
    onChange: props.onChange,
    value: props.currentValue
  }));
}

function PowerSkillHtml(props) {
  return /*#__PURE__*/React.createElement("label", {
    className: "fill-remaining"
  }, "Skill\xA0", /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: props.sectionName + 'Skill' + props.rowIndex,
    onChange: props.onChange,
    value: props.currentValue
  }));
}