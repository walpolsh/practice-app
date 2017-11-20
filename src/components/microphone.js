import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

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
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#041c4c"
          backgroundColor="#3094c0" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <div>
          <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
        </div>
      </div>
    );
  }

}
