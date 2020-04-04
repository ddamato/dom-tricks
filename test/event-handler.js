const expect = require('assume');
const { JSDOM } = require("jsdom");
const page = require('../src/event-handler.js');

describe ('event-handler.js', () => {

  let window, document;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
    window = dom.window;
    document = window.document;
  })

  it('should add an event handler', () => {
    const contentFn = page.findContentFn('Add an event handler');
    const elem = document.createElement('div');
    document.body.appendChild(elem);
    
    let clicked;
    const callback = (click) => clicked = click;
    contentFn({ elem, callback });
    elem.dispatchEvent(new window.Event('click'));
    expect(clicked).equals('clicked!');
  });

  it('should only fire once', () => {
    const contentFn = page.findContentFn('Use an event handler once');
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    let clicked;
    const callback = (click) => clicked = click;
    contentFn({ elem, callback });
    elem.dispatchEvent(new window.Event('click'));
    expect(clicked).equals('clicked!');

    clicked = null;
    elem.dispatchEvent(new window.Event('click'));
    expect(clicked).equals(null);
  });

});