import ReactDOM from 'react-dom'
import React from 'react';
import App from './src/app';

let text = `
# Hello
I am using __markdown__.

## It is working fine

Yupp, I think so.

Det finns flera olika sökmotorer, som t.ex.
[Google](http://www.google.se) och
[Yahoo](http://www.yahoo.com "en sökmotor precis som Google").
Men det finns även andra typer av sökmotorer, t.ex. [Prisjakt](http://www.prisjakt.nu "företaget där jag jobber"), vars mål inte är att indexera hela internet utan bara en specifik del av internet.

[Dairy](/dairy/index)

---

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
