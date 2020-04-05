const Page = require('../lib/page.js');

module.exports = new Page('Managing HTML classes')
.section('Add a class to an element', ({ elem }) => {

  /**
   * Adding a class to an element uses the `.add()` method found on the `.classList` property of the element
   */

  elem.classList.add('class-name');
  elem.classList.add('several', 'class-names');

})
.section('Remove a class from an element', ({ elem }) => {

  /**
   * Remove a class to an element uses the `.remove()` method found on the `.classList` property of the element
   */

  elem.classList.remove('class-name');
  elem.classList.remove('several', 'class-names');

})
.section('Toggle a class', ({ elem }) => {
  /**
   * Toggling a class, ie. removing it if it exists or adding if it doesn't, is done using the `.toggle()` method found on the `.classList` property of the element.
   */
  elem.classList.toggle('class-name');

  /**
   * The `.toggle()` method can take an optional second parameter that determines if the class should be added or removed.
   */
  const bool = true; // Use a conditional to determine if the class should be added or not.
  elem.classList.toggle('it-depends', bool);
})
.section('Check for a specific class', ({ elem, callback }) => {
  /**
   * You can check for a specific class within the list by using the `.contains()` method found on the `.classList` property.
   */
  const hasClass = elem.classList.contains('class-name');
  callback(hasClass);

})
.related([
  './click-outside',
  './create-element.js',
  './css-styles.js',
  './event-handler.js',
]);

