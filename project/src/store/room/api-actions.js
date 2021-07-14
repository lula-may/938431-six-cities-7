import history from '../../browser-history';
import {endLoading, loadRoom, setError, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchCurrentRoom = (id) => (dispatch, _getState, api) => {
  dispatch(startLoading());
  const url = `${APIRoute.OFFERS}/${id}`;
  api.get(url)
    .then(({data}) => {
      const offer = adaptOffer(data);
      dispatch(loadRoom(offer));
    })
    .then(() =>{
      dispatch(endLoading());
    })
    .catch((err) => {
      if (err.response.status === 404) {
        history.push('/notfound');
      }
      dispatch(setError());
      return err;
    });
};
