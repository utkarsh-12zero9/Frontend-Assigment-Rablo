import React from 'react';
import './SearchBar.css';

const SearchBar = ({ 
  searchId, 
  onSearchChange, 
  onSearch, 
  onClear, 
  searchError 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-header">
        <h2 className="search-title">Search Employee</h2>
        <p className="search-description">
          Enter an employee ID to find specific employee details
        </p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Enter employee ID (e.g., 1, 2, 3...)"
          value={searchId}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="search-button" 
          onClick={onSearch}
          disabled={!searchId.trim()}
        >
          Search
        </button>
        {searchId && (
          <button className="clear-button" onClick={onClear}>
            Clear
          </button>
        )}
      </div>

      {searchError && (
        <div className="search-error">
          {searchError}
        </div>
      )}
    </div>
  );
};

export default SearchBar;