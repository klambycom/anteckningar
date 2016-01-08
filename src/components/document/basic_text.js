import React from 'react';

import InlineCode from './inline_code';
import Emphasis from './emphasis';
import Strong from './strong';

// TODO Better name, this is not just basic text.
let BasicText = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  build(x, i) {
    switch(x.type) {
      case 'basic_text':
        return x.text;

      case 'inline_code':
        return <InlineCode key={i} code={x.code} />;

      case 'em':
        return <Emphasis key={i} children={x.children} />;

      case 'strong':
        return <Strong key={i} children={x.children} />;

      default:
        return (
            <span key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported in &lt;BasicText /&gt;!
            </span>
            );
    }
  },

  render() {
    return (<span>{this.props.children.map(this.build)}</span>);
  }
});

export default BasicText;
