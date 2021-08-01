import {ActionType} from './actions';
import {reducer} from './reducer';


describe('Reducer: Comments', () => {
  it('should return Initial State without additional parameters passed', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        comments: [],
        isError: false,
        isUploadingError: false,
        isLoading: true,
        isUploading: false,
      });
  });

  it('should set passed comments', () => {
    const state = {
      comments: [],
      isError: false,
      isUploadingError: false,
      isLoading: true,
      isUploading: false,
    };

    const comments = [
      {
        comment: 'bla-bla-bla',
        date: '2021-01-01',
        id: 1,
        rating: 3,
        user: 'Peter',
      },
      {
        comment: 'tram-pam-pam',
        date: '2020-10-31',
        id: 2,
        rating: 4,
        user: 'Helen',
      },
    ];

    expect(reducer(state, {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    }))
      .toEqual({
        comments: [
          {
            comment: 'bla-bla-bla',
            date: '2021-01-01',
            id: 1,
            rating: 3,
            user: 'Peter',
          },
          {
            comment: 'tram-pam-pam',
            date: '2020-10-31',
            id: 2,
            rating: 4,
            user: 'Helen',
          },
        ],
        isError: false,
        isUploadingError: false,
        isLoading: false,
        isUploading: false,
      });
  });

  it('should set Error and stop Loading on SetError action passed', () => {
    const state = {
      comments: [],
      isError: false,
      isUploadingError: false,
      isLoading: true,
      isUploading: false,
    };
    expect(reducer(state, {
      type: ActionType.SET_ERROR,
    }))
      .toEqual({
        comments: [],
        isError: true,
        isUploadingError: false,
        isLoading: false,
        isUploading: false,
      });
  });

  it('should set Uploading Error and stop Loading on SetUploadingError action passed', () => {
    const state = {
      comments: [
        {
          comment: 'tram-pam-pam',
          date: '2020-10-31',
          id: 2,
          rating: 4,
          user: 'Helen',
        },
      ],
      isError: false,
      isUploadingError: false,
      isLoading: false,
      isUploading: true,
    };
    expect(reducer(state, {
      type: ActionType.SET_UPLOADING_ERROR,
    }))
      .toEqual({
        comments: [
          {
            comment: 'tram-pam-pam',
            date: '2020-10-31',
            id: 2,
            rating: 4,
            user: 'Helen',
          },
        ],
        isError: false,
        isUploadingError: true,
        isLoading: false,
        isUploading: false,
      });
  });

  it('should set isLoading = true and reset loading error on startLoading action passed', () => {
    const state = {
      comments: [],
      isError: true,
      isUploadingError: false,
      isLoading: false,
      isUploading: false,
    };
    expect(reducer(state, {
      type: ActionType.START_LOADING,
    }))
      .toEqual({
        comments: [],
        isError: false,
        isUploadingError: false,
        isLoading: true,
        isUploading: false,
      });
  });

  it('should set isUploading = true and reset uploading error on startUploading action passed', () => {
    const state = {
      comments: [
        {
          comment: 'tram-pam-pam',
          date: '2020-10-31',
          id: 2,
          rating: 4,
          user: 'Helen',
        },
      ],
      isError: false,
      isUploadingError: true,
      isLoading: false,
      isUploading: false,
    };
    expect(reducer(state, {
      type: ActionType.START_UPLOADING,
    }))
      .toEqual({
        comments: [
          {
            comment: 'tram-pam-pam',
            date: '2020-10-31',
            id: 2,
            rating: 4,
            user: 'Helen',
          },
        ],
        isError: false,
        isUploadingError: false,
        isLoading: false,
        isUploading: true,
      });
  });
});
