const expect = require('assume');
const { JSDOM } = require('jsdom');
const page = require('../src/class-attribute.js');

describe(page.title, () => {

  let window, document;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
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
    expect(elem.getAttribute('class')).equals('class-name it-depends');
    contentFn({ elem }); // toggle off
    expect(elem.getAttribute('class')).equals('it-depends');
  });

  it('should check for a class', () => {
    const contentFn = page.findContentFn('Check for a specific class');
    const elem = document.createElement('div');
    elem.classList.add('class-name'); // add a class
    let hasClass;
    const callback = (bool) => hasClass = bool;
    contentFn({ elem, callback });
    expect(hasClass).to.be.true();
  });

});