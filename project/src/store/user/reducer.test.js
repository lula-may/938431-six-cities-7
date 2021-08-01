import {ActionType} from './actions';
import {reducer} from './reducer';


describe('Reducer: User', () => {
  it('should return Initial State without additional parameters passed', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        authorizationStatus: 'UNKNOWN',
        isError: false,
        isLoading: true,
        userEmail: null,
      });
  });

  it('should logout user and reset user email', () => {
    const state = {
      authorizationStatus: 'AUTH',
      isError: false,
      isLoading: false,
      userEmail: 'user@mail.ru',
    };

    expect(reducer(state, {
      type: ActionType.LOGOUT,
    }))
      .toEqual({
        authorizationStatus: 'NO_AUTH',
        isError: false,
        isLoading: false,
        userEmail: null,
      });
  });

  it('should set user email', () => {
    const state = {
      authorizationStatus: 'NO_AUTH',
      isError: false,
      isLoading: false,
      userEmail: null,
    };

    expect(reducer(state, {
      type: ActionType.SET_USER,
      payload: 'user@mail.ru',
    }))
      .toEqual({
        authorizationStatus: 'NO_AUTH',
        isError: false,
        isLoading: false,
        userEmail: 'user@mail.ru',
      });
  });

  it('should set Error and end Loading on SetError action passed', () => {
    const state = {
      authorizationStatus: 'NO_AUTH',
      isError: false,
      isLoading: true,
      userEmail: null,
    };
    expect(reducer(state, {
      type: ActionType.SET_ERROR,
    }))
      .toEqual({
        authorizationStatus: 'NO_AUTH',
        isError: true,
        isLoading: false,
        userEmail: null,
      });
  });

  it('should set isLoading = true and isError = false on loading started' , () => {
    const state = {
      authorizationStatus: 'NO_AUTH',
      isError: true,
      isLoading: false,
      userEmail: null,
    };
    expect(reducer(state, {
      type: ActionType.START_LOADING,
    }))
      .toEqual({
        authorizationStatus: 'NO_AUTH',
        isError: false,
        isLoading: true,
        userEmail: null,
      });
  });
});
