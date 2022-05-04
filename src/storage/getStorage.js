export const getSaveEmail = () => JSON.parse(localStorage.getItem('user'));

export const getFavoriteRecipes = () => JSON.parse(
  localStorage.getItem('favoriteRecipes'),
);

export const getInProgressRecipes = () => JSON.parse(
  localStorage.getItem('inProgressRecipes'),
);
