import React from 'react';
import Tracklist from './Tracklist';

function SearchResults() {
  const searchResults = [
    { id: 1, name: 'Song A', artist: 'Artist A' },
    { id: 2, name: 'Song B', artist: 'Artist B' }
  ];

  return (
    <div>
      <h2>Search Results</h2>
      <Tracklist tracks={searchResults} />
    </div>
  );
}

export default SearchResults;
