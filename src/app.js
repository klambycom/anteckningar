import './app.scss';

import React from 'react';
import Sidebar from './sidebar';
import Note from './note';

let App = React.createClass({
  render() {
    return (
        <div id='app'>
          <Sidebar />
          <Note />
        </div>
        );
  }
});

export default App;
