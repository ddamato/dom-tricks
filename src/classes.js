const Page = require('../lib/page.js');

module.exports = Page('Add or remove class from an element')
.section('Add a class to an element', (elem) => {
  /**
   * Note that multiple parameters for the `add()` isn't supported in IE 11.
   */

  elem.classList.add('class-name');
  elem.classList.add('several', 'class-names');
})
.section('Remove a class from an element', (elem) => {
  elem.classList.remove('class-name');
  elem.classList.remove('several', 'class-names');
}).section('Toggle a class', (elem) => {
  elem.classList.toggle('class-name');
});

