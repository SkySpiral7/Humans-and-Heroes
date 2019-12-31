'use strict';

function parseQueryParameters(queryString)
{
   var queryParameters = {};
   //TODO: fast path if queryString blank return empty
   var allParameters = queryString.substring(1).split('&');  //"".substring(1) === "" and "".split('&') === [""]
   for (var i = 0; i < allParameters.length; ++i)
   {
      var entry = allParameters[i].split('=', 2);  //can't have another =
      //TODO: decodeURIComponent here
      queryParameters[entry[0]] = entry[1];  //entry[1] might be undefined
   }
   if (undefined === queryParameters.options) queryParameters.options = [];
   else queryParameters.options = queryParameters.options.split(/\./);
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
   else queryParameters.names = JSON.parse('[' + decodeURIComponent(queryParameters.names) + ']');
   //if there are no query parameters at all then queryParameters === {"": undefined, options: [], checkboxes: [], names: []}
   //TODO: rename query parameter "names" to "strings" (requires update in most super chars)

   //checkboxes could be hex and param names could be min-ed. but am I anywhere near 2k URL limit of IE? (then 4k)
   //no: crime fighter was 250 characters. therefore leave like this since it is fully developer readable
   //I see no further possible compression without something like ZIP
   //base64 is decompressed 33% but wouldn't need % escaping so it may improve names

   return queryParameters;
}
