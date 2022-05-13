import React, { useState, useEffect } from 'react';
import PropTypes from 'react-bootstrap/esm/Image';
import { listFoodsRecipes } from '../helpers/FoodsAPI';

function RecomendationDrinksCard() {
  const [recomendationList, setRecomendationList] = useState([]);

  useEffect(() => {
    listFoodsRecipes().then((data) => setRecomendationList(data.meals));
  }, []);

  const SIX = 6;

  return (
    <div className="container-recomendation">
      <div className="container-recomendation-title">
        {recomendationList.map((food, index) => (
          index < SIX && (
            <div
              className="card-recomendation"
              data-testid={ `${index}-recomendation-card` }
              key={ food.idMeal }
            >
              <img
                className="img-recomendation"
                data-testid="recipe-photo"
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
              <h3
                className="title-recomendation"
                data-testid={ `${index}-recomendation-title` }
              >
                {food.strMeal}

              </h3>
              <h5>{food.strCategory}</h5>
            </div>
          )))}
      </div>
    </div>
  );
}

RecomendationDrinksCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default RecomendationDrinksCard;
