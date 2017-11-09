import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './components/pomodoro';
import Metronome from './components/metronome';
import TodoApp from './components/todo';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Practice Tracker</h1>
        <Pomodoro seconds="1500"/>
        <Metronome />
        <TodoApp />
      </div>
    );
  }
}

export default App;
