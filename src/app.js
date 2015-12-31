import './app.scss';

import React from 'react';
import Sidebar from './sidebar';
import Note from './note';
import markdown from './markdown';

let App = React.createClass({
  propTypes: {
    markdown: React.PropTypes.string.isRequired
  },

  markdown() {
    return markdown(this.props.markdown);
  },

  render() {
    let mkd = this.markdown();

    return (
        <div id='app'>
          <Sidebar />
          <Note text={mkd.text} />
        </div>
        );
  }
});

export default App;
