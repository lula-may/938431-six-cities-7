import {
  ActionType,
  setError,
  setNotFound,
  setRoom,
  startLoading
} from './actions';

describe('Actions', () => {
  it('should return correct action for current room to be set', () => {
    const expectedAction = {
      type: ActionType.LOAD_ROOM,
      payload: {
        bedrooms: 3,
        city: 'Paris',
        id: 1,
        description: 'text1',
        host: 'host1',
        isFavorite: true,
      },
    };

    const room = {
      bedrooms: 3,
      city: 'Paris',
      id: 1,
      description: 'text1',
      host: 'host1',
      isFavorite: true,
    };

    expect(setRoom(room)).toEqual(expectedAction);
  });

  it('should return correct action for room is not found', () => {
    const expectedAction = {
      type: ActionType.SET_NOT_FOUND,
    };

    expect(setNotFound()).toEqual(expectedAction);
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
