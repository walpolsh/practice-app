import React, { Component } from 'react';
import './App.css';
import mainLogo from './assets/logoWrap.png'
import Router from './components/router';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='appContainer'>
          <img id='mainLogo' src={mainLogo} />
          <Router />
        </div>
      </div>
    );
  }
}

export default App;
