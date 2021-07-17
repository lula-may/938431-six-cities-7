import {createReducer} from '@reduxjs/toolkit';
import {CITIES, SortType} from '../../const.js';
import {setOffers, resetSortType, setCity, setError, setSortType, startLoading, updateOffer} from './actions.js';
import { replaceElement } from '../../utils.js';

const defaultCity = CITIES[0];
const defaultSortType = SortType.POPULAR;

const initialState = {
  isError: false,
  isLoading: true,
  city: defaultCity,
  offers: [],
  sortType: defaultSortType,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.isLoading = false;
      state.offers = action.payload;
    })
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
    })
    .addCase(resetSortType, (state) => {
      state.sortType = defaultSortType;
    })
    .addCase(updateOffer, (state, action) => {
      state.offers = replaceElement(action.payload, state.offers);
    });
});

export {reducer};
