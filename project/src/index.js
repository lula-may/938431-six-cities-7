import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reducer from './store/root-reducer';
import {createApi} from './services/api';
import {fetchOfferList} from './store/offers/api-actions';
import {ActionCreator } from './store/user/actions';
import {AuthorizationStatus} from './const';

const api = createApi(
  () => ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(fetchOfferList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
