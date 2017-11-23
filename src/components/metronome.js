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

  handleBpmChange = (event) => {
    const bpm = event.target.value;

    if(this.state.playing) {

      this.setState({
        count: 0,
        bpm,
        playing: false
      });
      clearInterval(this.timer);
      this.timer = setTimeout(this.playClick, (60 / this.state.bpm) * 1000);

    } else {
      this.setState({ bpm });
    }
  }

  stopStartPlaying = () => {
    if(this.state.playing) {
      clearInterval(this.timer)
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }
  }


  render() {
    const { playing, bpm } = this.state;
    return (
      <div className="metronome">
        <h2>Metronome</h2>
        <div className='bpm-slider'>
          <input
            type="number"
            name="bpm-slider"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
          <div>BPM</div>
        </div>
        <button onClick={this.stopStartPlaying} tabIndex='0'>
          {playing ? 'Reset' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;
