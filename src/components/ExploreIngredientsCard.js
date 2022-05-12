import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { filterFoodsByIngredient } from '../helpers/FoodsAPI';
import { filterDrinksByIngredient } from '../helpers/DrinksAPI';

function ExploreIngredientsCard({ food, drink }) {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (food) {
      filterFoodsByIngredient().then(({ meals }) => {
        setIngredients(meals.map(({ strIngredient }) => strIngredient));
      });
    } else if (drink) {
      filterDrinksByIngredient().then(({ drinks }) => {
        setIngredients(drinks.map(({ strIngredient1 }) => strIngredient1));
      });
    }
  }, [food, drink]);

  const handleIngredientClick = (e) => {
    const value = e.target.closest('.recipes-card-item').lastChild.innerText;
    if (food) {
      history.push({ pathname: '/foods', state: { value } });
    } else if (drink) {
      console.log('drink', value);
      history.push({ pathname: '/drinks', state: { value } });
    }
  };

  const getImage = (ingredient) => {
    if (food) {
      return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
    } if (drink) {
      return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
    }
  };

  const TWELVE = 12;
  return (
    <div className="container-card-recipes-geral">
      <div className="container-card-recipes">
        <div className="container-recipes-card">
          {ingredients.map((ingredient, index) => (
            index < TWELVE && (
              <div
                data-testid={ `${index}-ingredient-card` }
                className="recipes-card-item"
                key={ ingredient }
                role="button"
                tabIndex={ -1 }
                onClick={ handleIngredientClick }
                onKeyPress={ handleIngredientClick }
              >
                <div className="card-img-explore-ingredient">
                  <img
                    className="foods-img"
                    data-testid={ `${index}-card-img` }
                    src={ getImage(ingredient) }
                    alt={ ingredient }
                  />
                </div>
                <p
                  className="name-recipes-card"
                  data-testid={ `${index}-card-name` }
                >
                  {ingredient}
                </p>
              </div>
            )))}
        </div>
      </div>
    </div>

  );
}

ExploreIngredientsCard.propTypes = {
  food: PropTypes.bool,
  drink: PropTypes.string,
};
ExploreIngredientsCard.defaultProps = {
  food: '',
  drink: '',
};

export default ExploreIngredientsCard;
