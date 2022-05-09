import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreIngredientsCard from '../components/ExploreIngredientsCard';

function ExploreFoodsIngredients() {
  return (
    <div>
      <Header title="Explore Ingredients" toHaveSearch={ false } />
      <ExploreIngredientsCard food />
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
