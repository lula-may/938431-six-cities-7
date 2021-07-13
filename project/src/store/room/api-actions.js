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
      dispatch(ActionCreator.setError());
      dispatch(ActionCreator.endLoading());
      return err;
    });
};
