import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explore" toHaveSearch={ false } />
      <div className="container-explore">
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => {
            history.push('/explore/foods');
          } }
        >
          Explore Foods

        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => {
            history.push('/explore/drinks');
          } }
        >
          Explore Drinks

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
