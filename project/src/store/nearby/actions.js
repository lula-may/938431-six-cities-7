import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  END_LOADING: 'NEARBY/END_LOADING',
  LOAD_NEARBY: 'NEARBY/LOAD_OFFERS',
  SET_ERROR: 'NEARBY/SET_ERROR',
  START_LOADING: 'NEARBY/START_LOADING',
  UPDATE_OFFERS: 'NEARBY/UPDATE_OFFERS',

};

export const endLoading = createAction(ActionType.END_LOADING);

export const loadNearOffers = createAction(ActionType.LOAD_NEARBY,
  (offers) => ({
    payload: offers,
  }));

export const setError = createAction(ActionType.SET_ERROR);

export const startLoading = createAction(ActionType.START_LOADING);

export const updateNearbyOffers = createAction(ActionType.UPDATE_OFFERS, (offer) => ({payload: offer}));
