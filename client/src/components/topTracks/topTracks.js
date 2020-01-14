import React, { Component } from 'react';
import { getUserInfo } from '../../spotify/index';
import TrackCard from '../trackcard/trackCard.component';
import './topTracks.styles.scss';

class TopTracks extends Component {
  state = {
    topTracks: []
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { topTracks } = await getUserInfo();
    this.setState({ topTracks: topTracks.items });
  }

  render() {
    const { topTracks } = this.state;
    return (
      <div>
        <h2>Top Tracks</h2>
        <div className='track-wrapper'>
          {topTracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    );
  }
}

export default TopTracks;
