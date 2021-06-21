import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {OFFERS} from './mocks/offers.js';
import {COMMENTS} from './mocks/comments';

const settings = {
  comments: COMMENTS,
  offers: OFFERS,
  offersCount: 250,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      comments={settings.comments}
      offers={settings.offers}
      offersCount={settings.offersCount}
    />
  </React.StrictMode>,
  document.getElementById('root'));
