const Page = require('../lib/page.js');

module.exports = new Page('Create a new element')
.section('Create a div', ({ document, callback }) => {
  /** */
  const elem = document.createElement('div');

  callback(elem);
})
.section('Create a text node and set the content', ({ document, callback }) => {
   /** */
  const textNode = document.createTextNode('Hello World!');

  callback(textNode);
})
.related(['./index.js']);

