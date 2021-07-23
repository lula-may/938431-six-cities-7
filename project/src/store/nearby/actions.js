import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_NEARBY: 'NEARBY/LOAD_OFFERS',
  SET_ERROR: 'NEARBY/SET_ERROR',
  START_LOADING: 'NEARBY/START_LOADING',
};

export const setNearOffers = createAction(ActionType.LOAD_NEARBY,
  (offers) => ({
    payload: offers,
  }));

export const setError = createAction(ActionType.SET_ERROR);

export const startLoading = createAction(ActionType.START_LOADING);
