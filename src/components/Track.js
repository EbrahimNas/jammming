import React from 'react';

function Track({ track }) {
  return (
    <div>
      <h3>{track.name} - {track.artist}</h3>
    </div>
  );
}

export default Track;
