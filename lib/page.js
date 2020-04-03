const dox = require('dox');

const head = `
<title>DOM-Tricks</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Proza+Libre:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="./styles.css"/>
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" defer></script>
`;

const header = `
  <header>
    <h1 class="max-width"><a href="./">DOM-Tricks</a></h1>
    <p class="max-width">Something witty here</p>
  </header>
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
    const heading = extract({ heading: this._title, contentFn: this._intro }, 'h2');
    const contents = this._sections.map((section) => `<section>${extract(section, 'h3')}</section>`).join('');

    return `
      <html>
        <head>${head}</head>
        <body>
          ${header}
          <main class="max-width">
            ${heading}
            <hr/>
            ${contents}
            <hr/>
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