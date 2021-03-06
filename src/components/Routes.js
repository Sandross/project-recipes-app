import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import FoodsIdReceita from '../pages/FoodsIdReceita';
import DrinksIdReceita from '../pages/DrinksIdReceita';
import FoodsInProgress from '../pages/FoodsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';
import Explore from '../pages/Explore';
import ExploreFood from '../pages/ExploreFood';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from '../pages/ExploreFoodsNationalities';
import ExploreDrinksNationalities from '../pages/ExploreDrinksNationalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ FoodsIdReceita } />
      <Route exact path="/drinks/:id" component={ DrinksIdReceita } />
      <Route
        exact
        path="/foods/:id/in-progress"
        component={ FoodsInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ DrinksInProgress }
      />
      <Route
        exact
        path="/explore"
        component={ Explore }
      />
      <Route exact path="/explore/foods" component={ ExploreFood } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
      <Route
        exact
        path="/explore/drinks/nationalities"
        component={ ExploreDrinksNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </div>
  );
}

export default Routes;
