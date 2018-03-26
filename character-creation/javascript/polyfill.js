'use strict';
//Polyfill for IE11
if(undefined === Number.EPSILON){Number.EPSILON = 2.220446049250313e-16;}
if(undefined === Number.MAX_SAFE_INTEGER){Number.MAX_SAFE_INTEGER = 9007199254740991;}  //2**53-1
if(undefined === Number.MIN_SAFE_INTEGER){Number.MIN_SAFE_INTEGER = -9007199254740991;}  //-(2**53-1)
if(!Number.isNaN){Number.isNaN = isNaN;}
if(!Number.parseInt){Number.parseInt = parseInt;}
if(!Number.parseFloat){Number.parseFloat = parseFloat;}
if(!Math.trunc){Math.trunc = function(x){return x - (x % 1);}}  //~~x fails for 1.7976931348623157e+308
