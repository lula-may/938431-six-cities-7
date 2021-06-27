import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import {PROP_OFFER} from '../props.js';
import {AppRoute, CardType} from '../../const.js';

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
        <OffersList
          cardType={CardType.FAVORITES}
          offers={offers}
          onCardEnter={() => {}}
          onCardLeave={() => {}}
          onFavoriteButtonClick={() => {}}
        />
      </div>
    </li>
  );
}

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
};
