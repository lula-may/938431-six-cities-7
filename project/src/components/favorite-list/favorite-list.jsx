import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FavoriteCity from '../favorite-city/favorite-city';
import {getUniqueItems} from '../../utils.js';
import {getFavoriteOffers} from '../../store/offers/selectors';
import {PROP_OFFER} from '../props';

const filterOffersByCity = (offers, name) => offers.filter(({city}) => city.name === name);

function FavoriteList({favoriteOffers}) {
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

FavoriteList.propTypes = {
  favoriteOffers: PropTypes.arrayOf(PROP_OFFER).isRequired,
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
});

export {FavoriteList};

export default connect(mapStateToProps)(FavoriteList);
