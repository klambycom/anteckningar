import './app.scss';

import React from 'react';
import Sidebar from './sidebar';
import Note from './note';
import References from './references';

import markdown from '../markdown';
import Document from './document';

import marked from 'marked';

let App = React.createClass({
  propTypes: {
    markdown: React.PropTypes.string.isRequired
  },

  render() {
    let lexer = new marked.Lexer();
    let tokens = lexer.lex(this.props.markdown);

    return (
        <div id='app'>
          <header>
            <h1>Snälla fungara</h1>
            <hr />
          </header>
          <Document tokens={tokens} />
        </div>
        );
  }
});

export default App;
