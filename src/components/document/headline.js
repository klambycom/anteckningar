import React from 'react';

import BasicText from './basic_text';

// TOOD Rename to heading? As in h1, h2, h3, etc.
let Headline = React.createClass({
  propTypes: {
    level: React.PropTypes.number.isRequired,
    children: React.PropTypes.array.isRequired
  },

  render() {
    switch(this.props.level) {
      case 1:
        return <h1><BasicText children={this.props.children} /></h1>;
      
      case 2:
        return <h2><BasicText children={this.props.children} /></h2>;
      
      case 3:
        return <h3><BasicText children={this.props.children} /></h3>;
      
      case 4:
        return <h4><BasicText children={this.props.children} /></h4>;
      
      case 5:
        return <h5><BasicText children={this.props.children} /></h5>;
      
      case 6:
        return <h6><BasicText children={this.props.children} /></h6>;
    }
  }
});

export default Headline;
