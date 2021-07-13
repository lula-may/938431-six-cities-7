import {ActionCreator} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchNearOffers = (id) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading());
  const url = `${APIRoute.OFFERS}/${id}/nearby`;
  api.get(url)
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(ActionCreator.loadNearOffers(offers));
    })
    .then(() =>{
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.setError());
      return err;
    });
};
