import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setStorageFavorite } from '../storage/setStorage';
import { idRecipesFoods } from '../helpers/FoodsAPI';
import { idRecipesDrinks } from '../helpers/DrinksAPI';
// import { getFavoriteRecipes } from '../storage/getStorage';

function LinkFavoriteRecipes({ testid, paramsID }) {
  const [testFoodAPI, setTestFoodAPI] = useState([]);
  const [testDrinkAPI, setTestDrinkAPI] = useState([]);
  const { setFavoritesState, favoritesState, isFavorite, setIsFavorite,
  } = useContext(MyContext);
  const { id } = useParams();
  const validID = id || paramsID;
  const { location } = useHistory();

  useEffect(() => {
    const validFood = location.pathname.includes('foods');
    if (validFood) {
      idRecipesFoods(validID)
        .then(({ favoriteFood }) => setTestFoodAPI(favoriteFood));
    } else {
      idRecipesDrinks(validID)
        .then(({ favoriteDrink }) => setTestDrinkAPI(favoriteDrink));
    }
  }, [location, validID]);

  useEffect(() => {
    const favorites = favoritesState;
    const favorite = favorites?.some(
      (recipe) => recipe.id === validID,
    );
    setIsFavorite(favorite);
  }, [favoritesState]);

  const favoritedRecipe = () => {
    setIsFavorite(!isFavorite);

    const getResponse = testDrinkAPI.id ? testDrinkAPI : testFoodAPI;

    if (getResponse) {
      const newFavorites = isFavorite
        ? favoritesState?.filter((favorite) => favorite.id !== validID)
        : [...favoritesState, getResponse];
      setFavoritesState(newFavorites);
      setStorageFavorite(newFavorites);
    } else {
      setFavoritesState([getResponse]);
      setStorageFavorite([favoritesState]);
    }
  };

  return (
    <div>
      <button
        data-testid={ testid.length > 0 ? testid : 'favorite-btn' }
        type="button"
        src={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        onClick={ () => {
          favoritedRecipe();
        } }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
    </div>
  );
}

LinkFavoriteRecipes.propTypes = {
  testid: PropTypes.string,
  paramsID: PropTypes.number,
};
LinkFavoriteRecipes.defaultProps = {
  testid: '',
  paramsID: '',
};

export default LinkFavoriteRecipes;
