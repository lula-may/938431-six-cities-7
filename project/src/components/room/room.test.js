import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import Room from './room';
import { AuthorizationStatus } from '../../const';

let fakeRoom = null;
let history = null;
const mockStore = configureStore({});

describe('Component: Room', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render Spinner while loading', () => {
    const store = mockStore({
      ROOM: {
        isError: false,
        isLoading: true,
        isNotFound: false,
        room: null,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeRoom = (
      <Provider store={store}>
        <Router history={history}>
          <Room />
        </Router>
      </Provider>
    );
    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeRoom);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should render Error component on error', () => {
    const store = mockStore({
      ROOM: {
        isError: true,
        isLoading: false,
        isNotFound: false,
        room: null,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeRoom = (
      <Provider store={store}>
        <Router history={history}>
          <Room />
        </Router>
      </Provider>
    );
    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeRoom);

    expect(screen.getByText(/We failed to load data./i)).toBeInTheDocument();
    expect(screen.getByText(/Please, check your internet connection or try again later/i)).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should redirect to NotFound page', () => {
    const store = mockStore({
      ROOM: {
        isError: true,
        isLoading: false,
        isNotFound: true,
        room: null,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    fakeRoom = (
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/room">
            <Room />
          </Route>
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Router>
      </Provider>
    );

    history.push('/room');
    render(fakeRoom);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should render correctly Room page', () => {
    const store = mockStore({
      COMMENTS: {
        comments: [],
      },
      NEAR_OFFERS: {
        nearOffers: [],
      },
      ROOM: {
        isError: false,
        isLoading: false,
        isNotFound: false,
        room: {
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
          title: 'Fake offer title',
          type: 'room',
        },
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'user@test.ru',
      },
    });

    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    fakeRoom = (
      <Provider store={store}>
        <Router history={history}>
          <Room />
        </Router>
      </Provider>
    );

    render(fakeRoom);

    expect(screen.getByTestId('room')).toBeInTheDocument();
    expect(screen.getByText(/Fake offer title/i)).toBeInTheDocument();

    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
