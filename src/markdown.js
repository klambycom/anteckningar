import marked from 'marked';
import highlightjs from 'highlight.js';

let headlines;
let headlineLevel;
let internLinks;
let externLinks;
let linksCounter;
let title;

let reset = function (filename) {
  headlines = [];
  headlineLevel = [0, 0, 0];
  internLinks = [];
  externLinks = [];
  linksCounter = 0;
  title = filename;
};

let levelUp = function (level) {
  if (level === 1) {
    headlineLevel[1] = 0;
    headlineLevel[2] = 0;
  }
  else if (level === 3) {
    headlineLevel[2] = 0;
  }
  headlineLevel[level - 1] += 1;

  return headlineLevel.slice(0, level).join('.');
};

let renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  if (level > 1 && level <= 3) {
    headlines.push({
      href: `#${escapedText}`,
      text: text,
      extra: `${levelUp(level - 1)}.`
    });
  }
  else {
    title = text;
    return '';
  }

  return `
    <h${level} id="${escapedText}">
      <span>${text}</span>
      <a href="#${escapedText}">#</a>
    </h${level}>
    `;
};

renderer.link = function (href, title, text) {
  linksCounter += 1;

  let anchor = `ref-${linksCounter}`;

  if (/^\/[^/]/.test(href)) {
    internLinks.push({ href, text });
  }
  else {
    externLinks.push({ href, title, text, anchor: `#${anchor}` });
  }

  return `<a href="${href}" title="${title}" id="${anchor}">${text}</a>`;
};

marked.setOptions({
  highlight(code, language) {
    let lang = language ? [language] : undefined;
    return highlightjs.highlightAuto(code, lang).value;
  },

  renderer
});

export default function (str, filename = '') {
  reset(filename);

  let html = marked(str);
  return { html, headlines, internLinks, externLinks, title };
};
