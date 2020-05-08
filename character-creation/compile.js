'use strict';

const fs = require('fs'),
   browserify = require('browserify');

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
         const execSync = require('child_process').execSync;
         //command from https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project
         //-g didn't seem to work
         execSync('npm install babel-cli@6 babel-preset-react-app@3');
      }
      generateFromBabel();
      generateFromNode();

      console.log('done');
   });
}

function generateFromBabel()
{
   const babel = require('babel-core');

   fs.readdir('./babel', (err, files) =>
   {
      if (err) throw err;
      files.forEach(fileName =>
      {
         babel.transformFile('./babel/' + fileName, {presets: ['babel-preset-react-app/prod']},
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
   browserify({
      entries: ['./node/ReactUtil.js']
   })
   .bundle()
   .pipe(fs.createWriteStream("javascript/generated/ReactUtil.js"));
}

main();
