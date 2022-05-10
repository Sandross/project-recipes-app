import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksRecipesCard from '../components/DrinksRecipesCard';

function Drinks() {
  const history = useHistory();
  const getIngredients = () => {
    const ingredients = history.location.state?.value;
    return (ingredients || null);
  };
  return (
    <div className="container-foods-drinks">
      <Header title="Drinks" toHaveSearch />
      <DrinksRecipesCard getIngredients={ getIngredients } />
      <Footer />
    </div>
  );
}

export default Drinks;
