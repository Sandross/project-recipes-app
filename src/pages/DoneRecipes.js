import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getStorageDoneRecipes } from '../storage/getStorage';
import Footer from '../components/Footer';
import ShareRecipes from '../components/ShareRecipes';
import './CSS/DoneRecipes.css';

function DoneRecipes() {
  const [getDoneRecipes, setDoneRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const history = useHistory();
  console.log('3', getDoneRecipes);

  useEffect(() => {
    const doneRecipes = getStorageDoneRecipes();
    if (doneRecipes) {
      setDoneRecipes(doneRecipes);
      setSearch(doneRecipes);
    }
  }, []);

  const clickFilter = (item) => {
    if (item === 'food') {
      return setDoneRecipes(search.filter((xau) => xau.type === 'food'));
    } if (item === 'drink') {
      return setDoneRecipes(search.filter((recipe) => recipe.type === 'drink'));
    } if (item === 'all') {
      setDoneRecipes(getStorageDoneRecipes());
    }
  };

  return (
    <div className="container-done-recipes">
      <div className="container-done-recipes-header">
        <Header title="Done Recipes" toHaveSearch={ false } />
        <div className="second-done-recipes">
          <button
            className="btn-filter-done-recipes"
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => { clickFilter('all'); } }
          >
            <span className="shadow-done" />
            <span className="edge-done" />
            <span className="front-done">
              {' '}
              All
            </span>
          </button>

          <button
            className="btn-filter-done-recipes"
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => { console.log(clickFilter('food')); } }
          >
            <span className="shadow-done" />
            <span className="edge-done" />
            <span className="front-done">
              {' '}
              Food
            </span>
          </button>

          <button
            className="btn-filter-done-recipes"
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => { clickFilter('drink'); } }
          >
            <span className="shadow-done" />
            <span className="edge-done" />
            <span className="front-done">
              {' '}
              Drinks
            </span>
          </button>

          <div className="container-card-done-recipes">
            {getDoneRecipes.map((recipe, index) => (
              <div className="card-done-recipes" key={ recipe.id }>
                <div
                  role="button"
                  tabIndex={ 0 }
                  onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
                  onKeyPress={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
                >
                  <img
                    className="card-done-recipes-img"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.image }
                    width="80"
                  />

                </div>
                <div className="container-card-done-recipes-title">
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.type === 'drink'
                      ? recipe.alcoholicOrNot
                      : `${recipe.nationality} - ${recipe.category}`}
                  </p>
                  <div
                    role="button"
                    tabIndex={ 0 }
                    onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
                    onKeyPress={ () => {
                      history.push(`/${recipe.type}s/${recipe.id}`);
                    } }
                  >
                    <h1
                      className="recipe-name-done"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipe.name}
                    </h1>
                  </div>
                </div>
                <div className="card-text-done-recipes">
                  <p
                    className="data-done"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}

                  </p>
                  <p className="tag-done-recipes">{recipe.alcoholicOrNot}</p>
                  <ul>
                    {recipe.tags.length > 0
              && recipe.tags.map((tag, i) => (
                <li
                  className="tag-done-recipes"
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
