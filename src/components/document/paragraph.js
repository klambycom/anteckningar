import React from 'react';

let Paragraph = React.createClass({
  propTypes: {
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return { text: '' };
  },

  render() {
    return <p>{this.props.text}</p>;
  }
});

export default Paragraph;
