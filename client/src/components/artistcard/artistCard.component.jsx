import React from 'react';

import './artistCard.styles.scss';

const ArtistCard = props => {
  return (
    <div key={props.artist.id} className='artist-card'>
      <img src={props.artist.images[0].url} alt='top artist' />
      <h1>{props.artist.name}</h1>
    </div>
  );
};

export default ArtistCard;
