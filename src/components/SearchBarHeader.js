import React from 'react';

function SearchBarHeader() {
  return (
    <div className="searchBar-headerContainer">
      <div className="input-searchBar">
        <label htmlFor="ingredient">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            id="ingredient"
            type="radio"
          />
        </label>

        <label htmlFor="Name">
          Name
          <input
            data-testid="name-search-radio"
            id="Name"
            type="radio"
          />
        </label>

        <label htmlFor="first-letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            id="first-letter"
            type="radio"
          />
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
        >
          Search

        </button>
      </div>

    </div>
  );
}

export default SearchBarHeader;
