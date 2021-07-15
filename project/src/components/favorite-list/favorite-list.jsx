import React from 'react';
import {useSelector} from 'react-redux';

import FavoriteCity from '../favorite-city/favorite-city';
import {getUniqueItems} from '../../utils.js';
import {getFavoriteOffers} from '../../store/offers/selectors';

const filterOffersByCity = (offers, name) => offers.filter(({city}) => city.name === name);

function FavoriteList() {
  const favoriteOffers = useSelector(getFavoriteOffers);

  const cities = getUniqueItems(favoriteOffers.map(({city}) => city.name));
  const sortedOffers = cities.map((city) => ({
    city: city,
    offers: filterOffersByCity(favoriteOffers, city),
  }));
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {sortedOffers.map(({city, offers}) => (
          <FavoriteCity key={city} city={city} offers={offers} />
        ))}
      </ul>
    </section>
  );
}

export default FavoriteList;
