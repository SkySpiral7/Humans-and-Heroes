//Polyfill for IE11
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

(function(){
/**This is used to make links and upc.png be an absolute path on both localhost and skyspiral7.github.io. The gh-pages part is the default unzipped name.*/
var absolutePrefix = location.href.replace(/(\/Humans-and-Heroes(?:-gh-pages)?)\/?.*?$/, '$1/');
/**This is used to determine which link in the sidebar is my current page or a parent of current*/
var currentPage = location.href.substring(absolutePrefix.length);

currentPage = currentPage.replace(/\?.*$/, '').replace(/#.*$/, '');  //ignore query parameters and anchor
if (!currentPage.endsWith('.html'))
{
   if(!currentPage.endsWith('/')) currentPage += '/';
   currentPage += 'index.html';
}

var output = '';

output+='<form action="javascript:search();">\n';
output+='<input type="text" value="" width="100%" id="searchBar" />\n';
output+='<input type="submit" value="Search" />\n';
output+='</form>\n';

output+='<div class="sites-sidebar-nav"><ul>\n';

var navigationJson = [
   {
      "name": "Site Map",
      "link": "site-map.html"
   },
   {
      "name": "Creating a character",
      "link": "character-creation/index.html",
      "children": [
         {
            "name": "Calculator",
            "link": "character-creation/point-counter.html"
         },
         {
            "name": "Abilities",
            "link": "character-creation/abilities.html"
         },
         {
            "name": "Constructs",
            "link": "character-creation/constructs.html"
         },
         {
            "name": "Powers",
            "link": "character-creation/powers/index.html",
            "children": [
               {
                  "name": "Effects",
                  "link": "character-creation/powers/effects/index.html",
                  "children": [
                     {
                        "name": "Affliction",
                        "link": "character-creation/powers/effects/affliction.html"
                     },
                     {
                        "name": "Attain Knowledge",
                        "link": "character-creation/powers/effects/attain-knowledge.html"
                     },
                     {
                        "name": "Communication",
                        "link": "character-creation/powers/effects/communication.html"
                     },
                     {
                        "name": "Comprehend",
                        "link": "character-creation/powers/effects/comprehend.html"
                     },
                     {
                        "name": "Concealment",
                        "link": "character-creation/powers/effects/concealment.html"
                     },
                     {
                        "name": "Create",
                        "link": "character-creation/powers/effects/create.html"
                     },
                     {
                        "name": "Damage",
                        "link": "character-creation/powers/effects/damage.html"
                     },
                     {
                        "name": "Enhanced Trait",
                        "link": "character-creation/powers/effects/enhanced-trait.html"
                     },
                     {
                        "name": "Environment",
                        "link": "character-creation/powers/effects/environment.html"
                     },
                     {
                        "name": "Feature",
                        "link": "character-creation/powers/effects/feature.html"
                     },
                     {
                        "name": "Flight",
                        "link": "character-creation/powers/effects/flight.html"
                     },
                     {
                        "name": "Growth",
                        "link": "character-creation/powers/effects/growth.html"
                     },
                     {
                        "name": "Healing",
                        "link": "character-creation/powers/effects/healing.html"
                     },
                     {
                        "name": "Illusion",
                        "link": "character-creation/powers/effects/illusion.html"
                     },
                     {
                        "name": "Immortality",
                        "link": "character-creation/powers/effects/immortality.html"
                     },
                     {
                        "name": "Immunity",
                        "link": "character-creation/powers/effects/immunity.html"
                     },
                     {
                        "name": "Insubstantial",
                        "link": "character-creation/powers/effects/insubstantial.html"
                     },
                     {
                        "name": "Leaping",
                        "link": "character-creation/powers/effects/leaping.html"
                     },
                     {
                        "name": "Luck Control",
                        "link": "character-creation/powers/effects/luck-control.html"
                     },
                     {
                        "name": "Mental Transform",
                        "link": "character-creation/powers/effects/mental-transform.html"
                     },
                     {
                        "name": "Mind Reading",
                        "link": "character-creation/powers/effects/mind-reading.html"
                     },
                     {
                        "name": "Mind Switch",
                        "link": "character-creation/powers/effects/mind-switch.html"
                     },
                     {
                        "name": "Morph",
                        "link": "character-creation/powers/effects/morph.html"
                     },
                     {
                        "name": "Move Object",
                        "link": "character-creation/powers/effects/move-object.html"
                     },
                     {
                        "name": "Movement",
                        "link": "character-creation/powers/effects/movement.html"
                     },
                     {
                        "name": "Nullify",
                        "link": "character-creation/powers/effects/nullify.html"
                     },
                     {
                        "name": "Permeate",
                        "link": "character-creation/powers/effects/permeate.html"
                     },
                     {
                        "name": "Phantom Ranks",
                        "link": "character-creation/powers/effects/phantom-ranks.html"
                     },
                     {
                        "name": "Protection",
                        "link": "character-creation/powers/effects/protection.html"
                     },
                     {
                        "name": "Quickness",
                        "link": "character-creation/powers/effects/quickness.html"
                     },
                     {
                        "name": "Regeneration",
                        "link": "character-creation/powers/effects/regeneration.html"
                     },
                     {
                        "name": "Remote Sensing",
                        "link": "character-creation/powers/effects/remote-sensing.html"
                     },
                     {
                        "name": "Resistance",
                        "link": "character-creation/powers/effects/resistance.html"
                     },
                     {
                        "name": "Senses",
                        "link": "character-creation/powers/effects/senses.html"
                     },
                     {
                        "name": "Shrinking",
                        "link": "character-creation/powers/effects/shrinking.html"
                     },
                     {
                        "name": "Summon Minion",
                        "link": "character-creation/powers/effects/summon-minion.html"
                     },
                     {
                        "name": "Summon Object",
                        "link": "character-creation/powers/effects/summon-object.html"
                     },
                     {
                        "name": "Teleport",
                        "link": "character-creation/powers/effects/teleport.html"
                     },
                     {
                        "name": "Transform",
                        "link": "character-creation/powers/effects/transform.html"
                     },
                     {
                        "name": "Variable",
                        "link": "character-creation/powers/effects/variable.html"
                     },
                     {
                        "name": "Weaken",
                        "link": "character-creation/powers/effects/weaken.html"
                     }
                  ]
               },
               {
                  "name": "Descriptors",
                  "link": "character-creation/powers/descriptors.html"
               },
               {
                  "name": "Modifiers",
                  "link": "character-creation/powers/modifiers/index.html",
                  "children": [
                     {
                        "name": "Extras",
                        "link": "character-creation/powers/modifiers/extras.html"
                     },
                     {
                        "name": "Flaws",
                        "link": "character-creation/powers/modifiers/flaws.html"
                     }
                  ]
               }
            ]
         },
         {
            "name": "Gadgets &amp; Gear",
            "link": "character-creation/gadgets-gear/index.html",
            "children": [
               {
                  "name": "Headquarters",
                  "link": "character-creation/gadgets-gear/headquarters.html"
               },
               {
                  "name": "Vehicles",
                  "link": "character-creation/gadgets-gear/vehicles.html"
               }
            ]
         },
         {
            "name": "Advantages",
            "link": "character-creation/advantages.html"
         },
         {
            "name": "Skills",
            "link": "character-creation/skills.html"
         },
         {
            "name": "Defenses",
            "link": "character-creation/defenses.html"
         },
         {
            "name": "Complications",
            "link": "character-creation/complications.html"
         }
      ]
   },
   {
      "name": "Playing the game",
      "link": "gameplay/index.html",
      "children": [
         {
            "name": "The Basics",
            "link": "gameplay/the-basics.html"
         },
         {
            "name": "Conditions",
            "link": "gameplay/conditions.html"
         },
         {
            "name": "Glossary of Terms",
            "link": "gameplay/glossary-of-terms.html"
         },
         {
            "name": "Ranks and Measures",
            "link": "gameplay/ranks-and-measures.html"
         }
      ]
   },
   {
      "name": "Running the game",
      "link": "gamemastering/index.html",
      "children": [
         {
            "name": "Series",
            "link": "gamemastering/series.html"
         },
         {
            "name": "Supplementary Rules",
            "link": "gamemastering/supplementary-rules.html"
         }
      ]
   },
   {
      "name": "Examples",
      "link": "examples/index.html",
      "children": [
         {
            "name": "Complications",
            "link": "examples/complications.html"
         },
         {
            "name": "Characters",
            "link": "examples/characters/index.html",
            "children": [
               /*{
                  "name": "High Fantasy (PL 10)",  //currently none
                  "link not": "examples/characters/high-fantasy/index.html"
               },*/
               {
                  "name": "Super Heroes (PL 10)",
                  "link": "examples/characters/super-heroes/index.html",
                  "children": [
                     {
                        "name": "Battlesuit",
                        "link": "examples/characters/super-heroes/battlesuit.html"
                     },
                     {
                        "name": "Construct",
                        "link": "examples/characters/super-heroes/construct.html"
                     },
                     {
                        "name": "Crime Fighter",
                        "link": "examples/characters/super-heroes/crime-fighter.html"
                     },
                     {
                        "name": "Energy Controller",
                        "link": "examples/characters/super-heroes/energy-controller.html"
                     },
                     {
                        "name": "Gadgeteer",
                        "link": "examples/characters/super-heroes/gadgeteer.html"
                     },
                     {
                        "name": "Martial Artist",
                        "link": "examples/characters/super-heroes/martial-artist.html"
                     },
                     {
                        "name": "Mimic",
                        "link": "examples/characters/super-heroes/mimic.html"
                     },
                     {
                        "name": "Mystic",
                        "link": "examples/characters/super-heroes/mystic.html"
                     },
                     {
                        "name": "Paragon",
                        "link": "examples/characters/super-heroes/paragon.html"
                     },
                     {
                        "name": "Powerhouse",
                        "link": "examples/characters/super-heroes/powerhouse.html"
                     },
                     {
                        "name": "Psychic",
                        "link": "examples/characters/super-heroes/psychic.html"
                     },
                     {
                        "name": "Shapeshifter",
                        "link": "examples/characters/super-heroes/shapeshifter.html"
                     },
                     {
                        "name": "Speedster",
                        "link": "examples/characters/super-heroes/speedster.html"
                     }
                  ]
               },
               {
                  "name": "Animals",
                  "link": "examples/characters/animals/index.html"
               },
               {
                  "name": "Civilians",
                  "link": "examples/characters/civilians/index.html"
               },
               {
                  "name": "Constructs",
                  "link": "examples/characters/constructs/index.html",
                  "children": [
                     {
                        "name": "Giant Robot",
                        "link": "examples/characters/constructs/giant-robot.html"
                     },
                     {
                        "name": "Robot",
                        "link": "examples/characters/constructs/robot.html"
                     },
                     {
                        "name": "Zombie",
                        "link": "examples/characters/constructs/zombie.html"
                     }
                  ]
               },
               {
                  "name": "Public Servants",
                  "link": "examples/characters/public-servants/index.html"
               },
               {
                  "name": "Trained Combatants",
                  "link": "examples/characters/trained-combatants/index.html"
               },
               {
                  "name": "Underworld Archetypes",
                  "link": "examples/characters/underworld-archetypes/index.html"
               },
               {
                  "name": "Other Works",
                  "link": "examples/characters/other-works/index.html"
               }
            ]
         },
         {
            "name": "Gadgets &amp; Gear",
            "link": "examples/gadgets-gear/index.html",
            "children": [
               {
                  "name": "Armor",
                  "link": "examples/gadgets-gear/armor.html"
               },
               {
                  "name": "Devices",
                  "link": "examples/gadgets-gear/devices.html"
               },
               {
                  "name": "General Equipment",
                  "link": "examples/gadgets-gear/general-equipment.html"
               },
               {
                  "name": "Headquarters",
                  "link": "examples/gadgets-gear/headquarters.html"
               },
               {
                  "name": "Vehicles",
                  "link": "examples/gadgets-gear/vehicles.html"
               },
               {
                  "name": "Weapons",
                  "link": "examples/gadgets-gear/weapons.html"
               }
            ]
         },
         {
            "name": "Powers",
            "link": "examples/powers/index.html"
         },
         /*{
            "name": "Templates",  //currently none. things like "to be an elf take these powers"
            "link not": "examples/templates/index.html"
         }*/
         {
            "name": "Series",
            "link": "examples/series.html"
         }
      ]
   },
   {
      "name": "Meta",
      "link": "meta/index.html",
      "children": [
         {
            "name": "Calculations",
            "link": "meta/calculations.html"
         },
         {
            "name": "Known Issues",
            "link": "meta/known-issues.html"
         },
         {
            "name": "Open Game License",
            "link": "meta/open-game-license.html"
         },
         {
            "name": "Statistics",
            "link": "meta/statistics.html"
         },
         {
            "name": "Survey",
            "link": "meta/survey.html"
         },
         {
            "name": "Versioning",
            "link": "meta/versioning.html"
         }
      ]
   }
];

var expandIndex = 0;

function sideBarCreation(entry, depth)
{
   var isParent = (undefined !== entry.children);

   output+='<li';
   if (isParent || 0 === depth)
   {
      output+=' class="';
      if(0 === depth) output+='topLevel';
      if(navigationJson[0] === entry) output+=' nav-first';
      if (isParent)
      {
         if(0 === depth) output+=' ';
         output+='parent';
         var containingFolderOfLink = entry.link.replace(/\/[^\/]*?$/, '/');
         if(depth > 0 && !currentPage.startsWith(containingFolderOfLink)) output+=' closed';
         output+='" id="expand' + expandIndex;
      }
      output+='"';
   }
   output+='>\n';

   output+='<div ';
   if(entry.link === currentPage) output+='class="current-bg" ';
   output+='style="padding-left: ';

   var padding = 19;
   if(isParent) padding = 0;
   padding += (19 * depth);
   output+=''+ padding;

   output+='px;">\n';
   if(isParent) output+='<div class="expander" onClick="return toggleMe(\'expand' + expandIndex + '\');"></div>\n';
   if(entry.link === currentPage) output+=entry.name + '\n';
   else output+='<a href="' + absolutePrefix + entry.link + '">' + entry.name + '</a>\n';
   output+='</div>\n';

   if (isParent)
   {
      ++expandIndex;
      output+='<ul>\n';
      for (var i = 0; i < entry.children.length; ++i)
      {
         sideBarCreation(entry.children[i], (depth+1));
      }
      output+='</ul>\n';
   }
   output+='</li>\n';
}
for (var i = 0; i < navigationJson.length; ++i)
{
   sideBarCreation(navigationJson[i], 0);
}

output+='</ul>\n';
output+='</div>\n';
output+='<hr/><div class="sites-embed-content-sidebar-textbox"><div class="stamp-top">\n';
output+='COMICS<br />\n';
output+='GROUP\n';
output+='</div>\n';
output+='<div class="stamp-middle">\n';
output+='35&cent;\n';
output+='</div>\n';
output+='<div class="stamp-bottom" title="Send me an email!">\n';
output+='<a href="mailto:rworcest@g.emporia.edu">CONTACT ME</a>\n';
output+='</div></div>\n';
output+='<h2>M&amp;M External Links</h2>\n';
output+='<a href="http://www.greenronin.com/">Green Ronin</a><br />\n';
output+='<a href="http://mutantsandmasterminds.com/">Mutants &amp; Masterminds.com</a><br />\n';
output+='<a href="http://www.atomicthinktank.com/index.php">Mutants &amp; Masterminds Forum</a><br />\n';
output+='<a href="http://mmconversions.wikidot.com/">Hero Conversions</a><br />\n';
output+='<a href="http://wolflair.com/index.php?context=hero_lab">Hero Lab</a><br />\n';
output+='<a href="http://grfiles.game-host.org/3e_files/MnM3_charsheet_color.pdf">Character Sheet</a><br />\n';
output+='<a href="http://www.atomicthinktank.com/viewtopic.php?f=1&t=37265">Character Generator</a><br />\n';
output+='<a href="http://stornart.com/">Hero Art by Storn Cook</a><br />\n';
output+='<a href="http://opengameart.org/">Open Game Art</a><br />\n';
output+='<a href="http://www.d20herosrd.com/">d20 Hero SRD (M&amp;M SRD)</a>\n';
output+='<hr/>\n';
output+='<div class="sites-embed-content-sidebar-textbox">\n';
output+='<img src="' + absolutePrefix + 'images/upc.png" class="generated-class-9" />\n';
output+='</div>\n';

document.getElementsByClassName('sites-layout-sidebar-left')[0].innerHTML = output;
//There will only be 1. Doing this because chrome complained about document.write(output);
})();

function toggleMe(elementId)
{
   var element = document.getElementById(elementId);
   if(null === element) return true;

   if(element.className.endsWith(' closed')) element.className = element.className.replace(' closed', '');
   else element.className += ' closed';
   return true;
}
function search()
{
   var searchText = document.getElementById('searchBar').value;
   var url = 'https://www.google.com/search?q=site%3Ahttp%3A%2F%2Fskyspiral7.github.io%2FHumans-and-Heroes%20' + encodeURIComponent(searchText);
   window.location.href = url;
   return false;
}
