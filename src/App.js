import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './components/pomodoro';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>test</p>
        <Pomodoro secondsRemaining="10"/>
      </div>
    );
  }
}

export default App;
