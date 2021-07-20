import {setComments, setError, setUploadingError, startUploading, startLoading} from './actions';
import {APIRoute} from '../../const.js';
import {adaptComment} from '../../services/adapter.js';
import {getCurrentRoom} from '../room/selectors';
import { getToken } from '../user/selectors.js';

export const fetchComments = (id) => (dispatch, getState, api) => {
  dispatch(startLoading());
  const headers = {'X-Token': getToken(getState())};
  const url = `${APIRoute.COMMENTS}/${id}`;
  api.get(url, {headers: headers})
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
  const headers = {'X-Token': getToken(state)};
  dispatch(startUploading());
  const url = `${APIRoute.COMMENTS}/${id}`;
  api.post(url, comment, {headers: headers})
    .then(({data}) => {
      const comments = data.map(adaptComment);
      dispatch(setComments(comments));
    })
    .catch((err) => {
      dispatch(setUploadingError());
      return err;
    });
};
