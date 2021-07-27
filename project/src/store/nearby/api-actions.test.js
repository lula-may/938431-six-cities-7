import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute} from '../../const';
import {fetchNearOffers} from './api-actions';

let api = null;

describe('Async operations: Nearby Offers', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });

  const fakeOffers = [
    {
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
    },
  ];

  const adaptedOffers = [
    {
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
    },
  ];

  it('should make a correct API GET call to /offers/1/nearby and load offers nearby on success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const nearbyLoader = fetchNearOffers(id);
    const nearbyUrl = `${APIRoute.OFFERS}/${id}/nearby`;

    apiMock
      .onGet(nearbyUrl)
      .reply(200, fakeOffers);

    return nearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_NEARBY,
          payload: adaptedOffers,
        });
      });
  });

  it('should make a correct API GET call to /offers/1/nearby and set error on response error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const nearbyLoader = fetchNearOffers(id);
    const nearbyUrl = `${APIRoute.OFFERS}/${id}/nearby`;

    apiMock
      .onGet(nearbyUrl)
      .reply(400);

    return nearbyLoader(dispatch, () => {}, api)
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
