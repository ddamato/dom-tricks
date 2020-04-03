const expect = require('assume');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const classes = require('../src/classes.js');

describe ('classes.js', () => {
  let dom, window, document;
  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
    window = dom.window;
    document = window.document;
  })

  it('should add classes', () => {
    const contentFn = classes.findContentFn('Add a class to an element');
    const elem = document.createElement('div');
    contentFn(elem);
    expect(elem.getAttribute('class')).equals('class-name several class-names');
  });

  it('should remove classes', () => {
    const contentFn = classes.findContentFn('Remove a class from an element');
    const elem = document.createElement('div');
    contentFn(elem);
    expect(elem.getAttribute('class')).equals(null);
  });

  it('should toggle classes', () => {
    const contentFn = classes.findContentFn('Toggle a class');
    const elem = document.createElement('div');
    contentFn(elem);
    expect(elem.getAttribute('class')).equals('class-name');
  });
});