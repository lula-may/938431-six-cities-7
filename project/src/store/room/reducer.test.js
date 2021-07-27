import {ActionType} from './actions';
import {reducer} from './reducer';


describe('Reducer: Room', () => {
  it('should return Initial State without additional parameters passed', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isError: false,
        isLoading: true,
        isNotFound: false,
        room: null,
      });
  });

  it('should set passed room', () => {
    const state = {
      isError: false,
      isLoading: true,
      isNotFound: false,
      room: null,
    };

    const room = {
      bedrooms: 3,
      city: 'Paris',
      id: 1,
      description: 'text1',
      host: 'host1',
      isFavorite: true,
    };

    expect(reducer(state, {
      type: ActionType.LOAD_ROOM,
      payload: room,
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        isNotFound: false,
        room: {
          bedrooms: 3,
          city: 'Paris',
          id: 1,
          description: 'text1',
          host: 'host1',
          isFavorite: true,
        },
      });
  });

  it('should set Error and end Loading on SetError action passed', () => {
    const state = {
      isError: false,
      isLoading: true,
      isNotFound: false,
      room: null,
    };
    expect(reducer(state, {
      type: ActionType.SET_ERROR,
    }))
      .toEqual({
        isError: true,
        isLoading: false,
        isNotFound: false,
        room: null,
      });
  });

  it('should set isLoading = true and isError = false', () => {
    const state = {
      isError: true,
      isLoading: false,
      isNotFound: false,
      room: null,
    };
    expect(reducer(state, {
      type: ActionType.START_LOADING,
    }))
      .toEqual({
        isError: false,
        isLoading: true,
        isNotFound: false,
        room: null,
      });
  });

  it('should set isNotFound = true and isLoading = false', () => {
    const state = {
      isError: false,
      isLoading: true,
      isNotFound: false,
      room: null,
    };
    expect(reducer(state, {
      type: ActionType.SET_NOT_FOUND,
    }))
      .toEqual({
        isError: false,
        isLoading: false,
        isNotFound: true,
        room: null,
      });
  });
});
