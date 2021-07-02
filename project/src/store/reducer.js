import {CITIES} from '../const.js';
import {getOffersByCity} from '../utils.js';
import {OFFERS} from '../mocks/offers.js';
import {ActionType} from './action.js';

const defaultCity = CITIES[0];

const initialState = {
  city: defaultCity,
  offers: getOffersByCity(OFFERS, defaultCity),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
