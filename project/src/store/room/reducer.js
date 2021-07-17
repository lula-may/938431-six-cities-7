import {createReducer} from '@reduxjs/toolkit';
import {setRoom, setError, startLoading} from './actions.js';

const initialState = {
  room: null,
  isError: false,
  isLoading: true,
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
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.room = null;
    });
});

export {reducer};
