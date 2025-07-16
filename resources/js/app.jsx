import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductCatalog from './components/ProductCatalog';
import './bootstrap';
import '../css/app.css';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ProductCatalog />
  </React.StrictMode>
);
