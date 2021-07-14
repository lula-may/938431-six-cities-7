import {createReducer} from '@reduxjs/toolkit';
import {endLoading, loadRoom, setError, startLoading} from './actions.js';

const initialState = {
  room: null,
  isError: false,
  isLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(endLoading, (state) => {
      state.isLoading = false;
    })
    .addCase(loadRoom, (state, action) => {
      state.room = action.payload;
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.room = null;
    });
});

export {reducer};
