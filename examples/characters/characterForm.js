'use strict';
var originalHref;

function adjustLink(formId, linkId)
{
   var form = document.getElementById(formId);
   var options = [];
   for (var optionIndex = 0; undefined !== form.elements['option' + optionIndex]; ++optionIndex)
   {
      options.push(form.elements['option' + optionIndex].value);
   }
   if (0 === options.length) options = '';
   //dot separated number array because . isn't escaped
   else options = '&options=' + options.toString().replace(/,/g, '.');

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
   else
   {
      //must stringify because names can contain anything.
      //likewise can't avoid comma separated but can remove braces
      var uriComponent = JSON.stringify(names);
      //using replace /^\[/ then /]$/ is less confusing then /^\[|]$/g which also works
      //using substring is more simple still (removes first and last characters)
      uriComponent = uriComponent.substring(1, uriComponent.length - 1);
      names = '&names=' + encodeURIComponent(uriComponent);
   }

   var link = document.getElementById(linkId);
   if (undefined === originalHref) originalHref = link.href;
   link.href = originalHref + options + checkboxes + names;
}
