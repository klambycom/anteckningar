let tokens = [];
let position = 0;

let buildNode = function () {
  let token = tokens[position];
  token.children = [];
  position += 1;

  let isOpen = token.type === 'list_start'
    || token.type === 'list_item_start'
    || token.type === 'blockquote_start';

  if (isOpen) {
    if (token.type === 'list_start') {
      token.type = 'list';
    }
    else if (token.type === 'list_item_start') {
      token.type = 'list_item';
    }
    else if (token.type === 'blockquote_start') {
      token.type = 'blockquote';
    }
  }

  while (isOpen) {
    isOpen = tokens[position].type !== 'list_end'
      && tokens[position].type !== 'list_item_end'
      && tokens[position].type !== 'blockquote_end';

    if (isOpen) {
      let childToken = buildNode();
      token.children.push(childToken);
    }
    else {
      position += 1;
    }
  }

  return token;
};

export default function (data) {
  tokens = data;
  position = 0;

  let ast = {
    type: 'root',
    children: []
  };

  while (typeof tokens[position] !== 'undefined') {
    let node = buildNode();
    ast.children.push(node);
  }

  return ast;
};
