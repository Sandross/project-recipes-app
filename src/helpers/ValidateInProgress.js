import { getInProgressRecipes } from '../storage/getStorage';

const ValidateInProgress = (type, id) => {
  const recipesInProgress = getInProgressRecipes();
  if (recipesInProgress && recipesInProgress[type]) {
    const typeRecipe = recipesInProgress[type];
    if (!Array.isArray(typeRecipe)) {
      const inProgress = Object.values(typeRecipe);
      return (inProgress);
    }
    const inProgress = typeRecipe
      .some((recipe) => Number(Object.keys(recipe)) === Number(id));
    return (inProgress);
  }
};

export default ValidateInProgress;
