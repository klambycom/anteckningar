import React from 'react';

import InlineText from './inline_text';

let ListItem = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  parse(x, i) {
    switch(x.type) {
      case 'text':
        return <InlineText key={i} text={x.text} />;
      
      default:
        return (
            <p key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported as list item!
            </p>
            );
    }
  },

  render() {
    return (<li>{this.props.children.map(this.parse)}</li>);
  }
});

export default ListItem;
