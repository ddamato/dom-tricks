const path = require('path');
const fs = require('fs-extra');

const PAGE_SRC_PATH = path.resolve(__dirname, '..', 'src');
const PAGE_TEST_PATH = path.resolve(__dirname, '..', 'test');

const PAGE_SCAFFOLD = `
const Page = require('../lib/page.js');
module.exports = new Page(PAGE_TITLE);
`;

const TEST_SCAFFOLD = `
const expect = require('assume');
const { JSDOM } = require('jsdom');

describe(page.title, () => {
  let window, document;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    window = dom.window;
    document = window.document;
  })
});
`;

const [filename] = process.argv.slice(2);
const lowername = filename.toLowerCase().replace(/\s+/, '-');
const jsFilename = `${lowername}.js`;
const testFilename = `${lowername}.test.js`;
const reqFile = `const page = require('../src/${jsFilename}');`;
fs.ensureFileSync(path.join(PAGE_SRC_PATH, jsFilename));
fs.writeFileSync(path.join(PAGE_SRC_PATH, jsFilename), PAGE_SCAFFOLD, 'utf-8');

fs.ensureFileSync(path.join(PAGE_TEST_PATH, testFilename));
fs.writeFileSync(path.join(PAGE_TEST_PATH, testFilename), reqFile + TEST_SCAFFOLD, 'utf-8');
