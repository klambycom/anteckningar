import './inline_code.scss';

import React from 'react';

let InlineCode = React.createClass({
  propTypes: {
    code: React.PropTypes.string.isRequired
  },

  render() {
    return <code>{this.props.code}</code>;
  }
});

export default InlineCode;
