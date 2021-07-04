import {ActionCreator} from './action';
import {APIRoute} from '../const.js';
import { getOffersByCity } from '../utils';
import { adaptOffers } from '../services/adapter';

export const fetchOfferList = () => (dispatch, getState, api) =>{
  dispatch(ActionCreator.startLoading());
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      const offers = adaptOffers(data);
      const city = getState().city;
      const currentOffers = getOffersByCity(offers, city);
      dispatch(ActionCreator.loadOffers(offers));
      dispatch(ActionCreator.setOffers(currentOffers));
      dispatch(ActionCreator.sortOffers());
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      ActionCreator.endLoading();
      return err;
    });
};
