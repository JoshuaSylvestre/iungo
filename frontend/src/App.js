/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import translate from 'translate';
import logo from './logo.svg';
import './App.css';

const options = {
  autoStart: false,
  continuous: true
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      users: []
    };
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
    this.props.recognition.lang = 'en';
  }

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <h1>
          {/* {users.map(user => <div key={user.id}>{user.username}</div>)} */}
          <button onClick={this.props.startListening}>Start</button>
          <button onClick={this.props.stopListening}>Stop</button>
          <span>{this.props.finalTranscript}</span>
        </h1>
      </div>
    );
  }
}

export default  SpeechRecognition(options)(App);