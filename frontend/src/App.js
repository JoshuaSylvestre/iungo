import React, { Component } from 'react';
import Landing from './components/pages/Landing';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="App">

        <Landing />
        <h1>
          {users.map(user => <div key={user.id}>{user.username}</div>)}
        </h1>
      </div>
    );
  }
}

export default App;
