import {
  ActionType,
  resetOffers,
  setFavoriteOffers,
  setError,
  startLoading
} from './actions';

describe('Actions', () => {
  it('should return correct action for favorite offers to be set', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [
        {
          bedrooms: 3,
          city: 'Paris',
          id: 1,
          description: 'text1',
          host: 'host1',
          isFavorite: true,
        },
        {
          bedrooms: 5,
          city: 'Amsterdam',
          id: 2,
          description: 'text2',
          host: 'host2',
          isFavorite: true,
        },
      ],
    };

    const offers = [
      {
        bedrooms: 3,
        city: 'Paris',
        id: 1,
        description: 'text1',
        host: 'host1',
        isFavorite: true,
      },
      {
        bedrooms: 5,
        city: 'Amsterdam',
        id: 2,
        description: 'text2',
        host: 'host2',
        isFavorite: true,
      },
    ];

    expect(setFavoriteOffers(offers)).toEqual(expectedAction);
  });

  it('should return correct action for favorite offers to be reset', () => {
    const expectedAction = {
      type: ActionType.RESET_OFFERS,
    };

    expect(resetOffers()).toEqual(expectedAction);
  });


  it('should return correct action for error to be set', () => {
    const expectedAction = {
      type: ActionType.SET_ERROR,
    };

    expect(setError()).toEqual(expectedAction);
  });


  it('should return correct action for loading is started', () => {
    const expectedAction = {
      type: ActionType.START_LOADING,
    };

    expect(startLoading()).toEqual(expectedAction);
  });
});
