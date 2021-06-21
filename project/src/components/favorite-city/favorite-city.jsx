import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteCard from '../favorite-card/favorite-card.jsx';
import {propOffer} from '../props.js';
import {AppRoute} from '../../const.js';

export default function FavoriteCity({city, offers}) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.ROOT}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard
            key={offer.id}
            offer={offer}
            onFavoriteButtonClick={() => {}}
          />
        ))}
      </div>
    </li>
  );
}

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(propOffer).isRequired,
};
