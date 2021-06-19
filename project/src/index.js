import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers.js';
import {comments} from './mocks/comments';

const settings = {
  comments,
  offers,
  offersCount: 250,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      comments={comments}
      offers={settings.offers}
      offersCount={settings.offersCount}
    />
  </React.StrictMode>,
  document.getElementById('root'));
