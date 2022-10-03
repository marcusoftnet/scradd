#! /usr/bin/env node
const adder = require('../index');
const path = require('path');

const HEADER = `ScrAdd - Script Adder`;
const USAGE = `${HEADER}
Adds script to a package.json file.

Usage: 'npx scradd {path to package.json} {script name} {script content} -o'

- '-o' overwrites an existing script. Default behavior is to not overwrite existing scripts

Example:
  - local package.json - 'npx scradd . test "mocha ."'
  - path to package.json - 'npx scradd ~/projects/myproj/package.json "test:watch" "mocha . -- -R dot"'
  - overwrite test script - 'npx scradd . "test" "mocha -R min" -o'`;

if (process.argv.length < 5 || process.argv.length > 6) {
  console.log(USAGE);
  process.exit(0);
}

const packageFilePath =
  process.argv[2] !== '.' ? process.argv[2] : './package.json';
const overwrite = process.argv[5] === '-o';
const fullPath = path.resolve(packageFilePath);
const scriptName = process.argv[3];
const scriptContent = process.argv[4];

try {
  adder.addScript(fullPath, scriptName, scriptContent, overwrite);
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

console.log(`${HEADER}
   Added '${scriptName}' script to '${fullPath}'`);
process.exit(0);
