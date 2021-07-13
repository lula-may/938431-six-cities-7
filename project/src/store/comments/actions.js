export const ActionType = {
  END_LOADING: 'COMMENTS/END_LOADING',
  LOAD_COMMENTS: 'COMMENTS/LOAD_COMMENTS',
  SET_ERROR: 'COMMENTS/SET_ERROR',
  START_LOADING: 'COMMENTS/START_LOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  setError: () => ({
    type: ActionType.SET_ERROR,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
};
