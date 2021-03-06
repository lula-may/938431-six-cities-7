import {setNearOffers, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchNearOffers = (id) => (dispatch, _getState, api) => {
  dispatch(startLoading());
  const url = `${APIRoute.OFFERS}/${id}/nearby`;
  return api.get(url)
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(setNearOffers(offers));
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};
