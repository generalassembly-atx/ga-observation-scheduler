import React, { Component } from 'react';

import Form from './Form'
import Results from './Results'
import moment from 'moment';

let days = [];
let first = '';
let second = '';
let third = '';
let fourth = '';
let mid = '';
let daysInAWeek = 7;

class Homepage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      days: [],
      diff: null,
      first: null,
      second: null,
      third: null,
      fourth: null,
      mid: null
    };
  }

  checkFirstDay(day) {
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        first = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++;
      }
    }
  }

  checkSecondDay(day) {
    console.log('checkSecond ', day.format('dddd, MMMM Do, YYYY'));
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        second = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++;
      }
    }
  }

  checkFourthDay(day) {
    console.log('checkFourth ', day.format('dddd, MMMM Do, YYYY'));
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        fourth = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.subtract(1, 'days');
        i++;
      }
    }
  }

  checkThirdDay(day) {
    console.log('checkThird ', day.format('dddd, MMMM Do, YYYY'));
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        third = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++;
      }
    }
  }

  checkMid(day) {
    console.log(day.format('dddd, MMMM Do, YYYY'));
    let i = 0;
    while (i < daysInAWeek) {
      if (days.indexOf(day.format('dddd')) > -1) {
        mid = day.format('dddd, MMMM Do, YYYY');
        break;
      } else {
        day = day.add(1, 'days');
        i++;
      }
    }
  }

  checkForm() {
    let checked = false;
    for (var i = 0; i < this.refs.days.children.length; i++) {
      if (this.refs.days.children[i].checked) {
        checked = true;
      }
    }
    if (checked == true && this.refs.start !== '' && this.refs.end !== '') {
      this.props.onPost();
    }
  }

  onPost(event) {
    var form = document.getElementById('form');

    for (var i = 0; i < form.day.length; i++) {
      if (form.day[i].checked) {
        days.push(form.day[i].value);
      }
    }
    const day1 = moment(form.start.value);
    const day2 = moment(form.end.value);
    // const firstOb = day1.add(4, 'days');
    // const lastOb = day2.subtract(7, 'days');
    console.log('day1 ', day1.format('dddd, MMMM Do, YYYY'), ' day2 ', day2.format('dddd, MMMM Do, YYYY'));
    console.log('first ', day1.add(4, 'days').format('dddd, MMMM Do, YYYY'), ' last ', day2.subtract(7, 'days').format('dddd, MMMM Do, YYYY'));
    const diff = moment(form.end.value).diff(moment(form.start.value), 'days');
    console.log(diff);
    const firstMoment = moment(form.start.value).add(4, 'days');
    const fourthMoment = moment(form.end.value).subtract(7, 'days');
    this.checkFirstDay(moment(form.start.value).add(4, 'days'));
    this.checkSecondDay(moment(form.start.value).add(4, 'days').add(Math.floor(diff/3.5), 'days'));
    this.checkFourthDay(moment(form.end.value).subtract(7, 'days'));
    this.checkThirdDay(moment(form.start.value).add(4, 'days').add(Math.floor((2*diff)/3.5), 'days'));
    this.checkMid(moment(form.start.value).add(Math.floor(diff/2), 'days'));

    this.setState({
      days: days,
      diff: diff,
      first: '1st Observation Day: ' + first,
      second: '2nd Observation Day: ' + second,
      third: '3rd Observation Day: ' + third,
      fourth: '4th Observation Day: ' + fourth,
      mid: 'Mid-Course Feedback: ' + mid
    });
  }

  render() {

    return (
      <div>
        <Form onPost={this.onPost.bind(this)} checkForm={this.checkForm}/>
        <Results days={this.state.days} diff={this.state.diff} first={this.state.first} second={this.state.second} third={this.state.third} fourth={this.state.fourth} mid={this.state.mid} />
      </div>
    )
  }
}

export default Homepage;
