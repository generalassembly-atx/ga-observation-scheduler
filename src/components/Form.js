import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onPost} className="form">
          <fieldset className="dates">
            <input type="date" placeholder="Enter Start Date" name="start" ref="start" />
            <input type="date" placeholder="Enter End Date" name="end" ref="end" />
          </fieldset>
          <br></br>
          <fieldset className="days">
            <input type="checkbox" className="day" name="day" ref="day" value="sun" /> Sunday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="mon" /> Monday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="tues" /> Tuesday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="wed" />Wednesday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="thurs" /> Thursday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="fri" /> Friday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="sat" /> Saturday<span> </span>
          </fieldset>
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Form;
