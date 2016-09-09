import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div className="form">
        <form>
          <div className="dates">
            <input type="date" placeholder="Enter Start Date" ref="start" />
            <input type="date" placeholder="Enter End Date" ref="end" />
          </div>
          <input type="radio" name="monday" />
        </form>
      </div>
    )
  }
}

export default Form;
