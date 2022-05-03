import React, { useState, useEffect } from 'react';
import PropTypes from 'react-bootstrap/esm/Image';
import { listFoodsRecipes } from '../helpers/FoodsAPI';
import './RecomendationCard.css';

function RecomendationDrinksCard() {
  const [recomendationList, setRecomendationList] = useState([]);

  useEffect(() => {
    listFoodsRecipes().then((data) => setRecomendationList(data.meals));
  }, []);

  const SIX = 6;

  return (
    <div className="container-recomendation">
      {recomendationList.map((food, index) => (
        index < SIX && (
          <div
            className="card-recomendation"
            data-testid={ `${index}-recomendation-card` }
            key={ food.idMeal }
          >
            <img
              width="80"
              height="60"
              data-testid="recipe-photo"
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
            <h3
              data-testid={ `${index}-recomendation-title` }
            >
              {food.strMeal}

            </h3>
            <h4>{food.strCategory}</h4>
          </div>
        )))}
    </div>
  );
}

RecomendationDrinksCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default RecomendationDrinksCard;
