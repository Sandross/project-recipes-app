import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientsCard from '../components/ExploreIngredientsCard';

function ExploreDrinksIngredients() {
  return (
    <div>
      <Header title="Explore Ingredients" toHaveSearch={ false } />
      <ExploreIngredientsCard drink />
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
