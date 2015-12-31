import ReactDOM from 'react-dom'
import React from 'react';
import App from './src/app';

let text = `
# Hello
I am using __markdown__.

## It is working fine

Yupp, I think so.

### Todo

[x] lkjfdsl
[ ] fdaslk

- List 1
- List 2

\`let js = 'javascript';\`
`;

ReactDOM.render(
    <App markdown={text} />,
    document.getElementById('anteckningar'));
