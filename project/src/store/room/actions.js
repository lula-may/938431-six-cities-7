import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_ROOM: 'ROOM/LOAD_ROOM',
  SET_ERROR: 'ROOM/SET_ERROR',
  SET_NOT_FOUND: 'ROOM/SET_NOT_FOUND',
  START_LOADING: 'ROOM/START_LOADING',
};

export const setError = createAction(ActionType.SET_ERROR);

export const setNotFound = createAction(ActionType.SET_NOT_FOUND);

export const setRoom = createAction(ActionType.LOAD_ROOM,
  (room) => ({payload: room}));

export const startLoading = createAction(ActionType.START_LOADING);
