export const ActionType = {
  END_LOADING: 'USER/END_LOADING',
  LOGOUT: 'USER/LOGOUT',
  SET_AUTHORIZATION_STATUS: 'USER/SET_AUTHORIZATION_STATUS',
  SET_ERROR: 'USER/SET_ERROR',
  SET_USER: 'USER/SET_USER',
  START_LOADING: 'USER/START_LOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  logout: () => ({
    type: ActionType.LOGOUT,
  }),

  setAuthorizationStatus: (status) => ({
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: status,
  }),

  setError: (error) => ({
    type: ActionType.SET_ERROR,
  }),

  setUser: (userInfo) => ({
    type: ActionType.SET_USER,
    payload: userInfo,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
};
