import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { idRecipesDrinks } from '../helpers/DrinksAPI';
import ShareRecipes from '../components/ShareRecipes';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import { recipesInProgress, setDoneRecipe } from '../storage/setStorage';
import { getInProgressRecipes } from '../storage/getStorage';
import Logo from '../images/Logo/Logo.png';
import LogoTexto from '../images/Logo/LogoTexto.png';
import './CSS/IDRecipes.css';

function DrinksInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    idRecipesDrinks(id).then(({ drinks }) => setRecipes(drinks));
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
      recipesInProgress(id, ingredientsUsed, 'cocktails');
    }
  }, [ingredientsUsed, id]);

  useEffect(() => {
    const getRecipesInProgress = getInProgressRecipes();
    if (getRecipesInProgress && getRecipesInProgress.cocktails) {
      const { cocktails } = getRecipesInProgress;
      const ingredientsArray = cocktails
        .find((recipe) => Number(Object.keys(recipe)) === Number(id));
      if (ingredientsArray) {
        setIngredientsUsed(...Object.values(ingredientsArray));
      }
    }
  }, [id]);

  useEffect(() => {
    const ingredientsChecks = document.getElementsByClassName('Check_Ingredient');
    const listChecks = [...ingredientsChecks];
    if (ingredientsChecks.length !== 0) {
      const areCheckeds = listChecks.every((ing) => ing.checked);
      setIsDisabled(!areCheckeds);
    }
  }, [ingredientsUsed]);

  const handleIngredient = () => {
    const FIFTEEN = 15;
    const element = [];
    for (let i = 1; i <= FIFTEEN; i += 1) {
      const ingredient = recipes[0][`strIngredient${i}`];
      const mesure = recipes[0][`strMeasure${i}`];
      const ingredientAndMesure = `${ingredient} - ${mesure}`;
      if (ingredient && mesure) {
        element.push(
          <label
            className="container"
            htmlFor={ `checkRecipe${i - 1}` }
            key={ i }
            data-testid={ `${i - 1}-ingredient-step` }
          >
            <input
              id={ `checkRecipe${i - 1}` }
              type="checkbox"
              className="Check_Ingredient"
              onChange={ handleIngredientsUsed }
              checked={
                ingredientsUsed?.some((ing) => ing === ingredientAndMesure)
              }
              value={ ingredientAndMesure }
            />
            <span className="checkmark" />
            { ingredientAndMesure}
          </label>,
        );
      }
    }
    return element;
  };

  const handleDoneRecipe = async () => {
    const getRecipeAPI = await idRecipesDrinks(id);
    const { drinks } = getRecipeAPI;
    const { strAlcoholic, strDrink, strDrinkThumb, strTags } = drinks[0];

    const recipeDone = {
      id,
      type: 'drink',
      nationality: '',
      category: '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: `${new Date().toLocaleDateString()}`,
      tags: strTags ? (strTags).split(',') : [],
    };
    setDoneRecipe(recipeDone);
    history.push('/done-recipes');
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
          {recipes?.map((item) => (
            <div key={ item.idDrink } className="id-recipe-card">
              <div className="container-id-recipes-title" key={ item.idMeal }>
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
              <div className="container-id-recipe-ingredients-check">
                {handleIngredient().map((list) => list)}
              </div>
              <div className="container-id-recipe-instructions">
                <p data-testid="instructions">{item.strInstructions}</p>
              </div>
            </div>
          ))}
          <div
            disabled={ isDisabled }
            className="container-id-recipes-btn-in-progress"
          >
            <button
              data-testid="finish-recipe-btn"
              className="finish-recipe-btn-in-progress"
              type="button"
              disabled={ isDisabled }
              onClick={ handleDoneRecipe }
            >
              Finish Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinksInProgress;
