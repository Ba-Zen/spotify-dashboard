import React, { Component } from 'react';
import './App.css';
import Profile from './pages/profile';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topTracks: []
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      //console.log(response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  getTopTracks() {
    spotifyApi.getMyTopTracks().then(response => {
      console.log(response);
      // this.setState({
      //   topTracks: response.items
      // });
    });
  }

  render() {
    return (
      <div className='App'>
        <Profile />
        <a href='http://localhost:8888'> Login to Spotify </a>
      </div>
    );
  }
}

export default App;
