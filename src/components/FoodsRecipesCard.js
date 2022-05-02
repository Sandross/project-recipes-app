import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  listFoodsRecipes, listCategoryRecipes, filterByCategory,
} from '../helpers/FoodsAPI';

function FoodsRecipesCard() {
  const [foodsList, setFoodsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    listFoodsRecipes().then((data) => setFoodsList(data.meals));
  }, []);

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
    <div>
      <div>
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

      <div className="foods-recipes-card">
        {foodsList.map((food, index) => (
          index < TWELVE && (
            <div
              role="button"
              tabIndex={ 0 }
              data-testid={ `${index}-recipe-card` }
              key={ food.strMeal }
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
              <h3 data-testid={ `${index}-card-name` }>{food.strMeal}</h3>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default FoodsRecipesCard;
