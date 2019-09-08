import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { ProductPage } from './pages/productPage';

function AppComponent() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={ProductPage} />
      </div>
    </Router>
  );
};

export default AppComponent;
