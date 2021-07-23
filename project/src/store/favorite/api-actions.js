import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';
import {getFavoriteOffers} from '../favorite/selectors.js';
import {getNearOffers} from '../nearby/selectors.js';
import {getOffers} from '../offers/selectors.js';
import {setFavoriteOffers, setError, startLoading} from './actions';
import {setOffers} from '../offers/actions.js';
import {setNearOffers} from '../nearby/actions.js';
import {setRoom} from '../room/actions.js';
import {replaceOffer, updateOffersList} from '../../utils.js';
import { getCurrentRoom } from '../room/selectors.js';
export const fetchFavoriteList = () => (dispatch, _getState, api) => {
  dispatch(startLoading());
  api.get(APIRoute.FAVORITES)
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
  const {id, isFavorite} = offer;
  const status = Number(!isFavorite);
  dispatch(startLoading());
  const url = `${APIRoute.FAVORITES}/${id}/${status}`;
  api.post(url, null)
    .then(({data}) => {
      const newOffer = adaptOffer(data);
      const state = getState();
      const favoriteOffers = updateOffersList(newOffer, getFavoriteOffers(state));
      const [allOffers] = replaceOffer(newOffer, getOffers(state));
      const [nearOffers, isNearbyUpdated] = replaceOffer(newOffer, getNearOffers(state));
      const currentRoom = getCurrentRoom(state);
      const isCurrentRoomUpdated = currentRoom && currentRoom.id === newOffer.id;

      dispatch(setFavoriteOffers(favoriteOffers));
      dispatch(setOffers(allOffers));
      isNearbyUpdated && dispatch(setNearOffers(nearOffers));
      isCurrentRoomUpdated && dispatch(setRoom(newOffer));
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};
