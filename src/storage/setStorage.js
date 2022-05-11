import { getStorageDoneRecipes, getInProgressRecipes } from './getStorage';

export const setSaveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const mealsToken = () => {
  localStorage.setItem('mealsToken', JSON.stringify(1));
};

export const cocktailsToken = () => {
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
};

export const setStorageFavorite = async (item) => {
  await localStorage.setItem('favoriteRecipes', JSON.stringify(item));
};

export const recipesInProgress = (id, ingredientsUsed, type) => {
  const getRecipesStorage = getInProgressRecipes();
  if (getRecipesStorage) {
    if (getRecipesStorage[type]) {
      const test = getRecipesStorage[type].filter((e) => (
        Number(Object.keys(e)) !== Number(id)));
      const object = {
        ...getRecipesStorage,
        [type]: [...test, { [id]: ingredientsUsed }],
      };
      console.log('primeiro if');
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    } else {
      const object = {
        ...getRecipesStorage,
        [type]: [{ [id]: ingredientsUsed }],
      };
      console.log('primeiro else');
      console.log(Object.keys(getRecipesStorage));
      console.log(Object.values(getRecipesStorage));

      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
  } else {
    console.log('segundo else');
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ [type]: [{ [id]: ingredientsUsed }] }));
  }
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
