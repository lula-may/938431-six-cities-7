import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import PlacesEmpty from './places-empty';
import {AuthorizationStatus} from '../../const';

describe('Component: Places Empty', () => {
  it('should render correctly', () => {
    const createMockStore = configureStore({});
    const store = createMockStore({
      OFFERS: {
        offers: [],
        city: 'Moscow',
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });

    const fakeComponent = (
      <Provider store={store} >
        <PlacesEmpty />
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Moscow/i)).toBeInTheDocument();
  });
});
