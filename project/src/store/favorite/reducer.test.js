import {ActionType} from './actions';
import {reducer} from './reducer';


describe('Reducer: Favorite Offers', () => {
  it('should return Initial State without additional parameters passed', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isError: false,
        isLoading: true,
        offers: [],
      });
  });

  it('should set passed value to offers', () => {
    const state = {
      isError: false,
      isLoading: true,
      offers: [],
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

    expect(reducer(state, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        offers: [
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
      });
  });

  it('should set Error and end Loading on SetError action passed', () => {
    const state = {
      isError: false,
      isLoading: true,
      offers: [],
    };
    expect(reducer(state, {
      type: ActionType.SET_ERROR,
    }))
      .toEqual({
        isError: true,
        isLoading: false,
        offers: [],
      });
  });

  it('should set isLoading = true and isError = false', () => {
    const state = {
      isError: true,
      isLoading: false,
      offers: [],
    };
    expect(reducer(state, {
      type: ActionType.START_LOADING,
    }))
      .toEqual({
        isError: false,
        isLoading: true,
        offers: [],
      });
  });

  it('should reset favorite offers', () => {
    const state = {
      isError: false,
      isLoading: false,
      offers: [
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

    expect(reducer(state, {
      type: ActionType.RESET_OFFERS,
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        offers: [],
      });
  });
});
