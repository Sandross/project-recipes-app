import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Routes from './components/Routes';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
