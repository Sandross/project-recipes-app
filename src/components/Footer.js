import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (

    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        src={ drinkIcon }
        onClick={ () => {
          history.push('/drinks');
        } }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>

      <button
        data-testid="explore-bottom-btn"
        type="button"
        src={ exploreIcon }
        onClick={ () => {
          history.push('/explore');
        } }
      >
        <img src={ exploreIcon } alt="exploreIcon" />
      </button>

      <button
        data-testid="food-bottom-btn"
        type="button"
        src={ mealIcon }
        onClick={ () => {
          history.push('/foods');
        } }
      >
        <img src={ mealIcon } alt="exploreIcon" />
      </button>

    </footer>

  );
}

export default Footer;
