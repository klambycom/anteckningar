import './sidebar.scss';

import React from 'react';

let Sidebar = React.createClass({
  propTypes: {
    headlines: React.PropTypes.array.isRequired
  },

  renderLink(link, i) {
    return (
        <li key={i}>
          <span>{link.extra}</span>
          <a href={link.url}>{link.text}</a>
        </li>
        );
  },

  render() {
    console.log(this.props.headlines);
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
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Wikilink 1</a></li>
              </ul>
            </li>
          </ul>
        </aside>
        );
  }
});

export default Sidebar;
