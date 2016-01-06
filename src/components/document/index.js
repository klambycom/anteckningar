import React from 'react';
import ast from '../../ast';

import Headline from './headline';
import Paragraph from './paragraph';
import List from './list';
import Blockquote from './blockquote';
import Hr from './hr';
import Table from './table';
import Code from './code';

let Document = React.createClass({
  propTypes: {
    tokens: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      title: 'Untitled',
      components: [{ type: 'paragraph', text: 'Empty document.' }]
    };
  },

  componentDidMount() {
    let components = ast(this.props.tokens).children;
    let title = components
      .filter(x => x.type === 'heading' && x.depth === 1)[0]
      .text;

    if (title) {
      this.setState({ components, title });
    }
    else {
      this.setState({ components });
    }
  },

  build(x, i) {
    switch(x.type) {
      case 'heading':
        if (x.depth > 1) {
          return <Headline key={i} level={x.depth} text={x.text} />;
        }
        return;
      
      case 'paragraph':
        return <Paragraph key={i} text={x.text} />;

      case 'list':
        return <List key={i} isOrdered={x.ordered} items={x.children} />;

      case 'blockquote':
        return <Blockquote key={i} children={x.children} />;

      case 'hr':
        return <Hr key={i} />;

      case 'table':
        return <Table key={i} headers={x.header} cells={x.cells} />;

      case 'code':
        return <Code key={i} lang={x.lang} text={x.text} />;

      default:
        return (
            <p key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported!
            </p>
            );
    }
  },

  render() {
    return (
        <div id='document'>
          <header>
            <h1>{this.state.title}</h1>
            <hr />
          </header>
          {this.state.components.map(this.build)}
        </div>
        );
  }
});

export default Document;
