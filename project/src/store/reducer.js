import {CITIES} from '../const.js';
import {OFFERS} from '../mocks/offers.js';
import { getOffersByCity } from '../utils.js';
import {ActionType} from './action.js';

const initialState = {
  city: CITIES[0],
  offers: getOffersByCity(OFFERS),
  allOffers: OFFERS,
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
