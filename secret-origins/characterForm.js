var originalLink;
function adjustLink(formId, linkId)
{
   var form = document.getElementById(formId);
   var options = [];
   for (var optionIndex = 0; undefined !== form.elements['option' + optionIndex]; ++optionIndex)
   {
      options.push(form.elements['option' + optionIndex].value);
   }

   var checkboxes = [];
   for (var checkboxIndex = 0; undefined !== form.elements['checkbox' + checkboxIndex]; ++checkboxIndex)
   {
      checkboxes.push(form.elements['checkbox' + checkboxIndex].checked ? '1' : '0');
   }
   checkboxes = checkboxes.toString().replace(/,/g, '');

   var names = [];
   for (var nameIndex = 0; undefined !== form.elements['name' + nameIndex]; ++nameIndex)
   {
      names.push(form.elements['name' + nameIndex].value);
   }
   names = encodeURIComponent(JSON.stringify(names));

   var link = document.getElementById(linkId);
   if(undefined === originalLink) originalLink = link.href;
   link.href = originalLink + '&options=' + options + '&checkboxes=' + checkboxes + '&names=' + names;
}
