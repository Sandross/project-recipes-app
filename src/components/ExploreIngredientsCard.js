import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterFoodsByIngredient } from '../helpers/FoodsAPI';
import { filterDrinksByIngredient } from '../helpers/DrinksAPI';

function ExploreIngredientsCard({ food, drink }) {
  const [ingredients, setIngredients] = useState([]);

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

  const getImage = (ingredient) => {
    console.log(ingredient);
    if (food) {
      return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
    } if (drink) {
      return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
    }
  };

  const TWELVE = 12;
  return (
    <div className="container-explore-ingredients-card">
      {ingredients.map((ingredient, index) => (
        index < TWELVE && (
          <div
            data-testid={ `${index}-ingredient-card` }
            className="card-explore-by-ingredient"
            key={ ingredient }
          >
            <div className="card-img-explore-ingredient">
              <img
                data-testid={ `${index}-card-img` }
                src={ getImage(ingredient) }
                alt={ ingredient }
              />
            </div>

            <p data-testid={ `${index}-card-name` }>{ingredient}</p>
          </div>
        )))}
    </div>

  );
}

ExploreIngredientsCard.propTypes = {
  food: PropTypes.string,
  drink: PropTypes.string,
};
ExploreIngredientsCard.defaultProps = {
  food: '',
  drink: '',
};

export default ExploreIngredientsCard;
