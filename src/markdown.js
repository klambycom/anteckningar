import marked from 'marked';

let headlines = [];

let reset = function () {
  headlines = [];
};

let renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  headlines.push({ url: escapedText, text });

  return `
    <h${level} id="${escapedText}">
      <span>${text}</span>
      <a href="#${escapedText}">#</span></a>
    </h${level}>
    `;
};

export default function (str) {
  reset();

  let text = marked(str, { renderer: renderer });
  return { text, headlines };
};
