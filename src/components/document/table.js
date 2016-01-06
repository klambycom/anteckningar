import './table.scss';

import React from 'react';

let Table = React.createClass({
  propTypes: {
    headers: React.PropTypes.array.isRequired,
    cells: React.PropTypes.array.isRequired
  },

  renderRow(row, i) {
    return (
        <tr key={i}>
          {row.map((cell, j) => <td key={j}>{cell}</td>)}
        </tr>
        );
  },

  render() {
    return (
        <table>
          <thead>
            <tr>
              {this.props.headers.map((x, i) => <th key={i}>{x}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.cells.map(this.renderRow)}
          </tbody>
        </table>
        );
  }
});

export default Table;
