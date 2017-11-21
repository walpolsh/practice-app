import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import './microphone.css'
let audioArr = [];

export default class Microphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blobURL: null,
      blobObject: null,
      isRecording: false
    }
  }

  startRecording = () => {
    this.setState({
      blobURL: null,
      record: true,
      isRecording: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false,
      isRecording: false
    });
  }

  onStop = (blobObject) => {
    console.log('recordedBlob is: ', blobObject);
    this.setState({
      blobURL: blobObject.blobURL
    });
  }

  render() {
    let audio = null;
    let blob = this.state.blobURL
    if(this.state.blobURL !== null && this.state.isRecording === false) {
      audioArr.push(blob)
      audio = audioArr.map((x, i) => (<li key={i}><audio ref="audioSource" controls="controls" src={x}></audio></li>))
    } else if (audioArr.length > 0){
      audio = audioArr.map((x, i) => (<li key={i}><audio ref="audioSource" controls="controls" src={x}></audio></li>))
    } else {
      audio = <p>*empty*</p>
    }
    console.log('audioArr is: ', audioArr)
    return (
      <div>
        <h1>Recordings</h1>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#041c4c"
          backgroundColor="#3094c0" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <div>
          {audio}
        </div>
      </div>
    );
  }

}
