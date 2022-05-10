import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import './CSS/SearchBar.css';

function SearchBarFoods({ searchValue }) {
  const {
    // radioSelected,
    setRadioSelected,
    setIngredientValue,
    // ingredientValue,
  } = useContext(MyContext);
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.id;
    setRadioValue(value);
  };

  const testClick = (filterList) => {
    if (!filterList) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (filterList.length === 1) {
      history.push(`/foods/${filterList[0].idMeal}`);
    } else {
      setIngredientValue(filterList);
    }
  };

  const handleClick = () => {
    if (radioValue === 'Ingredient') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`).then((response) => response.json())
        .then((data) => {
          setIngredientValue(data.meals);
          setRadioSelected(data.meals);
          testClick(data.meals);
        });
    } else if (radioValue === 'Name') {
      console.log('name');
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then((response) => response.json())
        .then((data) => {
          setIngredientValue(data.meals);
          testClick(data.meals);
          setRadioSelected(data.meals);
        });
    } else if (radioValue === 'first-letter') {
      if (searchValue.length === 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`).then((response) => response.json())
          .then((data) => {
            setRadioSelected(data.meals);
            setIngredientValue(data.meals);
            testClick(data.meals);
          });
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  return (
    <div className="searchBar-headerContainer">
      <div className="input-searchBar">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            id="Ingredient"
            type="radio"
            onChange={ handleChange }
            name="input-radio"
          />
          Ingredient
        </label>

        <label htmlFor="Name">
          <input
            data-testid="name-search-radio"
            id="Name"
            type="radio"
            onChange={ handleChange }
            name="input-radio"
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter"
            type="radio"
            onChange={ handleChange }
            name="input-radio"
          />
          First Letter
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>

    </div>
  );
}

SearchBarFoods.propTypes = {
  searchValue: PropTypes.string,
};
SearchBarFoods.defaultProps = {
  searchValue: '',
};

export default SearchBarFoods;
