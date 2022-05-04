import { getFavoriteRecipes } from './getStorage';

export const setSaveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const mealsToken = () => {
  localStorage.setItem('mealsToken', JSON.stringify(1));
};

export const cocktailsToken = () => {
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
};

export const favoritedRecipe = (id, isFavorite) => {
  const favorites = getFavoriteRecipes();
  if (favorites) {
    const newFavorites = isFavorite
      ? [...favorites, id]
      : favorites.filter((favorite) => favorite !== id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  } else {
    localStorage.setItem('favorites', JSON.stringify([id]));
  }
};
