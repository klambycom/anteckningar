import './app.scss';

import React from 'react';
import Sidebar from './sidebar';
import Note from './note';
import References from './references';

import markdown from '../markdown';

import Document from './document';

let App = React.createClass({
  propTypes: {
    markdown: React.PropTypes.string.isRequired
  },

  render() {
    let { title, components } = markdown(this.props.markdown);

    return (
        <div id='app'>
          <Document title={title} components={components} />
        </div>
        );
  }
});

export default App;
