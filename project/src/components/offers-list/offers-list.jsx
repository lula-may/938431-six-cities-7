import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {PROP_OFFER} from '../props';

export default function OffersList({offers, onCardEnter}) {
  return (
    <Fragment>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onCardEnter={onCardEnter}
          onFavoriteButtonClick={() => {}}
        />))}
    </Fragment>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
  onCardEnter: PropTypes.func.isRequired,
};
