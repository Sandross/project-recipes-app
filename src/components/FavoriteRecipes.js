import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoritedRecipe } from '../storage/setStorage';
import { getFavoriteRecipes } from '../storage/getStorage';

function FavoriteRecipes() {
  const [isFavorite, setIsFavorite] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      const test = favorites.find((favorite) => favorite === id);
      if (test) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [id]);

  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
        src={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        // src={ isFavorite ? whiteHeartIcon : blackHeartIcon }
        onClick={ () => {
          setIsFavorite(!isFavorite);
          favoritedRecipe(id, !isFavorite);
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
