export const ActionType = {
  END_LOADING: 'OFFERS/END_LOADING',
  LOAD_OFFERS: 'OFFERS/LOAD_OFFERS',
  LOAD_FAVORITE_OFFERS: 'OFFERS/LOAD_FAVORITE_OFFERS',
  RESET_SORT_TYPE: 'OFFERS/RESET_SORT_TYPE',
  SET_CITY: 'OFFERS/SET_CITY',
  SET_ERROR: 'OFFERS/SET_ERROR',
  SET_SORT_TYPE: 'OFFERS/SET_SORT_TYPE',
  START_LOADING: 'OFFERS/START_LOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  loadFavoriteOffers: (offers) => ({
    type: ActionType.LOAD_FAVORITE_OFFERS,
    payload: offers,
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),

  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: city,
  }),

  setSortType: (sortType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),

  resetSortType: () => ({
    type: ActionType.RESET_SORT_TYPE,
  }),
};
