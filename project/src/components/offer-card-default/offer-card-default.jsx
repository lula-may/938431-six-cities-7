import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card';
import {PROP_OFFER} from '../props';
import {CardType} from '../../const';


export default function OfferCardDefault(props) {
  const getClassName = (cardType) => {
    switch (cardType) {
      case CardType.NEAR_PLACES:
        return 'near-places__card';
      default:
        return 'cities__place-card';
    }
  };

  const {offer, type, ...restProps} = props;
  const className = getClassName(type);
  const [cardImage] = offer.images;
  return (
    <OfferCard
      className={className}
      renderPremiumMark = {(isPremium) => (
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      offer={offer}
      type={type}
      {...restProps}
    >
      <img className="place-card__image" src={cardImage} width="260" height="200" alt="Place"/>
    </OfferCard>
  );
}

OfferCardDefault.propTypes = {
  offer: PROP_OFFER.isRequired,
  type: PropTypes.string.isRequired,
};
