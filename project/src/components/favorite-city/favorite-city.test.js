import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import FavoriteCity from './favorite-city';
import { AuthorizationStatus } from '../../const';

let fakeComponent = null;

describe('Component: Favorite City', () => {
  beforeAll(() => {
    const history = createMemoryHistory();
    const createMockStore = configureStore({});
    const store = createMockStore({
      FAVORITE: {
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
            title: 'title',
            type: 'room',
          },
        ],
      },
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    fakeComponent = (
      <Provider store={store} >
        <Router history={history}>
          <FavoriteCity
            city="Moscow"
          />
        </Router>
      </Provider>
    );
  });
  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
  });
});
