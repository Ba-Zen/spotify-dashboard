import React, { Component } from 'react';
import { getUserInfo } from '../../spotify/index';
import TrackCard from '../trackcard/trackCard.component';
import Loader from 'react-loader-spinner';

import './topTracks.styles.scss';

class TopTracks extends Component {
  state = {
    topTracks: [],
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { topTracks } = await getUserInfo();
    this.setState({ topTracks: topTracks.items, loading: false });
  }

  render() {
    const { topTracks, loading } = this.state;
    return (
      <>
        {!loading ? (
          <div className='tracks-container'>
            <h2>Top Tracks</h2>
            <div className='track-wrapper'>
              {topTracks.map(track => (
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

export default TopTracks;
