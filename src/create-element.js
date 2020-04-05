const Page = require('../lib/page.js');

module.exports = new Page('Creating new elements')
.section('Create a div', ({ document, callback }) => {
  /** 
   * To create an element, the `.createElement()` method is used on the `document` object. The first parameter is the tag name of the element you want to create.
   */
  const elem = document.createElement('div');

  callback(elem);
})
.section('Create a text node and set the content', ({ document, callback }) => {
   /**
    * To create a text node, the `.createTextNode()` method is used on the `document` object. The first parameter is optional and will set the content within the node.
    */
  const textNode = document.createTextNode('Hello World!');

  callback(textNode);
})
.related([
  './class-attribute.js',
  './click-outside',
  './css-styles.js',
  './event-handler.js',
]);