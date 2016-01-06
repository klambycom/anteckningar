import './code.scss';

import highlightjs from 'highlight.js';
import React from 'react';

let Code = React.createClass({
  propTypes: {
    lang: React.PropTypes.string,
    text: React.PropTypes.string.isRequired
  },

  render() {
    let code = highlightjs
      .highlightAuto(this.props.text, [this.props.lang])
      .value;

    return (
        <pre>
          <code dangerouslySetInnerHTML={{__html: code}}></code>
        </pre>
        );
  }
});

export default Code;
