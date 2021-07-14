import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  END_LOADING: 'USER/END_LOADING',
  LOGOUT: 'USER/LOGOUT',
  SET_AUTHORIZATION_STATUS: 'USER/SET_AUTHORIZATION_STATUS',
  SET_ERROR: 'USER/SET_ERROR',
  SET_USER: 'USER/SET_USER',
  START_LOADING: 'USER/START_LOADING',
};

export const endLoading = createAction(ActionType.END_LOADING);

export const logout = createAction(ActionType.LOGOUT);

export const setAuthorizationStatus = createAction(ActionType.SET_AUTHORIZATION_STATUS,
  (status) => ({payload: status}));

export const setError = createAction(ActionType.SET_ERROR);

export const setUser = createAction(ActionType.SET_USER, (userInfo) => ({
  payload: userInfo,
}));

export const startLoading = createAction(ActionType.START_LOADING);
