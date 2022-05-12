import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();

  const redirectToFoods = () => {
    const response = fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((res) => res.json());
    response.then((data) => {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    });
  };

  return (
    <div className="container-explore-foods-drinks">
      <div className="container-explore-foods-drinks-header-card-footer">
        <div className="container-explore-foods-drinks-header">
          <Header title="Explore Drinks" toHaveSearch={ false } />
        </div>
        <div className="container-explore-buttons">
          <button
            className="btn-explore"
            data-testid="explore-by-ingredient"
            type="button"
            onClick={ () => {
              history.push('/explore/drinks/ingredients');
            } }
          >
            <span className="shadow" />
            <span className="edge" />
            <span className="front text">
              {' '}
              By Ingredient
            </span>

          </button>

          <button
            className="btn-explore"
            data-testid="explore-surprise"
            type="button"
            onClick={ redirectToFoods }
          >
            <span className="shadow" />
            <span className="edge-surprise" />
            <span className="front-surprise text">
              {' '}
              Surprise me!
            </span>

          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ExploreDrinks;
