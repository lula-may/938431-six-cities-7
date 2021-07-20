import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_NEAR_OFFERS: 'NEAR_OFFERS/LOAD_NEAR_OFFERS',
  SET_ERROR: 'NEAR_OFFERS/SET_ERROR',
  START_LOADING: 'NEAR_OFFERS/START_LOADING',
};

export const setNearOffers = createAction(ActionType.LOAD_NEAR_OFFERS,
  (offers) => ({
    payload: offers,
  }));

export const setError = createAction(ActionType.SET_ERROR);

export const startLoading = createAction(ActionType.START_LOADING);
