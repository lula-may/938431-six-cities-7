import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import {PROP_OFFER} from '../props.js';
import {CardType} from '../../const.js';

export default function Places({offers}) {
  const [activeCard, setActiveCard] = useState(null);
  const handleCardLeave = useCallback(() => setActiveCard(null), []);

  const offersCount = offers.length;
  const isPremiumShown = true;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersCount} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            cardClassName="cities__place-card"
            cardType={CardType.CITIES}
            isPremiumShown={isPremiumShown}
            offers={offers}
            onCardEnter={setActiveCard}
            onCardLeave={handleCardLeave}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          activeOffer={activeCard}
          className="cities__map"
          city={offers[0].city}
          offers={offers}
        />
      </div>
    </div>
  );
}

Places.propTypes = {
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
};
