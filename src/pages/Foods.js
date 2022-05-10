import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodsRecipesCard from '../components/FoodsRecipesCard';
import './CSS/Foods&Drinks.css';

function Foods() {
  const history = useHistory();
  const getIngredients = () => {
    const ingredients = history.location.state?.value;
    return (ingredients || null);
  };

  return (
    <div className="container-foods-drinks">
      <div className="container-foods-drinks-header-card-footer">
        <Header title="Foods" toHaveSearch />
        <FoodsRecipesCard getIngredients={ getIngredients } />
        <Footer />
      </div>
    </div>
  );
}

export default Foods;
