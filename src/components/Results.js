import React, { Component } from 'react';
var moment = require('moment');


class Results extends Component {



  render() {
    
    return (
      <div>
        <h1>Results</h1>
        <p>First: {this.props.first}</p>
        <p>Second: {this.props.second}</p>
        <p>Third: {this.props.third}</p>
        <p>Last: {this.props.fourth}</p>
        <p>Range: {this.props.diff} days</p>
      </div>
    )
  }
}

export default Results;
