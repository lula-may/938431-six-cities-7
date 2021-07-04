export const ActionType = {
  END_LOADING: 'END_LOADING',
  LOAD_OFFERS: 'LOAD_OFFERS',
  RESET_SORT_TYPE: 'RESET_SORT_TYPE',
  SET_CITY: 'SET_CITY',
  SET_OFFERS: 'SET_OFFERS',
  SET_SORT_TYPE: 'SET_SORT_TYPE',
  SORT_OFFERS: 'SORT_OFFERS',
  START_LOADING: 'START_LOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),

  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: city,
  }),

  setOffers: () => ({
    type: ActionType.SET_OFFERS,
  }),

  setSortType: (sortType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  }),

  sortOffers: () => ({
    type: ActionType.SORT_OFFERS,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),

  resetSortType: () => ({
    type: ActionType.RESET_SORT_TYPE,
  }),
};
