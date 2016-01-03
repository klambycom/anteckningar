import React from 'react';
import ast from '../../ast';

import Headline from './headline';
import Paragraph from './paragraph';

let Document = React.createClass({
  propTypes: {
    tokens: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      title: 'Untitled',
      components: [{ type: 'paragraph', text: 'Empty document.' }]
    };
  },

  componentDidMount() {
    let components = ast(this.props.tokens).children;
    let title = components
      .filter(x => x.type === 'heading' && x.depth === 1)[0]
      .text;

    if (title) {
      this.setState({ components, title });
    }
    else {
      this.setState({ components });
    }
  },

  build(x, i) {
    switch(x.type) {
      case 'heading':
        if (x.depth > 1) {
          return <Headline key={i} level={x.depth} text={x.text} />;
        }
        return;
      
      case 'paragraph':
        return <Paragraph key={i} text={x.text} />;
      
      default:
        return (
            <p key={i} style={{color: 'red'}}>
              The {x.type}-type is not supported!
            </p>
            );
    }
  },

  render() {
    return (
        <div id='document'>
          <header>
            <h1>{this.state.title}</h1>
            <hr />
          </header>
          {this.state.components.map(this.build)}
        </div>
        );
  }
});

export default Document;
