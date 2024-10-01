import React from 'react';
import Tracklist from './Tracklist';

function Playlist() {
  const playlistTracks = [
    { id: 1, name: 'Playlist Song A', artist: 'Artist A' },
    { id: 2, name: 'Playlist Song B', artist: 'Artist B' }
  ];

  return (

    <div>

        <form>
          <input placeholder="name your playlist..." type="text" />
          <Tracklist tracks={playlistTracks} />
          <button type="submit">Save to Apple Music</button>
        </form>

    </div>
   
  );
}

export default Playlist;