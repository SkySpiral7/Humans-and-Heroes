'use strict';
let fs = require('fs'),
   browserify = require('browserify');

browserify({
   entries: ['./ReactUtil.js']
})
.bundle()
.pipe(fs.createWriteStream("../javascript/generated/ReactUtil.js"));
//TODO: need to self install and add to compile
