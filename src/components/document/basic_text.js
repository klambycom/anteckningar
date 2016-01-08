import React from 'react';

// TODO Better name, this is not just basic text.
let BasicText = React.createClass({
  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  build(x, i) {
    switch(x.type) {
      case 'basic_text':
        return x.text;

      default:
        return (
            <span key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported in &lt;BasicText /&gt;!
            </span>
            );
    }
  },

  render() {
    return (<span>{this.props.children.map(this.build)}</span>);
  }
});

export default BasicText;
