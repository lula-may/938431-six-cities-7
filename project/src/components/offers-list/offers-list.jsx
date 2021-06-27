import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import OfferCardDefault from '../offer-card-default/offer-card-default';
import OfferCardFavorite from '../offer-card-favorite/offer-card-favorite';
import {PROP_OFFER} from '../props';
import {CardType} from '../../const';

const getComponentByCardType = (type) => {
  switch (type) {
    case CardType.FAVORITES:
      return OfferCardFavorite;
    default:
      return OfferCardDefault;
  }
};

export default function OffersList({cardType, offers, onCardEnter, onCardLeave}) {
  const Card = getComponentByCardType(cardType);
  return (
    <Fragment>
      {offers.map((offer) => (
        <Card
          type={cardType}
          key={offer.id}
          offer={offer}
          onCardEnter={onCardEnter}
          onCardLeave={onCardLeave}
          onFavoriteButtonClick={() => {}}
        />))}
    </Fragment>
  );
}

OffersList.propTypes = {
  cardType: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
  onCardEnter: PropTypes.func,
  onCardLeave: PropTypes.func,
};
