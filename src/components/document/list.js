import React from 'react';

import ListItem from './list_item';

let List = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    isOrdered: React.PropTypes.bool
  },

  getDefaultProps() {
    return { isOrdered: false };
  },

  render() {
    let items = this.props.items
      .map((x, i) => <ListItem key={i} children={x.children} />);

    if (this.props.isOrdered) {
      return <ol>{items}</ol>;
    }

    return <ul>{items}</ul>;
  }
});

export default List;
