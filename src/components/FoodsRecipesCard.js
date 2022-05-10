import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import {
  listFoodsRecipes, listCategoryRecipes, filterByCategory,
} from '../helpers/FoodsAPI';

function FoodsRecipesCard({ getIngredients }) {
  const [foodsList, setFoodsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const { ingredientValue } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    if (getIngredients()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getIngredients()}`).then((response) => response.json())
        .then((data) => {
          setFoodsList(data.meals);
        });
    } else {
      listFoodsRecipes().then((data) => {
        setFoodsList(data.meals);
      });
    }
  }, [getIngredients]);

  useEffect(() => {
    if (ingredientValue) {
      setFoodsList(ingredientValue);
    }
  }, [ingredientValue]);

  useEffect(() => {
    listCategoryRecipes().then((data) => setCategoryList(data.meals));
  }, []);

  const handleClick = (category) => {
    if (category === activeCategory || category === 'All') {
      listFoodsRecipes().then((data) => setFoodsList(data.meals));
    } else {
      filterByCategory(
        category,
      ).then((data) => setFoodsList(data.meals));
      setActiveCategory(category);
    }
  };

  const redirectToFoods = (food) => {
    history.push(`/foods/${food.idMeal}`);
  };

  const TWELVE = 12;
  const FIVE = 5;
  return (
    <div className="container-card-recipes-geral">
      <div className="container-recipes-card-button">
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleClick('All') }
        >
          All

        </button>
        {categoryList.map((categories, index) => (
          index < FIVE && (
            <div
              key={ categories.strCategory }
            >
              <button
                type="button"
                data-testid={
                  `${categories.strCategory}-category-filter`
                }
                onClick={ () => handleClick(categories.strCategory) }

              >
                {categories.strCategory}
              </button>
            </div>
          )
        ))}
      </div>

      <div className="container-recipes-card">
        {foodsList.map((food, index) => (
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
  );
}

FoodsRecipesCard.propTypes = {
  getIngredients: PropTypes.func,
};
FoodsRecipesCard.defaultProps = {
  getIngredients: '',
};

export default FoodsRecipesCard;
