import React, { Component } from 'react';
import { getUserInfo } from '../../spotify/index';
import ArtistCard from '../artistcard/artistCard.component';
import './topArtists.styles.scss';

class TopArtists extends Component {
  state = {
    topArtists: []
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { topArtists } = await getUserInfo();
    this.setState({ topArtists: topArtists.items });
  }

  render() {
    const { topArtists } = this.state;
    return (
      <div>
        <h2>Top Artists</h2>
        <div className='artist-wrapper'>
          {topArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    );
  }
}

export default TopArtists;
