import React, { Component } from 'react';

class Form extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.onPost} id="form">
          <fieldset className="course" onChange={this.props.checkForm.bind(this)}>
            <select name="courses" form="form">
              <option value="Visual Design" ref="vd">Visual Design</option>
              <option value="Data Science" ref="ds">Data Science</option>
              <option value="FEWD" ref="fewd">FEWD</option>
              <option value="Digital Marketing" ref="dm">Digital Marketing</option>
              <option value="Analytics" ref="an">Analytics</option>
              <option value="Product Management" ref="pm">Product Management</option>
              <option value="UX Design" ref="ux">User Experience Design</option>
              <option value="JavaScript" ref="js">JavaScript</option>
            </select>
          </fieldset>
          <fieldset className="dates" onChange={this.props.checkForm.bind(this)}>
            <input type="date" placeholder="Enter Start Date" name="start" ref="start" />
            <input type="date" placeholder="Enter End Date" name="end" ref="end" />
          </fieldset>
          <br></br>
          <fieldset className="days" ref="days" onChange={this.props.checkForm.bind(this)} >
            <input type="checkbox" className="day" name="day" ref="day" value="Sunday" /> Sunday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Monday" /> Monday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Tuesday" /> Tuesday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Wednesday" />Wednesday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Thursday" /> Thursday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Friday" /> Friday<span> </span>
            <input type="checkbox" className="day" name="day" ref="day" value="Saturday" /> Saturday<span> </span>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Form;
