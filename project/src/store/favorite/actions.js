import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_OFFERS: 'FAVORITE/LOAD_OFFERS',
  RESET_OFFERS: 'FAVORITE/RESET_OFFERS',
  SET_ERROR: 'FAVORITE/SET_ERROR',
  START_LOADING: 'FAVORITE/START_LOADING',
};

export const setFavoriteOffers = createAction(ActionType.LOAD_OFFERS,
  (offers) => ({payload: offers}));

export const resetOffers = createAction(ActionType.RESET_OFFERS);

export const setError = createAction(ActionType.SET_ERROR);

export const startLoading = createAction(ActionType.START_LOADING);
