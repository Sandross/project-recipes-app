import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksRecipesCard from '../components/DrinksRecipesCard';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" toHaveSearch />
      <DrinksRecipesCard />
      <Footer />
    </div>
  );
}

export default Drinks;
