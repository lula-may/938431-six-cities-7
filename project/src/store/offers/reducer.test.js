import { ActionType } from './actions';
import {reducer} from './reducer';


describe('Reducer: Offers', () => {
  it('should return Initial State without additional parameters passed', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isError: false,
        isLoading: true,
        city: 'Paris',
        offers: [],
        sortType: 'popular',
      });
  });

  it('should set passed value to offers', () => {
    const state = {
      isError: false,
      isLoading: true,
      city: 'Amsterdam',
      offers: [],
      sortType: 'priceUp',
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
        city: 'Amsterdam',
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
        sortType: 'priceUp',
      });
  });

  it('should set passed City', () => {
    const state = {
      isError: false,
      isLoading: false,
      city: 'Amsterdam',
      offers: [],
      sortType: 'priceUp',
    };

    expect(reducer(state, {
      type: ActionType.SET_CITY,
      payload: 'Moscow',
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        city: 'Moscow',
        offers: [],
        sortType: 'priceUp',
      });
  });

  it('should set Error and end Loading on SetError action passed', () => {
    const state = {
      isError: false,
      isLoading: true,
      city: 'Amsterdam',
      offers: [],
      sortType: 'priceUp',
    };
    expect(reducer(state, {
      type: ActionType.SET_ERROR,
    }))
      .toEqual({
        isError: true,
        isLoading: false,
        city: 'Amsterdam',
        offers: [],
        sortType: 'priceUp',
      });
  });

  it('should set passed type of sorting', () => {
    const state = {
      isError: false,
      isLoading: false,
      city: 'Amsterdam',
      offers: [],
      sortType: 'priceUp',
    };
    expect(reducer(state, {
      type: ActionType.SET_SORT_TYPE,
      payload: 'priceDown',
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        city: 'Amsterdam',
        offers: [],
        sortType: 'priceDown',
      });
  });

  it('should reset type of sorting to default', () => {
    const state = {
      isError: false,
      isLoading: false,
      city: 'Amsterdam',
      offers: [],
      sortType: 'priceUp',
    };
    expect(reducer(state, {
      type: ActionType.RESET_SORT_TYPE,
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        city: 'Amsterdam',
        offers: [],
        sortType: 'popular',
      });
  });

  it('should set isLoading = true and isError = false', () => {
    const state = {
      isError: true,
      isLoading: false,
      city: 'Amsterdam',
      offers: [],
      sortType: 'priceUp',
    };
    expect(reducer(state, {
      type: ActionType.START_LOADING,
    }))
      .toEqual({
        isError: false,
        isLoading: true,
        city: 'Amsterdam',
        offers: [],
        sortType: 'priceUp',
      });
  });
});
