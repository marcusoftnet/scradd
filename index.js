const fs = require('fs');

const addScriptsNode = (packageJson) => {
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
};

const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, 0, 2));
};

const removeQuotes = (script) => script.replace(/['"]+/g, '');

const getJson = (path) => {
  if (!fs.existsSync(path)) {
    throw new Error(`Cannot find file '${path}'`);
  }

  let json;

  try {
    json = require(path);
  } catch (error) {
    throw new Error(`File '${path}' cannot be parsed as JSON`);
  }
  if (!json) throw new Error(`File '${path}' cannot be parsed as JSON`);
  return json;
};

const addScript = (path, name, script) => {
  if (!name) throw new Error('Missing script name');
  if (!script) throw new Error('Missing script content');

  const packageJson = getJson(path);

  // should return the new json
  addScriptsNode(packageJson);

  // run this check and adding in own method
  // return new script node
  if (packageJson.scripts.hasOwnProperty(name)) {
    throw new Error(`'${path}' already has a '${name}'-script`);
    return;
  }
  packageJson.scripts[name] = removeQuotes(script);

  writeFile(path, packageJson);
  console.log(`Script '${name}' added to '${path}'`);
};

module.exports = {
  addScript,
};

// addScript('./fixtures/with1Script.json', 'test', 'afafa');
