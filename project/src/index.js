import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const OFFERS_COUNT = 5;
const offers = new Array(OFFERS_COUNT)
  .fill('')
  .map((_, id) => ({id}));

const settings = {
  offers,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offers={settings.offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
