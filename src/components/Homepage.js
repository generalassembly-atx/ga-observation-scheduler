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

    this.reset = this.reset.bind(this);

    this.state = {
      days: [],
      diff: null,
      first: null,
      second: null,
      third: null,
      fourth: null,
      mid: null,
      course: null,
      startTime: null
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
    if (checked === true && this.refs.start !== '' && this.refs.end !== '' && this.refs.courses.value !== '' && this.refs.startTimes.value !== '') {
      this.props.onPost();
    }
  }

  onPost(event) {
    days = [];
    const form = document.getElementById('form');
    const course = form.courses.value;
    const startTime = form.startTimes.value;

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
      course: course,
      startTime: startTime
    });
  }

  addToCalendar () {
    let startTime = parseInt(this.props.startTime);
    let endTime = startTime + 1;
    let date1 = moment(this.props.first, 'dddd, MMMM Do, YYYY').format();
    let date2 = moment(this.props.second, 'dddd, MMMM Do, YYYY').format()
    let date3 = moment(this.props.third, 'dddd, MMMM Do, YYYY').format()
    let date4 = moment(this.props.fourth, 'dddd, MMMM Do, YYYY').format()
    let date5 = moment(this.props.mid, 'dddd, MMMM Do, YYYY').format()
    let event1 = {
      'summary': this.props.course + ' observation',
      'start': {
        'dateTime': moment(date1).set('hour', startTime).format(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment(date1).set('hour', endTime).format(),
        'timeZone': 'America/Chicago'
      }
    }

    let request1 = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event1
    });

    request1.execute(function(event) {
    });

    let event2 = {
      'summary': this.props.course + ' observation',
      'start': {
        'dateTime': moment(date2).set('hour', startTime).format(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment(date2).set('hour', endTime).format(),
        'timeZone': 'America/Chicago'
      }
    }

    let request2 = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event2
    });

    request2.execute(function(event) {
    });

    let event3 = {
      'summary': this.props.course + ' observation',
      'start': {
        'dateTime': moment(date3).set('hour', startTime).format(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment(date3).set('hour', endTime).format(),
        'timeZone': 'America/Chicago'
      }
    }

    let request3 = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event3
    });

    request3.execute(function(event) {
    });

    let event4 = {
      'summary': this.props.course + ' observation',
      'start': {
        'dateTime': moment(date4).set('hour', startTime).format(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment(date4).set('hour', endTime).format(),
        'timeZone': 'America/Chicago'
      }
    }

    let request4 = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event4
    });

    request4.execute(function(event) {
    });

    let event5 = {
      'summary': this.props.course + ' mid course feedback',
      'start': {
        'dateTime': moment(date5).set('hour', startTime).format(),
        'timeZone': 'America/Chicago'
      },
      'end': {
        'dateTime': moment(date5).set('hour', endTime).format(),
        'timeZone': 'America/Chicago'
      }
    }

    let request5 = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event5
    });

    request5.execute(function(event) {
    });

    alert('Five events have been added to your calendar');
  }

  reset() {
    document.getElementById('form').reset();
    this.setState({
      days: [],
      first: null,
      second: null,
      third: null,
      fourth: null,
      mid: null,
      course: null,
      startTime: null
    });
  }



  render() {

    return (
      <div>
        <h1>Emily's Observations Scheduler</h1>
        <Form onPost={this.onPost.bind(this)} checkForm={this.checkForm} />
        <Results days={this.state.days} first={this.state.first} second={this.state.second} third={this.state.third} fourth={this.state.fourth} mid={this.state.mid} course={this.state.course} startTime={this.state.startTime} addToCalendar={this.addToCalendar} />
        <br></br>
        <button className="btn btn-primary" onClick={this.reset}>Start over</button>
      </div>
    )
  }
}

export default Homepage;
