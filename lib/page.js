const dox = require('dox');

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
    return `<h1>${this._title}</h1>` + this._sections.map(({ heading, contentFn }) => {
      // Get function contents
      const fnString = contentFn.toString();
      const contents = fnString.substring(fnString.indexOf('{') + 1, fnString.length - 1);

      return `<h2>${heading}</h2>` + dox.parseComments(contents).map(({ description, code }) => {
        return `<div class="desc">${description}</div><pre><code>${code}</code></pre>`;
      }).join('');
    }).join('');
  }

  findContentFn(heading) {
    const section = this._sections.find((section) => section.heading === heading);
    if (section) {
      return section.contentFn;
    }
  }
}


module.exports = Page;