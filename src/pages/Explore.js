import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './CSS/Explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div className="container-explore-foods-drinks">
      <div className="container-explore-foods-drinks-header-card-footer">
        <div className="container-explore-foods-drinks-header">
          <Header title="Explore" toHaveSearch={ false } />
        </div>
        <div className="container-explore-buttons">
          <button
            className="btn-explore"
            data-testid="explore-foods"
            type="button"
            onClick={ () => {
              history.push('/explore/foods');
            } }
          >
            <span className="shadow" />
            <span className="edge" />
            <span className="front text">
              {' '}
              Explore Foods
            </span>
          </button>
          <button
            className="btn-explore"
            data-testid="explore-drinks"
            type="button"
            onClick={ () => {
              history.push('/explore/drinks');
            } }
          >
            <span className="shadow" />
            <span className="edge" />
            <span className="front text">
              {' '}
              Explore Drinks
            </span>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Explore;
