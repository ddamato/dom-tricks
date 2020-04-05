const Page = require('../lib/page.js');

module.exports = new Page('Add or remove an event handler')
.section('Add an event handler', ({ elem, callback }) => {
  /** */
  
  const handler = function (event) {
    // elem was clicked!
    callback('clicked!');
  }

  elem.addEventListener('click', handler);

})
.section('Self remove an event handler', ({ elem, callback }) => {
  /** */
  
  const handler = function (event) {
    // elem was clicked!
    event.target.removeEventListener(event.type, handler);
    callback('clicked!');
  }

  elem.addEventListener('click', handler);

})
.section('Only fire once', ({ elem, callback }) => {
  /** */
  
  const handler = function (event) {
    // elem was clicked!
    callback('clicked!');
  }

  elem.addEventListener('click', handler, { once: true });

})
.related(['./index.js']);

