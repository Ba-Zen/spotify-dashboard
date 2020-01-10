import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SongCard from '../components/songcard/songCard';

import './profile.styles.scss';

const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      displayName: '',
      followers: '',
      avatar: '',
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

  componentDidMount() {
    spotifyApi.getMe().then(response => {
      console.log(response);
      this.setState({
        displayName: response.display_name,
        followers: response.followers.total,
        avatar: response.images[0].url
      });
    });
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 }).then(response => {
      console.log(response);
      this.setState({
        topTracks: response.items
      });
    });
  }

  render() {
    console.log(this.state.topTracks);

    return (
      <div>
        <h2>{this.state.displayName}</h2>
        <h2>{this.state.followers}</h2>
        <img src={this.state.avatar} className='avatar' />
        <div className='song-wrapper'>
          {this.state.topTracks.map(song => (
            <SongCard key={song.track.id} song={song} />
          ))}
        </div>
        <button>See all</button>
      </div>
    );
  }
}

export default Profile;
