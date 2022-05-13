import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import ShareRecipes from '../components/ShareRecipes';

function FavoriteRecipes() {
  const [getFavorite, setFavorite] = useState([]);
  const { favoritesState, setIsFavorite } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    if (favoritesState) {
      setFavorite(favoritesState);
      const favorites = favoritesState;
      const favorite = favorites?.some(
        (recipe) => recipe.id,
      );
      setIsFavorite(favorite);
    }
  }, [favoritesState]);

  const clickFilter = (item) => {
    if (item === 'food') {
      setFavorite(favoritesState.filter((recipe) => recipe.type === 'food'));
    } else if (item === 'drink') {
      setFavorite(favoritesState.filter((recipe) => recipe.type === 'drink'));
    } else if (item === 'all') {
      setFavorite(favoritesState);
    }
  };

  return (
    <div className="container-done-recipes">
      <div className="container-done-recipes-header">
        <Header title="Favorite Recipes" toHaveSearch={ false } />
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
            onClick={ () => { clickFilter('food'); } }
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
            {getFavorite.map((recipe, index) => (
              <div className="card-favorite-recipes" key={ recipe.id }>
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
                <div className="container-card-favorite-recipes-title">
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
                    <h4
                      className="recipe-name-favorite"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipe.name}
                    </h4>
                  </div>
                </div>
                <div className="card-text-favorite-recipes">
                  <p
                    className="data-done"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}

                  </p>
                  <div className="container-share-favorite">
                    <ShareRecipes
                      share={ `/${recipe.type}s/${recipe.id}` }
                      testid={ `${index}-horizontal-share-btn` }
                    />
                    <LinkFavoriteRecipes
                      testid={ `${index}-horizontal-favorite-btn` }
                      paramsID={ recipe.id }
                    />
                  </div>
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
export default FavoriteRecipes;
