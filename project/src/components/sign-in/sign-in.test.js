import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';
import {AuthorizationStatus} from '../../const';

const createMockStore = configureStore({});

describe('Component: Sign In', () => {
  it('should render Sign In page and render user email and password on typing them in form fields', () => {
    const history = createMemoryHistory();
    const store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        isError: false,
        userEmail: null,
      },
    });

    render(
      <Provider store={store} >
        <Router history={history} >
          <SignIn/>
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'lul@mail.ru');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/lul@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
