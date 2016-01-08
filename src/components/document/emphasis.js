import React from 'react';

import BasicText from './basic_text';

let Emphasis = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  render() {
    return <em><BasicText children={this.props.children} /></em>;
  }
});

export default Emphasis;
