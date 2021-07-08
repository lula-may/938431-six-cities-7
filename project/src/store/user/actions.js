export const ActionType = {
  END_LOADING: 'USER/END_LOADING',
  LOGOUT: 'USER/LOGOUT',
  REQUIRE_AUTHORIZATION: 'USER/REQUIRE_AUTHORIZATION',
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

  requireAuthorization: (status) =>({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),

  setUser: (userInfo) => ({
    type: ActionType.SET_USER,
    payload: userInfo,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
};
