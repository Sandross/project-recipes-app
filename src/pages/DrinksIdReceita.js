import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { idRecipesDrinks } from '../helpers/DrinksAPI';
import ShareRecipes from '../components/ShareRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
import RecomendationFoodsCard from '../components/RecomendationFoodsCard';
import '../App.css';

function DrinksIdReceita() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    idRecipesDrinks(id).then(({ drinks }) => setRecipes(drinks));
  }, [id]);

  const handleIngredient = () => {
    const FIFTEEN = 15;
    const element = [];
    for (let i = 1; i <= FIFTEEN; i += 1) {
      if (recipes[0][`strIngredient${i}`] && recipes[0][`strMeasure${i}`]) {
        element.push(
          <li data-testid={ `${i - 1}-ingredient-name-and-measure` } key={ i }>
            { `${recipes[0][`strIngredient${i}`]} - ${recipes[0][`strMeasure${i}`]}` }
          </li>,
        );
      }
    }
    return element;
  };

  return (
    <div>
      {recipes?.map((item, index) => (
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
          <ul>
            {handleIngredient().map((list) => list)}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          <RecomendationFoodsCard index={ index } />
        </div>
      ))}
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/drinks/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default DrinksIdReceita;
