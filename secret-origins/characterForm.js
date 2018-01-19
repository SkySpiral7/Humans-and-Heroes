var originalLink;
function adjustLink(formId, linkId)
{
   var link = document.getElementById(linkId);
   var form = document.getElementById(formId);
   var options = [];
   for (var optionIndex = 0; undefined !== form.elements['option' + optionIndex]; ++optionIndex)
   {
      options.push(form.elements['option' + optionIndex].value);
   }
   var names = [];
   for (var nameIndex = 0; undefined !== form.elements['name' + nameIndex]; ++nameIndex)
   {
      names.push(form.elements['name' + nameIndex].value);
   }
   names = encodeURIComponent(JSON.stringify(names));
   if(undefined === originalLink) originalLink = link.href;
   link.href = originalLink + '&options=' + options + '&names=' + names;
}
