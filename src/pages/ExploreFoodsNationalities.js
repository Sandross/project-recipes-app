import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  filterFoodsByNationality, filterRecipesByNationality, listFoodsRecipes,
} from '../helpers/FoodsAPI';
import './CSS/Explore.css';

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
    if (value === 'All') {
      listFoodsRecipes().then(({ meals }) => {
        setRecipesByNationality(meals);
      });
    } else {
      filterRecipesByNationality(value).then(({ meals }) => {
        setRecipesByNationality(meals);
      });
    }
  };

  const redirectToFoods = (food) => {
    history.push(`/foods/${food.idMeal}`);
  };

  const TWELVE = 12;

  return (
    <div className="container-explore-foods-drinks">
      <div className="container-explore-foods-drinks-header-card-footer">
        <div className="container-explore-foods-drinks-header">
          <Header title="Explore Nationalities" toHaveSearch={ false } />
        </div>
        <div className="container-recipes-card-button-nationality">
          <select
            className="Select_Nationality"
            data-testid="explore-by-nationality-dropdown"
            onChange={ handleSelectCountry }
          >
            <option data-testid="All-option">Select Nationality </option>
            <option data-testid="All-option">All</option>
            {getNationality.map((country, index) => (
              <option
                value={ country }
                key={ index }
                data-testid={ `${country}-option` }
              >
                {country}
              </option>))}
          </select>
        </div>
        <div className="container-card-recipes-nationality">
          <div className="container-recipes-card-nationality">
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
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ExploreFoodsNationalities;
