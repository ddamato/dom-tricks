const Page = require('../lib/page.js');

module.exports = new Page('Add or remove an event handler')
.section('Add an event handler', ({ elem, callback }) => {
  /** */
  
  const handler = function () {
    // elem was clicked!
    callback('clicked!');
  }

  elem.addEventListener('click', handler);

})
.section('Use an event handler once', ({ elem, callback }) => {
  /** */
  
  const handler = function () {
    // elem was clicked!
    elem.removeEventListener('click', handler);
    callback('clicked!');
  }

  elem.addEventListener('click', handler);

})
.related(['./index.js']);

