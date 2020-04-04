const expect = require('assume');
const { JSDOM } = require("jsdom");
const page = require('../src/class-attribute.js');

describe ('class-attribute.js', () => {

  let dom, window, document;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
    window = dom.window;
    document = window.document;
  })

  it('should add classes', () => {
    const contentFn = page.findContentFn('Add a class to an element');
    const elem = document.createElement('div');
    contentFn({ elem });
    expect(elem.getAttribute('class')).equals('class-name several class-names');
  });

  it('should remove classes', () => {
    const contentFn = page.findContentFn('Remove a class from an element');
    const elem = document.createElement('div');
    elem.classList.add('class-name'); // add a class
    contentFn({ elem });
    expect(elem.getAttribute('class')).equals('');
  });

  it('should toggle classes', () => {
    const contentFn = page.findContentFn('Toggle a class');
    const elem = document.createElement('div');
    contentFn({ elem }); // toggle on
    expect(elem.getAttribute('class')).equals('class-name');
    contentFn({ elem }); // toggle off
    expect(elem.getAttribute('class')).equals('');
  });

});