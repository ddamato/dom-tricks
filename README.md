# [DOM-Tricks](https://dom-tricks.com)

A collection of approaches to working with JavaScript and the DOM (Document Object Model) using live documented code.

## How the site works
Instead of writing code in Markdown as non-functional examples, this site allows you to write working code with JSDoc-style documentation in a real JavaScript file. The code is able to be imported into a test suite and validated before publishing the site.

### `contentFn`
A `contentFn` as it will be used in functions below, is at the core of how this site works. Take the following example.

```js
const contentFn = ({ elem, callback }) => {

  /**
   * Get and set CSS styles using JavaScript!
   */

  elem.style.backgroundColor = 'red';
  const bgColor = elem.style.backgroundColor;
  callback(bgColor);
}
```

In the above example, we create a function with an object that can be destructured with all the values your example will need in order to be clear in documentation _and_ pass the unit tests.

Within the function, we add JSDoc-style documentation. This will be parsed out as HTML when generating the page content. **JSDoc comments are required within each `contentFn`**. Then we add the accompanying code beneath the documentation. Adding code is optional.

 After registering this function (using the `Page` instance below) and rendering the page; you should see content as the following:

> Get and set CSS styles using JavaScript!
> ```js
> elem.style.backgroundColor = 'red';
> const bgColor = elem.style.backgroundColor;
> ```

The special `callback` function (when written exactly as `callback`) is removed during the page rendering. It is used to send data back to test the parts of the code are working as expected. You can send data back however you'd like for testing purposes.

You can alternate between commented documentation and code back and forth within one content section.

```js
const contentFn = ({ elem, callback }) => {

  /**
   * Set CSS styles
   */

  elem.style.backgroundColor = 'red';

  /**
   * Get CSS styles
   */

  const bgColor = elem.style.backgroundColor;
  callback(bgColor);
}
```

## `Page` class

### `new Page(pageTitle, contentFn)`
The `Page` class includes a general pattern to render content as a page. The `Page` class constructor can take two arguments, the page title and an optional `contentFn`.

### `Page.section(sectionTitle, contentFn)`
Similar to the `Page` constructor, the `.section()` method registers a section on the page with a title and a `contentFn`.

### `Page.related(JSPaths)`
This adds links to the bottom of the page under the "Discover some new tricks" subheading. These should be the relative path to the page you want to reference.

```js
new Page('Page Title').related([
  './page-1.js',
  './page-2.js',
  './page-3-js',
]);
```

### `Page.findContentFn(sectionTitle)`
This method is used specifically in tests to get the `contentFn` registered for a specific section using the section title (eg: `'Existing section title'`);

```js
const page = require('../src/page-1.js');
const contentFn = page.findContentFn('Existing section title');
```
The function will throw an error if the function cannot be found. The `contentFn` passed into the `Page` constructor is not in this registry as code examples are not expected within the introduction of a page.

### `Page.asHTML()`
This function renders the page as HTML. It does some conversions for a few parts, specifically `{@link}` JSDOC tags as `<a href="#"/>` and the special `callback()` function removal.

## Creating a new page
The project has a script that automatically scaffolds a JavaScript page and a unit test file.

```sh
npm run create [js-file-name]
```

The resulting `js-file-name.js` and `js-file-name.test.js` files will be found in the `/src` and `/test` directories, respectedly.

From there, this project has several pages built from which you can reference in creating new content.

## Building the site
```sh
npm run build
```
Built files ready for deployment are then found in the `/public` folder.