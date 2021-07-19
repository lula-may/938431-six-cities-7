import {
  ActionType,
  setNearOffers,
  setError,
  startLoading,
  updateNearbyOffers
} from './actions';

describe('Actions', () => {
  it('should return correct action for nearby offers to be set', () => {
    const expectedAction = {
      type: ActionType.LOAD_NEARBY,
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

    expect(setNearOffers(offers)).toEqual(expectedAction);
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

  it('should return correct action for updating nearby offers', () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: {
        bedrooms: 5,
        city: 'Amsterdam',
        id: 2,
        description: 'text2',
        host: 'host2',
        isFavorite: false,
      },
    };

    const offer = {
      bedrooms: 5,
      city: 'Amsterdam',
      id: 2,
      description: 'text2',
      host: 'host2',
      isFavorite: false,
    };

    expect(updateNearbyOffers(offer)).toEqual(expectedAction);
  });
});
