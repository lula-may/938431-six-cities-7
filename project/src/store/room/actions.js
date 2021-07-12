export const ActionType = {
  END_LOADING: 'ROOM/END_LOADING',
  LOAD_ROOM: 'ROOM/LOAD_ROOM',
  SET_ERROR: 'ROOM/SET_ERROR',
  START_LOADING: 'ROOM/START_LOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  loadRoom: (room) => ({
    type: ActionType.LOAD_ROOM,
    payload: room,
  }),

  setError: () => ({
    type: ActionType.SET_ERROR,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
};
