import React, { Component } from 'react';
import { token } from './spotify/index';

import Profile from './components/profile/Profile';
import LoginScreen from './components/login/loginScreen';

import './App.css';

class App extends Component {
  state = {
    token: null
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;
    console.log(this.state);
    return (
      <>
        <div className='App'>{token ? <Profile /> : <LoginScreen />}</div>
      </>
    );
  }
}

export default App;
