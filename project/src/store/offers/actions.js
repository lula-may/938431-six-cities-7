import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_OFFERS: 'OFFERS/LOAD_OFFERS',
  RESET_SORT_TYPE: 'OFFERS/RESET_SORT_TYPE',
  SET_CITY: 'OFFERS/SET_CITY',
  SET_ERROR: 'OFFERS/SET_ERROR',
  SET_SORT_TYPE: 'OFFERS/SET_SORT_TYPE',
  START_LOADING: 'OFFERS/START_LOADING',
  UPDATE_OFFER: 'OFFERS/UPDATE_OFFER',
};

export const setOffers = createAction(ActionType.LOAD_OFFERS,
  (offers) => ({payload: offers}));

export const setCity = createAction(ActionType.SET_CITY,
  (city) => ({payload: city}));

export const setError = createAction(ActionType.SET_ERROR);

export const setSortType = createAction(ActionType.SET_SORT_TYPE,
  (sortType) => ({payload: sortType}));

export const startLoading = createAction(ActionType.START_LOADING);

export const resetSortType = createAction(ActionType.RESET_SORT_TYPE);

export const updateOffer = createAction(ActionType.UPDATE_OFFER, (offer) => ({payload: offer}));
