import React, { Component } from 'react';


class Results extends Component {



  render() {

    return (
      <div>
        <h1>Results</h1>
        <table className="table-bordered">
          <tbody>
            <tr>
              <td>{this.props.first}</td>
            </tr>
            <tr>
              <td>{this.props.second}</td>
            </tr>
            <tr>
              <td>{this.props.third}</td>
            </tr>
            <tr>
              <td>{this.props.fourth}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-danger">Add to calendar</button>
      </div>
    )
  }
}

export default Results;
