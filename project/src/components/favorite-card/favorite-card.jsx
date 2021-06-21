import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';
import {propOffer} from '../props';
import {AppRoute} from '../../const';

export default function FavoriteCard({offer, onFavoriteButtonClick}) {
  const {
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;
  const ratingStyle = {width: `${Math.round(rating) * 20}%`};
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.ROOM}>
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
            isFavorite={isFavorite}
            onFavoriteClick={onFavoriteButtonClick}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.ROOM}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

FavoriteCard.propTypes = {
  offer: propOffer,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};
