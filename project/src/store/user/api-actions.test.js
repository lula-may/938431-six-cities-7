import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';
import {ActionType} from './actions';
import {APIRoute, AuthorizationStatus} from '../../const';
import {checkAuth} from './api-actions';

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
});
