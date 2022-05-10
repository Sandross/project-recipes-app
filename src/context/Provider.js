import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';
import { getFavoriteRecipes } from '../storage/getStorage';

function Provider({ children }) {
  const [isFavorite, setIsFavorite] = useState();
  const [favoritesState, setFavoritesState] = useState([]);
  const [stateID, setStateID] = useState('');
  const [radioSelected, setRadioSelected] = useState([]);
  const [ingredientValue, setIngredientValue] = useState('');

  useEffect(() => {
    const favorites = getFavoriteRecipes();
    if (favorites) {
      setFavoritesState(favorites);
    }
  }, []);

  const value = {
    isFavorite,
    setIsFavorite,
    favoritesState,
    setFavoritesState,
    stateID,
    setStateID,
    radioSelected,
    setRadioSelected,
    ingredientValue,
    setIngredientValue,
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
