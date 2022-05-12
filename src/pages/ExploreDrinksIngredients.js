import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientsCard from '../components/ExploreIngredientsCard';

function ExploreDrinksIngredients() {
  return (
    <div className="container-foods-drinks">
      <div className="container-foods-drinks-header-card-footer">
        <Header title="Explore Ingredients" toHaveSearch={ false } />
        <ExploreIngredientsCard drink />
        <Footer />
      </div>
    </div>
  );
}

export default ExploreDrinksIngredients;
