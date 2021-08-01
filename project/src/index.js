import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import App from './components/app/app';
import reducer from './store/root-reducer';
import {createApi} from './services/api';
import {setAuthorizationStatus} from './store/user/actions';
import {AuthorizationStatus} from './const';

const api = createApi(
  () => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
