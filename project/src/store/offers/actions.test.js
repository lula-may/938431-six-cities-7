import {
  ActionType,
  resetSortType,
  setCity,
  setError,
  setOffers,
  setSortType,
  startLoading,
  updateOffer
} from './actions';

describe('Actions', () => {
  it('should return correct action for available offers to be set', () => {
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

    expect(setOffers(offers)).toEqual(expectedAction);
  });

  it('should return correct action for sort type to be reset', () => {
    const expectedAction = {
      type: ActionType.RESET_SORT_TYPE,
    };

    expect(resetSortType()).toEqual(expectedAction);
  });

  it('should return correct action for sort type to be set', () => {
    const expectedAction = {
      type: ActionType.SET_SORT_TYPE,
      payload: 'low to high',
    };

    const sortType = 'low to high';
    expect(setSortType(sortType)).toEqual(expectedAction);
  });

  it('should return correct action for error to be set', () => {
    const expectedAction = {
      type: ActionType.SET_ERROR,
    };

    expect(setError()).toEqual(expectedAction);
  });

  it('should return correct action for active city to be set', () => {
    const expectedAction = {
      type: ActionType.SET_CITY,
      payload: 'Moscow',
    };

    const city = 'Moscow';
    expect(setCity(city)).toEqual(expectedAction);
  });

  it('should return correct action for loading is started', () => {
    const expectedAction = {
      type: ActionType.START_LOADING,
    };

    expect(startLoading()).toEqual(expectedAction);
  });

  it('should return correct action for updating offers', () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFER,
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

    expect(updateOffer(offer)).toEqual(expectedAction);
  });
});
