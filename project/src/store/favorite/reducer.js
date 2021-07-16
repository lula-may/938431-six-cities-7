import {createReducer} from '@reduxjs/toolkit';
import {endLoading, loadFavoriteOffers, resetOffers, setError, startLoading, updateFavoriteOffers} from './actions';
import { updateElements } from '../../utils';
const initialState = {
  isError: false,
  isLoading: true,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(endLoading, (state) => {
      state.isLoading = false;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
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
      state.isLoading = true;
    })
    .addCase(updateFavoriteOffers, (state, action) => {
      state.offers = updateElements(action.payload, state.offers);
    });
});
