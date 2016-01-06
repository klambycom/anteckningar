import './table.scss';

import React from 'react';

let isNumeric = (n1, n2) => !isNaN(n1) && !isNaN(n2);

let sortAsc = (n) => (a, b) => {
  if (isNumeric(a[n], b[n])) {
    a[n] = +a[n];
    b[n] = +b[n];
  }

  if (a[n] > b[n]) { return -1; }
  if (a[n] < b[n]) { return 1; }
  return 0;
};

let sortDesc = (n) => (a, b) => {
  if (isNumeric(a[n], b[n])) {
    a[n] = +a[n];
    b[n] = +b[n];
  }

  if (a[n] < b[n]) { return -1; }
  if (a[n] > b[n]) { return 1; }
  return 0;
};

let Table = React.createClass({
  propTypes: {
    headers: React.PropTypes.array.isRequired,
    cells: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return { sortId: -1, falling: true };
  },

  getRows() {
    // Don't return sorted table if the user has not sorted the table
    if (this.state.sortId < 0) { return this.props.cells; }

    // Sort table on correct column
    let compare = this.state.falling ? sortDesc : sortAsc;
    let id = this.state.sortId;
    return this.props.cells.map(x => x).sort(compare(id));
  },

  handleSort(e) {
    let id = +e.target.dataset.index;

    // Remove sorting when one column is clicked twice already
    if (!this.state.falling) {
      this.setState({ sortId: -1, falling: true });
    }
    // Change sorting direction
    else if (this.state.sortId === id) {
      this.setState({ falling: !this.state.falling });
    }
    // Change column to sort on
    else {
      this.setState({ sortId: id, falling: true });
    }

    e.preventDefault();
  },

  renderRow(row, i) {
    return (
        <tr key={i}>
          {row.map((cell, j) => <td key={j}>{cell}</td>)}
        </tr>
        );
  },

  renderHeadCell(title, i) {
    let className = '';
    if (this.state.sortId === i) {
      className = this.state.falling ? 'asc' : 'desc';
    }

    return (
        <th key={i} className={className}>
          <a href="#" onClick={this.handleSort} data-index={i}>{title}</a>
        </th>
        );
  },

  render() {
    let tableClass = '';
    if (this.props.headers.length > 5) {
      tableClass = 'compact';
    }

    return (
        <div className='table-wrapper'>
          <table className={tableClass}>
            <thead>
              <tr>
                {this.props.headers.map(this.renderHeadCell)}
              </tr>
            </thead>
            <tbody>
              {this.getRows().map(this.renderRow)}
            </tbody>
          </table>
        </div>
        );
  }
});

export default Table;
