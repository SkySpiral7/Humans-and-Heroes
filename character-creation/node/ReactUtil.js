'use strict';
//TODO: auto install: react, react-dom, @testing-library/react
var fireChange = require('@testing-library/react').fireEvent.change;

var ReactUtil = {};
/**works for select and input text (react elements only)*/
ReactUtil.changeValue = function (elementId, newValue)
{
   var input = document.getElementById(elementId);
   fireChange(input, { target: { value: newValue } });
};
//browserify main.js -o bundle.js
globalThis.ReactUtil = ReactUtil;
