import './references.scss';

import React from 'react';

let References = React.createClass({
  propTypes: {
    links: React.PropTypes.array.isRequired
  },

  renderLink(link, i) {
    return (
        <li key={i}>
          <a href={link.anchor}>^</a>{" "}
          <a href={link.href}>{link.text}</a>{" "}
          <span>{link.title}</span>
        </li>
        );
  },

  render() {
    // TODO Is footer wrong here?

    return (
        <footer id="references">
          <h2>References</h2>
          <ol>{this.props.links.map(this.renderLink)}</ol>
        </footer>
        );
  }
});

export default References;
