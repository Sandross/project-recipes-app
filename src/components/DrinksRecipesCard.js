import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  listDrinksRecipes, listCategoryRecipes, filterByCategory,
} from '../helpers/DrinksAPI';

function DrinksRecipesCard() {
  const [drinksList, setDrinksList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    listDrinksRecipes().then((data) => setDrinksList(data.drinks));
  }, []);

  useEffect(() => {
    listCategoryRecipes().then((data) => setCategoryList(data.drinks));
  }, []);

  const handleClick = (category) => {
    if (category === activeCategory || category === 'All') {
      listDrinksRecipes().then((data) => setDrinksList(data.drinks));
    } else {
      filterByCategory(
        category,
      ).then((data) => setDrinksList(data.drinks));
      setActiveCategory(category);
    }
  };

  const redirectToDrinks = (drink) => {
    history.push(`/drinks/${drink.idDrink}`);
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
                data-testid={ `${categories.strCategory}-category-filter` }
                onClick={ () => handleClick(categories.strCategory) }

              >
                {categories.strCategory}
              </button>
            </div>
          )
        ))}
      </div>
      <div className="container-recipes-card">
        {drinksList.map((drink, index) => (
          index < TWELVE && (
            <div
              className="recipes-card-item"
              role="button"
              tabIndex={ 0 }
              data-testid={ `${index}-recipe-card` }
              key={ drink.strDrink }
              onClick={ () => redirectToDrinks(drink) }
              onKeyPress={ () => redirectToDrinks(drink) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                className="drinks-img"
              />
              <h3
                className="name-recipes-card"
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}

              </h3>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default DrinksRecipesCard;
