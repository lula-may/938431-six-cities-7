import {createReducer} from '@reduxjs/toolkit';
import {endLoading, loadNearOffers, setError, startLoading} from './actions.js';

const initialState = {
  nearOffers: [],
  isError: false,
  isLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(endLoading, (state) => {
      state.isLoading = false;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
      state.nearOffers = [];
    });
});

export {reducer};
