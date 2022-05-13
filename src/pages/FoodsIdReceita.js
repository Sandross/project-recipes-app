import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { idRecipesFoods } from '../helpers/FoodsAPI';
import { getStorageDoneRecipes } from '../storage/getStorage';
import ShareRecipes from '../components/ShareRecipes';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import RecomendationDrinksCard from '../components/RecomendationDrinksCard';
import ValidateInProgress from '../helpers/ValidateInProgress';
import Logo from '../images/Logo/Logo.png';
import LogoTexto from '../images/Logo/LogoTexto.png';
import './CSS/IDRecipes.css';

function FoodsIdReceita() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    idRecipesFoods(id).then(({ meals }) => setRecipes(meals));
  }, [id]);

  useEffect(() => {
    const getDone = getStorageDoneRecipes();
    if (getDone) {
      const done = getDone.some((recipe) => recipe.id === id);
      setIsDone(done);
    } else {
      setIsDone(false);
    }
  }, [id]);

  useEffect(() => {
    setIsInProgress(ValidateInProgress('meals', id));
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
    <div className="container-id-recipes-geral">
      <div className="second-id-recipes">
        <img
          className="Logo_photo_id_recipes"
          src={ Logo }
          alt="Logo"
        />
        <img
          className="Logo_texto_id_recipes"
          src={ LogoTexto }
          alt="Logo Texto"
        />

        <div className="container-id-recipes">
          {recipes?.map((item, index) => (
            <div key={ index } className="id-recipe-card">
              <div className="container-id-recipes-title" key={ item.idMeal }>
                <img
                  data-testid="recipe-photo"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <h3 data-testid="recipe-title">{item.strMeal}</h3>
                <div className="container-id-recipe-share-like">
                  <LinkFavoriteRecipes />
                  <ShareRecipes testid="share-btn" />
                </div>
              </div>

              <p data-testid="recipe-category">{item.strCategory}</p>
              <div className="container-id-recipe-ingredients">
                <ul>
                  {handleIngredient().map((list) => list)}
                </ul>
              </div>
              <div className="container-id-recipe-instructions">
                <p data-testid="instructions">{item.strInstructions}</p>
              </div>
              <iframe
                data-testid="video"
                src={ replaceAll(item.strYoutube, '/watch?v=', '/embed/') }
                allowFullScreen
                title={ item.strMeal }
              />
              <RecomendationDrinksCard index={ index } />
            </div>
          ))}
          <div className="container-id-recipes-btn">
            {!isDone && (
              <button
                className="start-recipe-btn"
                data-testid="start-recipe-btn"
                type="button"
                onClick={ () => history.push(`/foods/${id}/in-progress`) }
              >
                {isInProgress
                  ? 'Continue Recipe'
                  : 'Start Recipe'}
              </button>
            )}
            {isDone && (

              <button
                className="recipe-done-btn"
                type="button"
                onClick={ () => history.push('/done-recipes') }
              >
                <span> Finished Recipe</span>
                <br />
                GO Done recipes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodsIdReceita;
