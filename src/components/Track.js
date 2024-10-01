import React from 'react';
import styles from "./CSS/Track.module.css";

function Track({ track, onAdd }) {
  return (
    <div className={styles.track}>
      <h3>{track.name}</h3>
      <p className={styles.artist}>{track.artist}</p>
      <p className={styles.album}><em>- {track.album}</em></p>
      <button onClick={() => onAdd(track)}>+</button>
    </div>
  );
}

export default Track;
