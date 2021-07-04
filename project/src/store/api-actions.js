import {ActionCreator} from './action';
import {APIRoute} from '../const.js';
import { adaptOffers } from '../services/adapter';

export const fetchOfferList = () => (dispatch, getState, api) =>{
  dispatch(ActionCreator.startLoading());
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      const offers = data.map(adaptOffers);
      dispatch(ActionCreator.loadOffers(offers));
      dispatch(ActionCreator.sortOffers());
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      ActionCreator.endLoading();
      return err;
    });
};
