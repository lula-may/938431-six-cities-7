import React from 'react';
import {Router, Route} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NoAuthRoute from './no-auth-route';
import {AuthorizationStatus} from '../../const';

const mockStore = configureStore({});
let history;

describe('Component: Private Route', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push('./no-auth');
  });

  it('should render component for no-auth route only, when user is not authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store} >
        <Router history={history} >
          <Route exact path="/" >
            <h1>Authorized Route</h1>
          </Route>
          <NoAuthRoute exact path="/no-auth" >
            <h1>No Authorized Only Route</h1>
          </NoAuthRoute>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/No Authorized Only Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Authorized Route/i)).not.toBeInTheDocument();
  });

  it('should render component for common route, when user is authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store} >
        <Router history={history} >
          <Route exact path="/" >
            <h1>Authorized Route</h1>
          </Route>
          <NoAuthRoute exact path="/no-auth" >
            <h1>No Authorized Only Route</h1>
          </NoAuthRoute>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Authorized Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/No Authorized Only Route/i)).not.toBeInTheDocument();
  });
});
