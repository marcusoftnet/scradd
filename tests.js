const fs = require('fs');
const sut = require('.');

const FIXTURES_DIR = `./fixtures`;
const TESTRUN_DIR = `${FIXTURES_DIR}/testrun`;
const TESTFILE_PATH = `${TESTRUN_DIR}/package.json`;

describe('Scradd', () => {
  before(() => {
    if (!fs.existsSync(TESTRUN_DIR)) {
      fs.mkdirSync(TESTRUN_DIR);
    }
  });

  after(() => {
    fs.rmSync(TESTRUN_DIR, { recursive: true });
  });

  afterEach(() => {
    fs.unlinkSync(TESTFILE_PATH, { recursive: true });
  });

  const makeTestFile = (path) => {
    fs.copyFileSync(path, TESTFILE_PATH);
  };

  describe('works with correctly formatted package.json', () => {
    it('adds a script to scripts node', () => {
      makeTestFile('./fixtures/package-withScripts.json');
      sut.addScript(TESTFILE_PATH, 'demo:script', 'npm t');
    });

    it('adds a scripts node if none is present', () => {
      makeTestFile('./fixtures/package-noScript.json');
      sut.addScript(TESTFILE_PATH, 'demo:script', 'npm t');
    });
  });
});
