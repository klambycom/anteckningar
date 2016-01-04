import React from 'react';

let InlineText = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render() {
    return <span className='inline-text'>{this.props.text}</span>;
  }
});

export default InlineText;
