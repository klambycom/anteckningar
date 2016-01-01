import marked from 'marked';

let headlines;
let headlineLevel;
let internLinks;

let reset = function () {
  headlines = [];
  headlineLevel = [0, 0, 0];
  internLinks = [];
};

let levelUp = function (level) {
  if (level === 1) {
    headlineLevel[1] = 0;
    headlineLevel[2] = 0;
  }
  else if (level === 2) {
    headlineLevel[2] = 0;
  }
  headlineLevel[level - 1] += 1;

  return headlineLevel.slice(0, level).join('.');
};

let renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  if (level <= 3) {
    headlines.push({
      href: `#${escapedText}`,
      text: text,
      extra: `${levelUp(level)}.`
    });
  }

  return `
    <h${level} id="${escapedText}">
      <span>${text}</span>
      <a href="#${escapedText}">#</a>
    </h${level}>
    `;
};

renderer.link = function (href, title, text) {
  if (/^\/[^/]/.test(href)) {
    internLinks.push({ href, text });
  }

  return `<a href="${href}" title="${title}">${text}</a>`;
};

export default function (str) {
  reset();

  let html = marked(str, { renderer: renderer });
  return { html, headlines, internLinks };
};
