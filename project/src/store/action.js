export const ActionType = {
  SET_CITY: 'SET_CITY',
  SET_OFFERS: 'SET_OFFERS',
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
};
