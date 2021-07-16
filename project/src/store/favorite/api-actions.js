import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';
import {endLoading, loadFavoriteOffers, setError, startLoading, updateFavoriteOffers} from './actions';
import {updateOffer} from '../offers/actions.js';
import {updateNearbyOffers} from '../nearby/actions.js';

export const fetchFavoriteList = () => (dispatch, _getState, api) => {
  dispatch(startLoading());
  api.get(APIRoute.FAVORITES)
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(loadFavoriteOffers(offers));
    })
    .then(() =>{
      dispatch(endLoading());
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};

export const postOffer = (offer) => (dispatch, _getState, api) => {
  const {id, isFavorite} = offer;
  const status = Number(!isFavorite);
  dispatch(startLoading());
  const url = `${APIRoute.FAVORITES}/${id}/${status}`;
  api.post(url)
    .then(({data}) => {
      const newOffer = adaptOffer(data);
      dispatch(updateFavoriteOffers(newOffer));
      dispatch(updateOffer(newOffer));
      dispatch(updateNearbyOffers(newOffer));
    })
    .then(() =>{
      dispatch(endLoading());
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};
