import {endLoading, logout, setAuthorizationStatus, setError, setUser, startLoading} from './actions';
import {APIRoute, AuthorizationStatus} from '../../const.js';

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(setUser(data.email));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => {
  dispatch(startLoading());
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(setUser(data.email));
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTH));
      dispatch(endLoading());
    })
    .catch(() => {
      dispatch(setError());
    });
};

export const logoutUser = () => (dispatch, _getState, api) => {
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      dispatch(logout());
    })
    .catch((err) => err);
};
