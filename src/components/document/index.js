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
        return (
            <p style={{color: 'red'}}>
              The {x.type}-type is not supported!
            </p>
            );
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
