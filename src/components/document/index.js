import React from 'react';
import ast from '../../ast';

import Headline from './headline';
import Paragraph from './paragraph';

let Document = React.createClass({
  propTypes: {
    tokens: React.PropTypes.array.isRequired
  },

  build(x) {
    switch(x.type) {
      case 'heading':
        return <Headline level={x.depth} text={x.text} />;
      
      case 'paragraph':
        return <Paragraph text={x.text} />;
      
      default:
        console.log(x.type, x);
        return <p>Not implemented yet!</p>
    }
  },

  render() {
    let children = ast(this.props.tokens).children;

    return (
        <div id='document'>
          {children.map(this.build)}
        </div>
        );
  }
});

export default Document;
