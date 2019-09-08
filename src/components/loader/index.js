import React from 'react';
import loader from './loader.gif';
import './style.css';

export function Loader() {
  return (
    <div className="loaderContainer">
      <img src={loader} className="spinner" alt="spinner" />
    </div>
  );
}
