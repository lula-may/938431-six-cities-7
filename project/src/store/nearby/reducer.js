import {createReducer} from '@reduxjs/toolkit';
import {endLoading, loadNearOffers, setError, startLoading, updateNearbyOffers} from './actions.js';
import {replaceElement} from '../../utils';

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
    })
    .addCase(updateNearbyOffers, (state, action) => {
      state.nearOffers = replaceElement(action.payload, state.nearOffers);
    });

});

export {reducer};
