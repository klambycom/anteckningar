import './app.scss';

import React from 'react';
import Sidebar from './sidebar';
import Note from './note';
import References from './references';

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
          <header>
            <h1>{mkd.title}</h1>
            <hr />
          </header>
          <Sidebar headlines={mkd.headlines} links={mkd.internLinks} />
          <Note text={mkd.html} />
          <References links={mkd.externLinks} />
        </div>
        );
  }
});

export default App;
