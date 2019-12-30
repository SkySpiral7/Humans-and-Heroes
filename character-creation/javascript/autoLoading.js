'use strict';
//This file can only be tested by hand
var queryParameters = {};
var json;

(function (){
var allParameters = location.search.substring(1).split('&');  //"".substring(1) === "" and "".split('&') === [""]
for (var i = 0; i < allParameters.length; ++i)
{
   var entry = allParameters[i].split('=', 2);  //can't have another =
   queryParameters[entry[0]] = entry[1];  //entry[1] might be undefined
}
if (undefined === queryParameters.options) queryParameters.options = [];
else queryParameters.options = queryParameters.options.split(',');
if (undefined === queryParameters.checkboxes) queryParameters.checkboxes = [];
else
{
   //checkboxes is binary eg: checkboxes=011000
   queryParameters.checkboxes = queryParameters.checkboxes
   .replace(/(.)/g, '$1,')  //add a comma after every number
   .replace(/,$/, '')  //remove last comma
   .replace(/0/g, 'false')  //convert 1/0 to true/false
   .replace(/1/g, 'true');
   queryParameters.checkboxes = JSON.parse('[' + queryParameters.checkboxes + ']');
}
if (undefined === queryParameters.names) queryParameters.names = [];
else queryParameters.names = JSON.parse(decodeURIComponent(queryParameters.names));
//if there are no query parameters at all then queryParameters === {"": undefined, "options": [], "names": []}

if (undefined !== queryParameters.loadAjaxCharacterFile)
{
   var url = decodeURIComponent(queryParameters.loadAjaxCharacterFile);
   var ajaxRequest = new XMLHttpRequest();
   ajaxRequest.onreadystatechange = function ()
   {
      try
      {
         if (XMLHttpRequest.DONE === ajaxRequest.readyState)
         {
            if (0 === ajaxRequest.status)
            {
               alert('Cross origin request denied.');
               console.error(ajaxRequest);
            }
            else if (400 > ajaxRequest.status) Main.loadFromString(ajaxRequest.responseText);
            else
            {
               //it's specific, simple, and the only one that's expected
               if (404 === ajaxRequest.status) alert('Character file not found.');
               else alert('Failed to load character file.\nHTTP Status Code: ' + ajaxRequest.status);
               console.error(ajaxRequest);
            }
         }
      }
      catch (error)
      {
         alert('Failed to load character file.\n' + error);
         console.error(ajaxRequest, error);
      }
   };
   //ajaxRequest.onerror don't use since it will only trigger from a Cross origin request being denied which I've
   //already covered ajaxRequest.onload don't use since it will trigger on a 404 etc
   try
   {
      //IE11 will throw "Error: Access is denied." here for a Cross origin request being denied
      ajaxRequest.open('GET', url, true);
      ajaxRequest.send();
   }
   catch (error)
   {
      alert('Failed to load character file.\n' + error);
      console.error(ajaxRequest, error);
   }
}

else if (undefined !== queryParameters.includeJsCharacterFile)
{
   var include = decodeURIComponent(queryParameters.includeJsCharacterFile);
   document.write('<script type="text/javascript" src="' + include + '"></script>');
   document.write('<script type="text/javascript">' +
      'if(undefined === json) alert(\'Failed to load character file.\');' +
      'else Main.load(json);' +
      '</script>');
}
})();
