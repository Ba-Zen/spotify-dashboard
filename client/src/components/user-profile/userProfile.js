import React, { Component } from 'react';
import { getUserInfo, getRecommendedTracks } from '../../spotify';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import SongCard from '../songcard/songCard.component';
import ArtistCard from '../artistcard/artistCard.component';
import TrackCard from '../trackcard/trackCard.component';

import './userProfile.styles.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class UserProfile extends Component {
  state = {
    loading: true,
    user: [],
    followedArtists: '',
    playlists: [],
    recentlyPlayed: [],
    topArtists: [],
    topTracks: [],
    recommendations: []
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
      loading: false,
      user,
      followedArtists,
      playlists,
      recentlyPlayed,
      topArtists,
      topTracks
    });
  }

  render() {
    const {
      user,
      followedArtists,
      playlists,
      recentlyPlayed,
      topArtists,
      topTracks,
      loading
    } = this.state;
    return (
      <>
        {!loading ? (
          <div className='profile-container'>
            <div className='account'></div>
            <div className='recent-section-title'>
              <h3>Recently Played</h3>
              <Link to='/recently-played'>
                <button>See All</button>
              </Link>
            </div>
            <div className='song-wrapper'>
              {recentlyPlayed.items.slice(0, 4).map(song => (
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
              {topArtists.items.slice(0, 5).map(artist => (
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
              {topTracks.items.slice(0, 5).map(track => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </div>
        ) : (
          <Loader
            type='ThreeDots'
            color='#1db954'
            height={100}
            width={100}
            timeout={3000}
            className='loader'
          />
        )}
      </>
    );
  }
}

export default UserProfile;
