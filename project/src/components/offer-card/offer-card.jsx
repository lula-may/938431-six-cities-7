import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import {PROP_OFFER} from '../props';
import {AppRoute} from '../../const';

function OfferCard({offer, onCardEnter, onFavoriteButtonClick}) {
  const {
    id,
    images,
    isFavorite,
    isPremium,
    price,
    rating,
    title,
    type,
  } = offer;
  const [cardImage] = images;
  const placeRoot = `${AppRoute.ROOM}/${id}`;
  const handleMouseEnter = useCallback(() => onCardEnter(id), [onCardEnter, id]);

  return (
    <article className="cities__place-card place-card" onMouseEnter={handleMouseEnter}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={placeRoot}>
          <img className="place-card__image" src={cardImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            isActive={isFavorite}
            onClick={onFavoriteButtonClick}
          />
        </div>
        <Rating rating={rating} />
        <h2 className="place-card__name">
          <Link to={placeRoot}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

OfferCard.propTypes = {
  offer: PROP_OFFER.isRequired,
  onCardEnter: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export default OfferCard;
