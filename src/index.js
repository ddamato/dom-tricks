const Page = require('../lib/page.js');
module.exports = new Page('Welcome!', () => {
  /**
   * This website aims to highlight the power of regular JavaScript when used in the browser. No frameworks; just native DOM APIs for modern browsers. {@link https://github.com/ddamato/dom-tricks|Edit this code for this website on Github}
   */
})
.related([
  './class-attribute.js',
  './click-outside',
  './create-element.js',
  './css-styles.js',
  './event-handler.js',
]);