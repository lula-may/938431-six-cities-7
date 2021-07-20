import {createAction} from '@reduxjs/toolkit';
export const ActionType = {
  LOAD_COMMENTS: 'COMMENTS/LOAD_COMMENTS',
  SET_ERROR: 'COMMENTS/SET_ERROR',
  SET_UPLOADING_ERROR: 'COMMENT/SET_UPLOADING_ERROR',
  START_LOADING: 'COMMENTS/START_LOADING',
  START_UPLOADING: 'COMMENTS/START_UPLOADING',
};

export const setComments = createAction(ActionType.LOAD_COMMENTS,
  (comments) => ({
    payload: comments,
  }));

export const setError = createAction(ActionType.SET_ERROR);

export const setUploadingError = createAction(ActionType.SET_UPLOADING_ERROR);

export const startLoading = createAction(ActionType.START_LOADING);

export const startUploading = createAction(ActionType.START_UPLOADING);
