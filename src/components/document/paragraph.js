import React from 'react';

import BasicText from './basic_text';

let Paragraph = React.createClass({
  propTypes: {
    children: React.PropTypes.array
  },

  render() {
    return <p><BasicText children={this.props.children} /></p>;
  }
});

export default Paragraph;
