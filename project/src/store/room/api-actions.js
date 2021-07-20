import {setRoom, setError, startLoading, setNotFound} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';
import { getToken } from '../user/selectors.js';

export const fetchCurrentRoom = (id) => (dispatch, getState, api) => {
  const headers = {'X-Token': getToken(getState())};
  dispatch(startLoading());
  const url = `${APIRoute.OFFERS}/${id}`;
  api.get(url, {headers: headers})
    .then(({data}) => {
      const offer = adaptOffer(data);
      dispatch(setRoom(offer));
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch(setNotFound());
        return;
      }
      dispatch(setError());
      return err;
    });
};
