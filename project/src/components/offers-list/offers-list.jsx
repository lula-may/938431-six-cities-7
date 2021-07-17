import React, {Fragment, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card';
import {ImageSize} from '../../const';
import {PROP_OFFER} from '../props';
import {postOffer} from '../../store/favorite/api-actions.js';

export default function OffersList(props) {
  const {
    cardClassName,
    cardType,
    isPremiumShown,
    onCardEnter,
    onCardLeave,
    offers,
  } = props;

  const dispatch = useDispatch();

  const onFavoriteButtonClick = useCallback((offer) => dispatch(postOffer(offer)), [dispatch]);

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
};
