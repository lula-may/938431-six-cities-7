import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card';
import {PROP_OFFER} from '../props';
import {ImageSize} from '../../const';

export default function OffersList(props) {
  const {
    cardClassName,
    cardType,
    isPremiumShown,
    offers,
    onCardEnter,
    onCardLeave,
    onFavoriteButtonClick,
  } = props;

  const [imageWidth, imageHeight] = ImageSize[cardType];
  return (
    <Fragment>
      {offers.map((offer) => (
        <OfferCard
          className={cardClassName}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          isPremiumShown={isPremiumShown}
          key={offer.id}
          offer={offer}
          onCardEnter={onCardEnter}
          onCardLeave={onCardLeave}
          onFavoriteButtonClick={onFavoriteButtonClick}
          type={cardType}
        />))}
    </Fragment>
  );
}

OffersList.propTypes = {
  cardClassName: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  isPremiumShown: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
  onCardEnter: PropTypes.func,
  onCardLeave: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};
