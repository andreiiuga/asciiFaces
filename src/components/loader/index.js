import React from 'react';
import loader from './loader.gif';
import './style.css';

/**
 * <Loader />
 * Component used to render the loading animation
 *
 * @return {JSXElement}
 */
export function Loader() {
  return (
    <div className="loaderContainer">
      <img src={loader} className="spinner" alt="spinner" />
    </div>
  );
}
