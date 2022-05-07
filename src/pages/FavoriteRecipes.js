import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Context';
import Header from '../components/Header';
import { getFavoriteRecipes } from '../storage/getStorage';
import LinkFavoriteRecipes from '../components/LinkFavoriteRecipes';
import ShareRecipes from '../components/ShareRecipes';

function FavoriteRecipes() {
  const [getFavorite, setFavorite] = useState([]);
  const { callFavorite } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const favorite = getFavoriteRecipes();
    if (favorite) {
      setFavorite(favorite);
    }
  }, [callFavorite]);

  const clickFilter = (item) => {
    if (item === 'food') {
      setFavorite(getFavorite.filter((recipe) => recipe.type === 'food'));
    } else if (item === 'drink') {
      setFavorite(getFavorite.filter((recipe) => recipe.type === 'drink'));
    } else if (item === 'all') {
      setFavorite(getStorageDoneRecipes());
    }
  };

  return (
    <div className="container-favorite-recipes">
      <Header title="Favorite Recipes" toHaveSearch={ false } />
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
        {getFavorite.map((recipe, index) => (
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
            <ShareRecipes
              share={ `/${recipe.type}s/${recipe.id}` }
              testid={ `${index}-horizontal-share-btn` }
            />
            <LinkFavoriteRecipes
              testid={ `${index}-horizontal-favorite-btn` }
              paramsID={ recipe.id }
              paramsFavorite
              paramsIsFood={ recipe.type === 'food' }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FavoriteRecipes;
