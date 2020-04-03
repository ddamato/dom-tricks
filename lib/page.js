const dox = require('dox');

const head = `
<link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Proza+Libre:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="./styles.css"/>
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" defer></script>
`;

class Page {
  constructor(title, intro) {
    this._title = title;
    this._intro = intro;
    this._sections = [];
  }

  section(heading, contentFn) {
    this._sections.push({ heading, contentFn });
    return this;
  }

  asHTML() {
    const heading = extract({ heading: this._title, contentFn: this._intro }, 'h1');
    const contents = this._sections.map((section) => extract(section, 'h2')).join('');

    return `
      <html>
        <head>${head}</head>
        <body>
          <main>
            ${heading}
            ${contents}
          </main>
        </body>
      </html>
    `;
  }

  findContentFn(heading) {
    const section = this._sections.find((section) => section.heading === heading);
    if (section) {
      return section.contentFn;
    }
    return Function.prototype;
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
      html += `<div class="desc">${description.full}</div>`;
    }

    if (code) {
      html += `<pre class="prettyprint"><code>${code}</code></pre>`;
    }

    return html;
  }).join('');
}


module.exports = Page;