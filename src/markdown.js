import marked from 'marked';

import inlineAst from './inline_ast';
import ast from './ast';

let parseText = links => x => {
  switch(x.type) {
    case 'heading':
    case 'paragraph':
    case 'text':
      x.children = inlineAst(links, x.text);
      delete x.text;
      break;

    case 'table':
      // TODO?
      break;

    case 'list_start':
    case 'list_end':
    case 'list_item_start':
    case 'list_item_end':
    case 'hr':
    case 'space':
    case 'blockquote_start':
    case 'blockquote_end':
    case 'code':
      // Do nothing!
      break;

    default:
      console.error('Not implemented', x);
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
