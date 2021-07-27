import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute} from '../../const';
import {fetchCurrentRoom} from './api-actions';

let api = null;

describe('Async operations: Room', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });

  const fakeOffer = {
    id: 1,
    host: {
      'avatar_url': 'url',
      email: 'email',
      id: 2,
      'is_pro': false,
      name: 'name',
    },
    'is_favorite': true,
    'is_premium': false,
    'max_adults': 4,
    'preview_image': 'img.jpg',
  };

  const adaptedOffer = {
    id: 1,
    host: {
      avatarUrl: 'url',
      email: 'email',
      id: 2,
      isPro: false,
      name: 'name',
    },
    isFavorite: true,
    isPremium: false,
    maxAdults: 4,
    previewImage: 'img.jpg',
  };

  it('should make a correct API GET call to /offers/:id and load current room on success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const roomLoader = fetchCurrentRoom(id);

    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}`)
      .reply(200, fakeOffer);

    return roomLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_ROOM,
          payload: adaptedOffer,
        });
      });
  });

  it('should set isNotFound on 404 response status', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 100;
    const roomLoader = fetchCurrentRoom(id);

    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}`)
      .reply(404);

    return roomLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_NOT_FOUND,
          payload: undefined,
        });
      });
  });

  it('should set loading Error on response error except 404 status', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const roomLoader = fetchCurrentRoom(id);

    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}`)
      .reply(400);

    return roomLoader(dispatch, () => {}, api)
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
});
