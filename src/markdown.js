import marked from 'marked';

import inlineAst from './inline_ast';
import ast from './ast';

export default function (markdown) {
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(markdown);

  //console.log(tokens);

  let components = ast(tokens).children;
  let title = components
    .filter(x => x.type === 'heading' && x.depth === 1)[0]
    .text;

  return { title, components };
};

//let inline = InlineAst(tokens, '_hej_ __san__');
//
//console.log('Result');
//inline.forEach(x => {
//  console.log(x);
//});
