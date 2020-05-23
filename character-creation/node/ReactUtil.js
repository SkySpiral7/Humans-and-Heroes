'use strict';
var fireChange = require('@testing-library/react').fireEvent.change;

var ReactUtil = {};
/**works for select and input text (react elements only)*/
ReactUtil.changeValue = function (elementId, newValue)
{
   var input = document.getElementById(elementId);
   fireChange(input, { target: { value: newValue } });
};
/*https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
ReactUtil.changeValue = function (elementId, newValue)
{
   var input = document.getElementById(elementId);
   var ev = new Event('input', { bubbles: true});
   ev.simulated = true;
   input.value = newValue;
   input.dispatchEvent(ev);
};
Cool but Event API is also not supported by IE 11.
Plus 'input' doesn't work for select elements*/
globalThis.ReactUtil = ReactUtil;
