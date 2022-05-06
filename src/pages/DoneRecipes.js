import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getStorageDoneRecipes } from '../storage/getStorage';
import ShareRecipes from '../components/ShareRecipes';

function DoneRecipes() {
  const [getDoneRecipes, setDoneRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const doneRecipes = getStorageDoneRecipes();
    if (doneRecipes) {
      setDoneRecipes(doneRecipes);
    }
  }, []);

  const clickFilter = (item) => {
    if (item === 'food') {
      setDoneRecipes(getDoneRecipes.filter((recipe) => recipe.type === 'food'));
    } else if (item === 'drink') {
      setDoneRecipes(getDoneRecipes.filter((recipe) => recipe.type === 'drink'));
    } else if (item === 'all') {
      setDoneRecipes(getStorageDoneRecipes());
    }
  };

  return (
    <div>
      <Header title="Done Recipes" toHaveSearch={ false } />

      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => { clickFilter('all'); } }
      >
        All
      </button>

      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => { clickFilter('food'); } }
      >
        Food
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => { clickFilter('drink'); } }
      >
        Drinks
      </button>

      <div>
        {getDoneRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <div
              role="button"
              tabIndex={ 0 }
              onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
              onKeyPress={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.image }
                width="80"
              />

            </div>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'drink'
                ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}

            </p>
            <div
              role="button"
              tabIndex={ 0 }
              onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
              onKeyPress={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
            >
              <h1
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h1>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <p>{recipe.alcoholicOrNot}</p>
            <ul>
              {recipe.tags.length > 0
              && recipe.tags.map((tag, i) => (
                <li
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ i }
                >
                  {tag}
                </li>
              ))}
            </ul>
            <ShareRecipes
              share={ `/${recipe.type}s/${recipe.id}` }
              testid={ `${index}-horizontal-share-btn` }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
