import React, { Component } from 'react';
import './App.css';
import mainLogo from './assets/logo.png'
import Pomodoro from './components/pomodoro';
import Metronome from './components/metronome';
import TodoApp from './components/todo';
import Microphone from './components/microphone';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='appContainer'>
          <img id='mainLogo' src={mainLogo} />
          <Pomodoro className='Pomodoro' seconds="1500"/>
          <Metronome className='Metronome'/>
          <Microphone />
          <TodoApp className='Todo' />
        </div>
      </div>
    );
  }
}

export default App;
