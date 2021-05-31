const expect = require('assume');
const { JSDOM } = require('jsdom');
const page = require('../src/css-styles.js');

describe(page.title, () => {

  let window, document;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
    window = dom.window;
    document = window.document;
  })

  it('should set and get inline styles', () => {
    const contentFn = page.findContentFn('Set and get inline styles');
    const elem = document.createElement('div');
    let size, color, weight;
    const callback = (fontSize, backgroundColor, fontWeight) => {
      size = fontSize, color = backgroundColor, weight = fontWeight; 
    };
    contentFn({ elem, callback });
    expect(size).equals('1rem');
    expect(color).equals('');
    expect(weight).equals('700');
  });

  it('should get computed computed background color', () => {
    const contentFn = page.findContentFn('Get computed styles');
    const elem = document.createElement('div');
    let color;
    const callback = (bgColor) => color = bgColor;
    contentFn({ window, document, elem, callback });
    expect(color).equals('rgb(255, 0, 0)');
  });

  it('should get the default display for div', () => {
    const contentFn = page.findContentFn('Get the default styles');
    let block;
    const callback = (display) => block = display;
    contentFn({ window, document, callback });
    expect(block).equals('block');
  });

});