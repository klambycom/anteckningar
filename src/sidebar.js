import './sidebar.scss';

import React from 'react';

let Sidebar = React.createClass({
  propTypes: {
    headlines: React.PropTypes.array.isRequired,
    links: React.PropTypes.array.isRequired
  },

  renderLink(link, i) {
    if (!link.extra) {
      return (<li key={i}><a href={link.href}>{link.text}</a></li>);
    }

    return (
        <li key={i}>
          <span>{link.extra}</span>
          <a href={link.href}>{link.text}</a>
        </li>
        );
  },

  render() {
    return (
        <aside id='sidebar'>
          <ul>
            <li className='table-of-content'>
              <h2>Table of content</h2>
              <ul>{this.props.headlines.map(this.renderLink)}</ul>
            </li>

            <li className='links'>
              <h2>Other documents</h2>
              <ul>
                <ul>{this.props.links.map(this.renderLink)}</ul>
              </ul>
            </li>
          </ul>
        </aside>
        );
  }
});

export default Sidebar;
