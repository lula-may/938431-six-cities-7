import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  LOAD_ROOM: 'ROOM/LOAD_ROOM',
  SET_ERROR: 'ROOM/SET_ERROR',
  START_LOADING: 'ROOM/START_LOADING',
};

export const setRoom = createAction(ActionType.LOAD_ROOM,
  (room) => ({payload: room}));

export const setError = createAction(ActionType.SET_ERROR);

export const startLoading = createAction(ActionType.START_LOADING);
