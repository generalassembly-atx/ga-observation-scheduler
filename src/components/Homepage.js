import React, { Component } from 'react';

import Form from './Form'
import Results from './Results'
// var moment = require('moment');
import moment from 'moment';

let days = [];
let first = '';
let second = '';
let third = '';
let fourth = '';
let daysInAWeek = 7;

class Homepage extends Component {

  constructor(props) {
    super(props);

    // this.onPost = this.onPost.bind(this)

    this.state = {
      days: [],
      diff: null,
      first: null,
      second: null,
      third: null,
      fourth: null
    };
  }

  checkFirstDay(day){
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        first = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++
      }
    }
  }

  checkSecondDay(day){
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        second = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++
      }
    }
  }

  checkFourthDay(day){
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        fourth = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.subtract(1, 'days');
        i++
      }
    }
  }

  checkThirdDay(day){
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        third = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++
      }
    }
  }

  checkForm() {
    let checked = false;
    // check to see if all data is ready
    // everything is good
    for (var i = 0; i < this.refs.days.children.length; i++) {
      if (this.refs.days.children[i].checked) {
        checked = true;
      }
    }
    console.log('refs ', this);
    if (checked == true && this.refs.start !== '' && this.refs.end !== '') {
      // document.getElementById('form').submit();
      console.log('we good');
      this.props.onPost();
    }
  }

  onPost(event) {
    //event.preventDefault();
    console.log('hello');
    var form = document.getElementById('form');

    for (var i = 0; i < form.day.length; i++) {
      if (form.day[i].checked) {
        days.push(form.day[i].value);
      }
    }
    const day1 = moment(form.start.value);
    const day2 = moment(form.end.value);
    const diff = day2.subtract(7, 'days').diff(day1.add(4, 'days'), 'days');
    // first = moment(form.start.value).add(4, 'days').format("dddd, MMMM Do, YYYY");
    const firstMoment = moment(form.start.value).add(4, 'days');
    this.checkFirstDay(firstMoment);
    this.checkSecondDay(firstMoment.add(Math.ceil(diff/3), 'days'))
    // fourth = moment(form.end.value).subtract(7, 'days').format("dddd, MMMM Do, YYYY");
    const fourthMoment = moment(form.end.value).subtract(7, 'days');
    this.checkFourthDay(fourthMoment);
    this.checkThirdDay(fourthMoment.subtract(Math.ceil(diff/3), 'days'));
    // third = fourthMoment.subtract(Math.ceil(diff/3), 'days').format('dddd, MMMM Do, YYYY');

    this.setState({
      days: days,
      diff: diff,
      first: '1st Observation Day: ' + first,
      second: '2nd Observation Day: ' + second,
      third: '3rd Observation Day: ' + third,
      fourth: '4th Observation Day: ' + fourth
    });
  }

  render() {

    return (
      <div>
        <Form onPost={this.onPost.bind(this)} checkForm={this.checkForm}/>
        <Results days={this.state.days} diff={this.state.diff} first={this.state.first} second={this.state.second} third={this.state.third} fourth={this.state.fourth} />
      </div>
    )
  }
}

export default Homepage;
