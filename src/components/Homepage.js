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
      mid: null,
      course: null
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
    if (checked === true && this.refs.start !== '' && this.refs.end !== '' && this.refs.courses.value !== '') {
      this.props.onPost();
    }
  }

  onPost(event) {
    days = [];
    const form = document.getElementById('form');
    const course = form.courses.value;

    for (var i = 0; i < form.day.length; i++) {
      if (form.day[i].checked) {
        days.push(form.day[i].value);
      }
    }


    // const day1 = moment(form.start.value);
    // const day2 = moment(form.end.value);
    const diff = moment(form.end.value).diff(moment(form.start.value), 'days');
    // const firstMoment = moment(form.start.value).add(4, 'days');
    // const fourthMoment = moment(form.end.value).subtract(7, 'days');
    this.checkFirstDay(moment(form.start.value).add(4, 'days'));
    this.checkSecondDay(moment(form.start.value).add(4, 'days').add(Math.floor(diff/3.5), 'days'));
    this.checkFourthDay(moment(form.end.value).subtract(7, 'days'));
    this.checkThirdDay(moment(form.start.value).add(4, 'days').add(Math.floor((2*diff)/3.5), 'days'));
    this.checkMid(moment(form.start.value).add(Math.floor(diff/2), 'days'));

    this.setState({
      days: days,
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      mid: mid,
      course: course
    });
  }

  addToCalendar () {
    console.log('this ', this);
    let date = moment(this.props.first, 'dddd, MMMM Do, YYYY').format()
    console.log('date ', (moment(date).set('hour', 13)).format());
    let event = {
      'summary': this.props.course + ' observation',
      'start': {
        'dateTime': moment(date).set('hour', 13).format(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment(date).set('hour', 14).format(),
        'timeZone': 'America/Chicago'
      }
    }
    console.log('event ', event);
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    request.execute(function(event) {
      alert('Event added');
    });
  }



  render() {

    return (
      <div>
        <Form onPost={this.onPost.bind(this)} checkForm={this.checkForm} />
        <Results days={this.state.days} first={this.state.first} second={this.state.second} third={this.state.third} fourth={this.state.fourth} mid={this.state.mid} course={this.state.course} addToCalendar={this.addToCalendar} />
      </div>
    )
  }
}

export default Homepage;
