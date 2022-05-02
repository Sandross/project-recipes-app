import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarHeader from './SearchBarHeader';
import './Header.css';

function Header({ title, toHaveSearch }) {
  const history = useHistory();
  const [isSearchEnabled, setSearchEnabled] = useState(false);

  return (
    <div className="headerContainer">
      <button
        data-testid="profile-top-btn"
        type="button"
        src={ profileIcon }
        onClick={ () => {
          history.push('/profile');
        } }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </button>

      <h2 data-testid="page-title">{title}</h2>

      { toHaveSearch
      && (
        <button
          data-testid="search-top-btn"
          type="button"
          src={ searchIcon }
          onClick={ () => {
            setSearchEnabled(!isSearchEnabled);
          } }
        >
          <img src={ searchIcon } alt="profileIcon" />
        </button>
      )}
      { isSearchEnabled
        && (<input type="text" data-testid="search-input" />)}
      <SearchBarHeader />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toHaveSearch: PropTypes.bool.isRequired,
};

export default Header;
