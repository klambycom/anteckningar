import './blockquote.scss';

import React from 'react';

import Paragraph from './paragraph';

let Blockquote = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  build(x, i) {
    switch(x.type) {
      case 'paragraph':
        return <Paragraph key={i} children={x.children} />;
      
      default:
        return (
            <p key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported in a &lt;Blockquote /&gt;!
            </p>
            );
    }
  },

  render() {
    return (<blockquote>{this.props.children.map(this.build)}</blockquote>);
  }
});

export default Blockquote;
