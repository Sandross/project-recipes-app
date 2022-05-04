import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { idRecipesDrinks } from '../helpers/DrinksAPI';
import ShareRecipes from '../components/ShareRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
import { recipesInProgress } from '../storage/setStorage';
// import RecomendationFoodsCard from '../components/RecomendationFoodsCard';
import '../App.css';

function DrinksInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    idRecipesDrinks(id).then(({ drinks }) => setRecipes(drinks));
  }, [id]);

  const handleIngredientsUsed = (e) => {
    const getValue = e.target.value;

    if (!ingredientsUsed.some(
      (ingredient) => ingredient === getValue,
    )) {
      setIngredientsUsed([...ingredientsUsed, getValue]);
    } else {
      setIngredientsUsed(ingredientsUsed.filter(
        (ingredient) => ingredient !== getValue,
      ));
    }
  };

  useEffect(() => {
    recipesInProgress(id, ingredientsUsed, 'cocktails');
  }, [ingredientsUsed, id]);

  const handleIngredient = () => {
    const FIFTEEN = 15;
    const element = [];
    for (let i = 1; i <= FIFTEEN; i += 1) {
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

  return (
    <div>
      {recipes?.map((item) => (
        <div key={ item.idDrink }>
          <img
            width="160"
            height="120"
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
          />

          <h3 data-testid="recipe-title">{item.strDrink}</h3>

          <FavoriteRecipes />
          <ShareRecipes />

          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <div>
            {handleIngredient().map((list) => list)}
          </div>
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}
      <button
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        type="button"
        // onClick={ () => history.push(`/drinks/${id}/in-progress`) }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default DrinksInProgress;
