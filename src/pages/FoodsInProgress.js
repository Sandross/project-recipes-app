import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { idRecipesFoods } from '../helpers/FoodsAPI';
import ShareRecipes from '../components/ShareRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
import { recipesInProgress, setDoneRecipe } from '../storage/setStorage';
import { getInProgressRecipes } from '../storage/getStorage';
import '../App.css';

function FoodsInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    idRecipesFoods(id).then(({ meals }) => setRecipes(meals));
  }, [id]);

  const handleIngredientsUsed = (e) => {
    const getValue = e.target.value;
    if (ingredientsUsed) {
      if (!ingredientsUsed.some(
        (ingredient) => ingredient === getValue,
      )) {
        setIngredientsUsed([...ingredientsUsed, getValue]);
      } else {
        setIngredientsUsed(ingredientsUsed.filter(
          (ingredient) => ingredient !== getValue,
        ));
      }
    }
  };

  useEffect(() => {
    if (ingredientsUsed.length !== 0) {
      recipesInProgress(id, ingredientsUsed, 'meals');
    }
  }, [ingredientsUsed, id]);

  useEffect(() => {
    const getRecipesInProgress = getInProgressRecipes();
    if (getRecipesInProgress && getRecipesInProgress.meals) {
      const { meals } = getRecipesInProgress;
      const recipesArray = Object.values(meals);
      setIngredientsUsed(...recipesArray);
    }
  }, []);

  useEffect(() => {
    const ingredientsChecks = document.getElementsByClassName('check');
    const listChecks = [...ingredientsChecks];
    if (ingredientsChecks.length !== 0) {
      const areCheckeds = listChecks.every((ing) => ing.checked);
      setIsDisabled(!areCheckeds);
    }
  }, [ingredientsUsed]);

  const handleIngredient = () => {
    const TWENTY = 20;
    const element = [];
    for (let i = 1; i <= TWENTY; i += 1) {
      const ingredient = recipes[0][`strIngredient${i}`];
      const mesure = recipes[0][`strMeasure${i}`];
      const ingredientAndMesure = `${ingredient} - ${mesure}`;
      if (ingredient && mesure) {
        element.push(
          <label
            htmlFor={ `checkRecipe${i - 1}` }
            key={ i }
            data-testid={ `${i - 1}-ingredient-step` }
          >
            <input
              id={ `checkRecipe${i - 1}` }
              type="checkbox"
              className="check"
              onChange={ handleIngredientsUsed }
              checked={
                ingredientsUsed.some((ing) => ing === ingredientAndMesure)
              }
              value={ ingredientAndMesure }
            />
            { ingredientAndMesure}
          </label>,
        );
      }
    }
    return element;
  };

  const handleDoneRecipe = async () => {
    const getRecipeAPI = await idRecipesFoods(id);
    const { meals } = getRecipeAPI;
    const { strArea, strCategory, strMeal, strMealThumb, strTags } = meals[0];

    const recipeDone = {
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: `${new Date().toLocaleDateString()}`,
      tags: strTags ? (strTags).split(',') : [],
    };
    setDoneRecipe(recipeDone);
    history.push('/done-recipes');
  };

  return (
    <div>
      {recipes?.map((item) => (
        <div key={ item.idMeal }>
          <img
            width="160"
            height="120"
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt={ item.strMeal }
          />

          <h3 data-testid="recipe-title">{item.strMeal}</h3>

          <FavoriteRecipes />
          <ShareRecipes testid="share-btn" />

          <p data-testid="recipe-category">{item.strCategory}</p>
          <div className="container-check-ingredients">
            {handleIngredient().map((list) => list)}
          </div>
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}
      <button
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleDoneRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default FoodsInProgress;
