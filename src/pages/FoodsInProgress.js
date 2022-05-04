import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { idRecipesFoods } from '../helpers/FoodsAPI';
import ShareRecipes from '../components/ShareRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
import { recipesInProgress } from '../storage/setStorage';
import { getInProgressRecipes } from '../storage/getStorage';
// import RecomendationDrinksCard from '../components/RecomendationDrinksCard';
import '../App.css';

function FoodsInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  // const history = useHistory();

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
    recipesInProgress(id, ingredientsUsed, 'meals');
  };

  useEffect(() => {
    const getRecipesInProgress = getInProgressRecipes();
    if (getRecipesInProgress) {
      setIngredientsUsed(getRecipesInProgress);
    }
  }, []);

  const handleIngredient = () => {
    const TWENTY = 20;
    const element = [];
    for (let i = 1; i <= TWENTY; i += 1) {
      if (recipes[0][`strIngredient${i}`] && recipes[0][`strMeasure${i}`]) {
        element.push(
          <label
            htmlFor="checkRecipe"
            key={ i }
            data-testid={ `${i - 1}-ingredient-step` }
          >
            <input
              id="checkRecipe"
              type="checkbox"
              onChange={ handleIngredientsUsed }
              value={
                `${recipes[0][`strIngredient${i}`]} - ${recipes[0][`strMeasure${i}`]}`
              }
            />
            {
              `${recipes[0][`strIngredient${i}`]} - ${recipes[0][`strMeasure${i}`]}`
            }
          </label>,
        );
      }
    }
    return element;
  };

  // function replaceAll(str, find, replace) {
  //   const escapedFind = find.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  //   return str.replace(new RegExp(escapedFind, 'g'), replace);
  // }

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
          <ShareRecipes />

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
        // onClick={ () => history.push(`/foods/${id}/in-progress`) }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default FoodsInProgress;
