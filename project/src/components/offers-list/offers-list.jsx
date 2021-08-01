import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card';
import {ImageSize} from '../../const';
import {Prop} from '../props';

export default function OffersList(props) {
  const {
    cardClassName,
    cardType,
    isPremiumShown,
    onCardEnter,
    onCardLeave,
    offers,
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
          type={cardType}
        />))}
    </Fragment>
  );
}

OffersList.propTypes = {
  cardClassName: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  isPremiumShown: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(Prop.OFFER).isRequired,
  onCardEnter: PropTypes.func,
  onCardLeave: PropTypes.func,
};
