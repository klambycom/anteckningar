import ReactDOM from 'react-dom'
import React from 'react';
import App from './app';

let basePath = '/Users/christian.nilsson/Dropbox/anteckningar';

var fs = require('fs');
var path = require('path');

fs.readdir(basePath, (err, data) => {
  if (err) { throw err; }
  console.log(data);
});

let renderFile = (data) => {
  ReactDOM.render(
      <App markdown={data} />,
      document.getElementById('root'));
}

let defaultIndex = './index.md';
let index = path.resolve(basePath, 'index.md');

fs.readFile(index, 'utf8', (err, data) => {
  if (err) {
    fs.readFile(defaultIndex, 'utf8', (err, data) => {
      if (err) {
        console.log(err.message); throw err;
      }
      else {
        renderFile(data);
      }
    });
  }
  else {
    renderFile(data);
  }
});
