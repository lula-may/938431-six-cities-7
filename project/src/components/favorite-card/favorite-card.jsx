import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import {PROP_OFFER} from '../props';
import {AppRoute} from '../../const';
import { cn } from '../../utils';

export default function FavoriteCard({offer, onFavoriteButtonClick}) {
  const {
    id,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const placeRoot = `${AppRoute.ROOM}/${id}`;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={placeRoot}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            className={cn(
              'place-card__bookmark-button',
              isFavorite && 'place-card__bookmark-button--active',
              'button',
            )}
            onClick={onFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
          </BookmarkButton>
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

FavoriteCard.propTypes = {
  offer: PROP_OFFER.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};
