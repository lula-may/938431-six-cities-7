import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute} from '../../const';
import {fetchComments, postComment} from './api-actions';

let api = null;

describe('Async operations: Comments', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });

  const id = 1;
  const fakeComments = [
    {
      text: 'text',
      user: {
        'avatar_url': 'url',
        email: 'email',
        id: 2,
        'is_pro': false,
        name: 'name',
      },
    },
  ];

  const adaptedComments = [
    {
      text: 'text',
      user: {
        avatarUrl: 'url',
        email: 'email',
        id: 2,
        isPro: false,
        name: 'name',
      },
    },
  ];

  it('should make a correct API GET call to /comments/:id and load comment on success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = fetchComments(1);
    const commentsRoute = `${APIRoute.COMMENTS}/${id}`;

    apiMock
      .onGet(commentsRoute)
      .reply(200, fakeComments);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: adaptedComments,
        });
      });
  });

  it('should make a correct API GET call to /comments/:id and set error on response error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = fetchComments(id);
    const commentsRoute = `${APIRoute.COMMENTS}/${id}`;

    apiMock
      .onGet(commentsRoute)
      .reply(400);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_ERROR,
          payload: undefined,
        });
      });
  });

  it('should make a correct API POST call to /comments/:id and set new comments on success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentUploader = postComment(id);
    const commentsRoute = `${APIRoute.COMMENTS}/${id}`;

    const mockStore = {
      ROOM: {room: {id}},
    };

    apiMock
      .onPost(commentsRoute)
      .reply(200, fakeComments);

    return commentUploader(dispatch, () => mockStore, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_UPLOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: adaptedComments,
        });
      });
  });

  it('should make a correct API POST call to /comments/:id and set error on response error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentUploader = postComment(id);
    const commentsRoute = `${APIRoute.COMMENTS}/${id}`;

    const mockStore = {
      ROOM: {room: {id}},
    };

    apiMock
      .onPost(commentsRoute)
      .reply(400);

    return commentUploader(dispatch, () => mockStore, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_UPLOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_UPLOADING_ERROR,
          payload: undefined,
        });
      });
  });
});
