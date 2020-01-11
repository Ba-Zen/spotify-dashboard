import React from 'react';

import './trackCard.styles.scss';

const TrackCard = props => {
  return (
    <div className='track-card'>
      <img src={props.track.album.images[0].url} alt='top tracks' />
      <h1>{props.track.name}</h1>
      <h2>{props.track.artists[0].name}</h2>
    </div>
  );
};

export default TrackCard;
