import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { idRecipes } from '../helpers/FoodsAPI';
import ShareRecipes from '../components/ShareRecipes';
import FavoriteRecipes from '../components/FavoriteRecipes';
import RecomendationDrinksCard from '../components/RecomendationDrinksCard';
import '../App.css';

function FoodsIdReceita() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    idRecipes(id).then(({ meals }) => setRecipes(meals));
  }, [id]);

  const handleIngredient = () => {
    const TWENTY = 20;
    const element = [];
    for (let i = 1; i <= TWENTY; i += 1) {
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

  function replaceAll(str, find, replace) {
    const escapedFind = find.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  return (
    <div>
      {recipes?.map((item, index) => (
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
          <ul>
            {handleIngredient().map((list) => list)}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
          <iframe
            data-testid="video"
            width="320"
            height="240"
            src={ replaceAll(item.strYoutube, '/watch?v=', '/embed/') }
            frameBorder="0"
            allowFullScreen
            title={ item.strMeal }
          />
          <RecomendationDrinksCard index={ index } />
        </div>
      ))}
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/foods/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default FoodsIdReceita;
