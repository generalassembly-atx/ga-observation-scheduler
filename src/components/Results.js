import React, { Component } from 'react';


class Results extends Component {



  render() {

    return (
      <div>
        <h3>Course: {this.props.course}</h3>
        <table className="table-bordered">
          <tbody>
            <tr>
              <td>1st Observation Day: {this.props.first}</td>
            </tr>
            <tr>
              <td>2nd Observation Day: {this.props.second}</td>
            </tr>
            <tr>
              <td>3rd Observation Day: {this.props.third}</td>
            </tr>
            <tr>
              <td>4th Observation Day: {this.props.fourth}</td>
            </tr>
            <tr>
              <td>Mid-Course Feedback: {this.props.mid}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-danger" onClick={this.props.addToCalendar}>Add to calendar</button>
      </div>
    )
  }
}

export default Results;
