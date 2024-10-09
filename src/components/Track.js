import React from 'react';
import styles from "./CSS/Track.module.css";

function Track({ track, onAdd, onRemove }) {
    
  return (
    <div className={styles.track}>

      <div className={styles.trackInfo}>
        <h3>{track.name}</h3>
        <p className={styles.artist}>{track.artists[0].name}</p>
        <p className={styles.album}><em>- {track.album.name}</em></p>
      </div>
      
      <div className={styles.buttonContainer}>
        {onAdd && <button onClick={() => onAdd(track)}>+</button>} {/* Render "+" if onAdd exists */}
        {onRemove && <button onClick={() => onRemove(track)}>-</button>} {/* Render "-" if onRemove exists */}
      </div>
    </div>
  );
}

export default Track;
