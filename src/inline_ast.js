//150

import marked from 'marked';

// This should probebly be called tokens. Because I don't think you can call it
// a AST. I don't know anythin about compilers.

let tokens = [];

let renderer = new marked.Renderer();
console.log(renderer);

renderer.em = text => tokens.push({ type: 'em', text });

renderer.strong = text => tokens.push({ type: 'strong', text });

// TODO Tell if intern or extern
renderer.link = (href, title, text) => tokens.push({
  type: 'link', href, title, text
});

renderer.text = text => tokens.push({ type: 'text', text: text });

  //escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  //autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  //url: noop,
  //tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  //reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  //nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  //code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  //br: /^ {2,}\n(?!\s*$)/,
  //del: noop,
  //text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/

// TODO What is links?????!!!
export default function (links, data) {
  let inlineLexer = new marked.InlineLexer(links, { renderer });
  console.log(inlineLexer.output('_hej_ __san__ http://www.google.se <!-- hej --> [hej](san "foo") hejsansa'));

  return tokens;
};
