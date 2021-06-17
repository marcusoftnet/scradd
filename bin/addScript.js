#! /usr/bin/env node
const adder = require('../index');

const HEADER = 'ScrAdd - Script Adder';
const USAGE = `${HEADER}
Adds script to a package.json file.

Usage: 'npx scradd {path to package.json} {script name} {script content}'

Example:
  - local package.json - 'npx scradd . test "mocha ."'
  - path to package.json - 'npx scradd ~/projects/myproj/package.json "test:watch" "mocha . -- -R dot"'`;

if (process.argv.length !== 5) {
  console.log(USAGE);
  process.exit(0);
}

const packageFilePath =
  process.argv[2] !== '.' ? process.argv[2] : './package.json';
const scriptName = process.argv[3];
const scriptContent = process.argv[4];

console.log(`${HEADER}
   - will add '${scriptName}' to '${packageFilePath}'`);

try {
  adder.addScript(packageFilePath, scriptName, scriptContent);
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

console.log(`   - '${scriptName}' added`);
process.exit(0);
