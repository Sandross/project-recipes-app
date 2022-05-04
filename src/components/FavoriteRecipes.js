import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoritedRecipe } from '../storage/setStorage';
import { getFavoriteRecipes } from '../storage/getStorage';

function FavoriteRecipes() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFood, setIsFood] = useState(false);
  const { id } = useParams();
  const { location } = useHistory();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites?.some((favorite) => favorite.id === id)) {
      const test = favorites.find((favorite) => favorite.id === id);
      if (test) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const validFood = location.pathname.includes('foods');
    setIsFood(validFood);
  },
  [location.pathname]);

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        src={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        // src={ isFavorite ? whiteHeartIcon : blackHeartIcon }
        onClick={ () => {
          setIsFavorite(!isFavorite);
          favoritedRecipe(id, !isFavorite, isFood);
          getFavoriteRecipes();
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

export default FavoriteRecipes;
