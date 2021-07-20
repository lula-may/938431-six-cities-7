import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import OffersList from '../offers-list/offers-list.jsx';
import {AppRoute, CardType} from '../../const.js';
import {getFavoriteOffers} from '../../store/favorite/selectors.js';

const filterOffersByCity = (cityName, offers) => offers.filter(({city}) => city.name === cityName);

export default function FavoriteCity({city}) {
  const allOffers = useSelector(getFavoriteOffers);
  const offers = filterOffersByCity(city, allOffers);

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
          cardClassName="favorites__card"
          cardType={CardType.FAVORITES}
          isPremiumShown={false}
          offers={offers}
        />
      </div>
    </li>
  );
}

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
};
