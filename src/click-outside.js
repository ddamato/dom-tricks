const Page = require('../lib/page.js');

module.exports = new Page('Detect clicks outside of an element')
.section('Detect clicks outside', ({ document, elem, callback }) => {
  /**
   * To detect a click that occurs outside of an element, we add a click event listener to the entire document and then determine if the click also occurred within the target element.
   * 
   * In the code below `outsideClick` is set to a Boolean value which signifies a click outside of the `elem` has occurred.
   */
  document.addEventListener('click', function(event) {
    const outsideClick = !elem.contains(event.target);
    callback(outsideClick);
  });
 
})
.related([
  './class-attribute.js',
  './create-element.js',
  './css-styles.js',
  './event-handler.js',
]);

