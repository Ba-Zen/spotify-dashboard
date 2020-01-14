import React, { Component } from 'react';
import { getUserInfo } from '../../spotify/index';
import ArtistCard from '../artistcard/artistCard.component';
import Loader from 'react-loader-spinner';

import './topArtists.styles.scss';

class TopArtists extends Component {
  state = {
    topArtists: [],
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { topArtists } = await getUserInfo();
    this.setState({ topArtists: topArtists.items, loading: false });
  }

  render() {
    const { topArtists, loading } = this.state;
    return (
      <>
        {!loading ? (
          <div className='artist-container'>
            <h2>Top Artists</h2>
            <div className='artist-wrapper'>
              {topArtists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
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

export default TopArtists;
