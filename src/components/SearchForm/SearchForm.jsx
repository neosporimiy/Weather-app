import { useState, useEffect, useRef } from 'react';
import './SearchForm.css';

function SearchForm({ city, setCity, handleSearchClick, suggestions, handleSuggestionClick, handleLocationClick }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const handleInputChange = (inputValue) => {
    setCity(inputValue);

    if (inputValue.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          value={city}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter city"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul ref={suggestionsRef} className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="search-button" onClick={handleSearchClick}>
        <img className="search-icon" src="/images/search_icon.png" alt="Search" />
      </button>
      <button className="search-button" onClick={handleLocationClick}>
        <img className="search-icon" src="/images/location_icon.png" alt="Search" />
      </button>
    </div>
  );
}

export default SearchForm;
