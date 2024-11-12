import React, { useState } from 'react';
import Tracklist from './Tracklist.js';
import styles from './CSS/Playlist.module.css';

function Playlist({ style, playlist, onRemove, accessToken }) {
  const [playlistName, setPlaylistName] = useState('');

  // Function to handle input change for playlist name
  function handleUserInput(e) {
    setPlaylistName(e.target.value);
  }

  // Function to save the playlist to Spotify
  const savePlaylistToSpotify = async (event) => {
    event.preventDefault();

    if (!accessToken) {
      alert('Please log in with Spotify to save playlist to Spotify.');
      console.error('Access token is not available.');
      return;
    }

    if (!playlistName) {
      console.error('Playlist name cannot be empty.');
      return;
    }

    if (playlist.length === 0) {
      console.error('Playlist must contain at least one track.');
      return;
    }

    try {
      // Get the current user's Spotify ID
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const userData = await userResponse.json();
      const userId = userData.id;

      // Create a new playlist with the provided name
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          description: 'New playlist created via Jammming',
          public: false,
        }),
      });

      

      const playlistData = await createPlaylistResponse.json();
      const newPlaylistId = playlistData.id;

      // Add tracks to the newly created playlist
      const trackUris = playlist.map((track) => track.uri);

      await fetch(`https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      });
      

      alert('Playlist saved to Spotify successfully!');

    } catch (error) {
      console.error('Error saving playlist to Spotify:', error);
    }
  };

  return (
    <div className={style}>
      <form className={styles.playlist} onSubmit={savePlaylistToSpotify}>
        <input
          placeholder="name your playlist..."
          type="text"
          onChange={handleUserInput}
          value={playlistName}
        />
        <h3>{playlistName}</h3>
        <Tracklist tracks={playlist} onRemove={onRemove} />
        <button type="submit">Save to Spotify</button>
      </form>
    </div>
  );
}

export default Playlist;
