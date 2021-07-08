export const ActionType = {
  CLEAR_ERROR: 'USER/CLEAR_ERROR',
  END_LOADING: 'USER/END_LOADING',
  LOGOUT: 'USER/LOGOUT',
  REQUIRE_AUTHORIZATION: 'USER/REQUIRE_AUTHORIZATION',
  SET_ERROR: 'USER/SET_ERROR',
  SET_USER: 'USER/SET_USER',
  START_LOADING: 'USER/START_LOADING',
};

export const ActionCreator = {
  clearError: () => ({
    type: ActionType.CLEAR_ERROR,
  }),

  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  logout: () => ({
    type: ActionType.LOGOUT,
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
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
