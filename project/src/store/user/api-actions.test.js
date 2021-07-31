import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute, AuthorizationStatus} from '../../const';
import {checkAuth, login, logoutUser} from './api-actions';

let api = null;

describe('Async operations: User', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });

  it('should make a correct API GET call to /login and set authorization status and email', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {email: 'email'});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: 'email',
        });
      });
  });

  it('should make a correct API POST call to /login and set authorization status and email and write down email to LocalStorage', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'test@mail.ru', password: '1523456'};
    const loginLoader = login(fakeUser);

    Storage.prototype.setItem = jest.fn();

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, {token: 'qwerty', email: 'test@mail.ru'});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: undefined,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: 'test@mail.ru',
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });

        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(Storage.prototype.setItem).toHaveBeenNthCalledWith(1, 'token', 'qwerty');
      });
  });

  it('should make a correct API DELETE call to /logout and reset authorization status and remove email from Local Storage', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logoutUser();

    Storage.prototype.removeItem = jest.fn();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204, [{fake: true}]);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGOUT,
          payload: undefined,
        });

        expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(1);
        expect(Storage.prototype.removeItem).toHaveBeenNthCalledWith(1, 'token');
      });
  });
});
