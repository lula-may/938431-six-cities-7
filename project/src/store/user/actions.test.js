import {
  ActionType,
  logout,
  setAuthorizationStatus,
  setError,
  setToken,
  setUser,
  startLoading
} from './actions';

describe('Actions', () => {
  it('should return correct action for active user to be set', () => {
    const expectedAction = {
      type: ActionType.SET_USER,
      payload: {
        avatarUrl: 'avatar.jpg',
        email: 'user@mail.ru',
        id: 12,
        isPro: true,
        name: 'Denis',
      },
    };

    const user = {
      avatarUrl: 'avatar.jpg',
      email: 'user@mail.ru',
      id: 12,
      isPro: true,
      name: 'Denis',
    };

    expect(setUser(user)).toEqual(expectedAction);
  });

  it('should return correct action for authorization status to be set', () => {
    const expectedAction = {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: 'AUTH',
    };

    const status = 'AUTH';

    expect(setAuthorizationStatus(status)).toEqual(expectedAction);
  });

  it('should return correct action for X-token to be set', () => {
    const expectedAction = {
      type: ActionType.SET_TOKEN,
      payload: 'sdk%3ksjfh',
    };

    const token = 'sdk%3ksjfh';

    expect(setToken(token)).toEqual(expectedAction);
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

  it('should return correct action for user is logged out', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });
});
