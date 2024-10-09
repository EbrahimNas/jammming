import React, { useState } from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import styles from "./CSS/App.module.css";

function App() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const accessToken = 'BQAR3_2gZSRCa6eP9mCCU4vQzXBktb_vjoYJ5k3AB2Z1l2Xc6gAoSRqpeiAvWMMoofxmlqR7CESgX0l7zgAAt9ozhxfpjq5YT854Q7tbJTUnHFeceYg';

  // function to handle search input change
  function handleSearchInputChange(e) {
    setSearchTerm(e.target.value);
  }

  // function to handle search form submission
  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchTerm) {
      // Build the Spotify search URL using the input
      const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=album,artist,track`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const fetchedData = await response.json(); // Fetch data and store in a variable

        // Adjust this based on how you want to extract tracks
        const tracks = fetchedData.tracks ? fetchedData.tracks.items : [];
        setSearchResults(tracks); // Set search results directly from the tracks array

      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  // Simulate API results
  /*useEffect(() => {
    const searchResultsFromApi = [
        { id: 1, name: 'No Lele', artist: 'Wizkid', album: 'Super-Star' },
        { id: 2, name: 'Mentally', artist: 'Asake', album: 'Lungu Boy' }
    ];

    setSearchResults(searchResultsFromApi);
  }, []);*/

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

      <div className={styles.nameContainer}>
        <h1>🎧 Ja<span>mmm</span>ing 🎧</h1>
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
        onRemove={removeTrackFromPlaylist} // Pass removeTrackFromPlaylist function
        />
      </div>

    </div>
  );
}

export default App; 