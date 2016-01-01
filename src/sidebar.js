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

  renderSection(title, ident, links) {
    if (links.length === 0) { return ''; }

    return (
        <li className={ident}>
          <h2>{title}</h2>
          <ul>
            <ul>{links.map(this.renderLink)}</ul>
          </ul>
        </li>
        );
  },

  hasLinks() {
    return this.props.links.length === 0 && this.props.headlines.length === 0;
  },

  render() {
    if (this.hasLinks()) { return <div></div>; }

    return (
        <aside id='sidebar'>
          <ul>
            {this.renderSection(
                'Table of content',
                'table-of-content',
                this.props.headlines)}
            {this.renderSection(
                'Other documents',
                'links',
                this.props.links)}
          </ul>
        </aside>
        );
  }
});

export default Sidebar;
