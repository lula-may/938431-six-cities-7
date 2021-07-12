import {CITIES, SortType} from '../../const.js';
import {ActionType} from './actions.js';

const defaultCity = CITIES[0];
const defaultSortType = SortType.POPULAR;

const initialState = {
  isError: false,
  isLoading: false,
  city: defaultCity,
  favoriteOffers: [],
  offers: [],
  sortType: defaultSortType,
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
        offers: action.payload,
      };
    case ActionType.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        isError: true,
      };
    case ActionType.SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    case ActionType.RESET_SORT_TYPE:
      return {
        ...state,
        sortType: defaultSortType,
      };
    default:
      return state;
  }
};

export {reducer};
