import {ActionType} from './actions.js';

const initialState = {
  comments: [],
  isError: false,
  isUploadingError: false,
  isLoading: true,
  isUploading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.END_UPLOADING:
      return {
        ...state,
        isUploading: false,
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case ActionType.SET_UPLOADING_ERROR:
      return {
        ...state,
        isUploadingError: true,
        isUploading: false,
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        comments: [],
        isError: false,
        isLoading: true,
      };
    case ActionType.START_UPLOADING:
      return {
        ...state,
        isUploadingError: false,
        isUploading: true,
      };
    default:
      return state;
  }
};

export {reducer};
