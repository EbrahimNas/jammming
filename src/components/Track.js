import React from 'react';
import styles from "./CSS/Track.module.css";

function Track({ track, onAdd, onRemove }) {

  // Fetch the album image, default to a placeholder if not available
  const albumImage = track.album.images.length > 0 ? track.album.images[0].url : 'default-placeholder-image-url';

    
  return (
    <div className={styles.track}>

      <div className={styles.trackImage}>
        <img src={albumImage} alt={`${track.name} album art`} />
      </div>

      <div className={styles.trackInfo}>
        <h3>{track.name}</h3>
        <p className={styles.artist}>{track.artists[0].name}</p>
        <p className={styles.album}><em>- {track.album.name}</em></p>
      </div>
      
      <div className={styles.buttonContainer}>
        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
           <g>
              <img src="./spotifyLogoG.png" alt="Spotify Logo" className="spotify-logo"/>
           </g>
        </a>
        {onAdd && <button onClick={() => onAdd(track)}>+</button>} {/* Render "+" if onAdd exists */}
        {onRemove && <button onClick={() => onRemove(track)}>-</button>} {/* Render "-" if onRemove exists */}
      </div>
    </div>
  );
}

export default Track;
