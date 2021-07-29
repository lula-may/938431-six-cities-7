import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Places from './places';
import {AuthorizationStatus} from '../../const';

let fakeComponent = null;
let history = null;
const createMockStore = configureStore({});
let store = null;

describe('Component: Places', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store = createMockStore({
      OFFERS: {
        offers: [{
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
          isFavorite: true,
          isPremium: true,
          location: {latitude: 5, longitude: 5, zoom: 5},
          maxAdults: 2,
          previewImage: 'img.jpg',
          price: 765,
          rating: 4,
          title: 'title',
          type: 'room',
        },
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
          id: 23,
          images: [],
          isFavorite: false,
          isPremium: true,
          location: {latitude: 5.01, longitude: 5.01, zoom: 5},
          maxAdults: 2,
          previewImage: 'img.jpg',
          price: 123,
          rating: 3,
          title: 'title',
          type: 'room',
        }],
        city: 'Moscow',
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <Places />
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/2 places to stay in Moscow/i)).toBeInTheDocument();
  });
});
