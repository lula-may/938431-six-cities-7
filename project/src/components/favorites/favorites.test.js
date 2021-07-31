import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import Favorites from './favorites';
import { AuthorizationStatus } from '../../const';

let fakeFavorites = null;
let history = null;
const mockStore = configureStore({});

describe('Component: Favorites', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render Spinner while loading', () => {
    const store = mockStore({
      FAVORITE: {
        isError: false,
        isLoading: true,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    fakeFavorites = (
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>
    );

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeFavorites);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render Error component on error', () => {
    const store = mockStore({
      FAVORITE: {
        isError: true,
        isLoading: false,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    fakeFavorites = (
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>
    );

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeFavorites);

    expect(screen.getByText(/We failed to load data./i)).toBeInTheDocument();
    expect(screen.getByText(/Please, check your internet connection or try again later/i)).toBeInTheDocument();
  });

  it('should render Favorites Empty component when favorite list is empty', () => {
    const store = mockStore({
      FAVORITE: {
        isError: false,
        isLoading: false,
        offers: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    fakeFavorites = (
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>
    );

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeFavorites);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render correctly Favorites list', () => {
    const store = mockStore({
      FAVORITE: {
        isError: false,
        isLoading: false,
        offers: [
          {
            bedrooms: 1,
            city: {
              name: 'Moscow',
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
      },
    });

    fakeFavorites = (
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>
    );

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeFavorites);

    expect(screen.getByText(/Favorite offer title/i)).toBeInTheDocument();
  });
});
