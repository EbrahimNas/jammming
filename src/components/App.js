import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import styles from "./CSS/App.module.css";
import { redirectToSpotifyAuthorize, getAccessToken, getAuthCode, exchangeCodeForToken } from './GetToken.js';

function App() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]); 
  const [accessToken, setAccessToken] = useState('');
  const [username, setUsername] = useState('');

  // Function to handle search input change
  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }

  // Function to handle search form submission
  const handleSearch = async (event) => {
    event.preventDefault();

    // Use the access token from the state
    if (accessToken) {
      if (searchTerm) {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=album,artist,track`;

        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          const fetchedData = await response.json();

          const tracks = fetchedData.tracks ? fetchedData.tracks.items : [];
          setSearchResults(tracks); // Set search results directly from the tracks array

        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    } else {
      console.error('Access token is not available.');
    }
  };

  // Fetch user profile information
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setUsername(data.display_name); // Set the username
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  fetchUserProfile()

  // Check for authorization code when the component mounts
  useEffect(() => {
    const authCode = getAuthCode(); // Get the authorization code from the URL

    if (authCode) {
      // If an auth code exists, exchange it for an access token
      exchangeCodeForToken(authCode)
        .then((data) => {
          if (data && data.access_token) {
            setAccessToken(data.access_token); // Save the access token in state
            /*alert(`Access Token: ${data.access_token}`); // Alert the access token*/
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        });
    } 
  }, []); // Runs only once on mount


  // Add a track to the playlist
  const addTrackToPlaylist = (track) => {
    setPlaylist((prevTracks) => {
      // Check if the track is already in the playlist
      if (prevTracks.find((t) => t.id === track.id)) {
        return prevTracks;
      }
      return [...prevTracks, track];
    });
  };

  // Remove a track from the playlist
  const removeTrackFromPlaylist = (track) => {
    setPlaylist((prevTracks) => prevTracks.filter((t) => t.id !== track.id));
  };
  

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Ja<span>mmm</span>ing 🎧</h1>
          {username ? (
            <button>Hello, {username}</button> // Show username if logged in
          ) : (
            <button type="submit" onClick={redirectToSpotifyAuthorize}>
              Login with Spotify
            </button> // Show login button if not logged in
          )}
        </div>
      </div>
      
      <SearchBar value={searchTerm} onChange={handleSearchInputChange} onSubmit={handleSearch} />

      <div className={styles.mainBody}>
        <SearchResults 
          style={styles.searchResults} 
          searchResults={searchResults}
          onAdd={addTrackToPlaylist} // Pass addTrackToPlaylist function
        />

        <Playlist 
          style={styles.playlist} 
          playlist={playlist}
          onRemove={removeTrackFromPlaylist}
          accessToken={accessToken} // Pass removeTrackFromPlaylist function
        />
      </div>
    </div>
  );
}

export default App;
