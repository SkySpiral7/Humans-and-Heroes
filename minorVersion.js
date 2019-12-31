/*WARNING: this file is only allowed to change when increasing latestMinorRuleset
and must include all changes with that new version (and thus is normally a merge commit).*/

/*
var latestMajorRuleset = 3;
Not defined because it is intentionally difficult to increment (every page should be examined for implications)
and because the variable is basically worthless.
Also this file name isn't wrong because major version isn't defined in here.
*/

/**This uses var rather than const because the value is only used once and (unlike point counter)
the front page needs to be easy for any browser to load.*/
var latestMinorRuleset = 16;

/**For a ruleset, given a major version number this returns the highest existing minor version number.
Since there is no major version 0 it is marked as undefined so I can use a normal array.*/
var largestPossibleMinorRulesets = [undefined, 0, 7, latestMinorRuleset];
