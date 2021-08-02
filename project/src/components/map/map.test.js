import React from 'react';
import {render} from '@testing-library/react';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const city = {
      name: 'Amsterdam',
      id: 1,
      location: {latitude: 5, longitude: 5, zoom: 5},
    };

    const offers = [
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
        title: 'Fake offer title',
        type: 'room',
      },
    ];

    const activeOffer = offers[0];
    const {container} = render(
      <Map
        activeOffer={activeOffer}
        className="testClass"
        city={city}
        offers={offers}
      />,
    );

    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('section')).toHaveClass('map');
  });
});
