import React, { Component } from 'react';

import Form from './Form'
import Results from './Results'

class Homepage extends Component {
  render() {
    return (
      <div>
        <Form />
        <Results />
      </div>
    )
  }
}

export default Homepage;
