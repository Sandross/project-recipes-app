import { getFavoriteRecipes, getStorageDoneRecipes } from './getStorage';
import { idRecipesFoods } from '../helpers/FoodsAPI';
import { idRecipesDrinks } from '../helpers/DrinksAPI';

export const setSaveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const mealsToken = () => {
  localStorage.setItem('mealsToken', JSON.stringify(1));
};

export const cocktailsToken = () => {
  localStorage.setItem('cocktailsToken', JSON.stringify(1));
};

export const setStorageFavoritesFoods = (id) => {
  const listRecipeForIdFoods = idRecipesFoods(id);
  return listRecipeForIdFoods.then((dataFood) => {
    const { meals } = dataFood;
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = meals[0];
    const favorite = {
      id: idMeal,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    return favorite;
  });
};

export const setStorageFavoritesDrinks = (id) => {
  const listRecipeForIdDrinks = idRecipesDrinks(id);
  return listRecipeForIdDrinks.then((dataDrink) => {
    const { drinks } = dataDrink;
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = drinks[0];
    const favorite = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    return favorite;
  });
};

export const favoritedRecipe = async (id, isFavorite, isFood) => {
  const storageFavorite = isFood
    ? await setStorageFavoritesFoods(id) : await setStorageFavoritesDrinks(id);

  const favorites = getFavoriteRecipes();
  if (favorites) {
    const newFavorites = isFavorite
      ? [...favorites, storageFavorite]
      : favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [storageFavorite],
    ));
  }
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
