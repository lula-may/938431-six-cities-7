import {APIRoute, AuthorizationStatus} from '../../const.js';
import {fetchOfferList} from '../offers/api-actions.js';
import {logout, setAuthorizationStatus, setError, setToken, setUser, startLoading} from './actions';
import {resetOffers as resetFavoriteOffers} from '../favorite/actions.js';
import { fetchFavoriteList } from '../favorite/api-actions.js';
import { getToken } from './selectors.js';

export const checkAuth = () => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  api.get(APIRoute.LOGIN, {headers: headers})
    .then(({data}) => {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(data.email));
    })
    .then(() => dispatch(fetchFavoriteList()))
    .catch((err) => err);
};

export const login = ({login: email, password}) => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  dispatch(startLoading());
  api.post(APIRoute.LOGIN, {email, password}, {headers: headers})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(setToken(data.token));
      dispatch(setUser(data.email));
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
    })
    .then(() => dispatch(fetchOfferList()))
    .then(() => dispatch(fetchFavoriteList()))
    .catch(() => {
      dispatch(setError());
    });
};

export const logoutUser = () => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  api.delete(APIRoute.LOGOUT, {headers: headers})
    .then(() => {
      localStorage.removeItem('token');
      dispatch(setToken(''));
      dispatch(logout());
      dispatch(resetFavoriteOffers());
    })
    .then(() => dispatch(fetchOfferList()))
    .catch((err) => err);
};
