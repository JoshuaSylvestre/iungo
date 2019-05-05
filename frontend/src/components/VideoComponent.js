import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

export default class VideoComponent extends Component {
    constructor(props) {
        super();

        this.state = {
            record: true
        };
    }
    startRecording(){
        this.setState({
            record: true
        });
    }

    stopRecording(){
        this.setState({
            record: false
        });
    }

    onData(recordedBlob) {
        // console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        // console.log('recordedBlob is: ', recordedBlob);
    }

    render() {
      return (
        <div className="flex-container">
          <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              onData={this.onData}
              strokeColor="#000000"
              backgroundColor="#00d8ff" />
          {/* <button onClick={this.startRecording} type="button">Start</button> */}
          {/* <button onClick={this.stopRecording} type="button">Stop</button>  */}
      </div>
    );
    }
}