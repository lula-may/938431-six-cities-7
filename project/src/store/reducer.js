import {CITIES, SortType} from '../const.js';
import {getOffersByCity, sortOffersByType} from '../utils.js';
import {OFFERS} from '../mocks/offers.js';
import {ActionType} from './action.js';

const defaultCity = CITIES[0];
const defaultSortType = SortType.POPULAR;
const offers = getOffersByCity(OFFERS, defaultCity);

const initialState = {
  city: defaultCity,
  offers,
  sortType: defaultSortType,
  sortedOffers: offers,
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
    case ActionType.SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case ActionType.SORT_OFFERS:
      return {...state,
        sortedOffers: sortOffersByType(action.payload, state.offers),
      };
    case ActionType.RESET_SORT_TYPE:
      return {
        ...state,
        sortType: defaultSortType,
        sortedOffers: state.offers,
      };
    default:
      return state;
  }
};

export {reducer};
