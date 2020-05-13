const presets = [
   [
      "@babel/env",
      {
         targets: {
            ie: "11"
         },
         useBuiltIns: "usage",
      },
   ],
];

const plugins = ["@babel/transform-arrow-functions"];

module.exports = { presets, plugins };
