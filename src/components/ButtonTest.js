import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ButtonTest({ testid, favoritedRecipe }) {
  const { isFavorite } = useContext(MyContext);
  return (
    <div>
      <button
        className="btn-link-favorite"
        data-testid={ testid.length > 0 ? testid : 'favorite-btn' }
        type="button"
        src={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        onClick={ () => {
          favoritedRecipe();
        } }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
    </div>
  );
}

ButtonTest.propTypes = {
  testid: PropTypes.string,
  favoritedRecipe: PropTypes.func.isRequired,
};
ButtonTest.defaultProps = {
  testid: '',
};

export default ButtonTest;
