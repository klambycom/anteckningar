import './app.scss';

import React from 'react';
import Sidebar from './sidebar';
import Note from './note';
import References from './references';

import markdown from '../markdown';
import Document from './document';

import marked from 'marked';

import InlineAst from '../inline_ast';

let App = React.createClass({
  propTypes: {
    markdown: React.PropTypes.string.isRequired
  },

  render() {
    let lexer = new marked.Lexer();
    //console.log(lexer);
    //console.log(inlineLexer);
    //console.log(lexer.rules);
    let tokens = lexer.lex(this.props.markdown);
    //console.log(Object.keys(marked));
    //console.log(marked.InlineLexer);
    //let inlineLexer = new marked.InlineLexer(tokens);
    //console.log(inlineLexer.output('_hej_'));

    let inline = InlineAst(tokens, '_hej_ __san__');

    console.log('Result');
    inline.forEach(x => {
      console.log(x);
    });

    //562 /InlineLexer

    return (
        <div id='app'>
          <Document tokens={tokens} />
        </div>
        );
  }
});

export default App;
