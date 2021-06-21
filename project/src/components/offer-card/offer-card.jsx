import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import {propOffer} from '../props';
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

  return (
    <article className="cities__place-card place-card" onMouseEnter={() => onCardEnter(id)}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.ROOM}/:${id}`}>
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
            isFavorite={isFavorite}
            onFavoriteClick={onFavoriteButtonClick}
          />
        </div>
        <Rating rating={rating} />
        <h2 className="place-card__name">
          <Link to={AppRoute.ROOM}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

OfferCard.propTypes = {
  offer: propOffer,
  onCardEnter: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export default OfferCard;
