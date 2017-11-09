import React, { Component } from 'react';
import './pomodoro.css'

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: parseInt(props.seconds),
      count: 0
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this)
  }
  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
  }

  increase() {
    this.setState({
      seconds: this.state.seconds += 60
    });
  }

  decrease() {
    this.setState(prevState => ({
      seconds: prevState.seconds - 60
    }));
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  increaseCount() {
    this.setState(prevState => ({
      count: prevState.count += 1,
    }));
  }

  resetTimer() {
    clearInterval(this.interval);
    this.setState(prevState => ({
      seconds: prevState.seconds = 1500
    }));
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.state.seconds)
    let time = this.state.seconds
    var hrs = ~~(time / 3600); //~~ substitutes Math.floor()
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;
    function fancyTimeFormat(time) {
          // Hours, minutes and seconds
          // Output like "1:01" or "4:03:59" or "123:03:59"
          var result = "";
          if (hrs > 0) {
              result += "" + hrs + ":" + (mins < 10 ? "0" : "");
          }
          result += "" + mins + ":" + (secs < 10 ? "0" : "");
          result += "" + secs;
          return result;
    }

    let display = null;
    let button1, button2 = null;
    let plus, minus = null;

    if (this.state.seconds <= 0) {
      display = <div>DONE!</div>
      button1 = <button className='buttons' onClick={this.resetTimer.bind(this)}>Reset</button>
      this.state.count + 1

    } else {

      display = <div>{fancyTimeFormat(time)}</div>
      button1 = <button className='buttons' onClick={this.startTimer.bind(this)}>Start</button>
      button2 = <button className='buttons' onClick={this.stopTimer.bind(this)}>Stop</button>
      plus = <button className='buttons' id='increase' onClick={this.increase}>+</button>
      minus = <button className='buttons' onClick={this.decrease}>-</button>
    }
    return (
      <div>
        <div>Work Periods: {this.state.count}</div>
        <div id='timer'><div id='innertimer'>{display}{plus}{button1}{button2}{minus}</div></div>
      </div>
    );
  }
}
