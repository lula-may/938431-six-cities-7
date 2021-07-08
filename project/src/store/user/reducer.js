import {AuthorizationStatus} from '../../const';
import {ActionType} from './actions.js';

const initialState = {
  userEmail: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.SET_USER:
      return {
        ...state,
        userEmail: action.payload,
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export {reducer};
