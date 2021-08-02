import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';

import OffersList from './offers-list';
import {AuthorizationStatus, CardType} from '../../const';

let fakeComponent = null;
const history = createMemoryHistory({});
const createMockStore = configureStore({});
const offers = [
  {
    bedrooms: 3,
    city: {
      name: 'Moscow',
      id: 1,
      location: {latitude: 5, longitude: 5, zoom: 5},
    },
    description: 'desc-1',
    goods: ['laptop', 'frige'],
    host: {
      avatarUrl: 'avatar.jpg',
      email: 'email.jpg',
      id: 6,
      isPro: false,
      name: 'Rex',
    },
    id: 11,
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
    bedrooms: 2,
    city: {
      name: 'Moscow',
      id: 1,
      location: {latitude: 5, longitude: 5, zoom: 5},
    },
    description: 'desc2',
    goods: ['laptop', 'frige'],
    host: {
      avatarUrl: 'avatar.jpg',
      email: 'email.jpg',
      id: 6,
      isPro: false,
      name: 'Rex',
    },
    id: 12,
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
];
let store = null;

describe('Component: Offers List', () => {
  beforeAll(() => {
    store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
        isLoading: false,
      },

    });
  });

  it('should render correctly', () => {
    fakeComponent = (
      <Provider store={store} >

        <Router history={history} >
          <OffersList
            cardClassName="testClass"
            cardType={CardType.CITIES}
            isPremiumShown
            onCardEnter={() => {}}
            onCardLeave={() => {}}
            offers={offers}
          />
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getAllByTestId('card').length).toBe(2);
  });

  it('should run callback on mouseEnter card and on mouseleave', () => {
    const handleCardEnter = jest.fn();
    const handleCardLeave = jest.fn();
    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <OffersList
            cardClassName="testClass"
            cardType={CardType.CITIES}
            isPremiumShown
            onCardEnter={handleCardEnter}
            onCardLeave={handleCardLeave}
            offers={offers}
          />
        </Router>
      </Provider>
    );
    render(fakeComponent);

    userEvent.hover(screen.getAllByTestId('card')[0]);
    expect(handleCardEnter).toHaveBeenCalledTimes(1);
    expect(handleCardEnter).toHaveBeenCalledWith(offers[0]);

    userEvent.unhover(screen.getAllByTestId('card')[0]);
    expect(handleCardLeave).toHaveBeenCalledTimes(1);
  });
});
