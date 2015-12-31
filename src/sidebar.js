import './sidebar.scss';

import React from 'react';

let Sidebar = React.createClass({
  render() {
    return (
        <aside id='sidebar'>
          <ul>
            <li className="table-of-content">
              <h2>Table of content</h2>
              <ul>
                <li><a href="#">Section one</a></li>
                <li><a href="#">Section two</a></li>
                <li><a href="#">Section three</a></li>
                <li><a href="#">Section four</a></li>
                <li><a href="#">Section five</a></li>
              </ul>
            </li>

            <li className="links">
              <h2>Links</h2>
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
