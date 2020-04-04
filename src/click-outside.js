const Page = require('../lib/page.js');

module.exports = new Page('Detect clicks outside of an element')
.section('Detect clicks outside', ({ document, elem, callback }) => {
  /** */
  document.addEventListener('click', function(event) {
    const outsideClick = !elem.contains(event.target);
    callback(outsideClick);
  });
 
})
.related(['./index.js']);

