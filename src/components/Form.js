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
            <input type="checkbox" className="day" name="day" ref="day" value="Sunday" /> Sunday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Monday" /> Monday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Tuesday" /> Tuesday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Wednesday" />Wednesday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Thursday" /> Thursday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Friday" /> Friday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Saturday" /> Saturday<span> </span>
          </fieldset>
          <br></br>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Form;
