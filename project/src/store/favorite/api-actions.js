import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';
import {setFavoriteOffers, setError, startLoading, updateFavoriteOffers} from './actions';
import {updateOffer} from '../offers/actions.js';
import {updateNearbyOffers} from '../nearby/actions.js';
import { getToken } from '../user/selectors.js';
export const fetchFavoriteList = () => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  dispatch(startLoading());
  api.get(APIRoute.FAVORITES, {headers: headers})
    .then(({data}) => {
      const offers = data.map(adaptOffer);
      dispatch(setFavoriteOffers(offers));
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};

export const postOffer = (offer) => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  const {id, isFavorite} = offer;
  const status = Number(!isFavorite);
  dispatch(startLoading());
  const url = `${APIRoute.FAVORITES}/${id}/${status}`;
  api.post(url, null, {headers: headers})
    .then(({data}) => {
      const newOffer = adaptOffer(data);
      dispatch(updateFavoriteOffers(newOffer));
      dispatch(updateOffer(newOffer));
      dispatch(updateNearbyOffers(newOffer));
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};
