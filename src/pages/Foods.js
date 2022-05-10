import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodsRecipesCard from '../components/FoodsRecipesCard';

function Foods() {
  const history = useHistory();
  const getIngredients = () => {
    const ingredients = history.location.state?.value;
    return (ingredients || null);
  };

  return (
    <div>
      <Header title="Foods" toHaveSearch />
      <FoodsRecipesCard getIngredients={ getIngredients } />
      <Footer />
    </div>
  );
}

export default Foods;
