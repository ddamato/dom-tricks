const path = require('path');
const dox = require('dox');

const head = `
<meta charset="UTF-8">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta content="chrome=1" http-equiv="X-UA-Compatible"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
<link href="https://fonts.googleapis.com/css2?family=Hind:wght@400;600&family=Montserrat:wght@800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="./styles.css"/>
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" defer></script>
`;

const header = `
  <header>
    <h1 class="max-width"><a href="./">DOM-Tricks</a></h1>
    <p class="max-width">The good kind of manipulation</p>
  </header>
`;

class Page {

  constructor(title, intro) {
    this.title = title;
    this._intro = intro;
    this._sections = [];
    this._related = [];
  }

  section(heading, contentFn) {
    this._sections.push({ heading, contentFn });
    return this;
  }

  related(arr) {
    this._related = this._related.concat(arr).filter(Boolean);
    return this;
  }

  asHTML() {
    const heading = extract({ heading: this.title, contentFn: this._intro }, 'h2');
    let contents = ''
    let footer = '';

    if (this._sections.length) {
      contents = this._sections.map((section) => `<section>${extract(section, 'h3')}</section>`).join('');
    }

    if (this._related.length) {
      const h3 = `<h2>Discover some new tricks</h2>`;
      const links = this._related.map((filename) => {
        const page = require(path.resolve(__dirname, '..', 'src', filename));
        return `<a href="${filename.replace('.js', '.html')}" class="footer-link">${page.title}</a>`;
      }).join('');
      footer = `<footer>${h3}${links}</footer>`;
    }

    return `
      <html>
        <head>
          <title>DOM-Tricks | ${this.title}</title>
          ${head}
        </head>
        <body>
          ${header}
          <main class="max-width">
            ${heading}
            ${contents}
            ${footer}
          </main>
          <a href="https://github.com/ddamato/dom-tricks/tree/master/src" class="github-link max-width">Source for this page found on Github</a>
        </body>
      </html>
    `;
  }

  findContentFn(heading) {
    const section = this._sections.find((section) => section.heading === heading);
    if (section) {
      return section.contentFn;
    }
    throw new Error(`Cannot find content for: ${heading}`);
  }
}

function extract({ heading, contentFn }, headingTag) {
  headingTag = headingTag || 'h1';
  let html = `<${headingTag}>${heading}</${headingTag}>`;

  if (contentFn) {
    const fnString = contentFn.toString();
    const contents = fnString.substring(fnString.indexOf('{') + 1, fnString.length - 1);
    html += parser(contents);
  }
  
  return html;
}

function parser(contents) {
  return  dox.parseComments(contents).map(({ description, code }) => {
    let html = '';
    if (description) {
      // transform links
      html += `<div class="desc">${transformLinks(description.full)}</div>`;
    }

    if (code) {
      // Remove the callback function used for testing
      code = code.replace(/\s+?callback\([^)]+\);?/, '');
      html += `<pre class="prettyprint"><code>${code}</code></pre>`;
    }

    return html;
  }).join('');
}

function transformLinks(text) {
  // {@link https://google.com|Google}
  return text.replace(/{@link ([^| ]+)[| ]+([^}]+)}/gmi, '<a href="$1">$2</a>');
}


module.exports = Page;