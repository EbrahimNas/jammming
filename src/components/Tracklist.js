import React from 'react';
import Track from './Track';

function Tracklist({ tracks }) {
  return (
    <div>
      {tracks.map(track => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracklist;
