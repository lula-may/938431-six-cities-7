import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute} from '../../const';
import {fetchFavoriteList, postOffer} from './api-actions';

let api = null;

describe('Async operations: Favorite Offers', () => {
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

  it('should make a correct API GET call to /favorite and load favorite offers on success', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavoriteList();

    apiMock
      .onGet(APIRoute.FAVORITES)
      .reply(200, fakeOffers);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedOffers,
        });
      });
  });

  it('should make a correct API GET call to /favorite and set error on response error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = fetchFavoriteList();

    apiMock
      .onGet(APIRoute.FAVORITES)
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

  it('should delete offer from favorite list on API POST call to /favorite when passed offer is already in  favorite list', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const isFavorite = true;

    const fakeOffer = {
      id: 1,
      host: {
        avatarUrl: 'url',
        email: 'email',
        id: 2,
        isPro: false,
        name: 'name',
      },
      isFavorite,
      isPremium: false,
      maxAdults: 4,
      previewImage: 'img.jpg',
    };

    const fakeRawOffer = {
      id: 1,
      host: {
        'avatar_url': 'url',
        email: 'email',
        id: 2,
        'is_pro': false,
        name: 'name',
      },
      'is_favorite': false,
      'is_premium': false,
      'max_adults': 4,
      'preview_image': 'img.jpg',
    };

    const changedOffers = [
      {
        id: 1,
        host: {
          avatarUrl: 'url',
          email: 'email',
          id: 2,
          isPro: false,
          name: 'name',
        },
        isFavorite: false,
        isPremium: false,
        maxAdults: 4,
        previewImage: 'img.jpg',
      },
    ];
    const favoriteUploader = postOffer(fakeOffer);

    const mockStore = {
      FAVORITE: {offers: adaptedOffers},
      NEAR_OFFERS: {nearOffers: []},
      ROOM: {room: null},
      OFFERS: {offers: adaptedOffers},
    };

    const favoriteRoot = `${APIRoute.FAVORITES}/1/0`;
    apiMock
      .onPost(favoriteRoot)
      .reply(200, fakeRawOffer);

    return favoriteUploader(dispatch, () => mockStore, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: [],
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: 'OFFERS/LOAD_OFFERS',
          payload: changedOffers,
        });
      });
  });

  it('should add offer to favorite list on API POST call to /favorite when passed offer is not in favorite list', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const fakeOffer = {
      id: 1,
      host: {
        avatarUrl: 'url',
        email: 'email',
        id: 2,
        isPro: false,
        name: 'name',
      },
      isFavorite: false,
      isPremium: false,
      maxAdults: 4,
      previewImage: 'img.jpg',
    };

    const fakeRawOffer = {
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

    const mockOffers = [
      {
        id: 1,
        host: {
          avatarUrl: 'url',
          email: 'email',
          id: 2,
          isPro: false,
          name: 'name',
        },
        isFavorite: false,
        isPremium: false,
        maxAdults: 4,
        previewImage: 'img.jpg',
      },
    ];

    const changedOffers = [
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
    const favoriteUploader = postOffer(fakeOffer);

    const mockStore = {
      FAVORITE: {offers: []},
      NEAR_OFFERS: {nearOffers: []},
      ROOM: {room: null},
      OFFERS: {offers: mockOffers},
    };

    const favoriteRoot = `${APIRoute.FAVORITES}/1/1`;
    apiMock
      .onPost(favoriteRoot)
      .reply(200, fakeRawOffer);

    return favoriteUploader(dispatch, () => mockStore, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: changedOffers,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: 'OFFERS/LOAD_OFFERS',
          payload: changedOffers,
        });
      });
  });

  it('should make a correct API POST call to /favorite and set error on response error', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const fakeOffer = {
      id: 1,
      host: {
        avatarUrl: 'url',
        email: 'email',
        id: 2,
        isPro: false,
        name: 'name',
      },
      isFavorite: false,
      isPremium: false,
      maxAdults: 4,
      previewImage: 'img.jpg',
    };

    const favoriteUploader = postOffer(fakeOffer);
    const favoriteRoot = `${APIRoute.FAVORITES}/1/1`;


    apiMock
      .onPost(favoriteRoot)
      .reply(400);

    return favoriteUploader(dispatch, () => {}, api)
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
