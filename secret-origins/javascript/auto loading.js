'use strict';
//This file can only be tested by hand
var queryParameters = {};

(function(){
var allParameters = location.search.substring(1).split('&');  //"".substring(1) === "" and "".split('&') === [""]
for (var i=0; i < allParameters.length; ++i)
{
   var entry = allParameters[i].split('=', 2);  //can't have another =
   queryParameters[entry[0]] = entry[1];  //entry[1] might be undefined
}
if(undefined === queryParameters['options']) queryParameters['options'] = [];
else queryParameters['options'] = queryParameters['options'].split(',');
//if there are no query parameters at all then queryParameters === {"": undefined, "options": []}

if (undefined !== queryParameters['characterUrl'])
{
   var url = decodeURIComponent(queryParameters['characterUrl']);
   var ajaxRequest = new XMLHttpRequest();
   ajaxRequest.onreadystatechange = function()
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
            else if(400 > ajaxRequest.status) Main.loadFromString(ajaxRequest.responseText);
            else
            {
               if(404 === ajaxRequest.status) alert('Character file not found.');  //it's specific, simple, and the only one that's expected
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
   //ajaxRequest.onerror don't use since it will only trigger from a Cross origin request being denied which I've already covered
   //ajaxRequest.onload don't use since it will trigger on a 404 etc
   try
   {
      ajaxRequest.open('GET', url, true);  //IE11 will throw "Error: Access is denied." here for a Cross origin request being denied
      ajaxRequest.send();
   }
   catch (error)
   {
      alert('Failed to load character file.\n' + error);
      console.error(ajaxRequest, error);
   }
}

else if (undefined !== queryParameters['characterInclude'])
{
   var include = decodeURIComponent(queryParameters['characterInclude']);
   document.write('<script type="text/javascript" src="'+include+'.js"></script>');
   document.write('<script type="text/javascript">Main.load(json);</script>');
}
})();
