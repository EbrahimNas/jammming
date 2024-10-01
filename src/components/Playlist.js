import React, {useState, useEffect} from 'react';
import Tracklist from './Tracklist';
import styles from "./CSS/Playlist.module.css";

function Playlist({style, playlist}) {

  const [playlistName, setPlaylistName] = useState('');
  
  
  function handleUserInput(e) {
    setPlaylistName(e.target.value);
  }

  return (

    <div className={style}>

        <form className={styles.playlist}>
          <input placeholder="name your playlist name..." type="text" onChange={handleUserInput} value={playlistName} />
          <h3>{playlistName}</h3>
          <Tracklist tracks={playlist} />
          <button type="submit">Save to Apple Music</button>
        </form>

    </div>
   
  );
}

export default Playlist;