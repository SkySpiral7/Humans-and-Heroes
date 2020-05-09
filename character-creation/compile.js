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
         console.log('recreating node_modules...');
         const execSync = require('child_process').execSync;
         //babel from https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project
         //the rest from guessing
         //TODO: figure out how to upgrade to babel 7: @babel/core but couldn't get presets to work
         //https://jestjs.io/docs/en/tutorial-react has @babel/preset-env @babel/preset-react
         execSync('npm install babel-core@6 babel-preset-react-app@3 browserify @testing-library/react react-dom react');
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
   require('browserify')({
      entries: ['./node/ReactUtil.js']
   })
   .bundle()
   .pipe(fs.createWriteStream("javascript/generated/ReactUtil.js"));
}

main();
