import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodsRecipesCard from '../components/FoodsRecipesCard';

function Foods() {
  return (
    <div>
      <Header title="Foods" toHaveSearch />
      <FoodsRecipesCard />
      <Footer />
    </div>
  );
}

export default Foods;
