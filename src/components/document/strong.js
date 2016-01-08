import React from 'react';

import BasicText from './basic_text';

let Strong = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  render() {
    return <strong><BasicText children={this.props.children} /></strong>;
  }
});

export default Strong;
