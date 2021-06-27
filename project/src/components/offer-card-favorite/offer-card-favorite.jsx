import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {PROP_OFFER} from '../props';
import {CardType} from '../../const';

export default function OfferCardFavorite(props) {
  const {offer, ...restProps} = props;
  const {previewImage} = offer;
  return (
    <OfferCard
      className="favorites__card"
      offer={offer}
      type={CardType.FAVORITES}
      {...restProps}
    >
      <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" />
    </OfferCard>
  );
}

OfferCardFavorite.propTypes = {
  className: PropTypes.string,
  offer: PROP_OFFER.isRequired,
};
