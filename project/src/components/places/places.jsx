import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Sorting from '../sorting/sorting.jsx';
import {CardType} from '../../const.js';
import {getCity, selectSortedOffers} from '../../store/offers/selectors.js';

export default function Places() {
  const city = useSelector(getCity);
  const offers = useSelector(selectSortedOffers);
  const offersCount = offers.length;
  const [activeCard, setActiveCard] = useState(null);
  const handleCardLeave = useCallback(() => setActiveCard(null), []);
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersCount} places to stay in {city}</b>
        <Sorting />
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            cardClassName="cities__place-card"
            cardType={CardType.CITIES}
            isPremiumShown
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
