import './note.scss';

import React from 'react';

let Note = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return { text: '' };
  },

  render() {
    return <article
      id='note'
      dangerouslySetInnerHTML={{__html: this.props.text}}></article>;
  }
});

export default Note;
