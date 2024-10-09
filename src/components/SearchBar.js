import React from 'react';
import styles from './CSS/SearchBar.module.css';

function SearchBar({value, onChange, onSubmit}) {
  
  return (

    <div className={styles.searchContainer}>
      <form className={styles.search} onSubmit={onSubmit}>
        <input 
          placeholder="looking for a jam?" 
          type="text" 
          value={value}
          onChange={onChange} 
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default SearchBar;
