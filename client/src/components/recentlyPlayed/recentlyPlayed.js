import React, { Component } from 'react';
import { getUserInfo } from '../../spotify/index';
import SongCard from '../songcard/songCard.component';
import Loader from 'react-loader-spinner';

import './recentlyPlayed.styles.scss';

class RecentlyPlayed extends Component {
  state = {
    recentlyPlayed: [],
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { recentlyPlayed } = await getUserInfo();
    this.setState({ recentlyPlayed: recentlyPlayed.items, loading: false });
  }

  render() {
    const { recentlyPlayed, loading } = this.state;
    return (
      <>
        {!loading ? (
          <div className='recent-container'>
            <h2>Recently Played Songs</h2>
            <div className='song-wrapper'>
              {recentlyPlayed.map(song => (
                <SongCard key={song.track.id} song={song} />
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

export default RecentlyPlayed;
