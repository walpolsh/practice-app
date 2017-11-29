import React, { Component } from 'react';
import About from './about';
import Pomodoro from './pomodoro';
import Metronome from './metronome';
import TodoApp from './todo';
import Microphone from './microphone';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
}

const liStyle = {
  float: 'left'
}

const linkStyle = {
  display: 'block',
  color: 'white',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none'
}

export default class Nav extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={About}/>
          <Route path="/timer" component={Pomodoro}/>
          <Route path="/metronome" component={Metronome}/>
          <Route path="/todo" component={TodoApp}/>
          <Route path="/microphone" component={Microphone}/>
          <hr/>
          <ul style={ulStyle}>
            <li style={liStyle}><Link style={linkStyle} to="/">About</Link></li>
            <li style={liStyle}><Link style={linkStyle} to="/timer">Timer</Link></li>
            <li style={liStyle}><Link style={linkStyle} to="/metronome">Metronome</Link></li>
            <li style={liStyle}><Link style={linkStyle} to="/todo">Todo List</Link></li>
            <li style={liStyle}><Link style={linkStyle} to="/microphone">Microphone</Link></li>
          </ul>
        </div>
      </Router>
    )
  }
}
