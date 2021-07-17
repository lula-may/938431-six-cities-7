import {createReducer} from '@reduxjs/toolkit';
import {setComments, setError, setUploadingError, startLoading, startUploading} from './actions.js';

const initialState = {
  comments: [],
  isError: false,
  isUploadingError: false,
  isLoading: true,
  isUploading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
      state.isUploading = false;
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
