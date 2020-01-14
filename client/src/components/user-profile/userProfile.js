import React, { Component } from 'react';
import { getUserInfo } from '../../spotify';
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
    console.log(followedArtists);

    return (
      <>
        {!loading ? (
          <div>
            <div className='account'>
              <img src={user.images[0].url} alt='profile' />
              <div className='account-wrapper'>
                <a
                  href={user.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <h1>{user.display_name}</h1>
                </a>

                <div className='account-stats'>
                  <div className='following'>
                    <h4>Following</h4>
                    <h2>{followedArtists.artists.total}</h2>
                  </div>
                  <div className='followers'>
                    <h4>Followers</h4>
                    <h2>{user.followers.total}</h2>
                  </div>
                  <div className='playlists'>
                    <h4>Playlists</h4>
                    <h2>{playlists.total}</h2>
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
              {recentlyPlayed.items.slice(0, 5).map(song => (
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
