import React, { Component } from 'react';
import { getUserInfo } from '../../spotify/index';
import SongCard from '../songcard/songCard.component';
import './recentlyPlayed.styles.scss';

class RecentlyPlayed extends Component {
  state = {
    recentlyPlayed: []
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { recentlyPlayed } = await getUserInfo();
    this.setState({ recentlyPlayed: recentlyPlayed.items });
  }

  render() {
    const { recentlyPlayed } = this.state;
    return (
      <div>
        <h2>Recently Played Songs</h2>
        <div className='song-wrapper'>
          {recentlyPlayed.map(song => (
            <SongCard key={song.track.id} song={song} />
          ))}
        </div>
      </div>
    );
  }
}

export default RecentlyPlayed;
