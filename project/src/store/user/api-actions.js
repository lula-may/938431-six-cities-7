import {APIRoute, AuthorizationStatus} from '../../const.js';
import {fetchOfferList} from '../offers/api-actions.js';
import {logout, setAuthorizationStatus, setError, setToken, setUser, startLoading} from './actions';
import {resetOffers as resetFavoriteOffers} from '../favorite/actions.js';
import { fetchFavoriteList } from '../favorite/api-actions.js';

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(data.email));
    })
    .then(() => dispatch(fetchFavoriteList()))
    .catch((err) => err);
};

export const login = ({login: email, password}) => (dispatch, getState, api) => {
  dispatch(startLoading());
  api.post(APIRoute.LOGIN, {email, password})
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

export const logoutUser = () => (dispatch, _getState, api) => {
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      dispatch(setToken(''));
      dispatch(logout());
      dispatch(resetFavoriteOffers());
    })
    .then(() => dispatch(fetchOfferList()))
    .catch((err) => err);
};
