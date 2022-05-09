import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  filterFoodsByNationality, filterRecipesByNationality, listFoodsRecipes,
} from '../helpers/FoodsAPI';

function ExploreFoodsNationalities() {
  const [getNationality, setNationality] = useState([]);
  const [recipesByNationality, setRecipesByNationality] = useState([]);
  const history = useHistory();

  useEffect(() => {
    listFoodsRecipes().then(({ meals }) => {
      setRecipesByNationality(meals);
    });

    filterFoodsByNationality().then(({ meals }) => {
      setNationality(meals.map(({ strArea }) => strArea));
    });
  }, []);

  const handleSelectCountry = (e) => {
    const { value } = e.target;
    filterRecipesByNationality(value).then(({ meals }) => {
      setRecipesByNationality(meals);
    });
  };

  const redirectToFoods = (food) => {
    history.push(`/foods/${food.idMeal}`);
  };

  const TWELVE = 12;

  return (
    <div className="container-explore-nationality">
      <Header title="Explore Nationalities" toHaveSearch />
      <div className="container-explore-nationalities">
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleSelectCountry }
        >
          {getNationality.map((country, index) => (
            <option
              value={ country }
              key={ index }
              data-testid={ `${country}-option` }
            >
              {country}
            </option>))}
        </select>
        <div className="container-recipes-card">
          {recipesByNationality.map((food, index) => (
            index < TWELVE && (
              <div
                className="recipes-card-item"
                role="button"
                data-testid={ `${index}-recipe-card` }
                key={ food.strMeal }
                tabIndex={ 0 }
                onClick={ () => {
                  redirectToFoods(food);
                } }
                onKeyPress={ () => {
                  redirectToFoods(food);
                } }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  className="foods-img"
                />
                <h3
                  className="name-recipes-card"
                  data-testid={ `${index}-card-name` }
                >
                  {food.strMeal}

                </h3>
              </div>)
          ))}
        </div>
        {/* <div className="container-explore-recipes-by-nationality">
          {recipesByNationality.map((item, index) => (
            index < TWELVE && (
              <div
                data-testid={ `${index}-recipe-card` }
                className="card-explore-by-item"
                key={ item.strMeal }
              >
                <div className="card-img-explore-item">
                  <img
                    width={ 60 }
                    height={ 60 }
                    data-testid={ `${index}-card-img` }
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                  />
                </div>

                <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>

              </div>
            )))}
        </div> */}

      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
