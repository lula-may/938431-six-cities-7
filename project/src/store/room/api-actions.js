import history from '../../browser-history';
import {ActionCreator} from './actions';
import {APIRoute} from '../../const.js';
import {adaptOffer} from '../../services/adapter.js';

export const fetchCurrentRoom = (id) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading());
  const url = `${APIRoute.OFFERS}/${id}`;
  api.get(url)
    .then(({data}) => {
      const offer = adaptOffer(data);
      dispatch(ActionCreator.loadRoom(offer));
    })
    .then(() =>{
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      if (err.response.status === 404) {
        history.push('/notfound');
      }
      dispatch(ActionCreator.setError());
      return err;
    });
};
