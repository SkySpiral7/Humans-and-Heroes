'use strict';
//This file can only be tested by hand
var queryParameters = parseQueryParameters(location.search);
//json is global here for includeJsCharacterFile's error message
var json;

(function(){
if (undefined !== queryParameters.loadAjaxCharacterFile)
{
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
      ajaxRequest.open('GET', queryParameters.loadAjaxCharacterFile, true);
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
   document.write('<script type="text/javascript" src="' + queryParameters.includeJsCharacterFile + '"></script>');
   document.write('<script type="text/javascript">' +
      'if(undefined === json) alert(\'Failed to load character file.\');' +
      'else Main.load(json);' +
      '</script>');
}
})();
