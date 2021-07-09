import {ActionCreator} from './action';
import {APIRoute, AuthorizationStatus} from '../const.js';
import {adaptOffers, adaptUserInfo} from '../services/adapter';

export const fetchOfferList = () => (dispatch, _getState, api) =>{
  dispatch(ActionCreator.startLoading());
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      const offers = data.map(adaptOffers);
      dispatch(ActionCreator.loadOffers(offers));
    })
    .then(() =>{
      dispatch(ActionCreator.resetSortType());
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      ActionCreator.endLoading();
      return err;
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      const userInfo = adaptUserInfo(data);
      dispatch(ActionCreator.setUser(userInfo));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(ActionCreator.setUser(data.email));
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    })
    .catch(() => {})
);
