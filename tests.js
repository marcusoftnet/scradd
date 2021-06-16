const fs = require('fs');
const assert = require('assert');
const sut = require('.');

const FIXTURES_DIR = `./fixtures`;
const TESTRUN_DIR = `${FIXTURES_DIR}/testrun`;
const TESTFILE_PATH = `${TESTRUN_DIR}/package.json`;

describe('Scradd', () => {
  const makeTestRunDir = () => {
    if (!fs.existsSync(TESTRUN_DIR)) {
      fs.mkdirSync(TESTRUN_DIR);
    }
  };

  const makeTestFile = (path, newPath) => {
    fs.copyFileSync(path, newPath);
  };

  const assertScript = (path, script, content) => {
    const packageJson = require(path);
    assert.notStrictEqual(packageJson.scripts[script], null);
    assert.strictEqual(packageJson.scripts[script], content);
  };

  const getNumberOfScripts = (path) => {
    const packageJson = require(path);
    return Object.keys(packageJson.scripts).length;
  };

  const createTestFileName = (num) => {
    return TESTFILE_PATH.replace('.json', `${num}.json`);
  };

  before(() => makeTestRunDir());
  after(() => fs.rmSync(TESTRUN_DIR, { recursive: true }));

  describe('works with correctly formatted package.json', () => {
    it('adds a script to scripts node', () => {
      const fileName = createTestFileName(1);

      makeTestFile('./fixtures/with3Scripts.json', fileName);
      sut.addScript(fileName, 'demo:script', 'npm t');
      assertScript(fileName, 'demo:script', 'npm t');
    });

    it('keep the existing scripts', () => {
      const fileName = createTestFileName(2);

      makeTestFile('./fixtures/with3Scripts.json', fileName);
      sut.addScript(fileName, 'demo:script', 'npm t');
      assert.strictEqual(getNumberOfScripts(fileName), 4);
    });

    it('adds a scripts node if none is present', () => {
      const fileName = createTestFileName(3);

      makeTestFile('./fixtures/noScript.json', fileName);
      sut.addScript(fileName, 'demo:script', 'npm t');
      assertScript(fileName, 'demo:script', 'npm t');
    });

    it('removes double quotes around script', () => {
      const fileName = createTestFileName(4);

      makeTestFile('./fixtures/noScript.json', fileName);
      sut.addScript(fileName, 'demo:script', '"npm t"');
      assertScript(fileName, 'demo:script', 'npm t');
    });

    it('removes single quotes around script', () => {
      const fileName = createTestFileName(5);

      makeTestFile('./fixtures/noScript.json', fileName);
      sut.addScript(fileName, 'demo:script', "'npm t'");
      assertScript(fileName, 'demo:script', 'npm t');
    });
  });

  describe('error cases ', () => {
    it('no script name', () => {
      assert.throws(() => {
        sut.addScript(TESTFILE_PATH, undefined, 'apa');
      }, Error('Missing script name'));
    });
    it('empty script name', () => {
      assert.throws(() => {
        sut.addScript(TESTFILE_PATH, '', 'apa');
      }, Error('Missing script name'));
    });
    it('no script content', () => {
      assert.throws(() => {
        sut.addScript(TESTFILE_PATH, 'apa', undefined);
      }, Error('Missing script content'));
    });
    it('empty script content', () => {
      assert.throws(() => {
        sut.addScript(TESTFILE_PATH, 'apa', '');
      }, Error('Missing script content'));
    });
    it('missing package.json file', () => {
      assert.throws(() => {
        sut.addScript(`${TESTRUN_DIR}/apa.json`, 'apa', 'apa');
      }, Error(`Cannot find file '${TESTRUN_DIR}/apa.json'`));
    });
    it('broken json file', () => {
      const fileName = createTestFileName(6);
      assert.throws(() => {
        makeTestFile('./fixtures/brokenJSON.json', fileName);

        sut.addScript(fileName, 'apaa', 'apa');
      }, Error(`File '${fileName}' cannot be parsed as JSON`));
    });
    it('script already present', () => {
      const fileName = createTestFileName(6);
      assert.throws(() => {
        makeTestFile('./fixtures/with1Script.json', fileName);

        sut.addScript(fileName, 'test', 'apa');
      }, Error(`'${fileName}' already has a 'test'-script`));
    });
  });
});
