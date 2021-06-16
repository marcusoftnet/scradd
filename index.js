const fs = require('fs');

const addScriptsNode = (packageJson) => {
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
};

const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, 0, 2));
};

const addScript = (path, name, script) => {
  const packageJson = require(path);

  addScriptsNode(packageJson);

  packageJson.scripts[name] = script;

  writeFile(path, packageJson);
  console.log(`Script '${name}' added to '${path}'`);
};

module.exports = {
  addScript,
};
