'use strict';
var fireChange = require('@testing-library/react').fireEvent.change;

var ReactUtil = {};
/**works for select and input text (react elements only)*/
ReactUtil.changeValue = function (elementId, newValue)
{
   var input = document.getElementById(elementId);
   fireChange(input, { target: { value: newValue } });
};
globalThis.ReactUtil = ReactUtil;
