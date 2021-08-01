import {ActionType} from './actions';
import {reducer} from './reducer';


describe('Reducer: Nearby Offers', () => {
  it('should return Initial State without additional parameters passed', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isError: false,
        isLoading: true,
        nearOffers: [],
      });
  });

  it('should set passed value to offers', () => {
    const state = {
      isError: false,
      isLoading: true,
      nearOffers: [],
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
      type: ActionType.LOAD_NEARBY,
      payload: offers,
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        nearOffers: [
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
      nearOffers: [],
    };
    expect(reducer(state, {
      type: ActionType.SET_ERROR,
    }))
      .toEqual({
        isError: true,
        isLoading: false,
        nearOffers: [],
      });
  });

  it('should set isLoading = true and isError = false', () => {
    const state = {
      isError: true,
      isLoading: false,
      nearOffers: [],
    };
    expect(reducer(state, {
      type: ActionType.START_LOADING,
    }))
      .toEqual({
        isError: false,
        isLoading: true,
        nearOffers: [],
      });
  });
});
