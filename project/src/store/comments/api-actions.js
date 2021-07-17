import {setComments, setError, setUploadingError, startUploading, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptComment} from '../../services/adapter.js';
import {getCurrentRoom} from '../room/selectors';

export const fetchComments = (id) => (dispatch, _getState, api) => {
  dispatch(startLoading());
  const url = `${APIRoute.COMMENTS}/${id}`;
  api.get(url)
    .then(({data}) => {
      const comments = data.map(adaptComment);
      dispatch(setComments(comments));
    })
    .catch((err) => {
      dispatch(setError());
      return err;
    });
};

export const postComment = (comment) => (dispatch, getState, api) => {
  const state = getState();
  const id = getCurrentRoom(state).id;
  dispatch(startUploading());
  const url = `${APIRoute.COMMENTS}/${id}`;
  api.post(url, comment)
    .then(({data}) => {
      const comments = data.map(adaptComment);
      dispatch(setComments(comments));
    })
    .catch((err) => {
      dispatch(setUploadingError());
      return err;
    });
};
