import {createReducer} from '@reduxjs/toolkit';
import {setNearOffers, setError, startLoading} from './actions.js';

const initialState = {
  nearOffers: [],
  isError: false,
  isLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNearOffers, (state, action) => {
      state.isLoading = false;
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
