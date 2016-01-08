import marked from 'marked';

import inlineAst from './inline_ast';
import ast from './ast';

let parseText = links => x => {
  switch(x.type) {
    case 'heading':
    case 'paragraph':
      x.children = inlineAst(links, x.text);
      delete x.text;
      break;

    default:
      //console.log(x);
  }

  return x;
};

export default function (markdown) {
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(markdown);

  tokens = tokens.map(parseText(tokens));

  let components = ast(tokens).children;
  let title = components
    .filter(x => x.type === 'heading' && x.depth === 1)[0]
    .children;

  return { title, components };
};
