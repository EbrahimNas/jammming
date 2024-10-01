import React from 'react';
import Tracklist from './Tracklist';

function SearchResults({style, searchResults = [], onAdd}) {


  return (
    <div className={style}>
      <h2>Search Results</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd}/>
    </div>
  );
}

export default SearchResults;
