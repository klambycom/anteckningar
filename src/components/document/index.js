import React from 'react';

import Headline from './headline';
import Paragraph from './paragraph';
import List from './list';
import Blockquote from './blockquote';
import Hr from './hr';
import Table from './table';
import Code from './code';

let Document = React.createClass({
  propTypes: {
    title: React.PropTypes.array,
    components: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      title: [{ type: 'basic_text', text:'Untitled' }],
      components: [{ type: 'paragraph', text: 'Empty document.' }]
    };
  },

  build(x, i) {
    switch(x.type) {
      case 'heading':
        if (x.depth > 1) {
          return <Headline key={i} level={x.depth} children={x.children} />;
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
            <Headline level={1} children={this.props.title} />
            <hr />
          </header>
          {this.props.components.map(this.build)}
        </div>
        );
  }
});

export default Document;
