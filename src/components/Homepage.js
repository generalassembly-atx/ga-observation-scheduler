import React, { Component } from 'react';

import Form from './Form'
import Results from './Results'
// var moment = require('moment');
import moment from 'moment';

class Homepage extends Component {

  constructor(props) {
    super(props);

    // this.onPost = this.onPost.bind(this)

    this.state = {
      days: [],
      startDate: null,
      endDate: null,
      diff: null,
      first: null,
      second: null,
      third: null,
      fourth: null
    };
  }

  onPost(event) {
    event.preventDefault();
    let days = [];
    for (var i = 0; i < event.target.day.length; i++) {
      if (event.target.day[i].checked) {
        days.push(event.target.day[i].value);
      }
    }
    let day1 = event.target.start.value;
    let day2 = event.target.end.value
    let startDate = moment(day1).format("dddd, MMMM Do, YYYY");
    let endDate = moment(day2).format("dddd, MMMM Do, YYYY");
    let first = moment(day1).add(4, 'days').format("dddd, MMMM Do, YYYY");
    let fourth = moment(day2).subtract(7, 'days').format("dddd, MMMM Do, YYYY");
    this.setState({
      days: days,
      startDate: startDate,
      endDate: endDate,
      diff: moment(event.target.end.value).diff(moment(event.target.start.value), 'days'),
      first: first,
      fourth: fourth
    });
  };

  render() {
    console.log('state', this.state.diff);

    return (
      <div>
        <Form onPost={this.onPost.bind(this)}/>
        <Results days={this.state.days} startDate={this.state.startDate} endDate={this.state.endDate} diff={this.state.diff} first={this.state.first} fourth={this.state.fourth} />
      </div>
    )
  }
}

export default Homepage;
