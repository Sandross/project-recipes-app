import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();

  return (
    <div>
      <Header title="Explore Drinks" toHaveSearch={ false } />
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
      >

        Surprise me!

      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
