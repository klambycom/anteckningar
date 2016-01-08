import React from 'react';

import BasicText from './basic_text';

let ListItem = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  parse(x, i) {
    switch(x.type) {
      case 'text':
        return <BasicText key={i} children={x.children} />;
      
      default:
        return (
            <p key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported as &lt;ListItem /&gt;!
            </p>
            );
    }
  },

  render() {
    return (<li>{this.props.children.map(this.parse)}</li>);
  }
});

export default ListItem;
