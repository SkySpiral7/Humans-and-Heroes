'use strict';

function parseQueryParameters(queryString)
{
   var queryParameters = {options: [], checkboxes: [], strings: []};
   //''.substring(1) === ''
   if ('' === queryString.substring(1)) return queryParameters;
   var allParameters = queryString.substring(1).split('&');
   for (var i = 0; i < allParameters.length; ++i)
   {
      var entry = allParameters[i].split('=', 2);  //can't have another =
      if (undefined !== entry[1]) entry[1] = decodeURIComponent(entry[1]);  //will be undefined if there's no =
      queryParameters[entry[0]] = entry[1];  //allow just a key since '?a' => {a: undefined} is accurate
   }
   //options, checkboxes, strings will be [] or a string
   if ('string' === typeof(queryParameters.options)) queryParameters.options = queryParameters.options.split(/\./);
   if ('string' === typeof(queryParameters.checkboxes))
   {
      //checkboxes is binary eg: checkboxes=011000
      queryParameters.checkboxes = queryParameters.checkboxes
      .replace(/(.)/g, '$1,')  //add a comma after every number
      .replace(/,$/, '')  //remove last comma
      .replace(/0/g, 'false')  //convert 1/0 to true/false
      .replace(/1/g, 'true');
      queryParameters.checkboxes = JSON.parse('[' + queryParameters.checkboxes + ']');
   }
   if ('string' === typeof(queryParameters.strings)) queryParameters.strings =
      JSON.parse('[' + queryParameters.strings + ']');

   //checkboxes could be hex and param names could be min-ed. but am I anywhere near 2k URL limit of IE? (then 4k)
   //no: crime fighter was 250 characters. therefore leave like this since it is fully developer readable
   //I see no further possible compression without something like ZIP
   //base64 is decompressed 33% but wouldn't need % escaping so it may improve strings

   return queryParameters;
}
