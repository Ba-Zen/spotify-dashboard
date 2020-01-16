import React from 'react';
import './songList.styles.scss';

const SongList = props => {
  const time = props.song.track.duration_ms;
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  return (
    <div className='song-list'>
      <h4 className='song-name'>{props.song.track.name}</h4>
      <p className='artist-name'>{props.song.track.artists[0].name}</p>
      <p className='time'>{millisToMinutesAndSeconds(time)}</p>
    </div>
  );
};

export default SongList;
