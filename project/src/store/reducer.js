import {CITIES, SortType} from '../const.js';
import {sortOffersByType} from '../utils.js';
import {ActionType} from './action.js';

const defaultCity = CITIES[0];
const defaultSortType = SortType.POPULAR;
// const offers = getOffersByCity(OFFERS, defaultCity);

const initialState = {
  allOffers: [],
  isLoading: false,
  city: defaultCity,
  offers: [],
  sortType: defaultSortType,
  sortedOffers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        allOffers: action.payload,
      };
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
        sortedOffers: sortOffersByType(state.offers, action.payload),
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        isLoading: true,
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
