'use strict';

const fs = require('fs');

function rethrow(err) {if (err) throw err;}

function main()
{
   //rm -rf javascript/generated/ &> /dev/null
   fs.rmdirSync('javascript/generated/', {recursive: true});
   fs.mkdirSync('javascript/generated/');

   fs.access('node_modules/', (err) =>
   {
      if (err)
      {
         //TODO: just npm install
         console.log('recreating node_modules...');
         const execSync = require('child_process').execSync;
         execSync('npm install @babel/core @babel/preset-react @babel/plugin-proposal-class-properties ' +
            'browserify @testing-library/react react-dom react');
      }
      generateFromBabel();
      generateFromNode();

      console.log('done');
   });
}

function generateFromBabel()
{
   const babel = require('@babel/core');

   fs.readdir('./babel', (err, files) =>
   {
      if (err) throw err;
      files.forEach(fileName =>
      {
         babel.transformFile('./babel/' + fileName, {
               presets: ['@babel/preset-react', ['@babel/preset-env', {"targets": {
                  "browsers": ["IE 11"]
               }}]],
               plugins: ['@babel/plugin-proposal-class-properties']
            },
            function (err, result)
            {
               if (err) throw err;
               //result; // => { code, map, ast }
               fs.writeFile('javascript/generated/' + fileName, result.code, 'utf8', rethrow);
            });
      });
   });
}

function generateFromNode()
{
   //TODO: generated code has arrows. fix then double check all browser support
   require('browserify')({
      entries: ['./node/ReactUtil.js']
   })
   .bundle()
   .pipe(fs.createWriteStream("javascript/generated/ReactUtil.js"));
}

main();
