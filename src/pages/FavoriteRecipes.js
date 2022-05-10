import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Context';
import Header from '../components/Header';
// import { getFavoriteRecipes } from '../storage/getStorage';
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
    <div className="container-favorite-recipes">
      <div className="container-filter">
        <Header title="Favorite Recipes" toHaveSearch={ false } />
        <div className="container-filter-done-favorite">
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
        </div>

        <div className="container-favorite-card">
          {getFavorite.map((recipe, index) => (
            <div className="favorite-card" key={ recipe.id }>
              <div
                role="button"
                tabIndex={ 0 }
                onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
                onKeyPress={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
              >
                <img
                  className="favorite-card-img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.image }
                  width="80"
                />

              </div>
              <div className="favorite-card-info">
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
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h4>
                </div>
              </div>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
export default FavoriteRecipes;
