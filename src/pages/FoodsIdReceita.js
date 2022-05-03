import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { idRecipes } from '../helpers/FoodsAPI';

function FoodsIdReceita() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    idRecipes(id).then(({ meals }) => setRecipes(meals));
  }, [id]);

  const handleIngredient = () => {
    const TWENTY = 20;
    const element = [];
    for (let i = 1; i <= TWENTY; i += 1) {
      if (recipes[0][`strIngredient${i}`] && recipes[0][`strMeasure${i}`]) {
        element.push(
          <li key={ i }>
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
          <button data-testid="share-btn" type="button">
            Share
          </button>
          <button data-testid="favorite-btn" type="button">
            Favorite
          </button>
          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul
            data-testid={`${index}-ingredient-name-and-measure`}>
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
          <p data-testid={`${index}-recomendation-card`}></p>
          <button data-testid="start-recipe-btn" type="button">
            Start Recipe
          </button>

        </div>
      ))}
    </div>
  );
}

export default FoodsIdReceita;
