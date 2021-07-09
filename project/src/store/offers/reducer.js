import {CITIES, SortType} from '../../const.js';
import {ActionType} from './actions.js';

const defaultCity = CITIES[0];
const defaultSortType = SortType.POPULAR;

const initialState = {
  isLoading: false,
  city: defaultCity,
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
    case ActionType.SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
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
      };
    default:
      return state;
  }
};

export {reducer};
