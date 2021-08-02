import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import Header from './header';
import {AppRoute, AuthorizationStatus} from '../../const';

let fakeComponent = null;
let history = null;
const createMockStore = configureStore({});

describe('Component: Header', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render user email when user is authorized', () => {
    const store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'user@mail.ru',
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <Header/>
        </Router>
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/user@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).toBeNull();
  });

  it('should navigate to "/favorite" on user email click', () => {
    const store = createMockStore({
      FAVORITE: {
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'user@mail.ru',
      },
    });

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <Switch>
            <Route exact path={AppRoute.FAVORITES}>
              <h1>This is Favorites page</h1>
            </Route>
            <Route>
              <Header/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );

    history.push('/fake');
    render(fakeComponent);

    userEvent.click(screen.getByText(/user@mail.ru/i));

    expect(screen.getByText('This is Favorites page')).toBeInTheDocument();
  });

  it('should dispatch logout on "Sign out" click', () => {
    const store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'user@mail.ru',
      },
    });

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <Header/>
        </Router>
      </Provider>
    );
    render(fakeComponent);

    userEvent.click(screen.getByText(/Sign out/i));

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should render Sign in when user is not authorized', () => {
    const store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <Header/>
        </Router>
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeNull();
  });
});
