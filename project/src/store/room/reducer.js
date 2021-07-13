import {ActionType} from './actions.js';

const initialState = {
  room: null,
  isError: false,
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.LOAD_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        isError: true,
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    default:
      return state;
  }
};

export {reducer};
