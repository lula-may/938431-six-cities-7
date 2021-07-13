export const ActionType = {
  END_LOADING: 'COMMENTS/END_LOADING',
  END_UPLOADING: 'COMMENTS/END_UPLOADING',
  LOAD_COMMENTS: 'COMMENTS/LOAD_COMMENTS',
  SET_ERROR: 'COMMENTS/SET_ERROR',
  SET_UPLOADING_ERROR: 'COMMENT/SET_UPLOADING_ERROR',
  START_LOADING: 'COMMENTS/START_LOADING',
  START_UPLOADING: 'COMMENTS/START_UPLOADING',
};

export const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  endUploading: () => ({
    type: ActionType.END_UPLOADING,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  setError: () => ({
    type: ActionType.SET_ERROR,
  }),

  setUploadingError: () => ({
    type: ActionType.SET_UPLOADING_ERROR,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),

  startUploading: () => ({
    type: ActionType.START_UPLOADING,
  }),
};
