const Page = require('../lib/page.js');

module.exports = new Page('Managing CSS styles', () => {
  /**
   * Managing css styles in JavaScript can happen in a few different ways depending on your needs.
   */
})
.section('Set and get inline styles', ({ elem, callback }) => {
  /**
   * Setting a css style is done on the `style` property using the "camelCase" name. This is the quickest way to apply a css style in JavaScript to an element.
   */

  elem.style.fontSize = '1rem';

  /**
   * Getting a css style is done by accessing `style` property using the "camelCase" name.
   * 
   * If the style wasn't written in the HTML, you cannot get the styles applied.
   */

  // fontSize === '1rem' since we set it in JavaScript above
  const fontSize = elem.style.fontSize;

  // backgroundColor === '' because we did not set this property, it will not determine what the default value is either
  const backgroundColor = elem.style.backgroundColor;

  /**
   * You can also get and set using the snake-case property by using some built-in methods
   */

  // Set the font-weight to 700
  elem.style.setProperty('font-weight', 700);

  // fontWeight === '700', this returns a string since it's an HTML attribute value.
  const fontWeight = elem.style.getPropertyValue('font-weight');

  callback(fontSize, backgroundColor, fontWeight);
})
.section('Get computed styles', ({ window, document, elem, callback }) => {
  /** 
   * In some cases, you'd like to know what css styles are applied to an element. This means we must "compute" the styles.
   * 
   * First let's add some style to the page programmatically. This could be done as a normal `.css` file too.
   */
  const style = document.createElement('style');
  style.textContent = 'div { background: #ff0000; }';
  document.head.appendChild(style);

  /**
   * Now let's get the computed style.
   */
  const computedStyle = window.getComputedStyle(elem);
  const bgColor = computedStyle.getPropertyValue('background-color');
  callback(bgColor);

  /** 
   * Note: `bgColor` resolves to `rgb(255, 0, 0)`, not the exact value found in the `.css` file or in our case the hex value (`#ff0000`) that we set above.
   */
})
.section('Get the default styles', ({ window, document, callback }) => {
  /**
   * Here's a method to determine the default (user-agent) styles of an element
   */

  // Create a new element
  const elem = document.createElement('div');

  // Add it to the DOM
  document.body.appendChild(elem);

  // Get the computed style
  const computedStyle = window.getComputedStyle(elem);

  // Find the value(s) you want to check
  const display = computedStyle.getPropertyValue('display');

  // Remove it from the DOM
  document.body.removeChild(elem);

  callback(display);

  /**
   * It's important to get the computed style _before_ removing it from the DOM. Computing the style happens on the actual element as it exists in the page. If it's not there, the styles will not exist and therefore cannot be computed. 
   */
})
.related([
  './class-attribute.js',
  './click-outside',
  './create-element.js',
  './event-handler.js',
]);