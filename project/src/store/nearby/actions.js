export const ActionType = {
  END_LOADING: 'NEAR_OFFERS/END_LOADING',
  LOAD_NEAR_OFFERS: 'NEAR_OFFERS/LOAD_NEAR_OFFERS',
  SET_ERROR: 'NEAR_OFFERS/SET_ERROR',
  START_LOADING: 'NEAR_OFFERS/START_LOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  loadNearOffers: (offers) => ({
    type: ActionType.LOAD_NEAR_OFFERS,
    payload: offers,
  }),

  setError: () => ({
    type: ActionType.SET_ERROR,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
};
