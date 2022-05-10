import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  const history = useHistory();

  const redirectToFoods = () => {
    const response = fetch('https://www.themealdb.com/api/json/v1/1/random.php').then((res) => res.json());
    response.then((data) => {
      history.push(`/foods/${data.meals[0].idMeal}`);
    });
  };

  return (
    <div>
      <Header title="Explore Foods" toHaveSearch={ false } />
      <div className="container-explore-foods-drinks">
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
          onClick={ redirectToFoods }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFood;
