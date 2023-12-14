import React, { useState } from 'react';
import '../css/styles.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    // 페이지 이동과 함께 새로고침
    if (searchQuery.trim() !== '') {
      window.location.href = `/search/${searchQuery}`;
    } else {
      alert('검색어를 입력하세요.');
    }
  };


  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="  검색"
        value={null}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* onClick 이벤트 핸들러를 통해 페이지 이동과 함께 새로고침 */}
      <div >
        <img src="/images/search.png" alt="search icon" className="search-icon" onClick={handleSearch}/>
      </div>
    </div>
  );
};

export default SearchBar;