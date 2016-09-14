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
  };

  checkFirstDay(day){
    const dayOfWeek = day.format('dddd');
    var i = 0;
    while (i < 5) {
      if (days.indexOf(day.format('dddd')) > -1) {
        first = day.format('dddd, MMMM Do, YYYY');
        i = 5;
      } else {
        day = day.add(1, 'days');
        i++
      }
    }
  };

  checkSecondDay(day){
    const dayOfWeek = day.format('dddd');
    var i = 0;
    while (i < 5) {
      if (days.indexOf(day.format('dddd')) > -1) {
        second = day.format('dddd, MMMM Do, YYYY');
        i = 5;
      } else {
        day = day.add(1, 'days');
        i++
      }
    }
  };

  checkFourthDay(day){
    const dayOfWeek = day.format('dddd');
    var i = 0;
    while (i < 5) {
      if (days.indexOf(day.format('dddd')) > -1) {
        fourth = day.format('dddd, MMMM Do, YYYY');
        i = 5;
      } else {
        day = day.subtract(1, 'days');
        i++
      }
    }
  };

  checkThirdDay(day){
    const dayOfWeek = day.format('dddd');
    var i = 0;
    while (i < 5) {
      if (days.indexOf(day.format('dddd')) > -1) {
        third = day.format('dddd, MMMM Do, YYYY');
        i = 5;
      } else {
        day = day.subtract(1, 'days');
        i++
      }
    }
  };

  onPost(event) {
    event.preventDefault();

    for (var i = 0; i < event.target.day.length; i++) {
      if (event.target.day[i].checked) {
        days.push(event.target.day[i].value);
      }
    }
    const day1 = moment(event.target.start.value);
    const day2 = moment(event.target.end.value);
    const diff = day2.subtract(7, 'days').diff(day1.add(4, 'days'), 'days');
    // first = moment(event.target.start.value).add(4, 'days').format("dddd, MMMM Do, YYYY");
    const firstMoment = moment(event.target.start.value).add(4, 'days');
    this.checkFirstDay(firstMoment);
    this.checkSecondDay(firstMoment.add(Math.ceil(diff/3), 'days'))
    // fourth = moment(event.target.end.value).subtract(7, 'days').format("dddd, MMMM Do, YYYY");
    const fourthMoment = moment(event.target.end.value).subtract(7, 'days');
    this.checkFourthDay(fourthMoment);
    this.checkThirdDay(fourthMoment.subtract(Math.ceil(diff/3), 'days'));
    // third = fourthMoment.subtract(Math.ceil(diff/3), 'days').format('dddd, MMMM Do, YYYY');

    this.setState({
      days: days,
      diff: diff,
      first: first,
      second: second,
      third: third,
      fourth: fourth
    });
  };

  render() {

    return (
      <div>
        <Form onPost={this.onPost.bind(this)}/>
        <Results days={this.state.days} startDate={this.state.startDate} endDate={this.state.endDate} diff={this.state.diff} first={this.state.first} second={this.state.second} third={this.state.third} fourth={this.state.fourth} />
      </div>
    )
  }
}

export default Homepage;
