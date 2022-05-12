import React, { useState, useEffect } from 'react';
import PropTypes from 'react-bootstrap/esm/Image';
import { listDrinksRecipes } from '../helpers/DrinksAPI';
import './RecomendationCard.css';

function RecomendationDrinksCard() {
  const [recomendationList, setRecomendationList] = useState([]);

  useEffect(() => {
    listDrinksRecipes().then((data) => setRecomendationList(data.drinks));
  }, []);

  const SIX = 6;

  return (
    <div className="container-recomendation">
      <div className="container-recomendation-title">
        {recomendationList.map((drink, index) => (
          index < SIX && (
            <div
              className="card-recomendation"
              data-testid={ `${index}-recomendation-card` }
              key={ drink.idDrink }
            >
              <img
                className="img-recomendation"
                data-testid="recipe-photo"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h3
                className="title-recomendation"
                data-testid={ `${index}-recomendation-title` }
              >
                {drink.strDrink}

              </h3>
              <h4 className="Alcoholic-recomendation">{drink.strAlcoholic}</h4>
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
