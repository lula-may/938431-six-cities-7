import {endLoading, loadOffers, resetSortType, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchOfferList = () => (dispatch, _getState, api) => {
  dispatch(startLoading());
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(loadOffers(offers));
    })
    .then(() =>{
      dispatch(resetSortType());
      dispatch(endLoading());
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};

