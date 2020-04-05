const Page = require('../lib/page.js');

module.exports = new Page('Handling events')
.section('Add an event handler', ({ elem, callback }) => {
  /**
   * Let's say we have a simple function that will run when an element is clicked. This will just log the word "clicked!" to the console. 
   */
  
  const handler = function (event) {
    // elem was clicked!
    console.log('clicked!');
    callback('clicked!');
  }

  /**
   * Now, to run the function when an element is clicked, we use the `.addEventListener()` method found on the element that we want to wait for clicks. When a user clicks the element, the `handler` function will run, logging the word to the console.
   */

  elem.addEventListener('click', handler);

})
.section('Self remove an event handler', ({ elem, callback }) => {
  /** 
   * In some cases you might want to remove a listener. To do this, the `.removeEventListener()` method is used. The parameters _must_ be the same ones used in the `.addEventListener()` method for this element.
   */
  
  const handler = function (event) {
    // event.type === 'click'
    event.target.removeEventListener(event.type, handler);
    // elem was clicked!
    console.log('clicked!');
    callback('clicked!');
  }

  elem.addEventListener('click', handler);

})
.section('Only fire once', ({ elem, callback }) => {
  /**
   * There's also an easy way to have an listener once fire the function once, without having to include `.removeEventListener()`.
   */
  
  const handler = function (event) {
    // elem was clicked!
    console.log('clicked!');
    callback('clicked!');
  }

  elem.addEventListener('click', handler, { once: true });

})
.related([
  './class-attribute.js',
  './click-outside',
  './create-element.js',
  './css-styles.js',
]);

