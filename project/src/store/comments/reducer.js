import {createReducer} from '@reduxjs/toolkit';
import {endLoading, endUploading, loadComments, setError, setUploadingError, startLoading, startUploading} from './actions.js';

const initialState = {
  comments: [],
  isError: false,
  isUploadingError: false,
  isLoading: true,
  isUploading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(endLoading, (state) => {
      state.isLoading = false;
    })
    .addCase(endUploading, (state) => {
      state.isUploading = false;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(setUploadingError, (state) => {
      state.isUploadingError = true;
      state.isUploading = false;
    })
    .addCase(startLoading, (state) => {
      state.comments = [];
      state.isError = false;
      state.isLoading = true;
    })
    .addCase(startUploading, (state) => {
      state.isUploadingError = false;
      state.isUploading = true;
    });
});

export {reducer};
