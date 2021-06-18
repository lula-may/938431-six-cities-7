import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers.js';

const settings = {
  offers,
  offersCount: 250,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offers={settings.offers}
      offersCount={settings.offersCount}
    />
  </React.StrictMode>,
  document.getElementById('root'));
