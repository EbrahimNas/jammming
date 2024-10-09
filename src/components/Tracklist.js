import React from 'react';
import Track from './Track.js';

function Tracklist({ tracks, onAdd, onRemove }) {

  console.log("Tracks prop received in Tracklist:", tracks);

  return (
    <div>
      {tracks.map(track => (
        <Track 
        key={track.id} 
        track={track} 
        onAdd={onAdd} 
        onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default Tracklist;
