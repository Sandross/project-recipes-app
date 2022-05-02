import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  const history = useHistory();

  return (
    <div>
      <Header title="Explore Foods" toHaveSearch={ false } />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => {
          history.push('/explore/foods/ingredients');
        } }
      >
        By Ingredient

      </button>

      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => {
          history.push('/explore/foods/nationalities');
        } }
      >
        By Nationality

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

export default ExploreFood;
