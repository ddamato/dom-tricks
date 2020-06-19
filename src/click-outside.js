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
.section('Detect clicks outside, ShadowDOM solution', ({ document, elem, callback }) => {
  /**
   * When working with Custom Elements, the above method won't work as the `.contains()` method can't penetrate the ShadowDOM. The `event.composedPath()` method is a recent solution to find the path an event has taken up the DOM. We then check if the `elem` was included in the path. If not, the click occurred outside.
   * 
   * In the code below `outsideClick` is set to a Boolean value which signifies a click outside of the `elem` has occurred.
   */
  document.addEventListener('click', function(event) {
    const outsideClick = typeof event.composedPath === 'function' &&  !event.composedPath().includes(elem);
    callback(outsideClick);
  });
 
})
.related([
  './class-attribute.js',
  './create-element.js',
  './css-styles.js',
  './event-handler.js',
]);

