import React, { Component } from 'react';
import './metronome.css';
import click1 from '../assets/click1.wav'
import click2 from '../assets/click2.wav'

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100.0,
      beatsPerMeasure: 4
    };
    this.click1 = new Audio(click1)
    this.click2 = new Audio(click2)
  }


  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setTimeout(this.playClick, (60 / this.state.bpm) * 1000);

      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  }
  //If we’d used a regular function like handleBpmChange() { ... }, then the this binding would be lost when it gets passed to the onChange handler in render.

  startStop = () => {
    if(this.state.playing) {
      //If the metronome is playing, stop it: clear the timer, and set the playing state to false. This will cause the app to re-render, and the button will say “Start” again.
      clearInterval(this.timer)
      this.setState({
        playing: false
      });
    } else {
      //If the metronome is not playing, start a timer that plays a click every few milliseconds, depending on the bpm.
      // setInterval will schedule the first “click” to be one beat in the future, the second argument to setState . Once the state is set, it will play one click.

      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        //We’ll use count to keep track of which beat we’re on, incrementing it with each “click”, so we need to reset it here.
        count: 0,
        playing: true
      }, this.playClick);
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if(count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  render() {
    const { playing, bpm } = this.state;
    return (
      <div className="metronome">
        <div>
          <div className='bpm-slider'>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;
