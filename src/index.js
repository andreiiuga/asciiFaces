import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';

import { products } from './reducers';
import App from './app';


const store = createStore(
  combineReducers({
    products,
    routing: routerReducer
  }),
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
