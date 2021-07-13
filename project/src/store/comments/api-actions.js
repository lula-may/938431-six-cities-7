import {ActionCreator} from './actions';
import {APIRoute} from '../../const.js';
import {adaptComment} from '../../services/adapter.js';
import {getCurrentRoom} from '../room/selectors';

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

export const postComment = (comment) => (dispatch, getState, api) => {
  const state = getState();
  const id = getCurrentRoom(state).id;
  dispatch(ActionCreator.startUploading());
  const url = `${APIRoute.COMMENTS}/${id}`;
  api.post(url, comment)
    .then(({data}) => {
      const comments = data.map(adaptComment);
      dispatch(ActionCreator.loadComments(comments));
    })
    .then(() =>{
      dispatch(ActionCreator.endUploading());
    })
    .catch((err) => {
      dispatch(ActionCreator.setUploadingError());
      return err;
    });
};
