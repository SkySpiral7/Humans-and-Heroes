'use strict';
var originalLink;

function adjustLink(formId, linkId)
{
   var form = document.getElementById(formId);
   var options = [];
   for (var optionIndex = 0; undefined !== form.elements['option' + optionIndex]; ++optionIndex)
   {
      options.push(form.elements['option' + optionIndex].value);
   }
   if (0 === options.length) options = '';
   else options = '&options=' + options;  //comma separated number array

   var checkboxes = [];
   for (var checkboxIndex = 0; undefined !== form.elements['checkbox' + checkboxIndex]; ++checkboxIndex)
   {
      //encode boolean array into binary (no commas etc) for compactness
      checkboxes.push(form.elements['checkbox' + checkboxIndex].checked ? '1' : '0');
   }
   if (0 === checkboxes.length) checkboxes = '';
   else checkboxes = '&checkboxes=' + checkboxes.toString().replace(/,/g, '');

   var names = [];
   for (var nameIndex = 0; undefined !== form.elements['name' + nameIndex]; ++nameIndex)
   {
      names.push(form.elements['name' + nameIndex].value);
   }
   if (0 === names.length) names = '';
   //must stringify because names can contain anything
   else names = '&names=' + encodeURIComponent(JSON.stringify(names));

   var link = document.getElementById(linkId);
   if (undefined === originalLink) originalLink = link.href;
   link.href = originalLink + options + checkboxes + names;
}
