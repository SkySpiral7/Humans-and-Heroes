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
      //generateFromBabel();
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
   //TODO: generated code has ... and arrows. fix then double check all browser support
   require('browserify')({
      entries: ['./node/ReactUtil.js']
   })
   //TODO: above worked but this does not.
   /*
   stuff I tried
   https://stackoverflow.com/questions/53877081/can-i-pass-options-to-a-babel-preset-using-the-browserify-cli
   https://stackoverflow.com/questions/33634111/babelify-6-with-browserify-and-the-es2015-preset-is-not-working
   https://github.com/browserslist/browserslist
   https://babeljs.io/docs/en/babel-preset-env
   https://babeljs.io/docs/en/config-files
   https://github.com/babel/babelify

   .transform(require("babelify").configure({
      presets: [['@babel/preset-env', {"targets": {
         "browsers": ["ie < 8"]
      }}]]
   }))

   .transform("babelify", {
      presets: [['@babel/preset-env', {"targets": {
         "browsers": ["ie < 8"]
      }}]]
   })

   .transform(require("babelify"), {
      presets: [['@babel/preset-env', {"targets": {
         "browsers": ["ie < 8"]
      }}]]
   })

   .transform('babelify', {
      "presets": [
         [
            "@babel/env",  //ignored
            {
               "targets": {
                  "browsers": [
                     "ie < 8"
                  ]
               }
            }
         ]
      ]
   })

   .transform('babelify', {
      "presets": [
         [
            "env",  //Error: Cannot find module 'babel-preset-env'. Did you mean "@babel/env"?
            {
               "targets": {
                  "browsers": [
                     "ie < 8"
                  ]
               }
            }
         ]
      ]
   })

   .transform('babelify', {
      "presets": [
            "@babel/preset-env",
            {
               "targets": {
                  "browsers": [
                     "ie < 8"
                  ]
               }
            }
      ]
   })
   .transform('babelify', {
      "presets": [
         "@babel/preset-react",
         [
            "@babel/preset-env",
            {
               "targets": {
                  "browsers": [
                     "ie < 8"
                  ]
               }
            }
         ]
      ]
   })

   transform can't be called after bundle or pipe
   using @babel/core after pipe is a race condition: will convert to empty file before browserify is done
   */
   // .transform("babelify", {
   //    presets: [['@babel/preset-env', {"targets": {
   //       "browsers": ["ie < 8"]
   //    }}]]
   // })
   .bundle()
   .pipe(fs.createWriteStream("javascript/generated/ReactUtil.js"));

   // require('@babel/core')
   // .transformFile('javascript/generated/ArrowReactUtil.js', {
   //       presets: ['@babel/preset-react', ['@babel/preset-env', {"targets": {
   //          "browsers": ["IE 11"]
   //       }}]],
   //       plugins: ['@babel/plugin-proposal-class-properties']
   //    },
   //    function (err, result)
   //    {
   //       if (err) throw err;
   //       //result; // => { code, map, ast }
   //       fs.writeFile('javascript/generated/ReactUtil.js', result.code, 'utf8', rethrow);
   //    });
}

main();
