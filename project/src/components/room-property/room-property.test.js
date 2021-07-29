import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import RoomProperty from './room-property';
import {AuthorizationStatus} from '../../const';

let fakeComponent = null;
let history = null;
const createMockStore = configureStore({});
let store = null;

describe('Component: RoomProperty', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = createMockStore({
      COMMENTS: {
        comments: [
          {
            id: 15,
            comment: 'Fake comment text',
            date: '2021-07-28',
            rating: 5,
            user: {
              avatarUrl: 'url.jpg',
              id: 7,
              isPro: false,
              name: 'Nick',
            },
          },
        ],
      },
      NEAR_OFFERS: {
        nearOffers: [
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
              email: 'email@mail.ru',
              id: 6,
              isPro: false,
              name: 'Kein',
            },
            id: 43,
            images: [],
            isFavorite: true,
            isPremium: true,
            location: {latitude: 5, longitude: 5, zoom: 5},
            maxAdults: 2,
            previewImage: 'img1.jpg',
            price: 100,
            rating: 4,
            title: 'title nearby first',
            type: 'house',
          },
          {
            bedrooms: 3,
            city: {
              name: 'Moscow',
              id: 1,
              location: {latitude: 5, longitude: 5, zoom: 5},
            },
            description: 'description',
            goods: [],
            host: {
              avatarUrl: 'avatar.jpg',
              email: 'email2@mail.ru',
              id: 6,
              isPro: false,
              name: 'David',
            },
            id: 13,
            images: [],
            isFavorite: true,
            isPremium: true,
            location: {latitude: 5, longitude: 5, zoom: 5},
            maxAdults: 2,
            previewImage: 'img2.jpg',
            price: 765,
            rating: 4,
            title: 'title nearby second',
            type: 'hotel',
          },
        ],
      },
      ROOM: {
        room: {
          bedrooms: 4,
          city: {
            name: 'Moscow',
            id: 1,
            location: {latitude: 5, longitude: 5, zoom: 5},
          },
          description: 'fake room description',
          goods: ['laptop', 'frige'],
          host: {
            avatarUrl: 'avatar.jpg',
            email: 'email.jpg',
            id: 6,
            isPro: false,
            name: 'Patrick',
          },
          id: 42,
          images: [],
          isFavorite: true,
          isPremium: true,
          location: {latitude: 5, longitude: 5, zoom: 5},
          maxAdults: 2,
          previewImage: 'img.jpg',
          price: 765,
          rating: 4,
          title: 'Fake room title',
          type: 'room',
        },
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });
  });

  it('should render correctly', () => {

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <RoomProperty />
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake room title/i)).toBeInTheDocument();
    expect(screen.getByText(/4 Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Max 2 adults/i)).toBeInTheDocument();
    expect(screen.getByText(/€765/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Patrick/i)).toBeInTheDocument();
    expect(screen.getByText(/fake room description/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
  });
});
