import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute} from '../../const';
import {fetchOfferList} from './api-actions';

let api = null;

describe('Async operations: Offers', () => {
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

  it('should make a correct API GET call to /offers and load offers on success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOfferList();

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(200, fakeOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedOffers,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.RESET_SORT_TYPE,
          payload: undefined,
        });
      });
  });

  it('should make a correct API GET call to /offers and set error on response error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOfferList();

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(400);

    return offersLoader(dispatch, () => {}, api)
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
