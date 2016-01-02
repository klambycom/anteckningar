import ReactDOM from 'react-dom'
import React from 'react';
import App from './app';

import filesystem from './filesystem';

console.log(process.env);

filesystem.readDir((err, data) => {
  if (err) { throw err; }
  console.log(data);
});

filesystem.readIndex((err, data) => {
  if (err) { throw err; }

  ReactDOM.render(
      <App markdown={data} />,
      document.getElementById('root'));
});
