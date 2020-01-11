import React from 'react';

import './songCard.styles.scss';

const SongCard = props => {
  return (
    <div className='song-card'>
      <img src={props.song.track.album.images[0].url} alt='top tracks' />
      <h1>{props.song.track.name}</h1>
      <h2>{props.song.track.artists[0].name}</h2>
    </div>
  );
};

export default SongCard;
