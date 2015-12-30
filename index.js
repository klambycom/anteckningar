import './src/style.scss';

import ReactDOM from 'react-dom'
import React from 'react';

let App = React.createClass({
  render() {
    return (<div>Hello world!</div>);
  }
});

ReactDOM.render(
    <App />,
    document.getElementById('app'));
