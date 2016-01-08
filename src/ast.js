let tokens = [];
let position = 0;

let isOpenToken = (type) => {
  return type === 'list_start'
    || type === 'list_item_start'
    || type === 'blockquote_start';
}

let isCloseToken = (type) => {
  return type === 'list_end'
    || type === 'list_item_end'
    || type === 'blockquote_end'
};

// TODO Refactor!
let cleanTypeText = (type) => {
  if (type === 'list_start') {
    return 'list';
  }
  else if (type === 'list_item_start') {
    return 'list_item';
  }
  else if (type === 'blockquote_start') {
    return 'blockquote';
  }
};

let buildNode = function () {
  // Create node
  let node = tokens[position];
  if (typeof node.children === 'undefined') {
    node.children = [];
  }
  position += 1;

  // Add children to the node
  let isOpen = isOpenToken(node.type);

  if (isOpen) { node.type = cleanTypeText(node.type); }

  while (isOpen) {
    isOpen = !isCloseToken(tokens[position].type);

    // Don't add the token if it's just a closing token..
    if (isOpen) {
      let childNode = buildNode();
      node.children.push(childNode);
    }
    // ..but move the position to not make a infinite loop
    else { position += 1; }
  }

  return node;
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
