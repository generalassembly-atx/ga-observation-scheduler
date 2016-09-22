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
  function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  console.log('request ', request);

  request.execute(function(resp) {
    var events = resp.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
listUpcomingEvents();
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
