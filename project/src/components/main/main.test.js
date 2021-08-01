import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Main from './main';
import { AuthorizationStatus } from '../../const';

let fakeMain = null;
let history = null;
const mockStore = configureStore({});

describe('Component: Main', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render Spinner while loading', () => {
    const store = mockStore({
      OFFERS: {
        isError: false,
        isLoading: true,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeMain = (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );

    render(fakeMain);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render Error component on error', () => {
    const store = mockStore({
      OFFERS: {
        isError: true,
        isLoading: false,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeMain = (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );

    render(fakeMain);

    expect(screen.getByText(/We failed to load data./i)).toBeInTheDocument();
    expect(screen.getByText(/Please, check your internet connection or try again later/i)).toBeInTheDocument();
  });

  it('should render Places Empty component when there is no available offers', () => {
    const store = mockStore({
      OFFERS: {
        isError: false,
        isLoading: false,
        offers: [],
        city: 'Amsterdam',
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeMain = (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );

    render(fakeMain);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Amsterdam/i)).toBeInTheDocument();
  });

  it('should render correctly Main list', () => {
    const store = mockStore({
      OFFERS: {
        city: 'Amsterdam',
        isError: false,
        isLoading: false,
        offers: [
          {
            bedrooms: 1,
            city: {
              name: 'Amsterdam',
              id: 1,
              location: {latitude: 5, longitude: 5, zoom: 5},
            },
            description: 'description',
            goods: [],
            host: {
              avatarUrl: 'avatar.jpg',
              email: 'email.jpg',
              id: 6,
              isPro: false,
              name: 'Rex',
            },
            id: 42,
            images: [],
            isFavorite: true,
            isPremium: false,
            location: {latitude: 5, longitude: 5, zoom: 5},
            maxAdults: 2,
            previewImage: 'img.jpg',
            price: 10,
            rating: 4,
            title: 'Favorite offer title',
            type: 'room',
          },
        ],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'user@test.ru',
      },
    });

    fakeMain = (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );

    render(fakeMain);

    expect(screen.getByText(/1 places to stay in Amsterdam/i)).toBeInTheDocument();
  });
});
