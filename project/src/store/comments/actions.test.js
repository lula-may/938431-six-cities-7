import {
  ActionType,
  setComments,
  setError,
  setUploadingError,
  startLoading,
  startUploading
} from './actions';

describe('Actions', () => {
  it('should return correct action for comments to be set', () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: [
        {
          comment: 'text1',
          date: '01-07-2021',
          id: 5,
          rating: 3.2,
          user: 'host1',
        },
        {
          comment: 'text2',
          date: '10-07-2021',
          id: 10,
          rating: 4.9,
          user: 'host2',
        },
      ],
    };

    const comments = [
      {
        comment: 'text1',
        date: '01-07-2021',
        id: 5,
        rating: 3.2,
        user: 'host1',
      },
      {
        comment: 'text2',
        date: '10-07-2021',
        id: 10,
        rating: 4.9,
        user: 'host2',
      },
    ];

    expect(setComments(comments)).toEqual(expectedAction);
  });

  it('should return correct action for error to be set', () => {
    const expectedAction = {
      type: ActionType.SET_ERROR,
    };

    expect(setError()).toEqual(expectedAction);
  });

  it('should return correct action for uploading error to be set', () => {
    const expectedAction = {
      type: ActionType.SET_UPLOADING_ERROR,
    };

    expect(setUploadingError()).toEqual(expectedAction);
  });

  it('should return correct action for loading is started', () => {
    const expectedAction = {
      type: ActionType.START_LOADING,
    };

    expect(startLoading()).toEqual(expectedAction);
  });

  it('should return correct action for uploading is started', () => {
    const expectedAction = {
      type: ActionType.START_UPLOADING,
    };

    expect(startUploading()).toEqual(expectedAction);
  });
});
