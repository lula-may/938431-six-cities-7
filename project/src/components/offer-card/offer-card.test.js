import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import OfferCard from './offer-card';
import {AuthorizationStatus} from '../../const';

let fakeComponent = null;
let history = null;
const createMockStore = configureStore({});
let store = null;

describe('Component: Offer Card', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = createMockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });
  });

  it('should render correctly', () => {
    const offer = {
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
    };

    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <OfferCard
            className="parentClass"
            imageHeight={30}
            imageWidth={50}
            isPremiumShown
            offer={offer}
            onCardEnter={() => {}}
            onCardLeave={() => {}}
            type="cardType"
          />
        </Router>
      </Provider>
    );
    render(fakeComponent);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/765/i)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/room/i)).toBeInTheDocument();
  });

  it('should run callback on mouseLeave and mouseEnter with current offer passed to it', () => {
    const offer = {
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
    };

    const handleCardEnter = jest.fn();
    const handleCardLeave = jest.fn();
    fakeComponent = (
      <Provider store={store} >
        <Router history={history} >
          <OfferCard
            className="parentClass"
            imageHeight={30}
            imageWidth={50}
            isPremiumShown
            offer={offer}
            onCardEnter={handleCardEnter}
            onCardLeave={handleCardLeave}
            type="cardType"
          />
        </Router>
      </Provider>
    );
    render(fakeComponent);

    userEvent.hover(screen.getByTestId('card'));

    expect(handleCardEnter).toHaveBeenCalledTimes(1);
    expect(handleCardEnter).toHaveBeenCalledWith(offer);

    userEvent.unhover(screen.getByTestId('card'));

    expect(handleCardLeave).toHaveBeenCalledTimes(1);
  });
});
