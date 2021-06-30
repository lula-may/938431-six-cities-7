import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {OFFERS} from './mocks/offers.js';
import {COMMENTS} from './mocks/comments.js';
import {CITIES} from './const';
import {reducer} from './store/reducer';

const settings = {
  city: CITIES[0],
  comments: COMMENTS,
  offers: OFFERS,
  offersCount: 250,
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        currentCity={settings.city}
        comments={settings.comments}
        offers={settings.offers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
