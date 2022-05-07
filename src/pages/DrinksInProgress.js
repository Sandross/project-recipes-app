import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { idRecipesDrinks } from '../helpers/DrinksAPI';
import ShareRecipes from '../components/ShareRecipes';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import { recipesInProgress, setDoneRecipe } from '../storage/setStorage';
import { getInProgressRecipes } from '../storage/getStorage';
import '../App.css';

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
      const recipesArray = Object.values(cocktails);
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
    const FIFTEEN = 15;
    const element = [];
    for (let i = 1; i <= FIFTEEN; i += 1) {
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

          <LinkFavoriteRecipes />
          <ShareRecipes testid="share-btn" />

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
        disabled={ isDisabled }
        onClick={ handleDoneRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default DrinksInProgress;
