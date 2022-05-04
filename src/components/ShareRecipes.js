import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareRecipes() {
  const { location } = useHistory();
  const [createElement, setCreateElement] = useState(true);

  const shareLink = () => {
    const copy = clipboardCopy;
    copy(`http://localhost:3000${location.pathname}`);
    setCreateElement(false);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
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

export default ShareRecipes;
