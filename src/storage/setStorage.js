import { getStorageDoneRecipes } from './getStorage';

export const setSaveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const mealsToken = () => {
  localStorage.setItem('mealsToken', JSON.stringify(1));
};

export const cocktailsToken = () => {
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
};

export const setStorageFavorite = (item) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(item));
};

export const recipesInProgress = (id, ingredientsUsed, type) => {
  const object = {
    [type]: {
      [id]: ingredientsUsed,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(object));
};

export const setDoneRecipe = (recipe) => {
  const doneRecipes = getStorageDoneRecipes();
  if (doneRecipes) {
    if (!doneRecipes.some((recipeDone) => recipeDone.id === recipe.id)) {
      const newDoneRecipes = [...doneRecipes, recipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
  }
};
