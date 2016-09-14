import React, { Component } from 'react';
var moment = require('moment');

let startDate = '';

class Results extends Component {



  render() {
    console.log('startDate ', startDate);
    return (
      <div>
        <h1>Results</h1>
        <p>First: {this.props.first}</p>
        <p>Second: </p>
        <p>Third: </p>
        <p>Last: {this.props.fourth}</p>
        <p>Range: {this.props.diff} days</p>
      </div>
    )
  }
}

export default Results;
