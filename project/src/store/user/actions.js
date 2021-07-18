import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  LOGOUT: 'USER/LOGOUT',
  SET_AUTHORIZATION_STATUS: 'USER/SET_AUTHORIZATION_STATUS',
  SET_ERROR: 'USER/SET_ERROR',
  SET_TOKEN: 'USER/SET_TOKEN',
  SET_USER: 'USER/SET_USER',
  START_LOADING: 'USER/START_LOADING',
};

export const logout = createAction(ActionType.LOGOUT);

export const setAuthorizationStatus = createAction(ActionType.SET_AUTHORIZATION_STATUS,
  (status) => ({payload: status}));

export const setError = createAction(ActionType.SET_ERROR);

export const setToken = createAction(ActionType.SET_TOKEN, (token) => ({payload: token}));

export const setUser = createAction(ActionType.SET_USER, (userInfo) => ({
  payload: userInfo,
}));

export const startLoading = createAction(ActionType.START_LOADING);
