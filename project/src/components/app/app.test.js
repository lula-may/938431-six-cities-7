import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import App from './app';
import {AppRoute, AuthorizationStatus} from '../../const';

let fakeApp = null;
let history = null;
let store = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createMockStore = configureStore({});
    store = createMockStore({
      COMMENTS: {
        comments: [],
      },
      FAVORITE: {
        offers: [],
      },
      OFFERS: {
        city: 'Moscow',
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
            goods: ['laptop', 'frige'],
            host: {
              avatarUrl: 'avatar.jpg',
              email: 'email.jpg',
              id: 6,
              isPro: false,
              name: 'Rex',
            },
            id: 42,
            images: [],
            isFavorite: false,
            isPremium: true,
            location: {latitude: 5, longitude: 5, zoom: 5},
            maxAdults: 2,
            previewImage: 'img.jpg',
            price: 765,
            rating: 4,
            title: 'title',
            type: 'room',
          },
        ],
      },
      NEAR_OFFERS: {
        nearOffers: [
          {
            bedrooms: 2,
            city: {
              name: 'Moscow',
              id: 1,
              location: {latitude: 5, longitude: 5, zoom: 5},
            },
            description: 'description-near',
            goods: ['laptop', 'frige'],
            host: {
              avatarUrl: 'avatar.jpg',
              email: 'email.jpg',
              id: 6,
              isPro: false,
              name: 'Rex',
            },
            id: 13,
            images: [],
            isFavorite: false,
            isPremium: true,
            location: {latitude: 5, longitude: 5, zoom: 5},
            maxAdults: 2,
            previewImage: 'img.jpg',
            price: 765,
            rating: 4,
            title: 'nearby_title',
            type: 'hotel',
          },
        ],
      },
      ROOM: {
        isError: false,
        isLoading: false,
        room: {
          bedrooms: 1,
          city: {
            name: 'Moscow',
            id: 1,
            location: {latitude: 5, longitude: 5, zoom: 5},
          },
          description: 'Fake room description',
          goods: ['laptop', 'frige'],
          host: {
            avatarUrl: 'avatar.jpg',
            email: 'email.jpg',
            id: 6,
            isPro: false,
            name: 'Rex',
          },
          id: 42,
          images: [],
          isFavorite: false,
          isPremium: true,
          location: {latitude: 5, longitude: 5, zoom: 5},
          maxAdults: 2,
          previewImage: 'img.jpg',
          price: 765,
          rating: 4,
          title: 'Fake room Title',
          type: 'room',
        },
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'user@mai.ru',
      },
    });

    fakeApp = (
      <Provider store={store} >
        <Router history={history} >
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "Main" page when user navigate to "/"', () => {
    history.push(AppRoute.ROOT);
    const dispatch = jest.fn(() => {});
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeApp);
    expect(screen.getByText(/user@mai.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/1 places to stay in Moscow/i)).toBeInTheDocument();
  });

  it('should render "Favorite" page when authorized user navigate to "/favorites"', () => {
    history.push(AppRoute.FAVORITES);
    const dispatch = jest.fn(() => {});
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeApp);
    expect(screen.getByText(/user@mai.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render "Room" page when user navigate to "/offer/:id"', () => {
    history.push(`${AppRoute.ROOM}/42`);
    const dispatch = jest.fn(() => {});
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeApp);
    expect(screen.getByText(/user@mai.ru/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake room description/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake room Title/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" page when user navigate to non-existent route', () => {
    history.push('/non-existent');
    const dispatch = jest.fn(() => {});
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeApp);
    expect(screen.getByText(/404. Page not found./i)).toBeInTheDocument();
    expect(screen.getByText(/Go to main page/i)).toBeInTheDocument();
  });

  it('should render "SingIn" page when unauthorized user navigate to "/login"', () => {
    const createMockStore = configureStore({});

    store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeApp = (
      <Provider store={store} >
        <Router history={history} >
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.LOGIN);
    const dispatch = jest.fn(() => {});
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeApp);
    expect(screen.getByText('Sign in', {selector: 'h1'})).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });
});
