import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, logout } from '../../spotify/index';
import Loader from 'react-loader-spinner';
import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as History } from '../../assets/history.svg';
import { ReactComponent as Artist } from '../../assets/artist.svg';
import { ReactComponent as Tracks } from '../../assets/tracks.svg';

import './menu.styles.scss';

class Menu extends Component {
  state = {
    user: [],
    followedArtists: '',
    playlists: [],
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { user, followedArtists, playlists } = await getUserInfo();
    this.setState({
      user,
      followedArtists,
      playlists,
      loading: false
    });
  }

  render() {
    const { user, loading, followedArtists, playlists } = this.state;
    return (
      <>
        {!loading ? (
          <div>
            <div className='menu-container'>
              <img src={user.images[0].url} alt='profile' />
              <a
                href={user.external_urls.spotify}
                target='_blank'
                rel='noopener noreferrer'
              >
                <h2>{user.display_name}</h2>
              </a>
              <button onClick={logout}>Logout</button>
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
              <div className='link-wrapper'>
                <Link to='/profile'>
                  <div className='link-container'>
                    <User className='icon' />
                    <h4>Profile</h4>
                  </div>
                </Link>
                <Link to='/recently-played'>
                  <div className='link-container'>
                    <History className='icon' />
                    <h4>Recent</h4>
                  </div>
                </Link>
                <Link to='/top-artists'>
                  <div className='link-container'>
                    <Artist className='icon' />
                    <h4>Top Artists</h4>
                  </div>
                </Link>
                <Link to='/top-tracks'>
                  <div className='link-container'>
                    <Tracks className='icon' />
                    <h4>Top Tracks</h4>
                  </div>
                </Link>
              </div>
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

export default Menu;
