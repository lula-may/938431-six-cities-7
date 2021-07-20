import {createReducer} from '@reduxjs/toolkit';
import {setRoom, setError, startLoading, setNotFound} from './actions.js';

const initialState = {
  room: null,
  isError: false,
  isLoading: true,
  isNotFound: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRoom, (state, action) => {
      state.isLoading = false;
      state.room = action.payload;
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(setNotFound, (state) => {
      state.isLoading = false;
      state.isNotFound = true;
    })
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.isNotFound = false;
      state.room = null;
    });
});

export {reducer};
