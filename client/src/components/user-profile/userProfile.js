import React, { Component } from 'react';
import { getUserInfo } from '../../spotify';
import { Link } from 'react-router-dom';

import SongCard from '../songcard/songCard.component';
import ArtistCard from '../artistcard/artistCard.component';
import TrackCard from '../trackcard/trackCard.component';

import './userProfile.styles.scss';

class UserProfile extends Component {
  state = {
    user: [],
    avatar: '',
    followers: '',
    followedArtists: '',
    playlists: '',
    recentlyPlayed: [],
    topArtists: [],
    topTracks: []
  };

  componentDidMount() {
    this.getData();
  }
  async getData() {
    const {
      user,
      followedArtists,
      playlists,
      recentlyPlayed,

      topArtists,
      topTracks
    } = await getUserInfo();
    this.setState({
      user,
      avatar: user.images[0].url,
      followers: user.followers.total,
      followedArtists: followedArtists.artists.items.length,
      playlists: playlists.items.length,
      recentlyPlayed: recentlyPlayed.items,
      topArtists: topArtists.items,
      topTracks: topTracks.items
    });
  }

  render() {
    const {
      user,
      avatar,
      followers,
      followedArtists,
      playlists,
      recentlyPlayed,
      topArtists,
      topTracks
    } = this.state;

    return (
      <div>
        <div className='account'>
          <img src={avatar} alt='profile' />
          <div className='account-wrapper'>
            <h1>{user.display_name}</h1>
            <div className='account-stats'>
              <div className='following'>
                <h4>Following</h4>
                <h2>{followedArtists}</h2>
              </div>
              <div className='followers'>
                <h4>Followers</h4>
                <h2>{followers}</h2>
              </div>
              <div className='playlists'>
                <h4>Playlists</h4>
                <h2>{playlists}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='section-title'>
          <h3>Recently Played</h3>
          <Link to='/recently-played'>
            <button>See All</button>
          </Link>
        </div>
        <div className='song-wrapper'>
          {recentlyPlayed.slice(0, 5).map(song => (
            <SongCard key={song.track.id} song={song} />
          ))}
        </div>
        <div className='section-title'>
          <h3>Top Artists</h3>
          <Link to='/top-artists'>
            <button>See All</button>
          </Link>
        </div>
        <div className='artist-wrapper'>
          {topArtists.slice(0, 5).map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        <div className='section-title'>
          <h3>Top Tracks</h3>
          <Link to='/top-tracks'>
            <button>See All</button>
          </Link>
        </div>
        <div className='track-wrapper'>
          {topTracks.slice(0, 5).map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    );
  }
}

export default UserProfile;
