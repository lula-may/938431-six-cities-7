import {createReducer} from '@reduxjs/toolkit';
import {setFavoriteOffers, resetOffers, setError, startLoading} from './actions';

const initialState = {
  isError: false,
  isLoading: true,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavoriteOffers, (state, action) => {
      state.isLoading = false;
      state.offers = action.payload;
    })
    .addCase(resetOffers, (state) => {
      state.offers = [];
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
});
