import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SongCard from '../components/songcard/songCard.component';
import ArtistCard from '../components/artistcard/artistCard.component';
import TrackCard from '../components/trackcard/trackCard.component';

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
      following: '',
      playlists: '',
      avatar: '',
      recentlyPlayed: [],
      topArtists: [],
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
      this.setState({
        displayName: response.display_name,
        followers: response.followers.total,
        avatar: response.images[0].url
      });
    });
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 }).then(response => {
      this.setState({
        recentlyPlayed: response.items
      });
    });
    spotifyApi.getFollowedArtists().then(response => {
      this.setState({
        following: response.artists.items.length
      });
    });
    spotifyApi.getUserPlaylists().then(response => {
      this.setState({
        playlists: response.items.length
      });
    });
    spotifyApi.getMyTopArtists({ limit: 5 }).then(response => {
      console.log(response);
      this.setState({
        topArtists: response.items
      });
    });
    spotifyApi.getMyTopTracks({ limit: 5 }).then(response => {
      console.log(response);
      this.setState({
        topTracks: response.items
      });
    });
  }

  render() {
    return (
      <div>
        <div className='account'>
          <img src={this.state.avatar} />
          <div className='account-wrapper'>
            <h1>{this.state.displayName}</h1>
            <div className='account-stats'>
              <div className='following'>
                <h4>following</h4>
                <h2>{this.state.following}</h2>
              </div>
              <div className='followers'>
                <h4>followers</h4>
                <h2>{this.state.followers}</h2>
              </div>
              <div className='playlists'>
                <h4>playlists</h4>
                <h2>{this.state.playlists}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='section-title'>
          <h3>Recently Played</h3>
          <button>See all</button>
        </div>
        <div className='song-wrapper'>
          {this.state.recentlyPlayed.map(song => (
            <SongCard key={song.track.id} song={song} />
          ))}
        </div>
        <div className='section-title'>
          <h3>Top Artists</h3>
          <button>See all</button>
        </div>
        <div className='artist-wrapper'>
          {this.state.topArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        <div className='section-title'>
          <h3>Top Tracks</h3>
          <button>See all</button>
        </div>
        <div className='track-wrapper'>
          {this.state.topTracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
