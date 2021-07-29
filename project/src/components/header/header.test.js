import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Header from './header';
import { AuthorizationStatus } from '../../const';

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
    expect(screen.queryByText('Sign in')).toBeNull();
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
  });
});
