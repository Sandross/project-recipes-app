import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  return (
    <div>
      <Header title="Explore Foods" toHaveSearch={ false } />
      <Footer />
    </div>
  );
}

export default ExploreFood;
