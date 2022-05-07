import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';
import { getFavoriteRecipes } from '../storage/getStorage';

function Provider({ children }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesState, setFavoritesState] = useState([]);

  useEffect(() => {
    const favorites = getFavoriteRecipes();
    if (favorites) {
      setFavoritesState(favorites);
    }
  }, []);

  // console.log('provider', favoritesState);

  const value = {
    isFavorite,
    setIsFavorite,
    favoritesState,
    setFavoritesState,
  };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
