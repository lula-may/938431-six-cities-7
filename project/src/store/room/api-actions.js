import history from '../../browser-history';
import {setRoom, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchCurrentRoom = (id) => (dispatch, _getState, api) => {
  dispatch(startLoading());
  const url = `${APIRoute.OFFERS}/${id}`;
  api.get(url)
    .then(({data}) => {
      const offer = adaptOffer(data);
      dispatch(setRoom(offer));
    })
    .catch((err) => {
      if (err.response.status === 404) {
        history.push('/notfound');
      }
      dispatch(setError());
      return err;
    });
};
