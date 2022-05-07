import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareRecipes({ testid, share }) {
  const { location } = useHistory();
  const [createElement, setCreateElement] = useState(true);

  const shareLink = () => {
    const copy = clipboardCopy;
    if (share) {
      copy(`http://localhost:3000${share}`);
      setCreateElement(false);
    } else {
      copy(`http://localhost:3000${(location.pathname).replace('/in-progress', '')}`);
      setCreateElement(false);
    }
  };

  return (
    <div className="container-share">
      <button
        className="share-btn"
        data-testid={ testid }
        type="button"
        src={ shareIcon }
        onClick={ () => shareLink() }
      >
        <img src={ shareIcon } alt="share" />
      </button>

      {!createElement ? (<p>Link copied!</p>) : null}
    </div>
  );
}

ShareRecipes.propTypes = {
  testid: PropTypes.string,
  share: PropTypes.string,
};
ShareRecipes.defaultProps = {
  testid: '',
  share: '',
};

export default ShareRecipes;
