import {ActionCreator} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchOfferList = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading());
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(ActionCreator.loadOffers(offers));
    })
    .then(() =>{
      dispatch(ActionCreator.resetSortType());
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.setError());
      return err;
    });
};

