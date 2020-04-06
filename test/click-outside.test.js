const expect = require('assume');
const { JSDOM } = require('jsdom');
const page = require('../src/click-outside.js');

describe(page.title, () => {

  let window, document;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
    window = dom.window;
    document = window.document;
  })

  it('should detect outside clicks', () => {
    const contentFn = page.findContentFn('Detect clicks outside');
    const elem = document.createElement('div');
    document.body.appendChild(elem);
    let isOutside;
    const callback = (click) => isOutside = click;
    contentFn({ document, elem, callback });
    document.dispatchEvent(new window.Event('click'));
    expect(isOutside).to.be.true();
  });

});