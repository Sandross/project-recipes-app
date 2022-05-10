import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarFoods from './SearchBarFoods';
import SearchBarDrinks from './SearchBarDrinks';
import './Header.css';

function Header({ title, toHaveSearch }) {
  const history = useHistory();
  const [isSearchEnabled, setSearchEnabled] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [getFoodsOurDrink, setFoodsOurDrink] = useState('');

  useEffect(() => {
    const getPathname = history.location.pathname.split('/', 2)[1];
    setFoodsOurDrink(getPathname);
  }, [history]);

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <header className="headerContainer">
      <div className="header-title">
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
          && (
            <input
              type="text"
              data-testid="search-input"
              onChange={ handleChangeSearch }
            />)}
      </div>
      {toHaveSearch && (getFoodsOurDrink === 'foods'
        ? <SearchBarFoods searchValue={ searchValue } />
        : <SearchBarDrinks searchValue={ searchValue } />)}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toHaveSearch: PropTypes.bool.isRequired,
};

export default Header;
