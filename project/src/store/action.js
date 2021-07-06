export const ActionType = {
  RESET_SORT_TYPE: 'RESET_SORT_TYPE',
  SET_CITY: 'SET_CITY',
  SET_OFFERS: 'SET_OFFERS',
  SET_SORT_TYPE: 'SET_SORT_TYPE',
  SORT_OFFERS: 'SORT_OFFERS',
};

export const ActionCreator = {
  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: city,
  }),

  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers,
  }),

  setSortType: (sortType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  }),

  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  }),

  resetSortType: () => ({
    type: ActionType.RESET_SORT_TYPE,
  }),
};
