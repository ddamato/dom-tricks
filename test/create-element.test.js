const expect = require('assume');
const { JSDOM } = require("jsdom");
const page = require('../src/create-element.js');

describe ('create-element.js', () => {

  let dom, window, document;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
    window = dom.window;
    document = window.document;
  })

  it('create a div', () => {
    const contentFn = page.findContentFn('Create a div');
    let elem;
    const callback = (e) => elem = e;
    contentFn({ document, callback });
    expect(elem.tagName).equals('DIV');
  });

  it('create a text node with text', () => {
    const contentFn = page.findContentFn('Create a text node and set the content');
    let textNode;
    const callback = (e) => textNode = e;
    contentFn({ document, callback });
    expect(textNode.nodeValue).equals('Hello World!');
  });

});