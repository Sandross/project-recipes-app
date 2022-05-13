import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { idRecipesDrinks } from '../helpers/DrinksAPI';
import { getStorageDoneRecipes } from '../storage/getStorage';
import ShareRecipes from '../components/ShareRecipes';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import RecomendationFoodsCard from '../components/RecomendationFoodsCard';
import ValidateInProgress from '../helpers/ValidateInProgress';
import Logo from '../images/Logo/Logo.png';
import LogoTexto from '../images/Logo/LogoTexto.png';
import '../App.css';

function DrinksIdReceita() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    idRecipesDrinks(id).then(({ drinks }) => setRecipes(drinks));
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
    setIsInProgress(ValidateInProgress('cocktails', id));
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
            <div key={ item.idDrink } className="id-recipe-card">
              <div className="container-id-recipes-title" key={ item.idDrink }>
                <img
                  data-testid="recipe-photo"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
                <h3 data-testid="recipe-title">{item.strDrink}</h3>
                <div className="container-id-recipe-share-like">
                  <LinkFavoriteRecipes />
                  <ShareRecipes testid="share-btn" />
                </div>
              </div>

              <p data-testid="recipe-category">{item.strAlcoholic}</p>
              <div className="container-id-recipe-ingredients">
                <ul>
                  {handleIngredient().map((list) => list)}
                </ul>
              </div>
              <div className="container-id-recipe-instructions">
                <p data-testid="instructions">{item.strInstructions}</p>
              </div>
              <RecomendationFoodsCard index={ index } />
            </div>
          ))}
          <div className="container-id-recipes-btn">
            {!isDone && (
              <button
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
                type="button"
                onClick={ () => history.push(`/drinks/${id}/in-progress`) }
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

export default DrinksIdReceita;
