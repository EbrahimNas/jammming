import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  return (
    <div>
      <h1>🎧 Ja<span>mmm</span>ing 🎧</h1>
      <h2>Welcome to Jammming!</h2>
      {/* Add your components here */}
      <SearchBar />
      <SearchResults />
      <Playlist />
    </div>
  );
}

export default App;