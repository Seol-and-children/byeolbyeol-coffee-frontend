import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="  검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link to={`/search/${searchQuery}`}>
        <img src="/images/search.png" alt="search icon" className="search-icon"/>
      </Link>
    </div>
  );
};

export default SearchBar;