import {setOffers, resetSortType, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchOfferList = () => (dispatch, _getState, api) => {
  dispatch(startLoading());
  return api.get(APIRoute.OFFERS)
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(setOffers(offers));
    })
    .then(() =>{
      dispatch(resetSortType());
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};

