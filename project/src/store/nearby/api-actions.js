import {setNearOffers, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';
import { getToken } from '../user/selectors.js';

export const fetchNearOffers = (id) => (dispatch, getState, api) => {
  dispatch(startLoading());
  const headers = {'X-Token': getToken(getState())};
  const url = `${APIRoute.OFFERS}/${id}/nearby`;
  api.get(url, {headers: headers})
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(setNearOffers(offers));
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};
