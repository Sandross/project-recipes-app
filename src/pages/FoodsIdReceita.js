import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { idRecipesFoods } from '../helpers/FoodsAPI';
import ShareRecipes from '../components/ShareRecipes';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import RecomendationDrinksCard from '../components/RecomendationDrinksCard';
import '../App.css';

function FoodsIdReceita() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    idRecipesFoods(id).then(({ meals }) => setRecipes(meals));
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
    <div className="container-id-recipes">
      {recipes?.map((item, index) => (
        <div key={ index } className="id-recipe-card">
          <div className="container-id-recipes-title" key={ item.idMeal }>
            <div className="idReceitas-img-title">
              <img
                data-testid="recipe-photo"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />

              <h3 data-testid="recipe-title">{item.strMeal}</h3>
            </div>
            <div className="container-id-recipe-share-like">
              <LinkFavoriteRecipes />
              <ShareRecipes testid="share-btn" />
            </div>
          </div>

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
      {/* <div className="start-recipe-btn"> */}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/foods/${id}/in-progress`) }
      >
        Start Recipe
      </button>
      {/* </div> */}
    </div>
  );
}

export default FoodsIdReceita;
