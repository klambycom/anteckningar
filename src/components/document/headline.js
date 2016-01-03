import React from 'react';

let Headline = React.createClass({
  propTypes: {
    level: React.PropTypes.number.isRequired,
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return { text: '' };
  },

  render() {
    switch(this.props.level) {
      case 1:
        return <h1>{this.props.text}</h1>;
      
      case 2:
        return <h2>{this.props.text}</h2>;
      
      case 3:
        return <h3>{this.props.text}</h3>;
      
      case 4:
        return <h4>{this.props.text}</h4>;
      
      case 5:
        return <h5>{this.props.text}</h5>;
      
      case 6:
        return <h6>{this.props.text}</h6>;
    }
  }
});

export default Headline;
