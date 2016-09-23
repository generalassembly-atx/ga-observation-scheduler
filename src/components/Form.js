import React, { Component } from 'react';

class Form extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.onPost} id="form">
          <fieldset className="course" onChange={this.props.checkForm.bind(this)}>
            <h5>Select the course</h5>
            <select name="courses" form="form" ref="courses">
              <option></option>
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
          <br></br>
          <fieldset className="dates" onChange={this.props.checkForm.bind(this)}>
            <h5>Enter start date & end date</h5>
            <input type="date" name="start" ref="start" />
            <input type="date" name="end" ref="end" />
          </fieldset>
          <br></br>
          <fieldset className="days" ref="days" onChange={this.props.checkForm.bind(this)} >
            <h5>Choose days of the week</h5>
            <input type="checkbox" className="day" name="day" ref="day" value="Sunday" /> Sunday<span> &nbsp;</span>
            <input type="checkbox" className="day" name="day" ref="day" value="Monday" /> Monday<span> &nbsp;</span>
            <input type="checkbox" className="day" name="day" ref="day" value="Tuesday" /> Tuesday<span> &nbsp;</span>
            <input type="checkbox" className="day" name="day" ref="day" value="Wednesday" /> Wednesday<span> &nbsp;</span>
            <input type="checkbox" className="day" name="day" ref="day" value="Thursday" /> Thursday<span> &nbsp;</span>
            <input type="checkbox" className="day" name="day" ref="day" value="Friday" /> Friday<span> &nbsp;</span>
            <input type="checkbox" className="day" name="day" ref="day" value="Saturday" /> Saturday<span> &nbsp;</span>
          </fieldset>
          <br></br>
          <fieldset className="startTimes" onChange={this.props.checkForm.bind(this)}>
            <h5>Select start time</h5>
            <select name="startTimes" form="form" ref="startTimes">
              <option></option>
              <option value="18" ref="18">6:00PM</option>
              <option value="19" ref="19">7:00PM</option>
            </select>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Form;
