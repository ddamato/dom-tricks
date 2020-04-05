const Page = require('../lib/page.js');

module.exports = new Page('Get CSS styles')
.section('Get computed styles', ({ window, document, elem, callback }) => {
  /** 
   * First let's add some style to the page programmatically. This could be done as a normal `.css` file too.
   */
  const style = document.createElement('style');
  style.textContent = 'div { background-color: red; }';
  document.head.appendChild(style);

  /**
   * Now let's get the computed style.
   */
  const computedStyle = window.getComputedStyle(elem);
  const bgColor = computedStyle.getPropertyValue('background-color');
  callback(bgColor);

  /** 
   * `bgColor` resolves to `rgb(255, 0, 0)`, not the exact value found in the `.css` file.
   */
})
.section('Get the default value', ({ window, callback }) => {
  /**
   * Now let's get the computed style.
   */

  const elem = document.createElement('p');
  document.body.appendChild(elem);
  const computedStyle = window.getComputedStyle(elem);
  const margin = computedStyle.getPropertyValue('margin');
  document.body.removeChild(elem);

  callback(margin);
})
.section('Set and get inline styles', ({ elem, callback }) => {
  /**
   * Setting a css style is done on the `style` property using the camelCase name.
   */

  elem.style.fontSize = '1rem';

  /**
   * Getting a css style is done by accessing `style` property using the camelCase name.
   * 
   * If the style wasn't written in the HTML, you cannot get the styles applied.
   */

  const fontSize = elem.style.fontSize;

  callback(fontSize);
})
.related(['./index.js']);