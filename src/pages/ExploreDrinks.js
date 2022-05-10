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
    <div>
      <Header title="Explore Drinks" toHaveSearch={ false } />
      <div className="container-explore-foods-drinks">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => {
            history.push('/explore/drinks/ingredients');
          } }
        >
          By Ingredient

        </button>

        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ redirectToFoods }
        >

          Surprise me!

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
