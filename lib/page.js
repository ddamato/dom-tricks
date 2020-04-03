const dox = require('dox');

const head = `
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" defer></script>
`;

class Page {
  constructor(title) {
    this._title = title;
    this._sections = [];
  }

  section(heading, contentFn) {
    this._sections.push({ heading, contentFn });
    return this;
  }

  asHTML() {
    const body = `<h1>${this._title}</h1>` + this._sections.map(({ heading, contentFn }) => {
      // Get function contents
      const fnString = contentFn.toString();
      const contents = fnString.substring(fnString.indexOf('{') + 1, fnString.length - 1);

      return `<h2>${heading}</h2>` + dox.parseComments(contents).map(({ description, code }) => {
        let html = '';
        if (description) {
          html += `<div class="desc">${description.full}</div>`;
        }

        if (code) {
          html += `<pre class="prettyprint"><code>${code}</code></pre>`;
        }

        return html;
      }).join('');
    }).join('');

    return `<html><head>${head}</head><body>${body}</body></html>`;
  }

  findContentFn(heading) {
    const section = this._sections.find((section) => section.heading === heading);
    if (section) {
      return section.contentFn;
    }
    return Function.prototype;
  }
}


module.exports = Page;