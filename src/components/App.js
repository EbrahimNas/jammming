import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import styles from "./CSS/App.module.css";

function App() {
  
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);


// results from the API
useEffect(() => {
    const searchResultsFromApi = [
        { id: 1, name: 'No Lele', artist: 'Wizkid', album: 'Super-Star' },
        { id: 2, name: 'Mentally', artist: 'Asake', album: 'Lungu Boy' }
    ];

    setSearchResults(searchResultsFromApi);
  }, []);

// Function to handle adding a track to the playlist
  const addTrackToPlaylist = (track) => {
    setPlaylist((prevTracks) => {
        
      // Check if the track is already in the playlist
      if (prevTracks.find((t) => t.id === track.id)) {
        return prevTracks;
      }
      return [...prevTracks, track];
    });
  };

  return (
    <div className={styles.app}>

      <div className={styles.nameContainer}>
        <h1>🎧 Ja<span>mmm</span>ing 🎧</h1>
      </div>
      
      <SearchBar />

      <div className={styles.mainBody}>
        <SearchResults 
          style={styles.searchResults} 
          searchResults={searchResults}
          onAdd={addTrackToPlaylist}
          />

        <Playlist style={styles.playlist} playlist={playlist}/>
      </div>

    </div>
  );
}

export default App;