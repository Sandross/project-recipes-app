export const listDrinksRecipes = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const listCategoryRecipes = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data;
};

export const filterByCategory = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data;
};

export const filterDrinksByIngredient = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data;
};

export const idRecipesDrinks = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = drinks[0];
  const favoriteDrink = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  return { drinks, favoriteDrink };
};
