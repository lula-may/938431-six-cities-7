import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {propOffer} from '../props';

export default function OffersList({offers, onCardEnter}) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onCardEnter={onCardEnter}
        />))}
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(propOffer).isRequired,
  onCardEnter: PropTypes.func.isRequired,
};
