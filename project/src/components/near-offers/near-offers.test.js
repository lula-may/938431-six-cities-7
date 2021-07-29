import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NearOffers from './near-offers';
import {AuthorizationStatus} from '../../const';

let fakeComponent = null;
let history = null;
const createMockStore = configureStore({});

describe('Component: Near Offers', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const store = createMockStore({
      NEAR_OFFERS: {
        isLoading: false,
        isError: false,
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
        <Router history={history} >
          <NearOffers/>
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render loading message while loading', () => {
    const store = createMockStore({
      NEAR_OFFERS: {
        isLoading: true,
        isError: false,
        nearOffers: [],
      },
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <NearOffers/>
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render error message on error', () => {
    const store = createMockStore({
      NEAR_OFFERS: {
        isLoading: false,
        isError: true,
        nearOffers: [],
      },
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <NearOffers/>
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(/We failed to load data. Please, try again later./i)).toBeInTheDocument();
  });
});
