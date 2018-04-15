'use strict';
SelectUtil.setText('save-type', 'JSON');  //not needed for Loader but when I test I always use json
var Loader = {};
var Messages = {};
Messages.list = [];  //intentionally public in order to clear it (without Loader) or to read amLoading
Loader.resetData=function()
{
   Messages.list = [];
   Main.clear();
   return Main.save();  //return skeleton needed
};
Loader.sendData=function(jsonData)
{
   document.getElementById('code-box').value = JSON.stringify(jsonData);  //to simulate user input
   document.getElementById('load-text-button').onclick();
};
Messages.errorCapture=function(errorCode, amLoading)
{
   Messages.list.push({errorCode: errorCode, amLoading: amLoading});
};
Messages.errorCodes=function()
{
   var result = [];
   for (var i=0; i < Messages.list.length; ++i)
   {
      result.push(Messages.list[i].errorCode);
   }
   return result;
};
