import {setOffers, resetSortType, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';
import { getToken } from '../user/selectors.js';

export const fetchOfferList = () => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  dispatch(startLoading());
  api.get(APIRoute.OFFERS, {headers: headers})
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

