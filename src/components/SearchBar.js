import React from "react";
import styles from "./CSS/SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.search}>
        <input placeholder="looking for a jam?" type="text" />
        <button type="submit">Go</button>
    </div>
  );
};


export default SearchBar;
