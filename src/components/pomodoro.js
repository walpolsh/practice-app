import React, { Component } from 'react';
import './pomodoro.css'

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: props.seconds };
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let time = this.state.seconds
    function fancyTimeFormat(time) {
          // Hours, minutes and seconds
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = time % 60;
          // Output like "1:01" or "4:03:59" or "123:03:59"
          var ret = "";
          if (hrs > 0) {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
          }

          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          return ret;
    }
    let display = null;
    let button = null;
    let plus, minus = null;
    if (this.state.seconds <= 0) {
      display = <div>DONE!</div>
      button = <button onClick={() => {this.state.seconds = this.props.seconds}}>Reset</button>


    } else {
      display = <div>{fancyTimeFormat(time)}</div>
      button = <button onClick={this.startTimer.bind(this)}>Start</button>
      plus = <button>+</button>
      minus = <button>-</button>
    }
    return (
      <div>
        <div id='timer'><div id='innertimer'>{display}{plus}{button}{minus}</div></div>
      </div>
    );
  }
}
