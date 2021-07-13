import {ActionCreator} from './actions';
import {APIRoute} from '../../const.js';
import {adaptComment} from '../../services/adapter.js';

export const fetchComments = (id) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading());
  const url = `${APIRoute.COMMENTS}/${id}`;
  api.get(url)
    .then(({data}) => {
      const comments = data.map(adaptComment);
      dispatch(ActionCreator.loadComments(comments));
    })
    .then(() =>{
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.setError());
      return err;
    });
};
